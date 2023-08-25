<?php

namespace App\Config;

use Exception;

class BrandConfigLoader
{
    public const CONFIG_FILENAME = "brands.yaml";

    public function __construct(
        private ConfigLoader $configLoader,
    ) {
    }

    public function getBrand(string $brand): BrandConfig
    {
        $config = $this->configLoader->loadConfig(self::CONFIG_FILENAME);

        if (!isset($config[$brand])) {
            throw new Exception("Config for brand {$brand} is missing in 'config/" . self::CONFIG_FILENAME . "'.");
        }

        return BrandConfig::createFromArray($config[$brand]);
    }

    /**
     * @return array<string,BrandConfig>
     */
    public function getBrands(): array
    {
        $config = $this->configLoader->loadConfig(self::CONFIG_FILENAME);

        return array_map(fn (array $data) => BrandConfig::createFromArray($data), $config);
    }
}
