<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\Cache;
use Symfony\Component\Routing\Annotation\Route;

#[Cache(maxage: 3600, public: true, mustRevalidate: true)]
class LegalController extends AbstractController
{
    #[Route('/politique-de-confidentialite', name: 'privacy_policy')]
    public function privacyPolicy(): Response
    {
        return $this->render('legal/privacy_policy.html.twig');
    }

    #[Route('/conditions-utilisation', name: 'terms_of_use')]
    public function termsOfUse(): Response
    {
        return $this->render('legal/terms_of_use.html.twig');
    }
}
