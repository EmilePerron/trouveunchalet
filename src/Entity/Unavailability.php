<?php

namespace App\Entity;

use App\Crawler\Model\Unavailability as UnavailabilityModel;
use App\Entity\Trait\UlidTrait;
use App\Repository\UnavailabilityRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UnavailabilityRepository::class)]
class Unavailability
{
    use UlidTrait;

    public function __construct(
        #[ORM\Column(type: Types::DATE_MUTABLE)]
        public readonly \DateTimeInterface $date,
        #[ORM\Column]
        public bool $availableInAm,
        #[ORM\Column]
        public bool $availableInPm,
        #[ORM\ManyToOne(inversedBy: 'unavailabilities')]
        #[ORM\JoinColumn(nullable: false)]
        public readonly Listing $listing,
    ) {
    }

    public static function fromModel(UnavailabilityModel $model, Listing $listing): self
    {
        return new self(
            date: $model->date,
            availableInAm: $model->availableInAm,
            availableInPm: $model->availableInPm,
            listing: $listing,
        );
    }
}
