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

    /**
     * Calculates the great-circle distance between two points, with the
     * Vincenty formula.
     *
     * @param float $latitudeFrom Latitude of start point in [deg decimal]
     * @param float $longitudeFrom Longitude of start point in [deg decimal]
     * @param float $latitudeTo Latitude of target point in [deg decimal]
     * @param float $longitudeTo Longitude of target point in [deg decimal]
     * @param float $earthRadius Mean earth radius in [m]
     * @return float Distance between points in [m] (same as earthRadius)
     */
    public static function getDistanceBetweenTwoPoints(float $latitudeFrom, float $longitudeFrom, float $latitudeTo, float $longitudeTo, float $earthRadius = 6371000): float
    {
        // convert from degrees to radians
        $latFrom = deg2rad($latitudeFrom);
        $lonFrom = deg2rad($longitudeFrom);
        $latTo = deg2rad($latitudeTo);
        $lonTo = deg2rad($longitudeTo);

        $lonDelta = $lonTo - $lonFrom;
        $a = pow(cos($latTo) * sin($lonDelta), 2) +
          pow(cos($latFrom) * sin($latTo) - sin($latFrom) * cos($latTo) * cos($lonDelta), 2);
        $b = sin($latFrom) * sin($latTo) + cos($latFrom) * cos($latTo) * cos($lonDelta);

        $angle = atan2(sqrt($a), $b);
        return $angle * $earthRadius;
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
