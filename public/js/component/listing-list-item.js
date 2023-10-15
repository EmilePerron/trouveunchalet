import { listingService } from "../service/listing-service.js";
import { ButtonStylesheet, FontawesomeStylesheet } from "../global-stylesheets.js";
import { renderPricePerNight } from "../util/listing.js";

const stylesheet = document.createElement("style");
stylesheet.innerHTML = `
	:host { display: flex; flex-direction: column; align-items: flex-start; gap: .5rem; background-color: white; position: relative; }

	.gallery { width: 100%; height: auto; aspect-ratio: 4/3; line-height: 0; background-color: var(--color-primary-050); border-radius: .75rem; overflow: hidden; }
	img { width: 100%; height: 100%; object-fit: cover; object-position: center; }

	.body { width: 100%; }
	strong { display: block; font-size: 1rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.address { font-size: .85em; color: var(--color-gray-500); }
	.price { margin-top: .5em; font-size: .75em; }
	.price span { font-weight: 600; }


	.link-overlay { display: grid; place-items: center; width: 100%; aspect-ratio: 4/3; text-decoration: none; background-color: rgb(255 255 255 / 50%); opacity: 0; position: absolute; top: 0; left: 0; transition: opacity .15s ease; }
	.link-overlay:hover { opacity: 1; }

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
			${FontawesomeStylesheet.outerHTML}
			${ButtonStylesheet.outerHTML}
			${stylesheet.outerHTML}
			<div class="gallery">
				${
					!listing?.imageUrl
						? ""
						: `
					<img src="${listing.imageUrl}" alt="" width="4" height="3">
				`
				}
			</div>
			<div class="body">
				<strong>${listing.name}</strong>
				<div class="address">${listing.address}</div>
				<div class="price">${renderPricePerNight(listing)}
				</div>
				<a href="${listing.url}" target="_blank" class="link-overlay">
					<div class="button">
						Aller au site
						<i class="fas fa-arrow-right" aria-label=""></i>
					</div>
				</a>
			</div>
		`;
	}
}

customElements.define("listing-list-item", ListingListItem);
