<?php

namespace App\Crawler\Model;

class DetailedListingData
{
    /**
     * @param array<int,Unavailability> $unavailabilities
     */
    public function __construct(
        public readonly ListingData $listingData,
        public readonly array $unavailabilities,
        public readonly ?string $description = null,
        public readonly ?string $imageUrl = null,
        public readonly ?bool $dogsAllowed = null,
    ) {
    }
}
