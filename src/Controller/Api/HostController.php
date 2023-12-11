<?php

namespace App\Controller\Api;

use App\Crawler\CrawlerRunner;
use App\Enum\Site;
use App\Repository\ListingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\Serializer\SerializerInterface;

class HostController extends AbstractController
{
    public function __construct(
        private ListingRepository $listingRepository,
		private CrawlerRunner $crawlerRunner,
		private SerializerInterface $serializer,
    ) {
    }

	/**
	 * Allows visitors to check if a listing is indexed baesd on a URL.
	 * This works a bit like the Facebook URL validator or Twitter card validator.
	 */
    #[Route('/api/host/listing-validator', name: 'api_host_listing_validator')]
    public function validate(Request $request): Response
    {
		$url = strtolower($request->request->get('url'));
		$listing = $this->listingRepository->findOneBy(['url' => $url]);

		if (!$listing) {
			$site = null;
			$internalId = null;

			if (str_contains($url, 'airbnb')) {
				$site = Site::Airbnb;
				$internalId = preg_replace('~^.*\/rooms\/(\d+).*?$~', '$1', $url);
			} else if (str_contains($url, 'chaletsalouer.com')) {
				$site = Site::ChaletsALouer;
				$html = file_get_contents($url);
				$html = str_replace("\n", "", substr($html, strpos($html, 'data-noetablissement="'), 40));
				$internalId = preg_replace('~^.*data-noetablissement="(\d+)".*$~', '$1', $html);
			} else if (str_contains($url, 'wechalet.com')) {
				$site = Site::WeChalet;
				$internalId = preg_replace('~^.*\/(?:homes|proprietes)\/([a-z0-9\-]+).*?$~', '$1', $url);
			} else if (str_contains($url, 'vertendre')) {
				$site = Site::LeVertendre;
				$internalId = preg_replace('~^.*\/properties\/([a-z0-9]+).*?$~', '$1', $url);
			} else if (str_contains($url, 'monsieurchalets')) {
				$site = Site::MonsieurChalets;
				$html = file_get_contents($url);
				$html = str_replace("\n", "", substr($html, strpos($html, 'id="__NEXT_DATA__"'), 1000));
				$internalId = preg_replace('~^.*"id":(\d+).*$~', '$1', $html);
			}

			if ($site && $internalId) {
				$listing = $this->listingRepository->findOneBy([
					'parentSite' => $site,
					'internalId' => $internalId,
				]);
			}
		}

		if (!$listing) {
			return new JsonResponse([
				'error' => 'NOT_FOUND',
				'url' => $url,
			], 404);
		}

        return new JsonResponse(
            [
				'listing' => json_decode(
					$this->serializer->serialize(
						$listing,
						'json',
						(new ObjectNormalizerContextBuilder())
							->withGroups(['summary', 'details', 'timestamps'])
							->toArray()
					)
				),
				'unavailabilities' => json_decode(
					$this->serializer->serialize(
						$listing->getUnavailabilities(),
						'json',
						(new ObjectNormalizerContextBuilder())
							->withGroups(['unavailability', 'timestamps'])
							->toArray()
					)
				),
			]
        );
    }
}
