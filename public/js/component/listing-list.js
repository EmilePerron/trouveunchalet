import { ListingServiceEvents, listingService } from "../service/listing-service.js";
import { isElementInViewport} from "../util/viewport.js";
import "./listing-list-item.js";

const stylesheet = document.createElement("style");
stylesheet.innerHTML = `
	listing-list { display: block; position: relative; scroll-margin-block-start: 7rem; }
	listing-list ol { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.5rem 1.5rem; padding: 0; list-style: none; }
	listing-list .pagination { display: flex; gap: 1rem; justify-content: center; align-item: center; margin: 2rem 0; }
	listing-list .pagination button { justify-content: center; aspect-ratio: 1 / 1; width: 5ch; border-radius: 50%; }
	listing-list .pagination > span { line-height: 1.5; }
	listing-list .empty-state-element { display: flex; justify-content: center; align-items: center; width: 100%; padding: .75rem 1rem; font-size: 1rem; font-weight: 600; text-align: center; color: white; background-color: var(--color-primary-800); background-color: color-mix(in srgb, var(--color-primary-800) 75%, transparent); }
	listing-list [aria-hidden="true"] { display: none; }
	listing-list[aria-busy="true"]::after { content: 'Chargement...'; display: block; width: 100%; height: 100%; padding: 3rem 1.5rem; font-size: 1.1rem; font-weight: 600; color: var(--color-gray-900); text-align: center; background-color: rgb(255 255 255 / 50%); position: absolute; top: 0; left: 0; z-index: 1000; }

	@media (max-width: 1280px) {
		listing-list ol { grid-template-columns: repeat(3, 1fr); }
	}

	@media (max-width: 991px) {
		listing-list ol { grid-template-columns: repeat(2, 1fr); }
	}

	@media (max-width: 991px) {
		listing-list ol { grid-template-columns: repeat(2, 1fr); }
	}

	@media (max-width: 500px) {
		listing-list ol { grid-template-columns: repeat(1, 1fr); }
	}
`;
document.head.append(stylesheet);

const itemsPerPage = 12;

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
			if (!isElementInViewport(this.querySelector("ol > li:first-child"))) {
				this.scrollIntoView({ block: "start", behavior: "smooth" });
			}
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
				<listing-list-item listing-id="${listing.id}"></listing-list-item>
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
