import { listingService } from "../service/listing-service.js";
import { ResetStylesheet, ButtonStylesheet, FontawesomeStylesheet } from "../global-stylesheets.js";
import { getListingImageUrl, renderPricePerNight } from "../util/listing.js";

const stylesheet = document.createElement("style");
stylesheet.innerHTML = `
	:host { display: block; }

	a { display: flex; flex-direction: column; align-items: flex-start; gap: .5rem; text-decoration: none; color: inherit; background-color: white; position: relative; transition: opacity .15s ease; }
	a:hover { opacity: .65; }

	.gallery { width: 100%; height: auto; aspect-ratio: 4/3; line-height: 0; background-color: var(--color-primary-050); border-radius: .75rem; overflow: hidden; }
	img { width: 100%; height: 100%; object-fit: cover; object-position: center; }

	.body { width: 100%; }
	strong { display: block; font-size: 1rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.address { font-size: .85em; color: var(--color-gray-600); }
	.price { margin-top: .5em; font-size: .75em; }
	.price span { font-weight: 600; }

	@media (max-width: 960px) {
		:host { flex-direction: column; }
	}
`;

export class ListingListItem extends HTMLElement {
	static observedAttributes = ["listing-id"];

	constructor() {
		super();

		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.#render();
	}

	attributeChangedCallback() {
		this.#render();
	}

	async #render() {
		const id = this.getAttribute("listing-id");
		const listing = await listingService.getListing(id);

		this.shadowRoot.innerHTML = `
			${ResetStylesheet.outerHTML}
			${FontawesomeStylesheet.outerHTML}
			${ButtonStylesheet.outerHTML}
			${stylesheet.outerHTML}
			<a href="${listing.url}" target="_blank">
				<div class="gallery">
					${
						!listing?.imageUrl
							? ""
							: `
						<img src="${getListingImageUrl(listing.id)}" alt="" width="4" height="3" loading="lazy">
					`
					}
				</div>
				<div class="body">
					<strong>${listing.name}</strong>
					<div class="address">${listing.address}</div>
					<div class="price">${renderPricePerNight(listing)}</div>
				</div>
			</a>
		`;
	}
}

customElements.define("listing-list-item", ListingListItem);
