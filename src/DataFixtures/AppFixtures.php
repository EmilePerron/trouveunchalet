<?php

namespace App\DataFixtures;

use App\Factory\ListingFactory;
use App\Factory\SiteFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        SiteFactory::createMany(50);
        ListingFactory::createMany(500);

        $manager->flush();
    }
}
