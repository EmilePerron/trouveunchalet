<?php

namespace App\Entity;

use App\Entity\Trait\TimestampableTrait;
use App\Entity\Trait\UlidTrait;
use App\Enum\Site;
use App\Repository\ListingRepository;
use App\Util\Excerpt;
use DateTimeImmutable;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * A `Listing` represents a single unit that can be rented (e.g. a cottage, or
 * a single campsite).
 *
 * Each listing belongs to a `Site`.
 */
#[ORM\Entity(repositoryClass: ListingRepository::class)]
#[ORM\Index(columns: ["parent_site", "internal_id"])]
#[ORM\Index(columns: ["latitude"])]
#[ORM\Index(columns: ["longitude"])]
#[ORM\UniqueConstraint(columns: ["parent_site", "internal_id"])]
#[ORM\HasLifecycleCallbacks]
class Listing
{
    use TimestampableTrait;
    use UlidTrait;

    #[Groups(["summary"])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(["summary"])]
    #[ORM\Column(length: 512)]
    private ?string $address = null;

    #[Groups(["summary"])]
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 7, nullable: true)]
    private ?string $latitude = null;

    #[Groups(["summary"])]
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 7, nullable: true)]
    private ?string $longitude = null;

    #[ORM\Column(length: 512, nullable: true)]
    private ?string $url = null;

    #[Groups(["details"])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[Groups(["details"])]
    #[ORM\Column(nullable: true)]
    private ?bool $dogsAllowed = null;

    #[ORM\Column(nullable: false, enumType: Site::class)]
    private ?Site $parentSite = null;

    #[ORM\Column(length: 512, nullable: true)]
    private ?string $imageUrl = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $internalId = null;

    #[ORM\OneToMany(mappedBy: 'listing', targetEntity: Unavailability::class, orphanRemoval: true, cascade: ['persist'])]
    private Collection $unavailabilities;

    #[Groups(["details"])]
    #[ORM\Column(nullable: true)]
    private ?int $numberOfBedrooms = null;

    #[Groups(["details"])]
    #[ORM\Column(nullable: true)]
    private ?int $maximumNumberOfGuests = null;

    #[Groups(["details"])]
    #[ORM\Column(nullable: true)]
    private ?bool $hasWifi = null;

    #[Groups(["details"])]
    #[ORM\Column(options: ["default" => 1])]
    private int $minimumStayInDays = 1;

    #[Groups(["summary"])]
    #[ORM\Column(nullable: true)]
    private ?int $minimumPricePerNight = null;

    #[Groups(["summary"])]
    #[ORM\Column(nullable: true)]
    private ?int $maximumPricePerNight = null;

    #[Groups(["summary"])]
    #[ORM\Column(nullable: true)]
    private ?int $averagePricePerNight = null;

    #[Groups(["details"])]
    #[ORM\Column(nullable: true)]
    private ?bool $hasWoodStove = null;

    #[Groups(["details"])]
    #[ORM\Column(nullable: true)]
    private ?bool $hasFireplace = null;

	#[Groups('timestamps')]
    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, options: ["default" => "CURRENT_TIMESTAMP"])]
    private DateTimeImmutable $dateLastCompletelyCrawled;

    public function __construct()
    {
        $this->unavailabilities = new ArrayCollection();
		$this->dateLastCompletelyCrawled = new DateTimeImmutable();
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(?string $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(?string $longitude): static
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(?string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    #[Groups(["details"])]
    public function getExcerpt(): ?string
    {
        return Excerpt::excerpt($this->description ?? "");
    }

    public function isDogsAllowed(): ?bool
    {
        return $this->dogsAllowed;
    }

    public function setDogsAllowed(?bool $dogsAllowed): static
    {
        $this->dogsAllowed = $dogsAllowed;

        return $this;
    }

    public function getParentSite(): ?Site
    {
        return $this->parentSite;
    }

    public function setParentSite(Site $parentSite): static
    {
        $this->parentSite = $parentSite;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(?string $imageUrl): static
    {
        $this->imageUrl = $imageUrl;

        return $this;
    }

    public function getInternalId(): ?string
    {
        return $this->internalId;
    }

    public function setInternalId(?string $internalId): static
    {
        $this->internalId = $internalId;

        return $this;
    }

    public function getIdentifier(): string
    {
        return $this->getInternalId();
    }

    /**
     * @return Collection<int, Unavailability>
     */
    public function getUnavailabilities(): Collection
    {
        return $this->unavailabilities;
    }

    /**
     * @param Collection<int, Unavailability> $unavailabilities
     */
    public function setUnavailabilities(Collection $unavailabilities): static
    {
        $this->unavailabilities = $unavailabilities;

        return $this;
    }

    public function getNumberOfBedrooms(): ?int
    {
        return $this->numberOfBedrooms;
    }

    public function setNumberOfBedrooms(?int $numberOfBedrooms): static
    {
        $this->numberOfBedrooms = $numberOfBedrooms;

        return $this;
    }

    public function getMaximumNumberOfGuests(): ?int
    {
        return $this->maximumNumberOfGuests;
    }

    public function setMaximumNumberOfGuests(?int $maximumNumberOfGuests): static
    {
        $this->maximumNumberOfGuests = $maximumNumberOfGuests;

        return $this;
    }

    public function isHasWifi(): ?bool
    {
        return $this->hasWifi;
    }

    public function setHasWifi(?bool $hasWifi): static
    {
        $this->hasWifi = $hasWifi;

        return $this;
    }

    public function getMinimumStayInDays(): int
    {
        return $this->minimumStayInDays;
    }

    public function setMinimumStayInDays(int $minimumStayInDays): static
    {
        $this->minimumStayInDays = $minimumStayInDays;

        return $this;
    }

    public function getMinimumPricePerNight(): ?int
    {
        return $this->minimumPricePerNight;
    }

    public function setMinimumPricePerNight(?int $minimumPricePerNight): static
    {
        $this->minimumPricePerNight = $minimumPricePerNight;

        return $this;
    }

    public function getMaximumPricePerNight(): ?int
    {
        return $this->maximumPricePerNight;
    }

    public function setMaximumPricePerNight(?int $maximumPricePerNight): static
    {
        $this->maximumPricePerNight = $maximumPricePerNight;

        return $this;
    }

    public function getAveragePricePerNight(): ?int
    {
        return $this->averagePricePerNight;
    }

	#[ORM\PrePersist]
	#[ORM\PreUpdate]
	public function updateAveragePricePerNight(): static
	{
		$this->averagePricePerNight = null;

		if ($this->minimumPricePerNight && $this->maximumPricePerNight) {
			$this->averagePricePerNight = round(($this->minimumPricePerNight + $this->maximumPricePerNight) / 2);
		} else if ($this->minimumPricePerNight && !$this->maximumPricePerNight) {
			$this->averagePricePerNight = $this->minimumPricePerNight;
		}

		return $this;
	}

    public function isHasWoodStove(): ?bool
    {
        return $this->hasWoodStove;
    }

    public function setHasWoodStove(?bool $hasWoodStove): static
    {
        $this->hasWoodStove = $hasWoodStove;

        return $this;
    }

    public function isHasFireplace(): ?bool
    {
        return $this->hasFireplace;
    }

    public function setHasFireplace(?bool $hasFireplace): static
    {
        $this->hasFireplace = $hasFireplace;

        return $this;
    }

	public function getDateLastCompletelyCrawled(): DateTimeImmutable
	{
		return $this->dateLastCompletelyCrawled;
	}

	public function setDateLastCompletelyCrawled(DateTimeInterface $dateLastCompletelyCrawled): self
	{
		$this->dateLastCompletelyCrawled = DateTimeImmutable::createFromInterface($dateLastCompletelyCrawled);

		return $this;
	}
}
