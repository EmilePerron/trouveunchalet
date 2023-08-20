<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SearchController extends AbstractController
{
    public function __construct(
    ) {
    }

    #[Route('/', name: 'search')]
    public function index(): Response
    {
        return $this->render('dashboard.html.twig');
    }
}
