<?php

namespace App\Repository;

use App\Crawler\Model\ListingData;
use App\Entity\Listing;
use App\Enum\Site;
use App\Util\Geography;
use DateTimeInterface;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Listing>
 *
 * @method Listing|null find($id, $lockMode = null, $lockVersion = null)
 * @method Listing|null findOneBy(array $criteria, array $orderBy = null)
 * @method Listing[]    findAll()
 * @method Listing[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ListingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Listing::class);
    }

    /**
     * Finds listings matching the criterias in a radius of `$maximumRange`
     * around the provided location.
     *
     * If `$fromDate` and/or `$toDate` are provided, availability will be taken
     * into account and only available listings will be returned.
     *
     * @param integer $maximumRange (in KM)
     * @return array<int,Listing>
     */
    public function searchByLocation(float $latitude, float $longitude, int $maximumRange, string|DateTimeInterface|null $fromDate = null, string|DateTimeInterface|null $toDate = null, ?bool $hasWifi = null, ?bool $dogsAllowed = null): array
    {
        // The logic of this geographical serach has been heavily sourced from this article:
        // https://aaronfrancis.com/2021/efficient-distance-querying-in-my-sql

        // Reduce precision on user latitude & longitude to allow for caching
        $latitude = round($latitude, 2);
        $longitude = round($longitude, 2);

        $maxRangeInMeters = $maximumRange * 1000;
        $roughBoundingBox = Geography::createBoundingBox($latitude, $longitude, $maximumRange);

        $queryBuilder = $this->createQueryBuilder('l')
            // Ignore listings without latitude or longitude
            ->andWhere('l.latitude IS NOT NULL')
            ->andWhere('l.longitude IS NOT NULL')
            // Filter by a rough bounding box that benefits from DB indexes
            ->andWhere('l.latitude >= :minLat')
            ->setParameter('minLat', $roughBoundingBox->minimumLatitude)
            ->andWhere('l.latitude <= :maxLat')
            ->setParameter('maxLat', $roughBoundingBox->maximumLatitude)
            ->andWhere('l.longitude >= :minLng')
            ->setParameter('minLng', $roughBoundingBox->minimumLongitude)
            ->andWhere('l.longitude <= :maxLng')
            ->setParameter('maxLng', $roughBoundingBox->maximumLongitude)
            // Filter by location in a more specific but less efficient way
            ->andWhere('(MT_Distance_sphere(point(l.longitude, l.latitude), point(:userLng, :userLat))) <= :maxRangeInMeters')
            ->setParameter('userLat', $latitude)
            ->setParameter('userLng', $longitude)
            ->setParameter('maxRangeInMeters', $maxRangeInMeters);

		if ($hasWifi) {
			$queryBuilder->andWhere("l.hasWifi = 1");
		}

		if ($dogsAllowed) {
			$queryBuilder->andWhere("l.dogsAllowed = 1");
		}

        if ($fromDate && $toDate) {
			$queryBuilder
				->leftJoin(
					'l.unavailabilities',
					'u',
					'WITH',
					'u.listing = l AND (
						(u.date = :dateArrival AND u.availableInPm = 0)
						OR (u.date = :dateDeparture AND u.availableInAm = 0)
						OR (u.date > :dateArrival AND u.date < :dateDeparture)
					)'
				)
				->andWhere("u.id IS NULL")
				->setParameter('dateArrival', $fromDate)
				->setParameter('dateDeparture', $toDate)
			;
		}

        return $queryBuilder
            ->orderBy('l.name', 'ASC')
            ->getQuery()
            ->setCacheable(true)
            ->setResultCacheLifetime(3600)
            ->getResult()
        ;
    }

    public function findFromListingData(Site $site, ListingData $listingData): ?Listing
    {
        $identifierKey = $listingData->internalId ? "internalId" : "url";
        $identifier = $listingData->internalId ?: $listingData->url;

        return $this->createQueryBuilder('l')
            ->andWhere('l.parentSite = :site')
            ->setParameter('site', $site->value)
            ->andWhere("l.{$identifierKey} = :identifier")
            ->setParameter('identifier', $identifier)
            ->getQuery()
            ->setCacheable(true)
            ->setResultCacheLifetime(3600 * 24 * 30)
            ->getOneOrNullResult();
    }
}
