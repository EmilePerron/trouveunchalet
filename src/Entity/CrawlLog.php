<?php

namespace App\Entity;

use App\Entity\Trait\UlidTrait;
use App\Enum\Site;
use App\Model\Log;
use App\Repository\CrawlLogRepository;
use DateTimeImmutable;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CrawlLogRepository::class)]
#[ORM\HasLifecycleCallbacks]
class CrawlLog
{
    use UlidTrait;

    #[ORM\Column(nullable: false, enumType: Site::class)]
    private Site $site;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private \DateTimeInterface $dateStarted;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateCompleted = null;

    /**
     * @var array<int,Log>
     */
    #[ORM\Column(type: Types::JSON)]
    private array $logs = [];

    #[ORM\Column(nullable: true)]
    private ?int $totalListingCount = null;

    #[ORM\Column(nullable: true)]
    private ?int $crawledCount = null;

    #[ORM\Column]
    private bool $failed = false;

    public function __construct(Site $site)
    {
        $this->site = $site;
        $this->dateStarted = new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSite(): ?Site
    {
        return $this->site;
    }

    public function getDateStarted(): ?\DateTimeInterface
    {
        return $this->dateStarted;
    }

    public function setDateStarted(\DateTimeInterface $dateStarted): static
    {
        $this->dateStarted = $dateStarted;

        return $this;
    }

    public function getDateCompleted(): ?\DateTimeInterface
    {
        return $this->dateCompleted;
    }

    public function setDateCompleted(?\DateTimeInterface $dateCompleted): static
    {
        $this->dateCompleted = $dateCompleted;

        return $this;
    }

    /**
     * @return array<int,Log>
     */
    public function getLogs(): array
    {
        return $this->logs;
    }

    public function addLog(Log $log): static
    {
        $this->logs[] = $log;

        return $this;
    }

    public function getTotalListingCount(): ?int
    {
        return $this->totalListingCount;
    }

    public function setTotalListingCount(?int $totalListingCount): static
    {
        $this->totalListingCount = $totalListingCount;

        return $this;
    }

    public function getCrawledCount(): ?int
    {
        return $this->crawledCount;
    }

    public function setCrawledCount(?int $crawledCount): static
    {
        $this->crawledCount = $crawledCount;

        return $this;
    }

    public function isFailed(): ?bool
    {
        return $this->failed;
    }

    public function setFailed(bool $failed): static
    {
        $this->failed = $failed;

        return $this;
    }
}
