<?php

namespace App\MessageHandler;

use App\Message\ListingGeocodingMessage;
use App\Repository\ListingRepository;
use Doctrine\ORM\EntityManager;
use Exception;
use Geocoder\Provider\Provider;
use Geocoder\Query\GeocodeQuery;
use Psr\Log\LoggerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler("messenger.bus.default", "async")]
final class ListingGeocodingMessageHandler
{
    public function __construct(
        private ListingRepository $listingRepository,
        private EntityManager $entityManager,
        private Provider $mapboxGeocoder,
        private LoggerInterface $logger,
    ) {
    }

    public function __invoke(ListingGeocodingMessage $message)
    {
        $listing = $this->listingRepository->find($message->listingId);

        // @TODO: do the geocoding and update the listing
        $results = $this->mapboxGeocoder->geocodeQuery(GeocodeQuery::create($listing->getAddress()));

        if ($results->isEmpty()) {
            $this->logger->error("Could not geocode listing {$listing->getId()} - zero results for address {$listing->getAddress()}.");
            return;
        }

        $result = $results->first();
        $listing->setLatitude($result->getCoordinates()->getLatitude());
        $listing->setLongitude($result->getCoordinates()->getLongitude());

        $this->entityManager->persist($listing);
        $this->entityManager->flush();
    }
}
