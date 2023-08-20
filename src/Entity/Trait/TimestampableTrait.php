<?php

declare(strict_types=1);

namespace App\Entity\Trait;

use DateTimeImmutable;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

/**
 * Adds created at and updated at timestamps to entities.
 * Entities using this must have the HasLifecycleCallbacks annotation.
 */
#[ORM\HasLifecycleCallbacks]
trait TimestampableTrait
{
    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, options: ["default" => "CURRENT_TIMESTAMP"])]
    private DateTimeImmutable $dateCreated;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, options: ["default" => "CURRENT_TIMESTAMP"])]
    private DateTimeImmutable $dateUpdated;

    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        $this->dateCreated = new DateTimeImmutable();
        $this->dateUpdated = new DateTimeImmutable();
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(): void
    {
        $this->dateUpdated = new DateTimeImmutable();
    }

    public function getDateCreated(): DateTimeImmutable
    {
        if (!isset($this->dateCreated)) {
            $this->dateCreated = new DateTimeImmutable();
        }

        return $this->dateCreated;
    }

    public function getDateUpdated(): DateTimeImmutable
    {
        if (!isset($this->dateUpdated)) {
            $this->dateUpdated = new DateTimeImmutable();
        }

        return $this->dateUpdated;
    }
}
