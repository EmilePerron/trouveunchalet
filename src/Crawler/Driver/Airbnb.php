<?php

namespace App\Crawler\Driver;

use App\Crawler\AbstractHttpBrowserCrawlerDriver;
use App\Crawler\Model\ListingData;
use App\Crawler\Model\Unavailability;
use App\Entity\Listing;
use App\Enum\Site;
use Closure;
use DateTime;
use DateTimeImmutable;
use Symfony\Contracts\HttpClient\HttpClientInterface;

/**
 * Overview of this crawler:
 * - Everything is API driven, so we make use of that.
 * - The bulk of the info is already available and filled at the "find all listings" phase.
 * - The "find all listings" API endpoint is paginated.
 * - Rate limiting is... limiting! We're restricted to 300 requests per [unknown time period]. Probably IP based.
 */
class Airbnb extends AbstractHttpBrowserCrawlerDriver
{
	/**
	 * This is the maximum number of items per page.
	 * Limited to 40 by Airbnb's internal API.
	 */
	private const ITEMS_PER_PAGE = 40;

	/**
	 * This is a public API key that is shared across all Airbnb users.
	 * Easily found in the network tab when browsing Airbnb.
	 */
	private const X_AIRBNB_API_KEY = "d306zoyjsyarp7ifhu67rjxn52tv0t20";

	public function __construct(
		private HttpClientInterface $httpClient,
	) {
	}

    public function findAllListings(Site $site, Closure $enqueueListing): array
    {
        $listings = [];
		$scannedInternalIds = [];
		$page = 1;

		do {
			$offset = ($page - 1) * self::ITEMS_PER_PAGE;
			$paginationCursor = base64_encode('{"section_offset":1,"items_offset":' . $offset . ',"version":1}');

			$response = $this->httpClient->request("POST", "https://www.airbnb.ca/api/v3/StaysSearch", [
				"headers" => [
					"accept-language" => "fr-CA,fr,en;q=0.9",
					"content-type" => "application/json",
					"x-airbnb-api-key" => self::X_AIRBNB_API_KEY,
				],
				"query" => [
					"operationName" => "StaysSearch",
					"locale" => "fr-CA",
					"currency" => "CAD",
				],
				"json" => [
					"operationName" => "StaysSearch",
					"variables" => [
						"staysSearchRequest" => [
							"requestedPageType" => "STAYS_SEARCH",
							"cursor" => $paginationCursor,
							"metadataOnly" => false,
							"searchType" => "autocomplete_click",
							"source" => "structured_search_input_header",
							"treatmentFlags" => [
								"feed_map_decouple_m11_treatment",
								"stays_search_rehydration_treatment_desktop",
								"stays_search_rehydration_treatment_moweb"
							],
							"rawParams" => [
								[
									"filterName" => "categoryTag",
									"filterValues" => [
										"Tag:5348"
										/**
										 * Categories tags of interest include:
										 * - Cabins: Tag:5348
										 * - Yurt: Tag:8192
										 * - Containers: Tag:8157
										 * - Tree Houses: Tag:8188
										 * - Off the grid: Tag:8226
										 * - A Frames: Tag:8148
										 * - Tiny homes: Tag:8186
										 * - Domes: Tag:8173
										 * - Ski in & out: Tag:5366
										 */
									]
								],
								[
									"filterName" => "cdnCacheSafe",
									"filterValues" => [
										"false"
									]
								],
								[
									"filterName" => "channel",
									"filterValues" => [
										"EXPLORE"
									]
								],
								[
									"filterName" => "datePickerType",
									"filterValues" => [
										"calendar"
									]
								],
								[
									"filterName" => "federatedSearchSessionId",
									"filterValues" => [
										"40e961fa-fae3-40c8-843c-52d012d9e5ca"
									]
								],
								[
									"filterName" => "flexibleTripLengths",
									"filterValues" => [
										"one_week"
									]
								],
								[
									"filterName" => "itemsPerGrid",
									"filterValues" => [
										(string) self::ITEMS_PER_PAGE
									]
								],
								[
									"filterName" => "locationSearch",
									"filterValues" => [
										"MIN_MAP_BOUNDS"
									]
								],
								[
									"filterName" => "monthlyLength",
									"filterValues" => [
										"3"
									]
								],
								[
									"filterName" => "monthlyStartDate",
									"filterValues" => [
										(new DateTime("first day of next month"))->format("Y-m-d")
									]
								],
								[
									"filterName" => "placeId",
									"filterValues" => [
										"ChIJoajRnzS1WEwRIABNrq0MBAE"
									]
								],
								[
									"filterName" => "priceFilterInputType",
									"filterValues" => [
										"0"
									]
								],
								[
									"filterName" => "priceFilterNumNights",
									"filterValues" => [
										"1"
									]
								],
								[
									"filterName" => "query",
									"filterValues" => [
										"Quebec, Canada"
									]
								],
								[
									"filterName" => "refinementPaths",
									"filterValues" => [
										"/homes"
									]
								],
								[
									"filterName" => "roomTypes",
									"filterValues" => [
										"Entire home/apt"
									]
								],
								[
									"filterName" => "screenSize",
									"filterValues" => [
										"large"
									]
								],
								[
									"filterName" => "searchMode",
									"filterValues" => [
										"flex_destinations_search"
									]
								],
								[
									"filterName" => "tabId",
									"filterValues" => [
										"home_tab"
									]
								],
								[
									"filterName" => "version",
									"filterValues" => [
										"1.8.3"
									]
								],
								[
									"filterName" => "zoomLevel",
									"filterValues" => [
										"3"
									]
								]
							]
						],
						"includeMapResults" => false,
						"isLeanTreatment" => false
					],
					"extensions" => [
						"persistedQuery" => [
							"version" => 1,
							"sha256Hash" => "12f85e7ed508489d89d87d4db2896039ce21ba12ddb53f4b519a25032f5eeef2"
						]
					]
				]
			]);
			$responseData = $response->toArray();
			$rawListings = $responseData['data']['presentation']['staysSearch']['results']['searchResults'];

			// No more listings to fetch - stop the crawling :)
			if (!$rawListings) {
				break;
			}

			$processedCountFromBatch = 0;

			foreach ($rawListings ?? [] as $rawListingData) {
				$id = $rawListingData['listing']['id'];

				// If we encounter a listing we've already seen, it usually means we're at the end of the list.
				if (isset($scannedInternalIds[$id])) {
					continue;
				}

				$listingData = new ListingData(
					name: $rawListingData['listing']["title"],
					address: $rawListingData['listing']['localizedCityName'] . ', QC, Canada',
					latitude: $rawListingData['listing']['coordinate']['latitude'] ?? null,
					longitude: $rawListingData['listing']['coordinate']['longitude'] ?? null,
					url: "https://fr.airbnb.ca/rooms/{$id}",
					internalId: $id,
					description: $rawListingData['listing']["name"] ?? "",
					imageUrl: $rawListingData['listing']['contextualPictures'][0]['picture'] ?? null,
					minimumPricePerNight: $rawListingData["pricingQuote"]["rate"]["amount"] ?? null,
					maximumPricePerNight: $rawListingData["pricingQuote"]["rate"]["amount"] ?? null,
				);
				$listings[] = $listingData;
				$scannedInternalIds[$id] = true;
				$enqueueListing($listingData);
				$processedCountFromBatch++;
			}

			if ($processedCountFromBatch <= 1) {
				break;
			}

			$page++;
		} while ($page <= 500);

        return $listings;
    }

    public function getListingDetails(ListingData|Listing $listing): ListingData
    {
        if ($listing instanceof Listing) {
            $listing = ListingData::createFromListing($listing);
        }

		$payload = [
			"id" => base64_encode("StayListing:{$listing->internalId}"),
			"pdpSectionsRequest" => [
				"adults" => "1",
				"bypassTargetings" => true,
				"categoryTag" => "Tag:8144",
				"causeId" => null,
				"children" => "0",
				"disasterId" => null,
				"discountedGuestFeeVersion" => null,
				"displayExtensions" => null,
				"federatedSearchId" => "174f90fd-7255-45c9-8c3e-5db7b52bbb7f",
				"forceBoostPriorityMessageType" => null,
				"infants" => "0",
				"interactionType" => null,
				"layouts" => [
					"SIDEBAR",
					"SINGLE_COLUMN"
				],
				"pets" => 0,
				"pdpTypeOverride" => null,
				"photoId" => "1192022208",
				"preview" => false,
				"previousStateCheckIn" => null,
				"previousStateCheckOut" => null,
				"priceDropSource" => null,
				"privateBooking" => false,
				"promotionUuid" => null,
				"relaxedAmenityIds" => null,
				"searchId" => null,
				"selectedCancellationPolicyId" => null,
				"selectedRatePlanId" => null,
				"splitStays" => null,
				"staysBookingMigrationEnabled" => false,
				"translateUgc" => null,
				"useNewSectionWrapperApi" => false,
				"sectionIds" => null,
				// "checkIn" => "2023-12-01",
				// "checkOut" => "2023-12-06",
				"p3ImpressionId" => "p3_1700843269_xJ7OBd3ebejIot+M"
			]
		];
        $response = $this->httpClient->request('GET', "https://fr.airbnb.ca/api/v3/StaysPdpSections", [
			"headers" => [
				"accept-language" => "fr-CA,fr,en;q=0.9",
				"content-type" => "application/json",
				"x-airbnb-api-key" => self::X_AIRBNB_API_KEY,
			],
			'query' => [
				'operationName' => 'StaysPdpSections',
				'locale' => 'fr-CA',
				'currency' => 'CAD',
				'variables' => json_encode($payload),
				'extensions' => '{"persistedQuery":{"version":1,"sha256Hash":"8a625c38b4b67aee2b4ad6215fc3da8953283c909ae732f8e4fd6d0fa12eaf95"}}',
			],
		]);

		$rawSectionsData = $response->toArray()["data"]["presentation"]["stayProductDetailPage"]["sections"]["sections"];
		$sectionsData = [];

		foreach ($rawSectionsData as $section) {
			$sectionsData[$section['pluginPointId']] = $section;
		}

		$amenities = [];
		foreach ($sectionsData['AMENITIES_DEFAULT']['section']['seeAllAmenitiesGroups'] as $amenitiesGroup) {
			foreach ($amenitiesGroup['amenities'] as $amenity) {
				$amenities[$amenity['icon']] = $amenity['title'];
			}
		}

		$policies = [];
		foreach ($sectionsData['POLICIES_DEFAULT']['section']['houseRulesSections'] as $houseRulesSection) {
			foreach ($houseRulesSection['items'] as $policy) {
				$policies[$policy['icon']] = $policy['title'];
			}
		}

        $calendarResponse = $this->httpClient->request('GET', "https://fr.airbnb.ca/api/v3/PdpAvailabilityCalendar", [
			"headers" => [
				"accept-language" => "fr-CA,fr,en;q=0.9",
				"content-type" => "application/json",
				"x-airbnb-api-key" => self::X_AIRBNB_API_KEY,
			],
			'query' => [
				'operationName' => 'PdpAvailabilityCalendar',
				'locale' => 'fr-CA',
				'currency' => 'CAD',
				'variables' => json_encode([
					"request" => [
						"count" => 12,
						"listingId" => "{$listing->internalId}",
						"month" => date('m'),
						"year" => date('Y')
					]
				]),
				'extensions' => '{"persistedQuery":{"version":1,"sha256Hash":"8f08e03c7bd16fcad3c92a3592c19a8b559a0d0855a84028d1163d4733ed9ade"}}'
			]
		]);

		$minimumNightsValues = [];
		$unavailabilities = [];

		foreach ($calendarResponse->toArray()["data"]["merlin"]["pdpAvailabilityCalendar"]["calendarMonths"] as $monthData) {
			foreach ($monthData['days'] as $dayData) {
				$minimumNightsValues[] = $dayData['minNights'];

				if ($dayData["availableForCheckin"] && $dayData["availableForCheckout"]) {
					continue;
				}

				$unavailabilities[] = new Unavailability(
					date: new DateTimeImmutable($dayData['calendarDate'] . ' 00:00:00'),
					availableInAm: $dayData['availableForCheckout'],
					availableInPm: $dayData['availableForCheckin'],
				);
			}
        }

        $detailedListing = new ListingData(
            name: $listing->name,
			address: $listing->address,
			url: $listing->url,
			internalId: $listing->internalId,
            unavailabilities: $unavailabilities,
            description: $sectionsData['DESCRIPTION_DEFAULT']['section']['htmlDescription']['htmlText'] ?? $listing->description,
            imageUrl: $listing->imageUrl,
			numberOfGuests: $sectionsData['BOOK_IT_SIDEBAR']['section']['maxGuestCapacity'] ?? null,
			numberOfBedrooms: count($sectionsData['SLEEPING_ARRANGEMENT_DEFAULT']['section']['arrangementDetails'] ?? [1]),
			dogsAllowed: !isset($policies['SYSTEM_NO_PETS']),
			hasWifi: isset($amenities['SYSTEM_WI_FI']),
			minimumStayInDays: min($minimumNightsValues),
			minimumPricePerNight: $listing->minimumPricePerNight,
			maximumPricePerNight: $listing->maximumPricePerNight,
			latitude: $listing->latitude,
			longitude: $listing->longitude,
        );

        return $detailedListing;
    }
}
