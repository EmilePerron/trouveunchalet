import { ButtonStylesheet, FontawesomeStylesheet } from "../global-stylesheets.js";

const stylesheet = document.createElement("style");
stylesheet.innerHTML = `
	:host { display: flex; flex-direction: column; align-items: flex-start; gap: .5rem; background-color: white; position: relative; }
	.gallery { line-height: 0; border-radius: .75rem; overflow: hidden; }
	strong { display: block; font-size: 1rem; font-weight: 600; }
	.address { font-size: .85em; color: var(--color-gray-500); }
	img { width: 100%; aspect-ratio: 4/3; object-fit: cover; object-position: center; border-radius: .25rem; background-color: var(--color-primary-050); }

	.link-overlay { display: grid; place-items: center; width: 100%; aspect-ratio: 4/3; text-decoration: none; background-color: rgb(255 255 255 / 50%); opacity: 0; position: absolute; top: 0; left: 0; transition: opacity .15s ease; }
	.link-overlay:hover { opacity: 1; }

	@media (max-width: 960px) {
		:host { flex-direction: column; }
	}
`;

export class ListingListItem extends HTMLElement {
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
			${FontawesomeStylesheet.outerHTML}
			${ButtonStylesheet.outerHTML}
			${stylesheet.outerHTML}
			<div class="gallery">
				${
					!this.#listingData?.imageUrl
						? ""
						: `
					<img src="${this.#listingData.imageUrl}" alt="">
				`
				}
			</div>
			<div class="body">
				<strong>${this.#listingData.name}</strong>
				<div class="address">${this.#listingData.address}</div>
				<a href="${this.#listingData.url}" target="_blank" class="link-overlay">
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
