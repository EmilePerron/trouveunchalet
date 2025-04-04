<?php

namespace App\Crawler\Driver;

use App\Crawler\AbstractHttpBrowserCrawlerDriver;
use App\Crawler\Exception\ListingNotFoundException;
use App\Crawler\Exception\WaitForRateLimitingException;
use App\Crawler\Model\ListingData;
use App\Crawler\Model\Unavailability;
use App\Entity\Listing;
use App\Enum\Site;
use Closure;
use DateTime;
use DateTimeImmutable;
use Symfony\Component\String\Slugger\AsciiSlugger;
use Symfony\Contracts\HttpClient\HttpClientInterface;

/**
 * Overview of this crawler:
 * - Almost everything is API driven, so we make use of that.
 * - The "find all listings" API endpoint is paginated.
 * - Rate limiting is present, but only for the API endpoints! So not a problem. We're restricted to 240 requests per [unknown time period]. Probably IP based.
 */
class MonsieurChalets extends AbstractHttpBrowserCrawlerDriver
{
	public function __construct(
		private HttpClientInterface $httpClient,
	) {
	}

    public function findAllListings(Site $site, Closure $enqueueListing): array
    {
		$itemsPerPage = 100;
		$slugger = new AsciiSlugger();
        $listings = [];

		// @TODO: handle rate limiting (X-Ratelimit-Limit and X-Ratelimit-Remaining headers)

		$page = 1;
		$lastPage = null;

		do {
			$response = $this->httpClient->request("POST", "https://api.monsieurchalets.com/api/v1/public/search/properties", [
				"body" => [
					[
						"limit" => $itemsPerPage,
						"type" => "search",
						"orderBy" => "distance_low_to_high",
						"internet_type" => "",
						"bounds" => [
							// These coordinates are for the entire province of Quebec.
							"north" => 60.922424,
							"east" => -51.584301,
							"south" => 42.540939,
							"west" => -81.134858
						],
						"center_bounds" => [
							"lat" => 46.428169,
							"lng" => -72.822079
						],
						"photos_limit" => 1,
						"is_published" => 1,
						"is_active" => 1,
						"zoom" => 2,
						"page" => $page,
					]
				]
			]);
			$responseData = $response->toArray();

			foreach ($responseData['items'] as $rawListingData) {
				$id = $rawListingData["id"];
				$listingSlug = $rawListingData['handle'];

				// Build the URL
				// This logic is based on a TS function named `getUniquePropertyUrl` in their frontend codebase.
				$urlParts = [];
				if ($administrativeArea = $rawListingData["addresses"][0]["administrative_area"] ?? null) {
					$urlParts[] = strtolower(trim($slugger->slug($administrativeArea)));
				}
				if ($city = $rawListingData["addresses"][0]["city"] ?? null) {
					$urlParts[] = strtolower(trim($slugger->slug($city)));
				} else if ($mrc = $rawListingData["addresses"][0]["mrc"] ?? null) {
					$urlParts[] = strtolower(trim($slugger->slug($mrc)));
				}
				$urlParts[] = $listingSlug;
				$urlPath = implode('/', array_filter($urlParts));

				$listingData = new ListingData(
					name: $rawListingData["name_fr"] ?? $rawListingData["name_en"] ?? null,
					address: $rawListingData["addresses"][0]["full_address"] ?? null,
					url: "https://www.monsieurchalets.com/chalets-a-louer/{$urlPath}",
					internalId: $id,
					imageUrl: $rawListingData["photos"][0]["image"]["url"] ?? null,
					dogsAllowed: null,
					numberOfBedrooms: $rawListingData["number_of_rooms"],
					numberOfGuests: $rawListingData["maximum_guests"],
					hasWifi: ($rawListingData["guest_reception"]["internet_type"] ?? "No internet connection") !== "No internet connection",
					minimumStayInDays: null,
					minimumPricePerNight: $rawListingData["basic_pricing"]["base_rate"] ?? null,
					maximumPricePerNight: $rawListingData["basic_pricing"]["base_rate"] ?? null,
				);
				$listings[] = $listingData;
				$enqueueListing($listingData);
			}

			$lastPage = ceil($responseData['total'] / $itemsPerPage);
			$page++;
		} while ($page <= $lastPage);

        return $listings;
    }

    public function getListingDetails(ListingData|Listing $listing): ListingData
    {
        if ($listing instanceof Listing) {
            $listing = ListingData::createFromListing($listing);
        }

		$crawler = $this->client->request('GET', $listing->url);
		$pageDataJson = $crawler->filter('script#__NEXT_DATA__')->innerText();
		$pageData = json_decode($pageDataJson, true);
		$propertyData = $pageData['props']['pageProps']['property'] ?? null;

		if ($propertyData === null) {
			throw new ListingNotFoundException();
		}

		$amenities = array_filter($propertyData['amenities']);
		$unavailabilities = $this->fetchAvailabilitiesOnly($listing);

        $detailedListing = new ListingData(
            name: $propertyData["name_fr"] . ' | ' . $propertyData['sub_name_fr'],
			address: $listing->address,
			url: $listing->url,
			internalId: $listing->internalId,
            unavailabilities: $unavailabilities,
            description: $propertyData['description_fr'] ?? null,
            imageUrl: $listing->imageUrl,
			numberOfGuests: $listing->numberOfGuests,
			numberOfBedrooms: $listing->numberOfBedrooms,
			dogsAllowed: in_array("pets_allowed", $propertyData["rules"] ?? []),
			hasWifi: $listing->hasWifi,
			hasFireplace: in_array('indoor_fireplace', $amenities),
			hasWoodStove: in_array('indoor_fireplace', $amenities) && in_array('firewood_included', $amenities),
			minimumStayInDays: $propertyData["rental_parameter"]["min_nights_to_rent"] ?? null,
			minimumPricePerNight: min($propertyData['basic_pricing']['weekend_rate'] ?? PHP_INT_MAX, $listing->minimumPricePerNight),
			maximumPricePerNight: max($propertyData['basic_pricing']['weekend_rate'] ?? 0, $listing->maximumPricePerNight),
			latitude: $propertyData['latitude'],
			longitude: $propertyData['longitude'],
        );

        return $detailedListing;
    }

    public function fetchAvailabilitiesOnly(ListingData &$listing): null|array
	{
		$calendarResponse = $this->httpClient->request('GET', "https://api.monsieurchalets.com/api/v1/public/property/{$listing->internalId}/booking_periods");

		// Retry later if rate limit is about to be reached
		$headers = $calendarResponse->getHeaders();
		if ($headers['x-ratelimit-remaining'] <= 3) {
			throw new WaitForRateLimitingException(3600);
		}

        $unavailabilities = [];
		$today = new DateTime();

        foreach ($calendarResponse->toArray() as $bookingData) {
			$datetime = new DateTimeImmutable($bookingData['start']);
			$startDate = $datetime->format('Y-m-d');
			$endDatetime = new DateTimeImmutable($bookingData['end']);

			// The API returns all bookings, including past bookings. Skip those.
			if ($endDatetime < $today) {
				continue;
			}

			while ($datetime < $endDatetime) {
				$date = $datetime->format('Y-m-d');
				$unavailabilities[] = new Unavailability(
					date: new DateTimeImmutable($date . ' 00:00:00'),
					availableInAm: $date == $startDate,
					availableInPm: false,
				);
				$datetime = $datetime->modify('+ 1 day');
			}

			$unavailabilities[] = new Unavailability(
				date: new DateTimeImmutable($endDatetime->format('Y-m-d') . ' 00:00:00'),
				availableInAm: false,
				availableInPm: true,
			);
        }

		return $unavailabilities;
	}
}
