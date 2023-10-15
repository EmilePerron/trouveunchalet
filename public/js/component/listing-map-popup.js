import { listingService } from "../service/listing-service.js";
import { ButtonStylesheet, FontawesomeStylesheet } from "../global-stylesheets.js";
import { renderPricePerNight } from "../util/listing.js";

const stylesheet = document.createElement("style");
stylesheet.innerHTML = `
	:host { }
	.listing { display: flex; flex-direction: column; width: min(250px, 70vw); gap: .5rem; }
	.gallery { width: 100%; aspect-ratio: 4/3; background-color: var(--color-gray-100); border-radius: .25rem; }
	img { width: 100%; height: 100%; object-fit: cover; }

	.price span { font-weight: 600; }

	.nav { display: flex; justify-content: stretch; align-items: stretch; gap: 1ch; margin-top: 1rem; }
	.listing-link { flex: 1; }
`;

export class ListingMapPopup extends HTMLElement {
	#currentListingIndex = 0;

	#listingIds = [];

	/**
	 * @type {HTMLElement}
	 */
	#listingElement;

	/**
	 * @type {HTMLButtonElement}
	 */
	#prevButton;

	/**
	 * @type {HTMLButtonElement}
	 */
	#nextButton;

	/**
	 * @type {HTMLButtonElement}
	 */
	#listingLink;

	constructor() {
		super();

		this.attachShadow({ mode: "open" });

		this.shadowRoot.innerHTML = `
			${stylesheet.outerHTML}
			${FontawesomeStylesheet.outerHTML}
			${ButtonStylesheet.outerHTML}

			<div class="listing"></div>
			<div class="nav">
				<button type="button" class="prev" disabled>
					<i class="fas fa-arrow-left"></i>
				</button>
				<a href="#" class="button fullwidth listing-link" target="_blank">Voir la fiche</a>
				<button type="button" class="next">
					<i class="fas fa-arrow-right"></i>
				</button>
			</div>
		`;
		this.#listingElement = this.shadowRoot.querySelector(".listing")
		this.#prevButton = this.shadowRoot.querySelector("button.prev")
		this.#nextButton = this.shadowRoot.querySelector("button.next")
		this.#listingLink = this.shadowRoot.querySelector("a.listing-link")

		this.#prevButton.addEventListener("click", () => {
			this.#currentListingIndex -= 1;

			if (this.#currentListingIndex < 0) {
				this.#currentListingIndex = 0;
			}

			this.#prevButton.disabled = this.#currentListingIndex == 0;
			this.#nextButton.disabled = this.#currentListingIndex == this.#listingIds.length - 1;

			this.#render();
		});

		this.#nextButton.addEventListener("click", () => {
			this.#currentListingIndex += 1;

			if (this.#currentListingIndex > this.#listingIds.length - 1) {
				this.#currentListingIndex = this.#listingIds.length - 1;
			}

			this.#prevButton.disabled = this.#currentListingIndex == 0;
			this.#nextButton.disabled = this.#currentListingIndex == this.#listingIds.length - 1;

			this.#render();
		});
	}

	connectedCallback() {
		this.#listingIds = this.getAttribute("listing-ids").split(',');

		if (this.#listingIds.length <= 1) {
			this.#prevButton.remove();
			this.#nextButton.remove();
		}

		this.#render();
	}

	async #render() {
		const id = this.#listingIds[this.#currentListingIndex];
		const listing = await listingService.getListing(id);

		this.#listingElement.innerHTML = `
			<div class="gallery">
				${
					!listing?.imageUrl
						? ""
						: `
					<img src="${listing.imageUrl}" alt="">
				`
				}
			</div>
			<div class="body">
				<strong>${listing.name}</strong>
				<div class="address">${listing.address}</div>
				<div class="price">${renderPricePerNight(listing)}</div>
			</div>
		`;

		this.#listingLink.href = listing.url;
	}
}

customElements.define("listing-map-popup", ListingMapPopup);
