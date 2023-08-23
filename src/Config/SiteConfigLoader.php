<?php

namespace App\Config;

use App\Enum\Site;
use Exception;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Yaml\Yaml;

class SiteConfigLoader
{
    /**
     * @var array<Site,SiteConfig>
     */
    private readonly array $configs;

    public function __construct(
        #[Autowire('%kernel.project_dir%')]
        string $projectDirectory,
    ) {
        $fileLocator = new FileLocator(["{$projectDirectory}/config"]);
        $configFiles = $fileLocator->locate('sites.yaml', null, false);
        $rawSitesConfig = Yaml::parseFile(is_array($configFiles) ? current($configFiles) : $configFiles);
        $configs = [];

        foreach ($rawSitesConfig as $key => $config) {
            $configs[$key] = SiteConfig::fromArray($config);
        }

        $this->configs = $configs;
    }

    public function getSiteConfig(Site $site): SiteConfig
    {
        return $this->configs[$site->value] ?? throw new Exception("Config for site {$site} is missing in 'config/sites.yaml'.");
    }
}
