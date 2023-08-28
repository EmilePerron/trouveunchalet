<?php

namespace App\Crawler;

use Symfony\Component\BrowserKit\AbstractBrowser;
use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Contracts\Service\Attribute\Required;

abstract class AbstractHttpBrowserCrawlerDriver implements CrawlerDriverInterface
{
    protected readonly AbstractBrowser $client;

    #[Required]
    public function createBrowserClient(): void
    {
        $this->client = new HttpBrowser();
    }
}
