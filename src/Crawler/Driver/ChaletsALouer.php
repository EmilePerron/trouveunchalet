<?php

namespace App\Crawler\Driver;

use App\Crawler\AbstractHttpBrowserCrawlerDriver;
use App\Crawler\Model\ListingData;
use App\Crawler\Model\Unavailability;
use App\Entity\Listing;
use App\Enum\Site;
use Closure;
use DateTimeImmutable;
use Exception;
use Symfony\Component\DomCrawler\Crawler;

class ChaletsALouer extends AbstractHttpBrowserCrawlerDriver
{
    public function findAllListings(Site $site, Closure $enqueueListing): array
    {
        $listings = [];

        $crawler = $this->client->request("GET", "https://www.chaletsalouer.com/fr/location-de-chalet/?rechercheActive=1");

        while (true) {
            $elements = $crawler->filter("#result-container-list .item-etablissement:not(.incitatif)");

            $elements->each(function (Crawler $element) use (&$listings, &$enqueueListing) {
                $headingLink = $element->filter("a.title");
                $locationElement = $element->filter(".location > span:first-child");
                $internalIdElement = $element->filter("[data-noetablissement]");

                $internalId = $internalIdElement->attr("data-noetablissement");
                $url = $headingLink->link()->getUri();

                $listingData = new ListingData(
                    name: trim($headingLink->text(normalizeWhitespace: true)),
                    address: trim($locationElement->text(normalizeWhitespace: true)),
                    url: $url,
                    internalId: $internalId,
                );
                $listings[] = $listingData;
                $enqueueListing($listingData);
            });

            // Move on to the next page
            $nextPageLink = $crawler->filter(".pagination .active + a");

            if ($nextPageLink->count() === 0) {
                break;
            }

            $crawler = $this->client->request('GET', $nextPageLink->link()->getUri());
        }

        return $listings;
    }

    public function getListingDetails(ListingData|Listing $listing): ListingData
    {
        if ($listing instanceof Listing) {
            $listing = ListingData::createFromListing($listing);
        }

        $crawler = $this->client->request('GET', $listing->url);

        /**
         * They have a global variable on the details page that holds the data of all bookings.
         * We can just extract that and use it to determine availabilities.
         *
         * Their data contains a booking type code in `typeEtablissementReservation`, which determines if when the listing is unavailable:
         * - `1` = Entire day is booked.
         * - `5` = Only AM is booked.
         * - `6` = Only PM is booked.
         * - `7` = Entire day is booked (via different bookings).
         *
         * @var array<int,array{'dateEtablissementReservation':string,'garderDateEtablissementReservation':int,'noEtablissement':string,'typeEtablissementReservation':int}> $bookingInfo
         */
        $bookingInfo = [];

        /**
         * They have a global variable on the details page that holds rules and infos of the listing.
         * We can just extract that and use it to determine the minimum stay duration.
         *
         * Their data location types, each with a `nbJours` property that defines the minimum stay duration for that type.
		 * The smallest `nbJours` value out of these is the minimum stay duration.
         *
         * @var array{'typesLocations':array{'nbJours':int}} $stayInfo
         */
		$stayInfo = [];
		$minimumStayDuration = null;
		$latitude = null;
		$longitude = null;

        $crawler->filter("script:not([src])")->each(function (Crawler $script) use (&$bookingInfo, &$stayInfo, &$minimumStayDuration, &$latitude, &$longitude) {
            $scriptContent = $script->html();

			if (str_contains($scriptContent, "var lat = ")) {
				$latStartPos = strpos($scriptContent, "var lat = ") + 10;
				$latEndPos = strpos($scriptContent, ';', $latStartPos + 1) + 1;
				$latitude = floatval(substr($scriptContent, $latStartPos, $latEndPos - $latStartPos));
				$lngStartPos = strpos($scriptContent, "var lng = ") + 10;
				$lngEndPos = strpos($scriptContent, ';', $lngStartPos + 1) + 1;
				$longitude = floatval(substr($scriptContent, $lngStartPos, $lngEndPos - $lngStartPos));
			}

			if (str_contains($scriptContent, "var tableauDates = ")) {
				$jsonStartPos = strpos($scriptContent, "var tableauDates = ") + 19;
				$jsonEndPos = strpos($scriptContent, ']', $jsonStartPos + 1) + 1;
				$bookingInfoJson = substr($scriptContent, $jsonStartPos, $jsonEndPos - $jsonStartPos);
				$bookingInfo = json_decode($bookingInfoJson, true);
			}

			if (str_contains($scriptContent, "var donneesSejour = ")) {
				$jsonStartPos = strpos($scriptContent, "var donneesSejour = ") + 20;
				$jsonEndPos = strpos($scriptContent, ';', $jsonStartPos);
				$stayInfoJson = substr($scriptContent, $jsonStartPos, $jsonEndPos - $jsonStartPos);
				$stayInfo = json_decode($stayInfoJson, true);

				foreach ($stayInfo['typesLocations'] ?? [] as $locationType) {
					if ($minimumStayDuration === null || $locationType['nbJours'] < $minimumStayDuration) {
						$minimumStayDuration = intval($locationType['nbJours']);
					}
				}
			}
        });
        $unavailabilities = [];
		$cutoffDate = new DateTimeImmutable("+ 6 months");

        foreach ($bookingInfo as $booking) {
			$date = new DateTimeImmutable($booking['dateEtablissementReservation'] . ' 00:00:00');

			if ($date > $cutoffDate) {
				continue;
			}

            $unavailabilities[] = new Unavailability(
                date: new DateTimeImmutable($booking['dateEtablissementReservation'] . ' 00:00:00'),
                availableInAm: $booking['typeEtablissementReservation'] == 6,
                availableInPm: $booking['typeEtablissementReservation'] == 5,
            );
        }

		$minimumPricePerNight = null;
		$maximumPricePerNight = null;
		$crawler->filter('table.tarifs tr')->each(function (Crawler $row) use (&$minimumPricePerNight, &$maximumPricePerNight) {
			try {
				$label = $row->children()->eq(0)->text();
				$numberOfNights = intval(preg_replace('/^.*?(\d+)\s(nuit|jour).*$/i', '$1', $label));

				// Entries with no number of nights or for monthly rentals are ignored.
				// This app's audience is not looking for long-term rentals.
				if (!$numberOfNights || stripos($label, 'mois') !== false || strtolower($label) == 'saison') {
					return;
				}

				$minimum = round(intval(str_replace(' ', '', $row->children()->eq(1)->text())) / $numberOfNights);
				if ($minimumPricePerNight === null || $minimum < $minimumPricePerNight) {
					$minimumPricePerNight = $minimum;
				}

				if ($row->children()->count() > 2) {
					$maximum = round(intval(str_replace(' ', '', $row->children()->eq(2)->text())) / $numberOfNights);
					if ($maximumPricePerNight === null || $maximum < $maximumPricePerNight) {
						$maximumPricePerNight = $maximum;
					}
				}
			} catch (Exception $exception) {
				$this->logger->error("Error occured while fetching prices: {$exception->getMessage()}", $exception->getTrace());
			}
		});

		$address = $crawler->filter('#etablissement-info .location')->text(normalizeWhitespace: true) ?: $listing->address;
        $description = "";
        $crawler->filter('.anchor[name="resume"] + div > *')->each(function (Crawler $node) use (&$description) {
            $description .= $node->text(normalizeWhitespace: true) . "\n\n";
        });
		$specsNode = $crawler->filter('.anchor[name="caracteristiques"] + div');
		$specsText = $specsNode->count() ? $specsNode->text(normalizeWhitespace: true) : "";
		$numberOfGuests = preg_replace('/^.*?(\d+)\spersonne.*$/', '$1', $specsText) ?: null;
		$numberOfBedrooms = preg_replace('/^.*?(\d+)\schambre.*$/', '$1', $specsText) ?: null;
		$originalUrlButton = $crawler->filter("#lienFicheSiteInternet");
		$imageNode = $crawler->filter('link[rel="image_src"]');

		// If the listing comes from another site and is simply indexed by ChaletALouer,
		// save the link to the original website's listing page.
		if ($originalUrlButton->count()) {
			$listing = new ListingData(
				name: $listing->name,
				address: $address,
				url: $originalUrlButton->attr('href'),
				internalId: $listing->internalId,
			);
		}

        $detailedListing = new ListingData(
            name: $listing->name,
			address: $address,
			url: $listing->url,
			internalId: $listing->internalId,
            unavailabilities: $unavailabilities,
            description: $description,
            imageUrl: $imageNode->count() ? $imageNode->attr('href') : null,
            // Listings have a link with a specific search filter and the label "Animaux interdits" in listings that don't allow animals
            dogsAllowed: $crawler->filter('a[href*="&animauxPermis=0"]')->count() === 0,
            hasWifi: $crawler->filter('#etablissement-content a[href*="/wifi/"]')->count() > 0,
            hasFireplace: $crawler->filter('#etablissement-content a[href*="foyer-interieur"]')->count() > 0,
			hasWoodStove: null, // No way to know for ChaletsALouer listings... :(
			numberOfGuests: $numberOfGuests,
			numberOfBedrooms: $numberOfBedrooms,
			minimumStayInDays: $minimumStayDuration,
			minimumPricePerNight: $minimumPricePerNight,
			maximumPricePerNight: $maximumPricePerNight,
			latitude: $latitude,
			longitude: $longitude,
        );

        return $detailedListing;
    }

    public function fetchAvailabilitiesOnly(ListingData &$listing): null|array
	{
		// ChaletsALouer does not have a specific API endpoint for retrieving availabilities.
        return null;
	}
}
