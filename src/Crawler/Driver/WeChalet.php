<?php

namespace App\Crawler\Driver;

use App\Crawler\AbstractHttpBrowserCrawlerDriver;
use App\Crawler\Exception\WaitForRateLimitingException;
use App\Crawler\Model\ListingData;
use App\Crawler\Model\Unavailability;
use App\Entity\Listing;
use App\Enum\Site;
use Closure;
use DateTimeImmutable;
use Symfony\Contracts\HttpClient\HttpClientInterface;

/**
 * Overview of this crawler:
 * - Everything is API driven, so we make use of that.
 * - The bulk of the info is already available and filled at the "find all listings" phase.
 * - The "find all listings" API endpoint is paginated.
 * - Rate limiting is... limiting! We're restricted to 300 requests per [unknown time period]. Probably IP based.
 */
class WeChalet extends AbstractHttpBrowserCrawlerDriver
{
	public function __construct(
		private HttpClientInterface $httpClient,
	) {
	}

    public function findAllListings(Site $site, Closure $enqueueListing): array
    {
        $listings = [];

		// @TODO: handle rate limiting (X-Ratelimit-Limit and X-Ratelimit-Remaining headers)

		$page = 1;
		$lastPage = null;

		do {
			$response = $this->httpClient->request("POST", "https://api.wechalet.com/v1/search", [
				"body" => [
					"price_min" => 1,
					"price_max" => 10000,
					"per_page" => 100,
					"page" => $page,
					// These coordinates are for the entire province of Quebec.
					"ne_lat" => 60.922424,
					"ne_lng" => -51.584301,
					"sw_lat" => 42.540939,
					"sw_lng" => -81.134858,
					"nw_lat" => 60.922424,
					"nw_lng" => -81.134858,
					"se_lat" => 42.540939,
					"se_lng" => -51.584301,
				]
			]);
			$responseData = $response->toArray();

			foreach ($responseData['data'] as $rawListingData) {
				$id = $rawListingData["id"];
				$listingData = new ListingData(
					name: $rawListingData["name"] ?? null,
					address: $rawListingData["location"]["address"] ?? (implode(', ', [$rawListingData["location"]["city"], $rawListingData["location"]["state"], $rawListingData["location"]["country"]])),
					url: "https://wechalet.com/fr/proprietes/{$id}",
					internalId: $id,
					imageUrl: $rawListingData["main_picture"],
					dogsAllowed: null,
					numberOfBedrooms: $rawListingData["bedrooms_count"],
					numberOfGuests: $rawListingData["guests_count"],
					hasWifi: null,
					minimumStayInDays: null,
					minimumPricePerNight: $rawListingData["min_price"] ?? $rawListingData["price"],
					maximumPricePerNight: $rawListingData["max_price"] ?? $rawListingData["price"],
				);
				$listings[] = $listingData;
				$enqueueListing($listingData);
			}

			$lastPage = $responseData['meta']['last_page'];
			$page++;
		} while ($page <= $lastPage);

        return $listings;
    }

    public function getListingDetails(ListingData|Listing $listing): ListingData
    {
        if ($listing instanceof Listing) {
            $listing = ListingData::createFromListing($listing);
        }

        $response = $this->httpClient->request('GET', "https://api.wechalet.com/v1/listings/{$listing->internalId}");
		$rawListingData = $response->toArray()["data"];

		// Retry later if rate limit is about to be reached
		$headers = $response->getHeaders();
		if ($headers['x-ratelimit-remaining'] <= 3) {
			throw new WaitForRateLimitingException(3600);
		}

		$unavailabilities = $this->fetchAvailabilitiesOnly($listing);
		$descriptionData = $rawListingData["description"]["fr"]["description"] ? $rawListingData["description"]["fr"] : $rawListingData["description"]["en"];

        $detailedListing = new ListingData(
            name: $descriptionData["title"] ?? $descriptionData["name"] ?? $rawListingData["name"],
			address: $listing->address,
			url: $listing->url,
			internalId: $listing->internalId,
            unavailabilities: $unavailabilities,
            description: $descriptionData["description"] . ($descriptionData["about_this_property"] ?? ""),
            imageUrl: $listing->imageUrl,
			numberOfGuests: $listing->numberOfGuests,
			numberOfBedrooms: $listing->numberOfBedrooms,
			dogsAllowed: in_array("allow-pets", $rawListingData["house_rules"]),
			hasWifi: in_array("wireless-internet", $rawListingData["amenities"]),
			hasFireplace: in_array("indoor-fireplace", $rawListingData["amenities"]),
			hasWoodStove: in_array("indoor-fireplace", $rawListingData["amenities"]) && in_array("firewood-included", $rawListingData["amenities"]),
			minimumStayInDays: $rawListingData["booking_settings"]["min_stay_count"],
			minimumPricePerNight: $listing->minimumPricePerNight,
			maximumPricePerNight: $listing->maximumPricePerNight,
        );

        return $detailedListing;
    }

    public function fetchAvailabilitiesOnly(ListingData &$listing): null|array
	{
		$calendarResponse = $this->httpClient->request("GET", "https://api.wechalet.com/v1/listings/{$listing->internalId}/calendar", [
			"query" => [
				'start_date' => date("Y-m-d"),
			]
		]);

        $unavailabilities = [];

        foreach ($calendarResponse->toArray()["data"] as $monthData) {
			foreach ($monthData as $dayData) {
				if ($dayData["is_available_for_checkin"] && $dayData["is_available_for_checkout"] && $dayData["is_bookable"]) {
					continue;
				}

				$unavailabilities[] = new Unavailability(
					date: new DateTimeImmutable($dayData['date'] . ' 00:00:00'),
					availableInAm: $dayData['is_available_for_checkout'] && $dayData["is_bookable"],
					availableInPm: $dayData['is_available_for_checkin'] && $dayData["is_bookable"],
				);
			}
        }

		return $unavailabilities;
	}
}
