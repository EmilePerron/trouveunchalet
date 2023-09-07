import { ListingServiceEvents, listingService } from "../service/listing-service.js";
import "./listing-list-item.js";

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(`
	listing-list { display: block; position: relative; scroll-margin-block-start: 1rem; }
	listing-list ol { padding: 0; list-style: none; }
	listing-list li:not(:last-child) { margin-bottom: 1rem; }
	listing-list .pagination { display: flex; gap: 1rem; justify-content: center; align-item: center; margin: 2rem 0; }
	listing-list .pagination button { justify-content: center; aspect-ratio: 1 / 1; width: 4ch; border-radius: 50%; }
	listing-list .pagination button[aria-current="true"] { color: white; background-color: var(--color-primary-400); pointer-events: none; }
	listing-list .pagination > span { line-height: 1.5; }
	listing-list .empty-state-element { display: flex; justify-content: center; align-items: center; width: 100%; padding: .75rem 1rem; font-size: 1rem; font-weight: 600; text-align: center; color: white; background-color: var(--color-primary-800); background-color: color-mix(in srgb, var(--color-primary-800) 75%, transparent); }
	listing-list [aria-hidden="true"] { display: none; }
`);
document.adoptedStyleSheets.push(stylesheet);
const itemsPerPage = 10;

export class ListingList extends HTMLElement {
	static EVENT_PAGE_CHANGE = "list-page-changed";

	/** @type {HTMLElement} */
	#paginationElement;

	/** @type {HTMLElement} */
	#emptyStateElement;

	/**
	 * @type {number}
	 */
	#currentPage = 1;

	/** Whether the list has loaded at least once. */
	#initialized = false;

	constructor() {
		super();

		this.innerHTML = `
			<ol></ol>
			<div class="pagination"></div>
			<div class="empty-state-element" aria-hidden="true">
				Aucun résultats ne correspond à votre recherche.<br>
				Essayez d'adapter vos filtres ou de visionner un autre emplacement.
			</div>
		`;

		this.#emptyStateElement = this.querySelector(".empty-state-element");
		this.#paginationElement = this.querySelector(".pagination");

		ListingServiceEvents.eventTarget.addEventListener(ListingServiceEvents.EVENT_LOADING, () => {
			this.setAttribute("aria-busy", "true");
		});
		ListingServiceEvents.eventTarget.addEventListener(ListingServiceEvents.EVENT_LOADED, () => {
			this.setAttribute("aria-busy", "false");

			if (this.#initialized) {
				this.currentPage = 1;
			}

			this.#render();
			this.#initialized = true;
		});

		this.addEventListener("click", (e) => {
			if (e.target.matches(".pagination button, .pagination button *")) {
				this.currentPage = e.target.closest("button").getAttribute("page-number");
			}
		});
	}

	connectedCallback() {
		const url = new URL(location.href);
		this.#currentPage = url.searchParams.get("page") || 1;

		listingService.search();
	}

	get pageCount() {
		return Math.ceil(listingService.listings.length / itemsPerPage);
	}

	get currentPage() {
		return this.#currentPage;
	}

	/** @param {number} pageNumber */
	set currentPage(pageNumber) {
		pageNumber = parseInt(pageNumber);

		if (pageNumber < 1) {
			pageNumber = 1;
		} else if (pageNumber > this.pageCount) {
			pageNumber = this.pageCount;
		}

		this.#currentPage = pageNumber;
		this.#render();

		const url = new URL(location.href);
		url.searchParams.set("page", pageNumber);
		history.pushState({}, "", url);

		if (this.#initialized && this.closest("[hidden]") === null) {
			this.scrollIntoView({ block: "start", behavior: "smooth" });
		}
	}

	get currentPageListings() {
		const offset = (this.currentPage - 1) * itemsPerPage;

		return listingService.listings.slice(offset, offset + itemsPerPage);
	}

	#render() {
		this.#renderList();
		this.#renderPagination();
	}

	#renderList() {
		this.#emptyStateElement.setAttribute("aria-hidden", listingService.listings.length === 0 ? "false" : "true");

		let html = "";

		for (const listing of this.currentPageListings) {
			html += `<li>
				<listing-list-item listing-data="${JSON.stringify(listing).replaceAll('"', "&#34;")}"></listing-list-item>
			</li>`;
		}

		this.querySelector("ol").innerHTML = html;
	}

	#renderPagination() {
		let html = `<button type="button" page-number="1" aria-current="${this.currentPage == 1 ? "true" : "false"}">1</button>`;

		if (this.currentPage > 3) {
			html += `<span>...</span>`;
		}

		for (let i = 2; i < this.pageCount; i++) {
			if (Math.max(this.currentPage, i) - Math.min(this.currentPage, i) > 2) {
				continue;
			}

			html += `
				<button type="button" page-number="${i}" aria-current="${this.currentPage == i ? "true" : "false"}">${i}</button>
			`;
		}

		if (this.currentPage < this.pageCount - 3) {
			html += `<span>...</span>`;
		}

		if (this.pageCount > 1) {
			html += `<button type="button" page-number="${this.pageCount}" aria-current="${this.currentPage == this.pageCount ? "true" : "false"}">${this.pageCount}</button>`;
		}

		this.#paginationElement.innerHTML = html;

		// @TODO: restore focus?
	}
}

customElements.define("listing-list", ListingList);
