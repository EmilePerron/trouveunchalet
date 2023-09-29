import { listingService } from "../service/listing-service.js";
import { ButtonStylesheet, FontawesomeStylesheet, InputStylesheet } from "../global-stylesheets.js";
import { getCurrentDateInQuebec } from "../util/dates.js";
import { DateRangePicker }  from "https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.3.4/+esm";

const stylesheet = document.createElement("style");
stylesheet.innerHTML = `
	:host { display: inline-block; }
	form { display: flex; gap: 1ch; }

	.filters-datepicker { display: flex; gap: 1ch; }
	.datepicker .button { font-family: inherit; }

	.filter-button { font-family: inherit; position: relative; }
	.filter-button label::before { content: ' '; position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
	.filter-button label span { display: inline-block; padding: .5ch 1ch; font-size: .8rem; color: #fff; white-space: nowrap; background-color: var(--color-gray-900); border-radius: .5rem; position: absolute; bottom: 3rem; left: 50%; translate: -50%; opacity: 0; pointer-events: none; transition: opacity .2s ease-in-out; }
	.filter-button input { scale: 1.15; accent-color: var(--color-primary); }
	.filter-button:has(input:checked) { --button-color: var(--color-primary-100); background-color: var(--button-color); }
	.filter-button:hover label span, .filter-button:focus-visible label span { opacity: 1; }
`;

export class ListingFilters extends HTMLElement {
	/**
	 * @type {HTMLFormElement}
	 */
	#form;

	/**
	 * @type {HTMLElement}
	 */
	#datepickerElement;

	constructor() {
		super();

		this.attachShadow({ mode: "open" });

		this.shadowRoot.innerHTML = `
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.3.4/dist/css/datepicker.min.css">
			${FontawesomeStylesheet.outerHTML}
			${InputStylesheet.outerHTML}
			${ButtonStylesheet.outerHTML}
			${stylesheet.outerHTML}

			<form>

				<div class="filters-datepicker">
					<span class="input-wrapper">
						<label>Arrivée</label>
						<input type="text" name="start_date" placeholder=" ">
					</span>

					<span class="input-wrapper">
						<label>Départ</label>
						<input type="text" name="end_date" placeholder=" ">
					</span>
				</div>

				<div class="button filter-button">
					<input type="checkbox" name="dogs_allowed" value="1" id="dogs-allowed-input">
					<label for="dogs-allowed-input">
						<span>Animaux autorisés</span>
						<i class="fas fa-dog"></i>
					</label>
				</div>

				<div class="button filter-button">
					<input type="checkbox" name="has_wifi" value="1" id="has-wifi-input">
					<label for="has-wifi-input">
						<span>Internet disponible</span>
						<i class="fas fa-wifi"></i>
					</label>
				</div>
			</form>
		`;

		this.#form = this.shadowRoot.querySelector("form");
		this.#datepickerElement = this.shadowRoot.querySelector(".filters-datepicker");

		this.addEventListener("change", (e) => {

		});

		this.addEventListener("submit", (e) => {
			e.preventDefault();

			this.#applyFilters();
		})
	}

	connectedCallback() {
		let lastDateDisabled = getCurrentDateInQuebec();
		const disabledDates = [];

		for (let i = 0; i < 365; i++) {
			lastDateDisabled.setDate(lastDateDisabled.getDate() - 1);
			disabledDates.push(new Date(lastDateDisabled.toISOString()));
		}

		// Initialize datepicker
		const rangepicker = new DateRangePicker(this.#datepickerElement, {
			language: "fr",
			dateFormat: "yyyy-mm-dd",
			datesDisabled: disabledDates,
		});
	}

	#applyFilters() {
		const data = new FormData(this.#form);

		//listingService.searchRadius = data.get("search_radius");
		listingService.search();
	}
}

customElements.define("listing-filters", ListingFilters);
