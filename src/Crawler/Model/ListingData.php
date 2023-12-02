<?php

namespace App\Crawler\Model;

use App\Entity\Listing;

class ListingData
{
    /**
     * @param null|array<int,Unavailability> $unavailabilities
     */
    public function __construct(
        public string $name,
        public string $address,
        public string $url,
        public string $internalId,
        public ?array $unavailabilities = null,
        public ?string $description = null,
        public ?string $imageUrl = null,
        public ?bool $dogsAllowed = null,
		public ?int $numberOfBedrooms = null,
		public ?int $numberOfGuests = null,
		public ?bool $hasWifi = null,
		public ?bool $hasFireplace = null,
		public ?bool $hasWoodStove = null,
		public ?int $minimumStayInDays = null,
		public ?int $minimumPricePerNight = null,
		public ?int $maximumPricePerNight = null,
		public ?string $latitude = null,
		public ?string $longitude = null,
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
			hasFireplace: $listing->isHasFireplace(),
			hasWoodStove: $listing->isHasWoodStove(),
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
