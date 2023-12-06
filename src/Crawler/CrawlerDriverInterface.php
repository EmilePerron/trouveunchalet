<?php

namespace App\Crawler;

use App\Crawler\Model\ListingData;
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
     * Fetches the availabilities for a given listing and update the provided
	 * listing's `unavailabilities` property.
	 *
	 * More changes and updates may be done to the listing if desired.
     */
    public function updateAvailabilities(ListingData &$listing): void;
}
