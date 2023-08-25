<?php

namespace App\Twig\Runtime;

use App\Config\BrandConfig;
use App\Config\BrandConfigLoader;
use App\Config\CurrentBrandConfig;
use Symfony\Component\HttpFoundation\RequestStack;
use Twig\Extension\RuntimeExtensionInterface;

class AppExtensionRuntime implements RuntimeExtensionInterface
{
    private readonly BrandConfig $otherBrand;

    public function __construct(
        private CurrentBrandConfig $currentBrandConfig,
        private RequestStack $requestStack,
        BrandConfigLoader $brandConfigLoader,
    ) {
        foreach ($brandConfigLoader->getBrands() as $brand) {
            if ($brand->slug != $this->currentBrandConfig->slug) {
                $this->otherBrand = $brand;
            }
        }
    }

    public function excerpt(string $text, int $maxLength = 300): string
    {
        $excerpt = str_replace('>', '> ', $text);
        $ellipseStr = ' …';
        $newLength = $maxLength - 1;

        $excerpt = trim(strip_tags($excerpt));

        if (mb_strlen($excerpt) > $maxLength) {
            $nextChar = mb_substr($excerpt, $newLength, 1);
            $excerpt = mb_substr($excerpt, 0, $newLength);
            if ($nextChar != ' ') {
                if (($lastSpace = mb_strrpos($excerpt, ' ')) !== false) {
                    // Check for to long cutoff
                    if (mb_strlen($excerpt) - $lastSpace >= 10) {
                        // Trim the ellipse, as we do not want a space now
                        return $excerpt . trim($ellipseStr);
                    }
                    $excerpt = mb_substr($excerpt, 0, $lastSpace);
                }
            }
            $excerpt .= $ellipseStr;
        }

        return trim($excerpt);
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

        $url = $request->getScheme() . "://";
        $url .= $this->otherBrand->domains[$domainIndex];

        if ($request->getPort()) {
            $url .= ":" . $request->getPort();
        }

        return $url;
    }
}
