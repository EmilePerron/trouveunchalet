<?php

namespace App\Crawler\Model;

use DateTimeInterface;

class Unavailability
{
    public function __construct(
        public readonly DateTimeInterface $date,
        public readonly bool $availableInAm,
        public readonly bool $availableInPm,
    ) {
    }
}
