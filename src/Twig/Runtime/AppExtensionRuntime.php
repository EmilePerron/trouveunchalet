<?php

namespace App\Twig\Runtime;

use App\Config\BrandConfig;
use App\Config\BrandConfigLoader;
use App\Config\CurrentBrandConfig;
use App\Config\RegionConfigLoader;
use Symfony\Component\HttpFoundation\RequestStack;
use Twig\Extension\RuntimeExtensionInterface;

class AppExtensionRuntime implements RuntimeExtensionInterface
{
    private readonly BrandConfig $otherBrand;

    public function __construct(
        private CurrentBrandConfig $currentBrandConfig,
        private RequestStack $requestStack,
        private RegionConfigLoader $regionConfigLoader,
        BrandConfigLoader $brandConfigLoader,
    ) {
        foreach ($brandConfigLoader->getBrands() as $brand) {
            if ($brand->slug != $this->currentBrandConfig->slug) {
                $this->otherBrand = $brand;
            }
        }
    }

    public function brand(): BrandConfig
    {
        return $this->currentBrandConfig;
    }

    public function otherBrand(): BrandConfig
    {
        return $this->otherBrand;
    }

    public function otherBrandUrl(): string
    {
        static $url = null;

        if ($url !== null) {
            return $url;
        }

        $request = $this->requestStack->getMainRequest();
        $domainIndex = array_search($request->getHost(), $this->currentBrandConfig->domains);

        $url = "https://" . $this->otherBrand->domains[$domainIndex];

        return $url;
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
