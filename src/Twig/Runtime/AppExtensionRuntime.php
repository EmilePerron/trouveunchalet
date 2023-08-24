<?php

namespace App\Twig\Runtime;

use Twig\Extension\RuntimeExtensionInterface;

class AppExtensionRuntime implements RuntimeExtensionInterface
{
    public function __construct()
    {
        // Inject dependencies if needed
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
}
