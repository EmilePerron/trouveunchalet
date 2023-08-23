<?php

namespace App\Command;

use App\Crawler\CrawlerRunner;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:crawl',
    description: 'Add a short description for your command',
)]
class CrawlCommand extends Command
{
    public function __construct(
        private CrawlerRunner $crawlerRunner,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        set_time_limit(30);
        $this->crawlerRunner->crawlEverything();

        $io->success('Crawl completed!');

        return Command::SUCCESS;
    }
}
