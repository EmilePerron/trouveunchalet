<?php

namespace App\Crawler;

use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Panther\Client;
use Symfony\Contracts\Service\Attribute\Required;

abstract class AbstractHeadlessBrowserCrawlerDriver implements CrawlerDriverInterface
{
    protected readonly Client $client;
	protected readonly LoggerInterface $logger;

    #[Required]
    public function createBrowserClient(
		#[Autowire(env: 'CRAWLER_USER_AGENT')]
		string $userAgent,
	): void
    {
        $this->client = Client::createFirefoxClient(null, [
			"--user-agent={$userAgent}"
		]);
    }

    #[Required]
    public function setDependencies(LoggerInterface $logger): void
    {
        $this->logger = $logger;
    }
}
