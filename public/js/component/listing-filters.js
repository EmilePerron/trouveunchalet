import { listingService } from "../service/listing-service.js";
import { ResetStylesheet, ButtonStylesheet, FontawesomeStylesheet, InputStylesheet, AnimationStylesheet } from "../global-stylesheets.js";
import { getCurrentDateInQuebec } from "../util/dates.js";
import { DateRangePicker }  from "https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.3.4/+esm";

const stylesheet = document.createElement("style");
stylesheet.innerHTML = `
	:host { display: inline-block; }

	#filters-dialog-toggle .active-count:not([hidden]) { display: flex; width: 2.5ch; aspect-ratio: 1/1; justify-content: center; align-items: center; font-size: .9em; line-height: 1.25; font-weight: 600; color: white; background-color: var(--color-primary-500); border-radius: 50%; position: absolute; top: -0.5ch; right: -0.5ch; }

	dialog { padding: 2rem; margin: auto; border: none; border-radius: 0.5rem; box-shadow: 0 0 1rem rgb(0 0 0 / 25%); box-sizing: border-box; overflow: visible; }
	dialog::backdrop { background-color: rgb(0 0 0 / 20%); backdrop-filter: blur(3px);  opacity: 0; animation: fadeIn .25s ease-out .1s forwards; }
	dialog[open] { opacity: 0; animation: fadeIn .25s ease-out .1s forwards, dropIn .25s ease-out .1s forwards; }

	header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem; }
	header button.close-dialog i { rotate: 45deg; }
	h2 { margin-top: 0; }

	.actions { display: flex; flex-direction: column; gap: 1rem; }

	form { display: flex; flex-direction: column; gap: 2rem; }
	fieldset { padding: 0; margin: 0; border: none; }
	legend { width: 100%; padding-bottom: 1.5ch; margin-bottom: 2ch; font-size: .9rem; font-weight: 600; line-height: 1; border-bottom: 1px solid var(--color-gray-200); }

	/* Default hidden state with no specificity to hide the datepicker before the datepicker lib's CSS has been loaded */
	:where(.datepicker:not(.active)) { display: none; }

	.filters-datepicker { display: flex; gap: 1ch; }
	.datepicker .button { font-family: inherit; }

	.characteristics-list { display: flex; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap; gap: 1ch; }

	.filter-button { font-family: inherit; position: relative; }
	.filter-button label::before { content: ' '; position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
	.filter-button label span { display: inline-block; padding: .5ch 1ch; font-size: .8rem; color: #fff; white-space: nowrap; background-color: var(--color-gray-900); border-radius: .5rem; position: absolute; bottom: 3rem; left: 50%; translate: -50%; opacity: 0; pointer-events: none; transition: opacity .2s ease-in-out; }
	.filter-button input { scale: 1.15; accent-color: var(--color-primary); }
	.filter-button:has(input:checked) { --button-color: var(--color-primary-100); background-color: var(--button-color); }
	.filter-button:hover label span, .filter-button:focus-visible label span { opacity: 1; }

	@media (max-width: 480px) {
		.filters-datepicker { flex-direction: column; gap: 2ch; }
		.filters-datepicker .datepicker-input { width: 100%; }
	}
`;

export class ListingFilters extends HTMLElement {
	/**
	 * @type {HTMLFormElement}
	 */
	#form;

	/**
	 * @type {HTMLDialogElement}
	 */
	#dialog;

	/**
	 * @type {HTMLElement}
	 */
	#activeFilterCountElement;

	/**
	 * @type {HTMLElement}
	 */
	#datepickerElement;

	constructor() {
		super();

		this.attachShadow({ mode: "open" });

		this.shadowRoot.innerHTML = `
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.3.4/dist/css/datepicker.min.css">
			${ResetStylesheet.outerHTML}
			${FontawesomeStylesheet.outerHTML}
			${InputStylesheet.outerHTML}
			${ButtonStylesheet.outerHTML}
			${AnimationStylesheet.outerHTML}
			${stylesheet.outerHTML}

			<button type="button" aria-controls="filters-dialog" id="filters-dialog-toggle">
				<i class="fas fa-sliders" aria-label=""></i>
				Filtres
				<span class="active-count" ${listingService.numberOfActiveFilters === 0 ? 'hidden' : ''}>${listingService.numberOfActiveFilters}</span>
			</button>

			<dialog id="filters-dialog">
				<header>
					<h2>Filtres de recherche</h2>

					<button type="button" class="close-dialog">
						<i class="fas fa-plus"></i>
						<span class="tooltip">Fermer les filtres</span>
					</button>
				</header>

				<form>
					<fieldset>
						<div class="filters-datepicker">
							<span class="input-wrapper">
								<label>Arrivée</label>
								<input type="text" name="date_arrival" placeholder=" " value="${listingService.dateArrival ?? ''}">
							</span>

							<span class="input-wrapper">
								<label>Départ</label>
								<input type="text" name="date_departure" placeholder=" " value="${listingService.dateDeparture ?? ''}">
							</span>
						</div>
					</fieldset>

					<fieldset>
						<legend>Caractéristiques</legend>

						<div class="characteristics-list">
							<div class="button filter-button">
								<input type="checkbox" name="dogs_allowed" value="1" id="dogs-allowed-input" ${listingService.dogsAllowed ? 'checked' : ''}>
								<label for="dogs-allowed-input">
									<span>Animaux autorisés</span>
									<i class="fas fa-dog"></i>
								</label>
							</div>

							<div class="button filter-button">
								<input type="checkbox" name="has_wifi" value="1" id="has-wifi-input" ${listingService.hasWifi ? 'checked' : ''}>
								<label for="has-wifi-input">
									<span>Internet disponible</span>
									<i class="fas fa-wifi"></i>
								</label>
							</div>
						</div>
					</fieldset>

					<div class="actions">
						<button type="button" class="close-dialog primary fullwidth">
							Voir les résultats
						</button>

						<button type="button" class="clear-filters fullwidth">
							Effacer les filtres
						</button>
					</div>
				</form>
			</dialog>
		`;

		this.#dialog = this.shadowRoot.querySelector("dialog");
		this.#form = this.shadowRoot.querySelector("form");
		this.#datepickerElement = this.shadowRoot.querySelector(".filters-datepicker");
		this.#activeFilterCountElement = this.shadowRoot.querySelector("#filters-dialog-toggle .active-count");

		this.shadowRoot.querySelector("#filters-dialog-toggle").addEventListener("click", () => this.#dialog.showModal());
		this.shadowRoot.querySelectorAll("button.close-dialog").forEach(
			closeBtn => closeBtn.addEventListener("click", () => this.#dialog.close())
		);

		this.shadowRoot.addEventListener("change", () => this.#applyFilters());
		this.shadowRoot.querySelector("[name='date_arrival']").addEventListener("hide", () => this.#applyFilters());
		this.shadowRoot.querySelector("[name='date_departure']").addEventListener("hide", () => this.#applyFilters());
		this.shadowRoot.querySelector("button.clear-filters").addEventListener("click", () => this.#clearFilters());

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

		new DateRangePicker(this.#datepickerElement, {
			language: "fr",
			format: "yyyy-mm-dd",
			datesDisabled: disabledDates,
		});
	}

	#applyFilters() {
		const data = new FormData(this.#form);

		listingService.hasWifi = data.has("has_wifi") ? 1 : 0;
		listingService.dogsAllowed = data.has("dogs_allowed") ? 1 : 0;
		listingService.dateArrival = data.get("date_arrival");
		listingService.dateDeparture = data.get("date_departure");
		listingService.search();

		this.#activeFilterCountElement.textContent = listingService.numberOfActiveFilters;
		this.#activeFilterCountElement.toggleAttribute('hidden', listingService.numberOfActiveFilters === 0);
	}

	#clearFilters() {
		for (const input of this.#form.querySelectorAll("input")) {
			if (input.matches("[type='checkbox']")) {
				input.checked = false;
			} else {
				input.value = '';
			}
		}
		this.#applyFilters();
	}
}

customElements.define("listing-filters", ListingFilters);
