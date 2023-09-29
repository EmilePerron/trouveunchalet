import { ListingServiceEvents, listingService } from "../service/listing-service.js";

const stylesheet = document.createElement("style");
stylesheet.innerHTML = `
	listing-search-bar { }
	listing-search-bar .search-toggle { width: 100%; padding: 0.75rem 1rem; font-weight: 600; color: var(--color-primary-500); background-color: white; }
	listing-search-bar .search-toggle:hover { color: var(--color-primary-600); background-color: var(--color-primary-050); }
	listing-search-bar dialog { padding: 1.5rem 2rem; margin: auto; border: none; border-radius: 1rem; box-shadow: 0 0 2rem rgba(0, 0, 0, .1); opacity: 0; animation: fadeIn .25s ease-out .1s forwards, dropIn .25s ease-out .1s forwards; }
	listing-search-bar dialog::backdrop { background-color: rgb(29 48 37 / 65%); opacity: 0; animation: fadeIn .25s ease-out forwards; }

	listing-search-bar fieldset { padding: 1rem; padding-top: .5rem; margin-bottom: 1rem; border: 2px solid var(--color-gray-200); border-radius: .5rem; }
	listing-search-bar fieldset legend { font-weight: 600; }
`;
document.head.append(stylesheet);

export class ListingSearchBar extends HTMLElement {
	/**
	 * Button that opens the search modal
	 * @type {HTMLButtonElement}
	 */
	#searchToggleButton;

	/**
	 * Search dialog element.
	 * @type {HTMLDialogElement}
	 */
	#dialog;

	/**
	 * Search form.
	 * @type {HTMLFormElement}
	 */
	#form;

	constructor() {
		super();

		this.innerHTML = `
			<button type="button" class="search-toggle">
				<i class="fas fa-search"></i>
				Où est-ce qu'on s'en va?
			</button>
			<dialog>
				<form method="dialog">
					<input type="hidden" name="latitude">
					<input type="hidden" name="longitude">
					<input type="hidden" name="search_radius">

					<fieldset>
						<legend>Critères</legend>

						<div class="checkbox">
							<input type="checkbox" name="dogs" value="1" id="dogs-input">
							<label for="dogs-input">Les chiens doivent être acceptés</label>
						</div>
					</fieldset>

					<button type="submit" class="fullwidth">Rechercher</button>
				</form>
			</dialog>
		`;

		this.#searchToggleButton = this.querySelector("button.search-toggle");
		this.#dialog = this.querySelector("dialog");
		this.#form = this.querySelector("form");

		ListingServiceEvents.eventTarget.addEventListener(ListingServiceEvents.EVENT_LOADING, () => {
			this.setAttribute("aria-busy", "true");
		});
		ListingServiceEvents.eventTarget.addEventListener(ListingServiceEvents.EVENT_LOADED, () => {
			this.setAttribute("aria-busy", "false");
		});

		this.#searchToggleButton.addEventListener("click", (e) => {
			this.#dialog.showModal();
		});

		this.#form.addEventListener("submit", (e) => {
			e.preventDefault();
			this.#handleSearchFormSubmit();
		});
	}

	connectedCallback() {
	}

	#handleSearchFormSubmit() {
		const data = new FormData(this.#form);

		listingService.searchRadius = data.get("search_radius");
		listingService.search();

		this.#dialog.close();
	}
}

customElements.define("listing-search-bar", ListingSearchBar);
