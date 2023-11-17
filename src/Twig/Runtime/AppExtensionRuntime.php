<?php

namespace App\Twig\Runtime;

use App\Config\RegionConfigLoader;
use Twig\Extension\RuntimeExtensionInterface;

class AppExtensionRuntime implements RuntimeExtensionInterface
{
    public function __construct(
        private RegionConfigLoader $regionConfigLoader,
    ) {
    }

    public function regions(bool $randomize = false): array
    {
        static $regions = null;

        if ($regions === null) {
            $regions = $this->regionConfigLoader->getRegions();
        }

        if ($randomize) {
            $randomizedRegions = $regions;
            shuffle($randomizedRegions);
            return $randomizedRegions;
        }

        return $regions;
    }
}
