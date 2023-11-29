<?php

namespace App\Controller\Admin;

use App\Enum\Site;
use App\Message\RequestCrawlingMessage;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

class CrawlingController extends AbstractController
{
    #[Route('/admin/crawling', name: 'admin_crawling_dashboard')]
    public function crawlingDashboard(): Response
    {
        return $this->render('admin/crawling/dashboard.html.twig', [
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
