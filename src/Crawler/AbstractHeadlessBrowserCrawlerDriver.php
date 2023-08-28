<?php

namespace App\Crawler;

use Symfony\Component\Panther\Client;
use Symfony\Contracts\Service\Attribute\Required;

abstract class AbstractHeadlessBrowserCrawlerDriver implements CrawlerDriverInterface
{
    protected readonly Client $client;

    #[Required]
    public function createBrowserClient(): void
    {
        $this->client = Client::createFirefoxClient();
    }
}
