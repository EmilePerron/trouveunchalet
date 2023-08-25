<?php

namespace App\Crawler;

use App\Enum\Site;
use Symfony\Component\Messenger\MessageBusInterface;

class CrawlerRequester
{
    public function __construct(
        private MessageBusInterface $bus,
    ) {
    }

    public function crawlEverything(): void
    {
        foreach (Site::cases() as $site) {
            $this->crawlSite($site);
        }
    }

    public function crawlSite(Site $site): void
    {
    }
}
