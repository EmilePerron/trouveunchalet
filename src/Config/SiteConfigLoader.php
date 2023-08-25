<?php

namespace App\Config;

use App\Enum\Site;
use Exception;

class SiteConfigLoader
{
    /**
     * @var array<Site,SiteConfig>
     */
    private readonly array $configs;

    public function __construct(
        ConfigLoader $configLoader
    ) {
        $configs = [];

        foreach ($configLoader->loadConfig("sites.yaml") as $key => $config) {
            $configs[$key] = SiteConfig::fromArray($config);
        }

        $this->configs = $configs;
    }

    public function getSiteConfig(Site $site): SiteConfig
    {
        return $this->configs[$site->value] ?? throw new Exception("Config for site {$site} is missing in 'config/sites.yaml'.");
    }
}
