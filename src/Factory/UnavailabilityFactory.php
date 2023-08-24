<?php

namespace App\Factory;

use App\Entity\Unavailability;
use App\Repository\UnavailabilityRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Unavailability>
 *
 * @method        Unavailability|Proxy                     create(array|callable $attributes = [])
 * @method static Unavailability|Proxy                     createOne(array $attributes = [])
 * @method static Unavailability|Proxy                     find(object|array|mixed $criteria)
 * @method static Unavailability|Proxy                     findOrCreate(array $attributes)
 * @method static Unavailability|Proxy                     first(string $sortedField = 'id')
 * @method static Unavailability|Proxy                     last(string $sortedField = 'id')
 * @method static Unavailability|Proxy                     random(array $attributes = [])
 * @method static Unavailability|Proxy                     randomOrCreate(array $attributes = [])
 * @method static UnavailabilityRepository|RepositoryProxy repository()
 * @method static Unavailability[]|Proxy[]                 all()
 * @method static Unavailability[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Unavailability[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Unavailability[]|Proxy[]                 findBy(array $attributes)
 * @method static Unavailability[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Unavailability[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class UnavailabilityFactory extends ModelFactory
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
            'availableInAm' => self::faker()->boolean(),
            'availableInPm' => self::faker()->boolean(),
            'date' => self::faker()->dateTime(),
            'listing' => ListingFactory::random(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Unavailability $unavailability): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Unavailability::class;
    }
}
