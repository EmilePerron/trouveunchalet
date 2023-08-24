<?php

namespace App\Factory;

use App\Entity\CrawlLog;
use App\Enum\Site;
use App\Repository\CrawlLogRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<CrawlLog>
 *
 * @method        CrawlLog|Proxy                     create(array|callable $attributes = [])
 * @method static CrawlLog|Proxy                     createOne(array $attributes = [])
 * @method static CrawlLog|Proxy                     find(object|array|mixed $criteria)
 * @method static CrawlLog|Proxy                     findOrCreate(array $attributes)
 * @method static CrawlLog|Proxy                     first(string $sortedField = 'id')
 * @method static CrawlLog|Proxy                     last(string $sortedField = 'id')
 * @method static CrawlLog|Proxy                     random(array $attributes = [])
 * @method static CrawlLog|Proxy                     randomOrCreate(array $attributes = [])
 * @method static CrawlLogRepository|RepositoryProxy repository()
 * @method static CrawlLog[]|Proxy[]                 all()
 * @method static CrawlLog[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static CrawlLog[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static CrawlLog[]|Proxy[]                 findBy(array $attributes)
 * @method static CrawlLog[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static CrawlLog[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class CrawlLogFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'dateStarted' => self::faker()->dateTime(),
            'dateCompleted' => self::faker()->dateTime(),
            'failed' => self::faker()->boolean(),
            'logs' => LogModelFactory::createMany(self::faker()->randomNumber(2)),
            'site' => self::faker()->randomElement(Site::cases()),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(CrawlLog $crawlLog): void {})
        ;
    }

    protected static function getClass(): string
    {
        return CrawlLog::class;
    }
}
