<?php

namespace App\Controller;

use App\Enum\Site;
use App\Message\RequestCrawlingMessage;
use App\Message\RequestStorageSync;
use App\Message\RequestStorageSyncMessage;
use App\Util\Warmup;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

class CronController extends AbstractController
{
	public function __construct(
		private readonly RequestStack $requestStack,
	) {
	}

    #[Route('/cron/request-crawling', name: 'cron_request_crawling')]
    public function requestAllSitesCrawl(MessageBusInterface $bus): Response
    {
		$this->checkAuthentication();

        foreach (Site::cases() as $site) {
            $bus->dispatch(
                new RequestCrawlingMessage(
                    site: $site->value,
                )
            );
        }

        return new Response("✅ Crawling has been queued.");
    }

    #[Route('/cron/request-storage-sync', name: 'cron_request_storage_sync')]
    public function requestStorageSync(MessageBusInterface $bus): Response
    {
		$this->checkAuthentication();

		$bus->dispatch(new RequestStorageSyncMessage());

        return new Response("✅ Storage sync has been queued.");
    }

    #[Route('/cron/warmup-search-cache', name: 'cron_warmup_search_cache')]
    public function warmupSearchCache(Warmup $warmup): Response
    {
		$this->checkAuthentication();

		$warmup->warmupRegionSearches();

        return new Response("✅ Warmed up all common region-based searches.");
    }

	/**
	 * @TODO: make this less hardcoded and more Symfony-friendly.
	 */
	private function checkAuthentication(): void
	{
		$token = $this->requestStack->getMainRequest()->headers->get('authorization');

		if ($token !== "Bearer 2AB1AfYfSGuFcsAaZPeKmSZFxjd3suhH75elZ9jE3MmxCEqe7m") {
			throw new NotFoundHttpException();
		}
	}
}
