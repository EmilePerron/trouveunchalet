import { listingService } from "../service/listing-service.js";

const stylesheet = document.createElement("style");
stylesheet.innerHTML = `
	:host { display: flex; align-items: flex-start; width: min(500px, 70vw); gap: 1rem; }
	.body { flex: 1 1; }
	.description { word-break: break-word; }
	.gallery { flex: 0 1 200px; }
	img { width: 100%; aspect-ratio: 4/3; object-fit: cover; background-color: var(--color-gray-100); border-radius: .25rem; }

	@media (max-width: 1280px) {
		:host { flex-direction: column; width: min(300px, 70vw); }
	}
`;

export class ListingMapPopup extends HTMLElement {
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
			${stylesheet.outerHTML}
			<div class="body">
				<strong>${listing.name}</strong>
				<div class="description">${listing.excerpt.replaceAll("\n", "<br>")}</div>
				<a href="${listing.url}" target="_blank">Aller au site</a>
			</div>
			<div class="gallery">
				${
					!listing?.imageUrl
						? ""
						: `
					<img src="${listing.imageUrl}" alt="">
				`
				}
			</div>
		`;
	}
}

customElements.define("listing-map-popup", ListingMapPopup);
