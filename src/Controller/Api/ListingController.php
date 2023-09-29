<?php

namespace App\Controller\Api;

use App\Entity\Listing;
use App\Repository\ListingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\Serializer\SerializerInterface;

class ListingController extends AbstractController
{
    public function __construct(
        private ListingRepository $listingRepository,
        private SerializerInterface $serializer,
    ) {
    }

    #[Route('/api/listing/get/{id}', name: 'api_listing_get')]
    public function get(Listing $listing): Response
    {
        return new JsonResponse(
            json_decode(
                $this->serializer->serialize(
                    $listing,
                    'json',
                    (new ObjectNormalizerContextBuilder())
                        ->withGroups('summary')
                        ->toArray()
                )
            )
        );
    }
}
