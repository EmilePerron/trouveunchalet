<?php

namespace App\Crawler;

use App\Config\SiteConfigLoader;
use App\Crawler\Exception\MissingCrawlerException;
use App\Crawler\Model\ListingData;
use App\Entity\CrawlLog;
use App\Entity\Listing;
use App\Entity\Unavailability;
use App\Enum\LogType;
use App\Enum\Site;
use App\Message\RequestCrawlingMessage;
use App\Model\Log;
use App\Repository\ListingRepository;
use App\Util\Geocoder;
use App\Util\Storage;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\TaggedIterator;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Messenger\MessageBusInterface;

class CrawlerRunner
{
    /**
     * @var array<class-string,CrawlerDriverInterface>
     */
    private array $drivers;

    /**
     * @param iterable<CrawlerDriverInterface> $drivers
     */
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ListingRepository $listingRepository,
        private SiteConfigLoader $siteConfigLoader,
        private KernelInterface $kernel,
        private MessageBusInterface $bus,
        private Geocoder $geocoder,
        private LoggerInterface $logger,
		private Storage $storage,
        #[TaggedIterator('app.crawler_driver')]
        iterable $drivers,
    ) {
        foreach ($drivers as $driver) {
            $this->drivers[$driver::class] = $driver;
        }
    }

    public function crawlEverything(): void
    {
        foreach (Site::cases() as $site) {
            $this->crawlSite($site);
        }
    }

    public function crawlSite(Site $site): void
    {
        $log = new CrawlLog($site);
        $writeLog = function (LogType $type, string $message) use ($log) {
            $this->log($log, $type, $message);
        };
        $writeLog(LogType::Info, "Preparing to crawl.");

        try {
            $driver = $this->getDriver($site);
            /** @var array<string,Listing> */
            $originalListings = [];

            foreach ($this->listingRepository->findBy(['parentSite' => $site]) as $originalListing) {
                $originalListings[$originalListing->getIdentifier()] = $originalListing;
            }

            $writeLog(LogType::Info, "Starting to look for listings.");

            $enqueueListing = function (ListingData $listingData) use ($site) {
                $this->bus->dispatch(new RequestCrawlingMessage(
                    site: $site->value,
                    listingData: $listingData,
                ));
            };

            $crawledListingsData = $driver->findAllListings($site, $enqueueListing, $writeLog);

            $listingCount = count($crawledListingsData);
            $log->setTotalListingCount($listingCount)->setCrawledCount(0);
            $writeLog(LogType::Info, "Found {$listingCount} listings.");

            foreach ($crawledListingsData as $roughListingData) {
                $this->log($log, LogType::Info, "Scheduling crawling for listing details: {$roughListingData->url}.");

                $index = $roughListingData->getIdentifier();

                if (isset($originalListings[$index])) {
                    unset($originalListings[$index]);
                }
            }

            $writeLog(LogType::Info, "Removing unavailable listings...");
			$entityManager = $this->entityManager();
            // Any original listing remaining at this point was not part of the crawled listings.
            // We can assume it's been deleted or is unavailable.
            foreach ($originalListings as $listingToRemove) {
                $entityManager->remove($listingToRemove);
            }
            $entityManager->flush();
            $writeLog(LogType::Info, "Successfully removed " . count($originalListings) . " unavailable listings.");

            $log->setDateCompleted(new DateTimeImmutable());
            $writeLog(LogType::Info, "Crawling completed!");
        } catch (Exception $exception) {
            $log->setFailed(true);
            $writeLog(LogType::Error, $exception);

            if ($this->kernel->isDebug()) {
                throw $exception;
            }
        }
    }

    public function crawlListing(Site $site, ListingData $listingData): void
    {
        $log = new CrawlLog($site);
        $writeLog = function (LogType $type, string $message) use ($log) {
            $this->log($log, $type, $message);
        };
        $writeLog(LogType::Info, "Preparing to crawl.");

        try {
            $driver = $this->getDriver($site);

            $this->log($log, LogType::Info, "Crawling for listing details: {$listingData->url}.");

            $listingDetails = $driver->getListingDetails($listingData, $writeLog);
            $existingListing = $this->listingRepository->findFromListingData($site, $listingData);
			$entityManager = $this->entityManager();

			if ($existingListing) {
				$this->log($log, LogType::Info, "Found existing listing in DB: listing #{$existingListing->getId()}.");
				$entityManager->refresh($existingListing);
			}

            $listing = $existingListing ?: new Listing();

            $listing->setParentSite($site);
            $this->fillListingFromCrawledDetails($listing, $listingDetails);
            $entityManager->persist($listing);
            $entityManager->flush();

			$this->storage->updatePrimaryImageUrl($listing);

            if (!$listing->getLatitude()) {
                $writeLog(LogType::Info, "Requesting geocoding information...");
                $geolocation = $this->geocoder->geocodeListing($listing);

                if (!$geolocation) {
                    $writeLog(LogType::Error, "Could not geocode listing {$listing->getId()} - zero results for address {$listing->getAddress()}.");
                    $this->logger->error("Could not geocode listing {$listing->getId()} - zero results for address {$listing->getAddress()}.");
                } else {
                    $listing->setLatitude($geolocation->getCoordinates()->getLatitude());
                    $listing->setLongitude($geolocation->getCoordinates()->getLongitude());
                    $entityManager->persist($listing);
                    $entityManager->flush();
                    $writeLog(LogType::Info, "Coordinates updated.");
                }
            }

            $log->setDateCompleted(new DateTimeImmutable());
            $writeLog(LogType::Info, "Successfully crawled and updated listing details.");
        } catch (Exception $exception) {
            $log->setFailed(true);
            $writeLog(LogType::Error, $exception);

            if ($this->kernel->isDebug()) {
                throw $exception;
            }
        }
    }

    /**
     * Returns an open entity manager (if the current entity manager is closed,
     * which may happen when crawling takes a long time, a new connection will
     * be opened automatically).
     */
    private function entityManager(): EntityManagerInterface
    {
        if (!$this->entityManager->isOpen()) {
            $this->entityManager = EntityManager::create(
                $this->entityManager->getConnection(),
                $this->entityManager->getConfiguration()
            );
        }

        return $this->entityManager;
    }

    private function log(CrawlLog $log, LogType $type, string $message): void
    {
        $logMessage = new Log($type, $message);
        $log->addLog($logMessage);

        if ($this->kernel->isDebug()) {
            echo $logMessage . PHP_EOL;
        }

        $this->entityManager()->persist($log);
        $this->entityManager()->flush();
    }

    private function fillListingFromCrawledDetails(Listing $listing, ListingData $listingData): Listing
    {
        $listing->setName($listingData->name);
        $listing->setUrl($listingData->url);
        $listing->setAddress($listingData->address);
        $listing->setDescription(str_replace("\n\n\n", "\n\n", $listingData->description));
        $listing->setDogsAllowed($listingData->dogsAllowed);
        $listing->setImageUrl($listingData->imageUrl);
        $listing->setInternalId($listingData->internalId);
		$listing->setMaximumNumberOfGuests($listingData->numberOfGuests);
		$listing->setNumberOfBedrooms($listingData->numberOfBedrooms);
		$listing->setHasWifi($listingData->hasWifi);
		$listing->setMinimumStayInDays($listingData->minimumStayInDays ?: 1);
		$listing->setMinimumPricePerNight($listingData->minimumPricePerNight);
		$listing->setMaximumPricePerNight($listingData->maximumPricePerNight);

		/** @var array<string,Unavailability> */
		$existingUnavailabilitiesByDate = [];
		$upToDateUnavailabilities = [];

		foreach ($listing->getUnavailabilities() as $unavailability) {
			$existingUnavailabilitiesByDate[$unavailability->date->format('Y-m-d')] = $unavailability;
		}

		foreach ($listingData->unavailabilities as $unavailabilityModel) {
			$unavailability = $existingUnavailabilitiesByDate[$unavailabilityModel->date->format('Y-m-d')] ?? Unavailability::fromModel($unavailabilityModel, $listing);
			$unavailability->availableInAm = $unavailabilityModel->availableInAm;
			$unavailability->availableInPm = $unavailabilityModel->availableInPm;
			$upToDateUnavailabilities[] = $unavailability;
		}

        $listing->setUnavailabilities(new ArrayCollection($upToDateUnavailabilities));

        return $listing;
    }

    private function getDriver(Site $site): CrawlerDriverInterface
    {
        $siteConfig = $this->siteConfigLoader->getSiteConfig($site);
        $driver = $this->drivers[$siteConfig->crawler] ?? throw new MissingCrawlerException("Site {$site} should be crawled with driver '{$siteConfig->crawler}', but no such driver exists");

        return $driver;
    }
}
