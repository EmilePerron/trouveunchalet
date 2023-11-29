<?php

namespace App\Crawler;

use App\Config\SiteConfigLoader;
use App\Crawler\Exception\MissingCrawlerException;
use App\Crawler\Exception\RobotsTxtDisallowsCrawlingException;
use App\Crawler\Model\ListingData;
use App\Entity\Listing;
use App\Entity\Unavailability;
use App\Enum\Site;
use App\Message\RequestCrawlingMessage;
use App\Repository\ListingRepository;
use App\Util\Geocoder;
use App\Util\Storage;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Psr\Log\LoggerInterface;
use RobotsTxtParser;
use Symfony\Component\Cache\Psr16Cache;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\DependencyInjection\Attribute\TaggedIterator;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

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
		private HttpClientInterface $httpClient,
		#[Autowire(service: 'app_cache')]
		private Psr16Cache $appCache,
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
		$this->checkIfCrawlingIsAllowedByRobotsTxt($site);

		$driver = $this->getDriver($site);
		/** @var array<string,Listing> */
		$originalListings = [];

		foreach ($this->listingRepository->findBy(['parentSite' => $site]) as $originalListing) {
			$originalListings[$originalListing->getIdentifier()] = $originalListing;
		}

		$enqueueListing = function (ListingData $listingData) use ($site) {
			$this->bus->dispatch(new RequestCrawlingMessage(
				site: $site->value,
				listingData: $listingData,
			));
		};

		$crawledListingsData = $driver->findAllListings($site, $enqueueListing);

		foreach ($crawledListingsData as $roughListingData) {
			$index = $roughListingData->getIdentifier();

			if (isset($originalListings[$index])) {
				unset($originalListings[$index]);
			}
		}

		// Any original listing remaining at this point was not part of the crawled listings.
		// We can assume it's been deleted or is unavailable.
		foreach ($originalListings as $listingToRemove) {
			$this->entityManager->remove($listingToRemove);
		}
		$this->entityManager->flush();
    }

    public function crawlListing(Site $site, ListingData $listingData): void
    {
		$this->checkIfCrawlingIsAllowedByRobotsTxt($site);

		$driver = $this->getDriver($site);

		$this->logger->info("Crawling for listing details: {$listingData->url}.");

		$listingDetails = $driver->getListingDetails($listingData);
		$existingListing = $this->listingRepository->findFromListingData($site, $listingData);

		$listing = $existingListing ?: new Listing();

		$listing->setParentSite($site);
		$this->fillListingFromCrawledDetails($listing, $listingDetails);
		$this->entityManager->persist($listing);

		try {
			$this->entityManager->flush();
		} catch (Exception $exception) {
			$this->logger->error("Error in CrawlerRunner:crawlListing() for listing {$listing->getUrl()} - {$exception->getMessage()}", $exception->getTrace());
			throw $exception;
		}

		$this->storage->updatePrimaryImageUrl($listing);

		if (!$listing->getLatitude()) {
			$geolocation = $this->geocoder->geocodeListing($listing);

			if (!$geolocation) {
				$this->logger->error("Could not geocode listing {$listing->getId()} - zero results for address {$listing->getAddress()}.");
			} else {
				$listing->setLatitude($geolocation->getCoordinates()->getLatitude());
				$listing->setLongitude($geolocation->getCoordinates()->getLongitude());
				$this->entityManager->persist($listing);
				$this->entityManager->flush();
			}
		}
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

		if (!$listing->getLatitude()) {
			$listing->setLatitude($listingData->latitude);
			$listing->setLongitude($listingData->longitude);
		}

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

	/**
	 * @throws RobotsTxtDisallowsCrawlingException
	 */
	private function checkIfCrawlingIsAllowedByRobotsTxt(Site $site, string $url = '/'): void
	{
		$cacheKey = 'robots_txt_' . $site->name;
		$siteConfig = $this->siteConfigLoader->getSiteConfig($site);
		$isAllowed = $this->appCache->get($cacheKey);

		if ($isAllowed === null) {
			try {
				$request = $this->httpClient->request('GET', $siteConfig->robotsTxtUrl);
				$robotsTxtContent = $request->getContent();
				$robotsParser = new RobotsTxtParser($robotsTxtContent);

				$isAllowed = $robotsParser->isAllowed($url, "TrouveTonChaletBot") || !$robotsParser->isDisallowed($url, "TrouveTonChaletBot");
			} catch (Exception $e) {
				$this->logger->error($e, $e->getTrace());
				$isAllowed = true;
			}

			$this->appCache->set($cacheKey, $isAllowed, 3600 * 24);
		}

		if (!$isAllowed) {
			throw new RobotsTxtDisallowsCrawlingException("The robots.txt file for {$site->name} at {$siteConfig->robotsTxtUrl} disallows our crawler.");
		}
	}
}
