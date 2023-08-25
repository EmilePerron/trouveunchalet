<?php

namespace App\Config;

class RegionConfig
{
    public function __construct(
        public readonly string $slug,
        public readonly string $name,
        public readonly float $latitude,
        public readonly float $longitude,
        public readonly int $radius,
        public readonly string $sector,
    ) {
    }

    /**
     * @param array<string,mixed> $config
     */
    public function fromArray(array $config): static
    {
        $this->slug = $config['slug'];
        $this->name = $config['name'];
        $this->latitude = $config['latitude'];
        $this->longitude = $config['longitude'];
        $this->radius = $config['radius'];
        $this->sector = $config['sector'];

        return $this;
    }

    /**
     * @param array<string,mixed> $config
     */
    public static function createFromArray(array $config)
    {
        return new static(
            slug: $config['slug'],
            name: $config['name'],
            latitude: $config['latitude'],
            longitude: $config['longitude'],
            radius: $config['radius'],
            sector: $config['sector'],
        );
    }
}
