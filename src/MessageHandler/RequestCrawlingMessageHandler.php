<?php

namespace App\MessageHandler;

use App\Crawler\CrawlerRunner;
use App\Enum\Site;
use App\Message\RequestCrawlingMessage;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler("messenger.bus.default")]
final class RequestCrawlingMessageHandler
{
    public function __construct(
        private CrawlerRunner $crawlerRunner,
    ) {
    }

    public function __invoke(RequestCrawlingMessage $message)
    {
        $site = Site::from($message->site);

        if ($message->listingData) {
            $this->crawlerRunner->crawlListing($site, $message->listingData);
            return;
        }

        $this->crawlerRunner->crawlSite($site);
    }
}
