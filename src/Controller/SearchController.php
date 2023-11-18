<?php

namespace App\Controller;

use App\Config\RegionConfigLoader;
use App\Repository\ListingRepository;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

class SearchController extends AbstractController
{
    public function __construct(
        private readonly ListingRepository $listingRepository,
		private readonly RegionConfigLoader $regionConfigLoader,
    ) {
    }

    #[Route('/', name: 'search')]
    public function search(): Response
    {
        return $this->render('search.html.twig');
    }

    #[Route('/region/{region}', name: 'region')]
    #[Route('/region/{region}/chiens-permis', name: 'region_with_dogs')]
    public function region(Request $request, string $region): Response
    {
		$isInDogSpecificRoute = str_contains($request->getPathInfo(), 'chiens-permis');
		$isDogsAllowedSearch = $isInDogSpecificRoute || $request->query->get('dogs_allowed') == 1;

		try {
			$regionConfig = $this->regionConfigLoader->getRegion($region);
		} catch (Exception) {
			throw new NotFoundHttpException();
		}

		$queriedLatitude = $request->query->get('latitude');

		// If the query contains a `latitude`, it means a custom search query was made.
		// Let's double check the search params to make sure we offer the best page for the user.
		if ($queriedLatitude !== null) {
			// If the latitude isn't the region's latitude, we shouldn't be in the region search.
			if ($queriedLatitude != $regionConfig->latitude) {
				return $this->redirectToRoute('search', $request->query->all());
			}

			if ($isDogsAllowedSearch && !$isInDogSpecificRoute) {
				return $this->redirectToRoute('region_with_dogs', array_merge(['region' => $region], $request->query->all()));
			} else if ($isInDogSpecificRoute && $request->query->get('dogs_allowed') == 0) {
				return $this->redirectToRoute('region', array_merge(['region' => $region], $request->query->all()));
			}
		}

        return $this->render('search.html.twig', [
			'region' => $regionConfig,
			'dogs_allowed' => $isDogsAllowedSearch,
		]);
    }
}
