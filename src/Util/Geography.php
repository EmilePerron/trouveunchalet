<?php

namespace App\Util;

class Geography
{
    public static function createBoundingBox(float $latitude, float $longitude, int $distanceInKms): GeographicBoundingBox
    {
        $latLimits = [deg2rad(-90), deg2rad(90)];
        $lonLimits = [deg2rad(-180), deg2rad(180)];

        $radLat = deg2rad($latitude);
        $radLon = deg2rad($longitude);

        if ($radLat < $latLimits[0] || $radLat > $latLimits[1] || $radLon < $lonLimits[0] || $radLon > $lonLimits[1]) {
            throw new \Exception("Invalid Argument");
        }

        // Angular distance in radians on a great circle,
        // using Earth's radius in kilometers.
        $angular = $distanceInKms / 6378.14;

        $minLat = $radLat - $angular;
        $maxLat = $radLat + $angular;

        if ($minLat > $latLimits[0] && $maxLat < $latLimits[1]) {
            $deltaLon = asin(sin($angular) / cos($radLat));
            $minLon = $radLon - $deltaLon;

            if ($minLon < $lonLimits[0]) {
                $minLon += 2 * pi();
            }

            $maxLon = $radLon + $deltaLon;

            if ($maxLon > $lonLimits[1]) {
                $maxLon -= 2 * pi();
            }
        } else {
            // A pole is contained within the distance.
            $minLat = max($minLat, $latLimits[0]);
            $maxLat = min($maxLat, $latLimits[1]);
            $minLon = $lonLimits[0];
            $maxLon = $lonLimits[1];
        }

        return new GeographicBoundingBox(
            rad2deg($minLat),
            rad2deg($minLon),
            rad2deg($maxLat),
            rad2deg($maxLon),
        );
    }
}

class GeographicBoundingBox
{
    public function __construct(
        public readonly float $minimumLatitude,
        public readonly float $minimumLongitude,
        public readonly float $maximumLatitude,
        public readonly float $maximumLongitude,
    ) {
    }
}
