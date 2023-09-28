<?php

namespace App\Command;

use App\Crawler\CrawlerRunner;
use App\Enum\Site;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
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
		$this->addOption('site', 's', InputOption::VALUE_OPTIONAL, "Request to crawl only the specified site.", null);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        set_time_limit(30);
		$siteOption = $input->getOption("site");

		if (!$siteOption) {
			$this->crawlerRunner->crawlEverything();
		} else {
			$site = Site::tryFrom($siteOption);

			if (!$site) {
				$mostLikelySite = null;
				$mostLikelySimilarityPercentage = 0;

				foreach (Site::cases() as $potentialSite) {
					similar_text($siteOption, $potentialSite->name, $similarityPercentage);

					if ($similarityPercentage > $mostLikelySimilarityPercentage) {
						$mostLikelySite = $potentialSite;
						$mostLikelySimilarityPercentage = $similarityPercentage;
					}
				}

				if ($mostLikelySite) {
					$answer = $io->ask("Did you mean {$mostLikelySite->name} ({$mostLikelySite->value}) ? (y/N)");

					if (strtolower(trim($answer)) == "y") {
						$site = $mostLikelySite;
					}
				}
			}

			if (!$site) {
				$io->error('No matching site found.');
				return Command::FAILURE;
			}

			$this->crawlerRunner->crawlSite($site);
		}

        $io->success('Crawl completed!');

        return Command::SUCCESS;
    }
}
