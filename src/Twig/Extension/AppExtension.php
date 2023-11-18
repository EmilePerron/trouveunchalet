<?php

namespace App\Twig\Extension;

use App\Twig\Runtime\AppExtensionRuntime;
use App\Util\Excerpt;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class AppExtension extends AbstractExtension
{
    public function getFilters(): array
    {
        return [
            // If your filter generates SAFE HTML, you should add a third
            // parameter: ['is_safe' => ['html']]
            // Reference: https://twig.symfony.com/doc/3.x/advanced.html#automatic-escaping
            new TwigFilter('excerpt', [Excerpt::class, 'excerpt']),
        ];
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('regions', [AppExtensionRuntime::class, 'regions']),
            new TwigFunction('sites', [AppExtensionRuntime::class, 'sites']),
            new TwigFunction('total_number_of_listings', [AppExtensionRuntime::class, 'getTotalNumberOfListings']),
        ];
    }
}
