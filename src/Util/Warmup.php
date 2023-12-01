<?php

namespace App\Util;

use App\Config\RegionConfigLoader;
use App\Repository\ListingRepository;

class Warmup {
	public function __construct(
		private readonly ListingRepository $listingRepository,
		private readonly RegionConfigLoader $regionConfigLoader,
	) {
	}

	/**
	 * Triggers all the most common region-based searches to warm up the
	 * Doctrine cache, making most visitor first loads much faster.
	 */
	public function warmupRegionSearches(): void
	{
		foreach ($this->regionConfigLoader->getRegions() as $region) {
			// Warmup without dogs
			$this->listingRepository->searchByLocation(
				latitude: $region->latitude,
				longitude: $region->longitude,
				maximumRange: $region->radius,
			);

			// Warmup with dogs
			$this->listingRepository->searchByLocation(
				latitude: $region->latitude,
				longitude: $region->longitude,
				maximumRange: $region->radius,
				dogsAllowed: true,
			);

			// Warmup with wifi
			$this->listingRepository->searchByLocation(
				latitude: $region->latitude,
				longitude: $region->longitude,
				maximumRange: $region->radius,
				hasWifi: true,
			);

			// Warmup with dogs & wifi
			$this->listingRepository->searchByLocation(
				latitude: $region->latitude,
				longitude: $region->longitude,
				maximumRange: $region->radius,
				dogsAllowed: true,
				hasWifi: true,
			);
		}
	}
}
