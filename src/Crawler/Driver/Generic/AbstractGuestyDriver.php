<?php

namespace App\Crawler\Driver\Generic;

use App\Crawler\AbstractHttpBrowserCrawlerDriver;
use App\Crawler\Model\ListingData;
use App\Crawler\Model\Unavailability;
use App\Entity\Listing;
use App\Enum\Site;
use Closure;
use DateTime;
use DateTimeImmutable;
use Symfony\Contracts\HttpClient\HttpClientInterface;

abstract class AbstractGuestyDriver extends AbstractHttpBrowserCrawlerDriver
{
	public function __construct(
		private HttpClientInterface $httpClient,
	) {
	}

	/**
	 * Returns the URL to use as the Origin header.
	 *
	 * This corresponds to the main URL of the booking site (e.g. `https://reservation.levertendre.com`).
	 */
	abstract protected function getOriginUrl(): string;

	/**
	 * Returns the base URL to use when building listing page URLs.
	 *
	 * Ex.: `https://reservation.levertendre.com/properties/`, to which the ID can be appended.
	 */
	abstract protected function getListingPageBaseUrl(): string;

    public function findAllListings(Site $site, Closure $enqueueListing): array
    {
        $listings = [];
		$rawResults = [];
		$nextPaginationCursor = null;

		do {
			$url = "https://app.guesty.com/api/pm-websites-backend/listings?limit=100";

			if ($nextPaginationCursor) {
				$url .= "&cursor=" . $nextPaginationCursor;
			}

			$listingRequest = $this->httpClient->request("GET", $url, [
				"headers" => [
					"Origin" => $this->getOriginUrl(),
				],
			]);
			$response = $listingRequest->toArray();
			$nextPaginationCursor = $response['pagination']['cursor']['next'] ?? null;
			$rawResults = array_merge($rawResults, $response['results']);
		} while ($nextPaginationCursor !== null);

		foreach ($rawResults as $rawResult) {
			$listingData = new ListingData(
				name: trim($rawResult['title']),
				address: implode(' ', [
					$rawResult['address']['street'],
					$rawResult['address']['city'],
					$rawResult['address']['state'],
					$rawResult['address']['country']
				]),
				url: $this->getListingPageBaseUrl() . $rawResult['_id'],
				internalId: $rawResult['_id'],
				description: $this->buildFullDescriptionFromRawResult($rawResult),
				imageUrl: $rawResult['picture']['thumbnail'],
				numberOfBedrooms: $rawResult['bedrooms'],
				numberOfGuests: $rawResult['accommodates'],
				dogsAllowed: in_array("Pets allowed", $rawResult['amenities']),
				hasWifi: in_array("Internet", $rawResult['amenities']) || in_array("Wireless Internet", $rawResult['amenities']),
			);
			$listings[] = $listingData;
			$enqueueListing($listingData);
		}

        return $listings;
    }

    public function getListingDetails(ListingData|Listing $listing): ListingData
    {
        if ($listing instanceof Listing) {
            $listing = ListingData::createFromListing($listing);
        }

		$listingRequestUrl = "https://app.guesty.com/api/pm-websites-backend/listings/{$listing->internalId}";
        $listingRequest = $this->httpClient->request('GET', $listingRequestUrl, [
			"headers" => [
				"Origin" => $this->getOriginUrl(),
			],
		]);
		$listingResponse = $listingRequest->toArray();

		$today = date('Y-m-d');
		$toDate = (new DateTime("+ 2 years"))->format('Y-m-d');
		$calendarUrl = "{$listingRequestUrl}/calendar?from={$today}&to={$toDate}";
		$calendarRequest = $this->httpClient->request('GET', $calendarUrl, [
			"headers" => [
				"Origin" => $this->getOriginUrl(),
			],
		]);
		$calendarResponse = $calendarRequest->toArray();

        $unavailabilities = [];
		$previousDayAvailability = null;

        foreach ($calendarResponse as $dateAvailabilityData) {
			if ($dateAvailabilityData['status'] === 'available') {
				continue;
			}

			$unavailability = new Unavailability(
				date: new DateTimeImmutable($dateAvailabilityData['date'] . ' 00:00:00'),
                availableInAm: $dateAvailabilityData['status'] == 'booked' && ($previousDayAvailability['status'] ?? null) === 'available',
                availableInPm: false,
            );
			$unavailabilities[] = $unavailability;
        }

        $detailedListing = new ListingData(
            name: $listing->name,
			address: $listing->address,
			url: $listing->url,
			internalId: $listing->internalId,
            unavailabilities: $unavailabilities,
            description: $this->buildFullDescriptionFromRawResult($listingResponse),
            imageUrl: $listing->imageUrl,
			numberOfGuests: $listing->numberOfGuests,
			numberOfBedrooms: $listing->numberOfBedrooms,
            dogsAllowed: $listing->dogsAllowed,
			hasWifi: $listing->hasWifi,
			minimumStayInDays: $listingResponse['terms']['minNights'] ?? null,
			minimumPricePerNight: $listingResponse['prices']['basePrice'],
			maximumPricePerNight: $listingResponse['prices']['basePrice'],
        );

        return $detailedListing;
    }

	private function buildFullDescriptionFromRawResult(array $rawResult): string
	{
		$description = '';

		foreach (['summary', 'space', 'access', 'transit', 'notes', 'interactionWithGuests', 'neighborhood'] as $descriptionType) {
			if (isset($rawResult['publicDescription'][$descriptionType])) {
				$description .= $rawResult['publicDescription'][$descriptionType] . "\n\n";
			}
		}

		return $description;
	}
}
