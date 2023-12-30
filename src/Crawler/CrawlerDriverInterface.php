<?php

namespace App\Crawler;

use App\Crawler\Model\ListingData;
use App\Crawler\Model\Unavailability;
use App\Entity\Listing;
use App\Enum\Site;
use Closure;
use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;

#[AutoconfigureTag('app.crawler_driver')]
interface CrawlerDriverInterface
{
    /**
     * Crawls the target site to find all of the listings.
     *
     * @param string $site Must correspond to a key in the `sites.yaml` configuration.
     * @param Closure(ListingData $listingData): void $enqueueListing
     * @return array<int,ListingData>
     */
    public function findAllListings(Site $site, Closure $enqueueListing): array;

    /**
     * Crawls the target listing page to get all of its details and
     * availabilities.
     */
    public function getListingDetails(ListingData|Listing $listing): ListingData;

    /**
     * Fetches only the availabilities for a given property, without any
	 * additional data.
	 *
	 * If the site does not have a way to do this without loading everything,
	 * this returns `null`.
	 *
	 * `$listing` is passed by reference to allow the drivers to update any
	 * other metadata about the listing if the availabilities endpoint contains
	 * relevant information that isn't available elsewhere.
	 *
	 * @return null|array<int,Unavailability>
     */
    public function fetchAvailabilitiesOnly(ListingData &$listing): null|array;
}
