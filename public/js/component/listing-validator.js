import { ResetStylesheet, ButtonStylesheet, FontawesomeStylesheet, InputStylesheet } from "../global-stylesheets.js";
import "./listing-list-item.js";

const stylesheet = document.createElement("style");
stylesheet.innerHTML = `
	:host { display: block; }

	.success { padding: .5rem 1rem; margin-top: .5rem; font-size: .9rem; font-weight: 600; color: var(--color-success-900); background-color: var(--color-success-100); border-radius: .5rem; }
	.error { padding: .5rem 1rem; margin-top: .5rem; font-size: .9rem; font-weight: 600; color: var(--color-danger-900); background-color: var(--color-danger-100); border-radius: .5rem; }

	listing-list-item { width: min(24ch, 100%); margin: 1rem 0; padding: 0.75rem; border-radius: 0.7rem; box-shadow: 0 0 5px rgb(0 0 0 / 15%); }
	code pre { display: block; padding: 1ch; margin-top: 1ch; font-size: .7rem; white-space: pre-wrap; background-color: var(--color-gray-100); border-radius: 0.5ch; }
`;

export class ListingValidator extends HTMLElement {
	/**
	 * @type HTMLFormElement
	 */
	#form;

	/**
	 * @type HTMLButtonlement
	 */
	#button;

	/**
	 * @type HTMLElement
	 */
	#resultElement;

	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			${ResetStylesheet.outerHTML}
			${FontawesomeStylesheet.outerHTML}
			${InputStylesheet.outerHTML}
			${ButtonStylesheet.outerHTML}
			${stylesheet.outerHTML}

			<form id="validate-listing" method="POST">
				<div class="input-wrapper">
					<label for="url">Entrez l'URL de votre chalet</label>
					<input type="url" name="url" id="url">
				</div>

				<button type="submit">Vérifier</button>
			</form>
			<div id="listing-validation-result"></div>
		`;

		this.#form = this.shadowRoot.querySelector('form');
		this.#button = this.#form.querySelector('button');
		this.#resultElement = this.shadowRoot.querySelector('#listing-validation-result');

		this.#form.addEventListener('submit', e => this.#submitForm(e));
	}

	#submitForm(e) {
		e.preventDefault();

		this.#button.disabled = true;

		fetch('/api/host/listing-validator', {
			body: new FormData(this.#form),
			method: 'POST'
		}).then(response => {
			if (response.status != 200) {
				this.#resultElement.innerHTML = `
					<div class="error">Votre chalet ne semble pas être indexé par notre système présentement.</div>
				`;
				return;
			}

			response.json().then(
				response => {
					this.#resultElement.innerHTML = `
						<div class="success">Votre chalet est indexé par notre système!</div>
						<listing-list-item listing-id="${response.listing.id}"></listing-list-item>
						<br>
						<strong>Informations complètes</strong>
						<code><pre>${JSON.stringify(response, null, 4)}</pre></code>
					`;
				}
			)
		}).finally(() => {
			this.#button.disabled = false;
		});
	}
}

customElements.define("listing-validator", ListingValidator);
