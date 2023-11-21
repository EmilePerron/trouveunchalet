<?php

namespace App\Config;

class SiteConfig
{
    /**
     * @param class-string $crawler Class of the crawler driver for this site.
     */
    public function __construct(
        public readonly string $name,
        public readonly string $url,
        public readonly string $crawler,
        public readonly string $robotsTxtUrl,
    ) {
    }

    /**
     * @param array<string,string> $config
     */
    public static function fromArray(array $config): self
    {
        return new self(
            name: $config['name'],
            url: $config['url'],
            crawler: $config['crawler'],
            robotsTxtUrl: $config['robots_txt_url'],
        );
    }
}
