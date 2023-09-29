<?php

namespace App\Controller;

use App\Repository\ListingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SearchController extends AbstractController
{
    public function __construct(
        private ListingRepository $listingRepository,
    ) {
    }

    #[Route('/', name: 'search')]
    public function search(Request $request): Response
    {
        $listings = [];

        if ($request->query->get('latitude')) {
            $listings = $this->listingRepository->searchByLocation(
                $request->query->get('latitude'),
                $request->query->get('longitude'),
                $request->query->getInt('search_radius'),
            );
        }

        return $this->render('search.html.twig', [
            'listings' => $listings,
        ]);
    }
}
