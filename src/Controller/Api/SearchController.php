<?php

namespace App\Controller\Api;

use App\Repository\ListingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\Cache;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\Serializer\SerializerInterface;

class SearchController extends AbstractController
{
    public function __construct(
        private ListingRepository $listingRepository,
        private SerializerInterface $serializer,
    ) {
    }

	#[Cache(public: true, maxage: 60, mustRevalidate: true)]
    #[Route('/api/listing/search', name: 'api_listing_search')]
    public function search(Request $request): Response
    {
        $latitude = $request->query->get('latitude');
        $longitude = $request->query->get('longitude');
        $hasWifi = $request->query->get('has_wifi');
        $dogsAllowed = $request->query->get('dogs_allowed');
        $dateArrival = $request->query->get('date_arrival');
        $dateDeparture = $request->query->get('date_departure');
        $searchRadius = min(abs($request->query->getInt('search_radius') ?: 250), 1000);
        $listings = [];

        if ($request->query->get('latitude')) {
            $listings = $this->listingRepository->searchByLocation(
                latitude: $latitude,
                longitude: $longitude,
                maximumRange: $searchRadius,
				dogsAllowed: $dogsAllowed,
				hasWifi: $hasWifi,
				fromDate: $dateArrival,
				toDate: $dateDeparture,
            );
        }

        return new JsonResponse(
            json_decode(
                $this->serializer->serialize(
                    $listings,
                    'json',
                    (new ObjectNormalizerContextBuilder())
                        ->withGroups('summary')
                        ->toArray()
                )
            )
        );
    }
}
