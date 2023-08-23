<?php

namespace App\DataFixtures;

use App\Factory\ListingFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        ListingFactory::createMany(500);

        $manager->flush();
    }
}
