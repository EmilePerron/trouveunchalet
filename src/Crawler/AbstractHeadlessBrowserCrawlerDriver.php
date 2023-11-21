<?php

namespace App\Crawler;

use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Panther\Client;
use Symfony\Contracts\Service\Attribute\Required;

abstract class AbstractHeadlessBrowserCrawlerDriver implements CrawlerDriverInterface
{
    protected readonly Client $client;

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
}
