<?php

namespace App\Controller\Admin;

use App\Enum\Site;
use App\Message\RequestCrawlingMessage;
use App\Repository\CrawlLogRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

class CrawlingController extends AbstractController
{
    public function __construct(
        private CrawlLogRepository $crawlLogRepository,
    ) {
    }

    #[Route('/admin/crawling', name: 'admin_crawling_dashboard')]
    public function crawlingDashboard(int $page = 1): Response
    {
        $itemsPerPage = 25;

        $logs = $this->crawlLogRepository->findBy(
            criteria: [],
            orderBy: ['dateStarted' => 'DESC'],
            limit: $itemsPerPage,
            offset: ($page - 1) * $itemsPerPage
        );

        return $this->render('admin/crawling/dashboard.html.twig', [
            'logs' => $logs,
        ]);
    }

    #[Route('/admin/crawling/all-sites-request', name: 'admin_crawling_request_all_sites')]
    public function requestAllSitesCrawl(MessageBusInterface $bus): Response
    {
        foreach (Site::cases() as $site) {
            $bus->dispatch(
                new RequestCrawlingMessage(
                    site: $site->value,
                )
            );
        }

        return new Response(
            "✅ Crawling has been queued. <script>setTimeout(() => { window.location.href='/admin/crawling'; }, 1000);</script>"
        );
    }

    #[Route('/admin/crawling/site-request', name: 'admin_crawling_request_site')]
    public function requestFullSiteCrawl(MessageBusInterface $bus, string $site): Response
    {
        $bus->dispatch(
            new RequestCrawlingMessage(
                site: $site,
            )
        );

        return new Response(
            "✅ Crawling has been queued. <script>setTimeout(() => { window.location.href='/admin/crawling'; }, 1000);</script>"
        );
    }
}
