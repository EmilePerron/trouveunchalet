<?php

namespace App\Config;

use RuntimeException;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * The brand configuration for the current request.
 */
class CurrentBrandConfig extends BrandConfig
{
    public function __construct(
        BrandConfigLoader $brandConfigLoader,
        RequestStack $requestStack,
    ) {
        $request = $requestStack->getCurrentRequest();
        $currentBrand = null;

        foreach ($brandConfigLoader->getBrands() as $brand) {
            if (in_array($request->getHost(), $brand->domains)) {
                $currentBrand = $brand;
            }
        }

        if (!$currentBrand) {
            throw new RuntimeException("Could not determine the current brand.");
        }

        parent::__construct(
            slug: $currentBrand->slug,
            domains: $currentBrand->domains,
            icon: $currentBrand->icon,
        );
    }
}
