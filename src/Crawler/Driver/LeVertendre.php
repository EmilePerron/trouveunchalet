<?php

namespace App\Crawler\Driver;

use App\Crawler\AbstractHttpBrowserCrawlerDriver;
use App\Crawler\Model\ListingData;
use App\Crawler\Model\Unavailability;
use App\Entity\Listing;
use App\Enum\LogType;
use App\Enum\Site;
use Closure;
use DateTime;
use DateTimeImmutable;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class LeVertendre extends AbstractHttpBrowserCrawlerDriver
{
	public function __construct(
		private HttpClientInterface $httpClient,
	) {
	}

    public function findAllListings(Site $site, Closure $enqueueListing, Closure $writeLog): array
    {
        $listings = [];

		$listingsResponse = $this->httpClient->request("POST", "https://levertendre.com/wp-admin/admin-ajax.php", [
			"body" => [
				'action' => 'standish_tourisme_search_liste',
				'filters[exclude_product_cat]' => 'cartes-cadeau',
				'wpml_lang' => 'fr',
			]
		]);
		dump($listingsResponse);die();
		$listingHtml = $listingsResponse->toArray()["content"];
		$crawler = new Crawler($listingHtml);

		$writeLog(LogType::Debug, "Page loaded. Starting to scan listings...");

		$elements = $crawler->filter(".standish_tourisme_products_container .standish_tourisme_product_container");
		$elements->each(function (Crawler $element) use (&$listings, &$enqueueListing) {
			$headingLink = $element->filter("h3 a");
			$url = $headingLink->link()->getUri();

			$listingData = new ListingData(
				name: trim($headingLink->text(normalizeWhitespace: true)),
				// LeVertendre is all in a single location, so all zooboxes are rougly at the same site.
				address: "122, Chemin Gilbert, Eastman, QC",
				url: $url,
				internalId: preg_replace('~^https:\/\/.+\/location\/(.+)\/.*$~', '$1', $url),
			);
			$listings[] = $listingData;
			$enqueueListing($listingData);
		});

        return $listings;
    }

    public function getListingDetails(ListingData|Listing $listing, Closure $writeLog): ListingData
    {
        if ($listing instanceof Listing) {
            $listing = ListingData::createFromListing($listing);
        }

        $crawler = $this->client->request('GET', $listing->url);
        $writeLog(LogType::Debug, "Page loaded. Starting to scan for details...");

        /**
         * They have a public ajax endpoint that provides the bookings for a location.
         * We can just hit that endpoint to determine availabilities.
         *
         * This data contains:
		 * - the date (`start` property)
		 * - the type of unavailability (`extendedProps.final_status` property)
		 * 		- "arrival" = only AM is booked.
		 * 		- "departure" = only PM is booked.
		 * 		- "occupied" = entire day is booked.
         *
         * @var array<int,array{'start':string,'extendedProps':array{'final_status':string}}> $bookingInfo
         */

		$productWrapperCode = $crawler->filter(".single-product-reservation-column-wrapper")->html();
		$productWrapperCode = substr($productWrapperCode, strpos($productWrapperCode, "product_framework_id:"), 100);
		$productWrapperCode = str_replace("\n", "", $productWrapperCode);
		$unavailabilityProductId = preg_replace('/^.*product_framework_id:.*?"(.+?)".*$/', '$1', $productWrapperCode);

		$bookingInfo = [];
		$unavailabilitiesResponse = $this->httpClient->request("POST", "https://levertendre.com/wp-admin/admin-ajax.php", [
			"body" => [
				'action' => 'standish_tourisme_get_product_reservations',
				'product_framework_id' => $unavailabilityProductId
			]
		]);
		$writeLog(LogType::Debug, "Requesting availabilities for {$unavailabilityProductId}...");
		$bookingInfo = $unavailabilitiesResponse->toArray()["content"]["year_reservations"];
        $unavailabilities = [];
		/** @var array<string,Unavailability> */
        $unavailabilitiesByDate = [];

        foreach ($bookingInfo as $booking) {
			$unavailability = new Unavailability(
				date: new DateTimeImmutable($booking['start'] . ' 00:00:00'),
                availableInAm: $booking['extendedProps']['final_status'] == "arrival",
                availableInPm: $booking['extendedProps']['final_status'] == "departure",
            );
			$unavailabilities[] = $unavailability;
			$unavailabilitiesByDate[$unavailability->date->format(('Y-m-d'))] = $unavailability;
        }

		// Price fetching
		// Price info isn't available statically on the page, so we need to make API calls to simulate checking for availabilities.
		// So we find the next available weekday & weekend nights...
		// and then make the API calls that their frontend would do to get the price.
		$priceCheckDate = new DateTimeImmutable("+1 day");
		$weekdayPricePerNight = null;
		$weekendPricePerNight = null;
		do {
			$date = $priceCheckDate->format("Y-m-d");
			$nextDayDate = $priceCheckDate->modify("+1 day")->format("Y-m-d");
			$isWeekend = $priceCheckDate->format("w") >= 5;
			$isAvailable = (!isset($unavailabilitiesByDate[$date]) || $unavailabilitiesByDate[$date]->availableInPm) &&
				(!isset($unavailabilitiesByDate[$nextDayDate]) || $unavailabilitiesByDate[$nextDayDate]->availableInAm);

			if ($isAvailable) {
				if ($isWeekend && !$weekendPricePerNight) {
					$writeLog(LogType::Debug, "Making price-check API calls for {$unavailabilityProductId} for {$date} to {$nextDayDate}...");
					$weekendPricePerNight = $this->getPriceForNight($unavailabilityProductId, $date, $nextDayDate);
					$writeLog(LogType::Debug, "Found weekend price: {$weekendPricePerNight} / night");
				} else if (!$isWeekend && !$weekdayPricePerNight) {
					$writeLog(LogType::Debug, "Making price-check API calls for {$unavailabilityProductId} for {$date} to {$nextDayDate}...");
					$weekdayPricePerNight = $this->getPriceForNight($unavailabilityProductId, $date, $nextDayDate);
					$writeLog(LogType::Debug, "Found weekday price: {$weekdayPricePerNight} / night");
				}
			}

			$priceCheckDate = $priceCheckDate->modify("+1 day");
		} while ($weekdayPricePerNight === null || $weekendPricePerNight === null);

        $description = "";
        $crawler->filter('[data-widget_type="woocommerce-product-content.default"] .elementor-text-editor > *')
			->slice(1)
			->each(function (Crawler $paragraph) use (&$description) {
            	$description .= $paragraph->text(normalizeWhitespace: true) . "\n\n";
        	});
		$specsText = $crawler->filter("#standish_single_product_specs_tags")->text(normalizeWhitespace: true);

        $detailedListing = new ListingData(
            name: $listing->name,
			address: $listing->address,
			url: $listing->url,
			internalId: $listing->internalId,
            unavailabilities: $unavailabilities,
            description: $description,
            imageUrl: $crawler->filter('.jet-woo-product-gallery__image-link > img')->attr('src'),
			numberOfGuests: preg_replace('/^.*?(\d+)\sPersonne.*$/', '$1', $specsText) ?: null,
			numberOfBedrooms: preg_replace('/^.*?(\d+)\sLits.*$/', '$1', $specsText) ?: null,
            dogsAllowed: !str_contains(strtolower($specsText), "chiens non"),
			hasWifi: str_contains(strtolower($specsText), "wifi"),
			minimumStayInDays: 2, // All LeVertendre cottages have a minimum stay duration of 2 days
			minimumPricePerNight: min($weekdayPricePerNight, $weekendPricePerNight),
			maximumPricePerNight: max($weekdayPricePerNight, $weekendPricePerNight),
        );

        return $detailedListing;
    }

	private function getPriceForNight(string $productId, string $startDate, string $endDate): float
	{
		$priceCheckResponse = $this->httpClient->request("GET", "https://vertendre.checkfront.com/api/3.0/item/", [
			'query' => [
				'item_id' => $productId,
				'start_date' => $startDate,
				'end_date' => $endDate,
				'packages' => false,
			]
		])->toArray();
		$items = $priceCheckResponse['items'];

		return floatval(current($items)['rate']['sub_total']);
	}
}
