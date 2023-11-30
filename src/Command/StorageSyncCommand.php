<?php

namespace App\Command;

use App\Repository\ListingRepository;
use App\Util\Storage;
use Doctrine\ORM\EntityManagerInterface;
use League\Flysystem\FilesystemOperator;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:storage:sync',
    description: "Removes unused files from the CDN and makes sure any missing files are uploaded.",
)]
class StorageSyncCommand extends Command
{
    public function __construct(
        private ListingRepository $listingRepository,
        private EntityManagerInterface $entityManager,
		private FilesystemOperator $cdnStorage,
        private Storage $storage,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
		$removedDirectoriesCount = 0;
		$listingImagesUploadedCount = 0;

		$directories = $this->cdnStorage->listContents("/")->toArray();
        $listings = $this->listingRepository->findAll();
		$listingsById = [];

		foreach ($listings as $listing) {
			$listingsById[$listing->getId()->__toString()] = $listing;
		}

		$io->info("Checking for unused directories...");
		$io->createProgressBar();
		$io->progressStart();

		foreach ($directories as &$directory) {
			$listingId = $directory->path();

			if (isset($listingsById[$listingId])) {
				unset($listingsById[$listingId]);
				unset($directory);
			} else {
				// At this point, we know the directory is not used anymore.
				$this->cdnStorage->deleteDirectory($listingId);
				$removedDirectoriesCount++;
			}

			$io->progressAdvance();
		}
		$io->progressFinish();

		// At this point, every remaining listing ID is a listing who's image isn't in the CDN yet.
		$io->info("Uploading missing listing images...");
		$io->createProgressBar(count($listingsById));
		$io->progressStart(count($listingsById));

		foreach ($listingsById as $listing) {
			$this->storage->updatePrimaryImageUrl($listing);
			$listingImagesUploadedCount++;
			$io->progressAdvance();
		}
		$io->progressFinish();

        $io->success("Removed {$removedDirectoriesCount} unused directories from the CDN.");
        $io->success("Uploaded {$listingImagesUploadedCount} missing listing images.");

        return Command::SUCCESS;
    }
}
