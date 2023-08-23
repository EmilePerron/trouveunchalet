<?php

namespace App\Crawler;

use Symfony\Component\Panther\Client;
use Symfony\Contracts\Service\Attribute\Required;

abstract class AbstractCrawlerDriver implements CrawlerDriverInterface
{
    protected readonly Client $client;

    #[Required]
    public function createBrowserClient()
    {
        $this->client = Client::createFirefoxClient();
    }
}
