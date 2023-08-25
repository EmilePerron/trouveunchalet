<?php

namespace App\Message;

use App\Crawler\Model\ListingData;

final class RequestCrawlingMessage
{
    public function __construct(
        public readonly string $site,
        public readonly ?ListingData $listingData = null,
    ) {
    }
}
