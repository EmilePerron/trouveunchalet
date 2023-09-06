<?php

namespace App\Command;

use App\Repository\ListingRepository;
use App\Util\Geocoder;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:geocode',
    description: "Finds and saves the coordinates for each listing that doesn't have any.",
)]
class FindMissingListingCoordinatesCommand extends Command
{
    public function __construct(
        private ListingRepository $listingRepository,
        private EntityManagerInterface $entityManager,
        private Geocoder $geocoder,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $listings = $this->listingRepository->findBy(["latitude" => null]);
        $updatedCount = 0;

        foreach ($listings as $listing) {
            $geolocation = $this->geocoder->geocodeListing($listing);

            if (!$geolocation) {
                $io->error("Could not geocode listing {$listing->getId()} - zero results for address {$listing->getAddress()}.");
                continue;
            }

            $listing->setLatitude($geolocation->getCoordinates()->getLatitude());
            $listing->setLongitude($geolocation->getCoordinates()->getLongitude());
            $updatedCount++;

            $this->entityManager->persist($listing);
        }

        $this->entityManager->flush();

        $totalCount = count($listings);
        $io->success("Updated {$updatedCount} out of {$totalCount} listings.");

        return Command::SUCCESS;
    }
}
