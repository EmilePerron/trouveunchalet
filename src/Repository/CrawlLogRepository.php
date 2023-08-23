<?php

namespace App\Repository;

use App\Entity\CrawlLog;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CrawlLog>
 *
 * @method CrawlLog|null find($id, $lockMode = null, $lockVersion = null)
 * @method CrawlLog|null findOneBy(array $criteria, array $orderBy = null)
 * @method CrawlLog[]    findAll()
 * @method CrawlLog[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CrawlLogRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CrawlLog::class);
    }

//    /**
//     * @return CrawlLog[] Returns an array of CrawlLog objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CrawlLog
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
