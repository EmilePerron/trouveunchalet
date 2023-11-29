<?php

namespace App\Crawler;

use Psr\Log\LoggerInterface;
use Symfony\Component\BrowserKit\AbstractBrowser;
use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Contracts\Service\Attribute\Required;

abstract class AbstractHttpBrowserCrawlerDriver implements CrawlerDriverInterface
{
    protected readonly AbstractBrowser $client;
	protected readonly LoggerInterface $logger;

    #[Required]
    public function createBrowserClient(): void
    {
        $this->client = new HttpBrowser();
    }

    #[Required]
    public function setDependencies(LoggerInterface $logger): void
    {
        $this->logger = $logger;
    }
}
