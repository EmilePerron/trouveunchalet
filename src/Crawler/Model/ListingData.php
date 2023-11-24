<?php

namespace App\Crawler\Model;

use App\Entity\Listing;

class ListingData
{
    /**
     * @param null|array<int,Unavailability> $unavailabilities
     */
    public function __construct(
        public readonly string $name,
        public readonly string $address,
        public readonly string $url,
        public readonly string $internalId,
        public readonly ?array $unavailabilities = null,
        public readonly ?string $description = null,
        public readonly ?string $imageUrl = null,
        public readonly ?bool $dogsAllowed = null,
		public readonly ?int $numberOfBedrooms = null,
		public readonly ?int $numberOfGuests = null,
		public readonly ?bool $hasWifi = null,
		public readonly ?int $minimumStayInDays = null,
		public readonly ?int $minimumPricePerNight = null,
		public readonly ?int $maximumPricePerNight = null,
		public readonly ?string $latitude = null,
		public readonly ?string $longitude = null,
    ) {
    }

    public static function createFromListing(Listing $listing): self
    {
        return new self(
            name: $listing->getName(),
            address: $listing->getAddress(),
            url: $listing->getUrl(),
            internalId: $listing->getInternalId(),
			description: $listing->getDescription(),
			imageUrl: $listing->getImageUrl(),
			dogsAllowed: $listing->isDogsAllowed(),
			numberOfBedrooms: $listing->getNumberOfBedrooms(),
			numberOfGuests: $listing->getMaximumNumberOfGuests(),
			hasWifi: $listing->isHasWifi(),
			minimumStayInDays: $listing->getMinimumStayInDays(),
			minimumPricePerNight: $listing->getMinimumPricePerNight(),
			maximumPricePerNight: $listing->getMaximumPricePerNight(),
			latitude: $listing->getLatitude(),
			longitude: $listing->getLongitude(),
        );
    }

    public function getIdentifier(): string
    {
        return $this->internalId;
    }
}
