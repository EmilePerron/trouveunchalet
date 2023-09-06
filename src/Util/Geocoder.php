<?php

namespace App\Util;

use App\Entity\Listing;
use Geocoder\Collection;
use Geocoder\Location;
use Geocoder\Provider\Mapbox\Mapbox;
use Geocoder\Provider\Provider;
use Geocoder\Query\GeocodeQuery;

class Geocoder
{
    public function __construct(
        private Provider $mapboxGeocoder,
    ) {
    }

    public function geocodeListing(Listing $listing): ?Location
    {
        $results = $this->mapboxGeocoder->geocodeQuery(
            GeocodeQuery::create($listing->getAddress())
                ->withData("location_type", [
                    Mapbox::TYPE_REGION,
                    Mapbox::TYPE_POSTCODE,
                    Mapbox::TYPE_DISTRICT,
                    Mapbox::TYPE_PLACE,
                    Mapbox::TYPE_LOCALITY,
                    Mapbox::TYPE_NEIGHBORHOOD,
                    Mapbox::TYPE_ADDRESS,
                ])
        );

        if ($results->isEmpty()) {
            return null;
        }

        return $results->first();
    }
}
