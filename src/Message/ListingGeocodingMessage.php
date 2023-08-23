<?php

namespace App\Message;

use Symfony\Component\Uid\Ulid;

final class ListingGeocodingMessage
{
    public function __construct(
        public readonly Ulid $listingId,
    ) {
    }
}
