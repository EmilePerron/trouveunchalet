<?php

namespace App\Controller\Admin;

use App\Repository\CrawlLogRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
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
}
