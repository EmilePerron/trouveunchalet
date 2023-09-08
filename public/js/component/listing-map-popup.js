const stylesheet = document.createElement("style");
stylesheet.innerHTML = `
	:host { display: flex; align-items: flex-start; width: min(500px, 70vw); gap: 1rem; }
	.body { flex: 1 1; }
	.gallery { flex: 0 1 200px; }
	img { width: 100%; height: auto; border-radius: .25rem; }

	@media (max-width: 1280px) {
		:host { flex-direction: column; width: min(300px, 70vw); }
	}
`;

export class ListingMapPopup extends HTMLElement {
	/** @var {object} #listing */
	#listingData = {};

	constructor() {
		super();

		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.#listingData = JSON.parse(this.getAttribute("listing-data"));
		this.#render();
	}

	#render() {
		this.shadowRoot.innerHTML = `
			${stylesheet.outerHTML}
			<div class="body">
				<strong>${this.#listingData.name}</strong>
				<div class="description">${this.#listingData.excerpt.replaceAll("\n", "<br>")}</div>
				<a href="${this.#listingData.url}" target="_blank">Aller au site</a>
			</div>
			<div class="gallery">
				${
					!this.#listingData?.imageUrl
						? ""
						: `
					<img src="${this.#listingData.imageUrl}" alt="">
				`
				}
			</div>
		`;
	}
}

customElements.define("listing-map-popup", ListingMapPopup);
