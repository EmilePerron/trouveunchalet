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
            new TwigFunction('brand', [AppExtensionRuntime::class, 'brand']),
            new TwigFunction('other_brand', [AppExtensionRuntime::class, 'otherBrand']),
            new TwigFunction('other_brand_url', [AppExtensionRuntime::class, 'otherBrandUrl']),
            new TwigFunction('regions', [AppExtensionRuntime::class, 'regions']),
        ];
    }
}
