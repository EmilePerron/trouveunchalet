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
        return $this->render('search.html.twig');
    }
}
