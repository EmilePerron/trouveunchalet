<?php

namespace App\Crawler\Driver;

use App\Crawler\AbstractCrawlerDriver;
use App\Crawler\Model\DetailedListingData;
use App\Crawler\Model\ListingData;
use App\Crawler\Model\Unavailability;
use App\Entity\Listing;
use App\Enum\LogType;
use App\Enum\Site;
use Closure;
use DateTimeImmutable;
use Facebook\WebDriver\Exception\NoSuchElementException;
use Facebook\WebDriver\WebDriverBy;

class ChaletsALouer extends AbstractCrawlerDriver
{
    public function findAllListings(Site $site, Closure $writeLog): array
    {
        $listings = [];

        $this->client->request("GET", "https://www.chaletsalouer.com/fr/location-de-chalet/?rechercheActive=1");

        while (true) {
            $writeLog(LogType::Debug, "Page loaded. Starting to scan listings...");

            $this->client->waitForVisibility("#container-listing .container-listing-chalet");
            $elements = $this->client->findElements(WebDriverBy::cssSelector("#container-listing .container-listing-chalet:not(.incitatif)"));

            foreach ($elements as $element) {
                $headingLink = $element->findElement(WebDriverBy::cssSelector("h2 a.nomEtablissement"));
                $locationElement = $element->findElement(WebDriverBy::cssSelector(".details .text > p:first-child"));
                $internalIdElement = $element->findElement(WebDriverBy::cssSelector("[data-noetablissement]"));
                $internalId = $internalIdElement->getAttribute("data-noetablissement");

                $url = $headingLink->getAttribute("href");

                if (str_starts_with($url, "/")) {
                    $url = "https://www.chaletsalouer.com" . $url;
                }

                $listings[] = new ListingData(
                    name: trim($headingLink->getText()),
                    address: trim($locationElement->getText()),
                    url: $url,
                    internalId: $internalId,
                );
            }

            try {
                break;
                $nextPageLink = $this->client->findElement(WebDriverBy::cssSelector(".pager strong + a"));
                $nextPageNumber = trim($nextPageLink->getText());
                $currentPagerNumber = $nextPageNumber - 1;

                $writeLog(LogType::Debug, "Moving to page {$nextPageNumber}");

                $nextPageLink->click();

                // Wait until page has changed
                $this->client->waitFor(".pager a[href*='page={$currentPagerNumber}'] + strong");
            } catch (NoSuchElementException) {
                // Ran out of pagination links - this means we're on the last page!
                break;
            }
        }

        return $listings;
    }

    public function getListingDetails(ListingData|Listing $listing, Closure $writeLog): DetailedListingData
    {
        if ($listing instanceof Listing) {
            $listing = ListingData::createFromListing($listing);
        }

        $this->client->request('GET', $listing->url);
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
        $bookingInfo = $this->client->executeScript("return tableauDates;");
        $unavailabilities = [];

        foreach ($bookingInfo as $booking) {
            $unavailabilities[] = new Unavailability(
                date: new DateTimeImmutable($booking['dateEtablissementReservation'] . ' 00:00:00'),
                availableInAm: $booking['typeEtablissementReservation'] == 6,
                availableInPm: $booking['typeEtablissementReservation'] == 5,
            );
        }

        $detailedListing = new DetailedListingData(
            listingData: $listing,
            unavailabilities: $unavailabilities,
            description: $this->client->executeScript('return [...document.querySelectorAll("#tab-description p")].map(el => el.textContent).join("\n\n");'),
            imageUrl: $this->client->executeScript('return document.querySelector(".slick-slide.slick-active.slick-current").style.backgroundImage.slice(4, -1).replace(/"/g, "");'),
            // Listings have a link with a specific search filter and the label "Animaux interdits" in listings that don't allow animals
            dogsAllowed: $this->client->executeScript('return !document.querySelector(`a[href*="&animauxPermis=0"]`)'),
        );

        return $detailedListing;
    }
}
