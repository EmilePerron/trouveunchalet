<?php

namespace App\Crawler\Driver;

use App\Crawler\Driver\Generic\AbstractGuestyDriver;
use App\Crawler\Model\ListingData;
use App\Entity\Listing;

class LeVertendre extends AbstractGuestyDriver
{
	protected function getOriginUrl(): string
	{
		return "https://reservation.levertendre.com";
	}

	protected function getListingPageBaseUrl(): string
	{
		return "https://reservation.levertendre.com/properties/";
	}

	public function getListingDetails(ListingData|Listing $listing): ListingData
	{
		$listingData = parent::getListingDetails($listing);

		// All LeVertendre cottages and zooboxes have wood-burning fireplaces
		$listingData->hasWoodStove = $listingData->hasFireplace;

		return $listingData;
	}
}
