<?php

namespace App\Controller;

use App\Entity\Listing;
use App\Util\Storage;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class ImageController extends AbstractController
{
	#[Route(path: '/image/listing/{id}', name: 'listing_image')]
	public function listingImage(Listing $listing, Storage $storage, HttpClientInterface $httpClient): Response
	{
		try {
			return $storage->getPrimaryImageResponse($listing);
		} catch (Exception) {
		}

		// Fallback on fetching the image from the source directly.
		$url = $listing->getImageUrl();

		$sourceResponse = $httpClient->request("GET", $url, [
			"timeout" => 2.5,
			"max_redirects" => 10,
		]);
		$statusCode = $sourceResponse->getStatusCode();

		if ($statusCode < 200 || $statusCode >= 300) {
			return new Response("Could not fetch image", $statusCode);
		}

		$contentType = $sourceResponse->getHeaders()['content-type'][0];

		if (!str_contains(strtolower($contentType), "image/")) {
			return new Response("Invalid file type - expecting an image.", 400);
		}

		$response = new Response($sourceResponse->getContent(), 200, ["Content-Type" => $contentType]);
		$response->setPublic();
		$response->setMaxAge(3600);

		return $response;
	}
}
