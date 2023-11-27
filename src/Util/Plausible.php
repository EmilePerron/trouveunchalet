<?php

namespace App\Util;

use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class Plausible
{
	public Request $request;

	public function __construct(
		private readonly HttpClientInterface $httpClient,
		private readonly RequestStack $requestStack,
		#[Autowire(env: 'APP_ENV')]
		private readonly string $environment,
	) {
	}

	public function trackEvent(string $name = 'pageview', array $props = []): void
	{
		dump($this->request->getUri());
		if ($this->environment !== 'prod') {
			return;
		}

		if (!$this->request) {
			$this->request = $this->requestStack->getMainRequest();
		}

		$this->httpClient->request(
			"POST",
			"https://plausible.io/api/event",
			[
				"headers" => [
					"Content-Type" => "application/json",
					"User-Agent" => $this->request->headers->get("user-agent"),
					"X-Forwarded-For" => $this->request->getClientIp(),
				],
				"body" => json_encode([
					"name" => $name,
					"url" => $this->request->getUri(),
					"domain" => "trouvetonchalet.ca",
					"props" => $props,
					"referrer" => $this->request->headers->get('referer')
				], JSON_THROW_ON_ERROR),
			]
		);
	}
}
