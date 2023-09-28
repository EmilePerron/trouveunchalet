<?php

namespace App\Crawler\Driver;

use App\Crawler\AbstractHttpBrowserCrawlerDriver;
use App\Crawler\Model\DetailedListingData;
use App\Crawler\Model\ListingData;
use App\Crawler\Model\Unavailability;
use App\Entity\Listing;
use App\Enum\LogType;
use App\Enum\Site;
use Closure;
use DateTimeImmutable;
use Symfony\Component\DomCrawler\Crawler;

class ChaletsALouer extends AbstractHttpBrowserCrawlerDriver
{
    public function findAllListings(Site $site, Closure $enqueueListing, Closure $writeLog): array
    {
        $listings = [];

        $crawler = $this->client->request("GET", "https://www.chaletsalouer.com/fr/location-de-chalet/?rechercheActive=1");

        while (true) {
            $writeLog(LogType::Debug, "Page loaded. Starting to scan listings...");
            $elements = $crawler->filter("#container-listing .container-listing-chalet:not(.incitatif)");

            $elements->each(function (Crawler $element) use (&$listings, &$enqueueListing) {
                $headingLink = $element->filter("h2 a.nomEtablissement");
                $locationElement = $element->filter(".details .text > p:first-child");
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
            $nextPageLink = $crawler->filter(".pager strong + a");

            if ($nextPageLink->count() === 0) {
                break;
            }

            $nextPageNumber = trim($nextPageLink->text());
            $writeLog(LogType::Debug, "Moving to page {$nextPageNumber}");
            $crawler = $this->client->request('GET', $nextPageLink->link()->getUri());
        }

        return $listings;
    }

    public function getListingDetails(ListingData|Listing $listing, Closure $writeLog): DetailedListingData
    {
        if ($listing instanceof Listing) {
            $listing = ListingData::createFromListing($listing);
        }

        $crawler = $this->client->request('GET', $listing->url);
        $writeLog(LogType::Debug, "Page loaded. Starting to scan for details...");

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
        $crawler->filter("script:not([src])")->each(function (Crawler $script) use (&$bookingInfo) {
            $scriptContent = $script->html();

            if (!str_contains($scriptContent, "var tableauDates = ")) {
                return;
            }

            $jsonStartPos = strpos($scriptContent, "var tableauDates = ") + 19;
            $jsonEndPos = strpos($scriptContent, ']', $jsonStartPos + 1) + 1;
            $bookingInfoJson = substr($scriptContent, $jsonStartPos, $jsonEndPos - $jsonStartPos);
            $bookingInfo = json_decode($bookingInfoJson, true);
        });
        $unavailabilities = [];

        foreach ($bookingInfo as $booking) {
            $unavailabilities[] = new Unavailability(
                date: new DateTimeImmutable($booking['dateEtablissementReservation'] . ' 00:00:00'),
                availableInAm: $booking['typeEtablissementReservation'] == 6,
                availableInPm: $booking['typeEtablissementReservation'] == 5,
            );
        }

        $description = "";
        $crawler->filter("#tab-description p")->each(function (Crawler $paragraph) use (&$description) {
            $description .= $paragraph->text(normalizeWhitespace: true) . "\n\n";
        });
		$specsText = $crawler->filter("#tab-resume")->text(normalizeWhitespace: true);
		$numberOfGuests = preg_replace('/^.*?(\d+)\spersonne.*$/', '$1', $specsText) ?: null;
		$numberOfBedrooms = preg_replace('/^.*?(\d+)\schambre.*$/', '$1', $specsText) ?: null;

        $detailedListing = new DetailedListingData(
            listingData: $listing,
            unavailabilities: $unavailabilities,
            description: $description,
            imageUrl: $crawler->filter('link[rel="image_src"]')->attr('href'),
            // Listings have a link with a specific search filter and the label "Animaux interdits" in listings that don't allow animals
            dogsAllowed: $crawler->filter('a[href*="&animauxPermis=0"]')->count() === 0,
			numberOfGuests: $numberOfGuests,
			numberOfBedrooms: $numberOfBedrooms,
        );

        return $detailedListing;
    }
}
