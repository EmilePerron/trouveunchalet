<?php

namespace App\Config;

/**
 * Defines the configuration and metadata of one of the brands that this
 * project is deployed under.
 *
 * Ex.: `Trouve ton Chalet`, `Trouve ton Camping`, etc.
 */
class BrandConfig
{
    /**
     * @param array<int,string> $domain
     * @param string $icon Name of the FontAwesome icon representing the brand
     */
    public function __construct(
        public readonly string $slug,
        public readonly array $domains,
        public readonly string $icon,
    ) {
    }

    /**
     * @param array<string,mixed> $config
     */
    public function fromArray(array $config): static
    {
        $this->slug = $config['slug'];
        $this->domains = $config['domains'];
        $this->icon = $config['icon'];

        return $this;
    }

    /**
     * @param array<string,mixed> $config
     */
    public static function createFromArray(array $config)
    {
        return new static(
            slug: $config['slug'],
            domains: $config['domains'],
            icon: $config['icon'],
        );
    }
}
