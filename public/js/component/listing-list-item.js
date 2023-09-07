import buttonsStylesheet from "../../css/button.css" assert { type: "css" };
import faStylesheet from "../../fontawesome/css/all.min.css" assert { type: "css" };

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(`
	:host { display: flex; align-items: flex-start; width: 100%; padding: 1rem; gap: 1rem; background-color: white; border-radius: .35rem; }
	.body { flex: 1 1; }
	.gallery { flex: 0 1 250px; }
	strong { display: block; margin-bottom: .5rem; font-size: 1.15em; }
	.description { display: -webkit-box; -webkit-line-clamp: 5; line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; }
	.button { margin-top: 1rem; }
	img { width: 100%; aspect-ratio: 4/3; object-fit: cover; object-position: center; border-radius: .25rem; background-color: var(--color-primary-050); }

	@media (max-width: 960px) {
		:host { flex-direction: column; }
	}
`);

export class ListingListItem extends HTMLElement {
	/** @var {object} #listing */
	#listingData = {};

	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.adoptedStyleSheets = [buttonsStylesheet, faStylesheet, stylesheet];
	}

	connectedCallback() {
		this.#listingData = JSON.parse(this.getAttribute("listing-data"));
		this.#render();
	}

	#render() {
		this.shadowRoot.innerHTML = `
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
				<div class="description">${this.#listingData.excerpt.replaceAll("\n", "<br>")}</div>
				<a href="${this.#listingData.url}" target="_blank" class="button">
					Aller au site
					<i class="fas fa-arrow-right" aria-label=""></i>
				</a>
			</div>
		`;
	}
}

customElements.define("listing-list-item", ListingListItem);
