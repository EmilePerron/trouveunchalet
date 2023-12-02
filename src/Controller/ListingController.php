<?php

namespace App\Controller;

use App\Entity\Listing;
use App\Repository\ListingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ListingController extends AbstractController
{
    public function __construct(
        private readonly ListingRepository $listingRepository,
    ) {
    }

    #[Route('/chalet/{id}', name: 'listing')]
    public function listing(Listing $listing): Response
    {
		return new RedirectResponse($listing->getUrl(), 302);
    }
}
