<?php

namespace App\Config;

use Exception;

class RegionConfigLoader
{
    public const CONFIG_FILENAME = "regions.yaml";

    public function __construct(
        private ConfigLoader $configLoader,
    ) {
    }

    public function getRegion(string $region): RegionConfig
    {
        $config = $this->configLoader->loadConfig(self::CONFIG_FILENAME);

        if (!isset($config[$region])) {
            throw new Exception("Config for region {$region} is missing in 'config/" . self::CONFIG_FILENAME . "'.");
        }

        return RegionConfig::createFromArray($config[$region]);
    }

    /**
     * @return array<string,RegionConfig>
     */
    public function getRegions(): array
    {
        $config = $this->configLoader->loadConfig(self::CONFIG_FILENAME);

        return array_map(fn (array $data) => RegionConfig::createFromArray($data), $config);
    }
}
