<?php

namespace App\Entity;

use App\Entity\Trait\TimestampableTrait;
use App\Entity\Trait\UlidTrait;
use App\Repository\SiteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * A `Site` represents the company or association that owns and rents various
 * listings.
 *
 * E.g. a campground (who rents campsites), or a company that rents cottages.
 */
#[ORM\Entity(repositoryClass: SiteRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Site
{
    use TimestampableTrait;
    use UlidTrait;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 512)]
    private ?string $url = null;

    #[ORM\Column(length: 255)]
    private ?string $crawler = null;

    #[ORM\OneToMany(mappedBy: 'parentSite', targetEntity: Listing::class)]
    private Collection $listings;

    public function __construct()
    {
        $this->listings = new ArrayCollection();
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

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function getCrawler(): ?string
    {
        return $this->crawler;
    }

    public function setCrawler(string $crawler): static
    {
        $this->crawler = $crawler;

        return $this;
    }

    /**
     * @return Collection<int, Listing>
     */
    public function getListings(): Collection
    {
        return $this->listings;
    }

    public function addListing(Listing $listing): static
    {
        if (!$this->listings->contains($listing)) {
            $this->listings->add($listing);
            $listing->setParentSite($this);
        }

        return $this;
    }

    public function removeListing(Listing $listing): static
    {
        if ($this->listings->removeElement($listing)) {
            // set the owning side to null (unless already changed)
            if ($listing->getParentSite() === $this) {
                $listing->setParentSite(null);
            }
        }

        return $this;
    }
}
