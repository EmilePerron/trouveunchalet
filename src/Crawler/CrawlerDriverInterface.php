<?php

namespace App\Crawler;

use App\Crawler\Model\DetailedListingData;
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
     * @param Closure(\App\Enum\LogType $type, string $message): void $writeLog
     * @return array<int,ListingData>
     */
    public function findAllListings(Site $site, Closure $enqueueListing, Closure $writeLog): array;

    /**
     * Crawls the target listing page to get all of its details and
     * availabilities.
     *
     * @param Closure(\App\Enum\LogType $type, string $message): void $writeLog
     */
    public function getListingDetails(ListingData|Listing $listing, Closure $writeLog): DetailedListingData;
}
