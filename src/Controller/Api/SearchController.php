<?php

namespace App\Controller\Api;

use App\Repository\ListingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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

    #[Route('/api/listing/search', name: 'api_listing_search')]
    public function search(Request $request): Response
    {
        $latitude = $request->query->get('latitude');
        $longitude = $request->query->get('longitude');
        $searchRadius = min(abs($request->query->getInt('search_radius') ?: 250), 1000);
        $listings = [];

        if ($request->query->get('latitude')) {
            $listings = $this->listingRepository->searchByLocation(
                latitude: $latitude,
                longitude: $longitude,
                maximumRange: $searchRadius,
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
