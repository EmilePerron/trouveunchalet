<?php

namespace App\Config;

use App\Enum\Site;
use Exception;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Filesystem\Exception\FileNotFoundException;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\Yaml\Yaml;

class ConfigLoader
{
    private FileLocator $fileLocator;

    public function __construct(
        #[Autowire('%kernel.project_dir%')]
        string $projectDirectory,
    ) {
        $this->fileLocator = new FileLocator(["{$projectDirectory}/config"]);
    }

    public function loadConfig(string $filename): array
    {
        static $cache = [];

        if (!str_ends_with($filename, ".yaml") && !str_ends_with($filename, ".yml")) {
            throw new FileException("The ConfigLoader class does not support non-YAML files. Please use a YAML file or update the ConfigLoader to support more types.");
        }

        if (!isset($cache[$filename])) {
            $files = $this->fileLocator->locate($filename, null, false);

            if (!$files) {
                throw new FileNotFoundException("Configuration file {$filename} does not exist.");
            }

            $cache[$filename] = Yaml::parseFile(is_array($files) ? current($files) : $files);
        }

        return $cache[$filename];
    }
}
