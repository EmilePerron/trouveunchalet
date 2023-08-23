<?php

namespace App\Crawler\Model;

use App\Entity\Listing;

class ListingData
{
    public function __construct(
        public readonly string $name,
        public readonly string $address,
        public readonly string $url,
        public readonly ?string $internalId = null,
    ) {
    }

    public static function createFromListing(Listing $listing): self
    {
        return new self(
            name: $listing->getName(),
            address: $listing->getAddress(),
            url: $listing->getUrl(),
            internalId: $listing->getInternalId(),
        );
    }

    public function getIdentifier(): string
    {
        return $this->internalId ?: $this->url;
    }
}
