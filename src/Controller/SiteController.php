<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\Cache;
use Symfony\Component\Routing\Annotation\Route;

#[Cache(maxage: 3600, public: true, mustRevalidate: true)]
class SiteController extends AbstractController
{
    #[Route('/a-propos', name: 'about')]
    public function about(): Response
    {
        return $this->render('site/about.html.twig');
    }

    #[Route('/contact', name: 'contact')]
    public function contact(): Response
    {
        return $this->render('site/contact.html.twig');
    }
}
