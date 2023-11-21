<?php

namespace App\Util;

use App\Entity\Listing;
use League\Flysystem\FilesystemOperator;
use RuntimeException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class Storage
{
	public function __construct(
		private FilesystemOperator $cdnStorage,
	) {
	}

	public function getPrimaryImageResponse(Listing $listing): Response
	{
		$path = $this->getPrimaryImagePath($listing);
		$mimeType = $this->cdnStorage->mimeType($path);
		$stream = $this->cdnStorage->readStream($path);

		if (!str_contains(strtolower($mimeType), "image/")) {
			throw new RuntimeException("Expected an image - found mime type {$mimeType}.");
		}

		$response = new StreamedResponse(
			fn() => fpassthru($stream),
			200,
			[
				'Content-Transfer-Encoding' => 'binary',
				'Content-Type' => $mimeType,
				'Content-Length' => fstat($stream)['size'],
			]
		);

		$response->isCacheable();
		$response->setPublic();
		$response->setMaxAge(3600);

		return $response;
	}

	public function updatePrimaryImageUrl(Listing $listing): void
	{
		$imageUrl = $listing->getImageUrl();

		if ($imageUrl) {
			$this->cdnStorage->write($this->getPrimaryImagePath($listing), file_get_contents($imageUrl));
		}
	}

	private function getPrimaryImagePath(Listing $listing): string
	{
		return $listing->getId() . '/primary';
	}
}
