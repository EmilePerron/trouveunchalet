<?php

namespace App\Entity;

use App\Entity\Trait\TimestampableTrait;
use App\Entity\Trait\UlidTrait;
use App\Enum\Site;
use App\Repository\ListingRepository;
use App\Util\Excerpt;
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

    #[Groups(["summary"])]
    #[ORM\Column(length: 512, nullable: true)]
    private ?string $url = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[Groups(["summary"])]
    #[ORM\Column(nullable: true)]
    private ?bool $dogsAllowed = null;

    #[ORM\Column(nullable: false, enumType: Site::class)]
    private ?Site $parentSite = null;

    #[Groups(["summary"])]
    #[ORM\Column(length: 512, nullable: true)]
    private ?string $imageUrl = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $internalId = null;

    #[ORM\OneToMany(mappedBy: 'listing', targetEntity: Unavailability::class, orphanRemoval: true, cascade: ['persist'])]
    private Collection $unavailabilities;

    #[ORM\Column(nullable: true)]
    private ?int $numberOfBedrooms = null;

    #[ORM\Column(nullable: true)]
    private ?int $maximumNumberOfGuests = null;

    #[ORM\Column(nullable: true)]
    private ?bool $hasWifi = null;

    public function __construct()
    {
        $this->unavailabilities = new ArrayCollection();
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

    #[Groups(["summary"])]
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
}
