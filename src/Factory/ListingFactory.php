<?php

namespace App\Factory;

use App\Entity\Listing;
use App\Repository\ListingRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Listing>
 *
 * @method        Listing|Proxy                     create(array|callable $attributes = [])
 * @method static Listing|Proxy                     createOne(array $attributes = [])
 * @method static Listing|Proxy                     find(object|array|mixed $criteria)
 * @method static Listing|Proxy                     findOrCreate(array $attributes)
 * @method static Listing|Proxy                     first(string $sortedField = 'id')
 * @method static Listing|Proxy                     last(string $sortedField = 'id')
 * @method static Listing|Proxy                     random(array $attributes = [])
 * @method static Listing|Proxy                     randomOrCreate(array $attributes = [])
 * @method static ListingRepository|RepositoryProxy repository()
 * @method static Listing[]|Proxy[]                 all()
 * @method static Listing[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Listing[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Listing[]|Proxy[]                 findBy(array $attributes)
 * @method static Listing[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Listing[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class ListingFactory extends ModelFactory
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
            'address' => self::faker()->address(),
            'name' => self::faker()->company(),
            'latitude' => self::faker()->latitude(),
            'longitude' => self::faker()->longitude(),
            'url' => self::faker()->url(),
            'description' => self::faker()->text(350),
            'dogsAllowed' => self::faker()->boolean(),
            'parentSite' => SiteFactory::random(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Listing $listing): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Listing::class;
    }
}
