<?php

namespace App\Controller;

use ReflectionMethod;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\Cache;
use Symfony\Component\Routing\Annotation\Route;

class SitemapController extends AbstractController
{
	#[Cache(public: true, maxage: 3600, mustRevalidate: true)]
    #[Route('/sitemap.xml', name: 'sitemap')]
    public function sitemap(): Response
    {
		$siteActions = get_class_methods(SiteController::class);
		$contentPageUrls = [];

		foreach ($siteActions as $siteAction) {
			$reflection = new ReflectionMethod(SiteController::class, $siteAction);
			$routeAttribute = $reflection->getAttributes(Route::class)[0] ?? null;

			if (!$routeAttribute) {
				continue;
			}

			$contentPageUrls[] = $routeAttribute->newInstance()->getPath();
		}

        return $this->render('sitemap.xml.twig', [
			'content_page_urls' => $contentPageUrls,
        ]);
    }
}
