<?php

namespace App\DataFixtures;

use App\Factory\CrawlLogFactory;
use App\Factory\ListingFactory;
use App\Factory\UnavailabilityFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        ListingFactory::createMany(500);
        UnavailabilityFactory::createMany(1000);
        CrawlLogFactory::createMany(500);

        $manager->flush();
    }
}
