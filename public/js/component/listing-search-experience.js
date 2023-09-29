import "./listing-filters.js";
import "./listing-list.js"
import "./listing-map.js"

const stylesheet = document.createElement("style");
stylesheet.innerHTML = `
	listing-search-experience { }
	listing-search-experience .header { display: flex; justify-content: space-between; align-items: flex-start; padding: 1rem 0; margin-bottom: 1.5rem; background-color: #fff; border-bottom: 1px solid var(--color-gray-100); position: sticky; top: 0; z-index: 5; }
	listing-search-experience [role="tablist"] { display: flex; justify-content: flex-start; gap: 1ch; }
`;
document.head.append(stylesheet);

export class ListingSearchExperience extends HTMLElement {
	constructor() {
		super();

		this.innerHTML = `
			<div class="header">
				<div class="tabs" id="result-tabs-wrapper">
					<div role="tablist" aria-label="Mode de visionnement">
						<button role="tab" aria-selected="true" aria-controls="panel-list" id="tab-list" tabindex="0">
							<i class="fas fa-grid-2" aria-label=""></i>
							Grille
						</button>
						<button role="tab" aria-selected="false" aria-controls="panel-map" id="tab-map" tabindex="-1">
							<i class="fas fa-map-location-dot" aria-label=""></i>
							Carte
						</button>
					</div>
				</div>
				<listing-filters></listing-filters>
			</div>
			<div id="panel-list" role="tabpanel" tabindex="0" aria-labelledby="tab-list">
				<listing-list></listing-list>
			</div>
			<div id="panel-map" role="tabpanel" tabindex="0" aria-labelledby="tab-map" hidden>
				<listing-map></listing-map>
			</div>
		`;

		window.addEventListener("DOMContentLoaded", () => {
			const tabs = this.querySelectorAll('[role="tab"]');
			const tabList = this.querySelector('[role="tablist"]');

			const changeTabs = (e) => {
				const target = e.target.closest('button');

				// Remove all current selected tabs
				this
					.querySelectorAll('[aria-selected="true"]')
					.forEach((t) => t.setAttribute("aria-selected", false));

				// Set this tab as selected
				target.setAttribute("aria-selected", true);

				// Hide all tab panels
				this
					.querySelectorAll('[role="tabpanel"]')
					.forEach((p) => p.setAttribute("hidden", true));

				// Show the selected panel
				this
					.querySelector(`#${target.getAttribute("aria-controls")}`)
					.removeAttribute("hidden");

				// Trigger a window resize event, as some widgets don't initialize correctly when hidden (e.g. map)
				window.dispatchEvent(new Event("resize"));
			}

			// Add a click event handler to each tab
			tabs.forEach((tab) => {
				tab.addEventListener("click", changeTabs);
			});

			// Enable arrow navigation between tabs in the tab list
			let tabFocus = 0;

			tabList.addEventListener("keydown", (e) => {
				// Move right
				if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
					tabs[tabFocus].setAttribute("tabindex", -1);
					if (e.key === "ArrowRight") {
						tabFocus++;
						// If we're at the end, go to the start
						if (tabFocus >= tabs.length) {
						tabFocus = 0;
						}
						// Move left
					} else if (e.key === "ArrowLeft") {
						tabFocus--;
						// If we're at the start, move to the end
						if (tabFocus < 0) {
						tabFocus = tabs.length - 1;
						}
					}

					tabs[tabFocus].setAttribute("tabindex", 0);
					tabs[tabFocus].focus();
				}
			});
		});
	}
}

customElements.define("listing-search-experience", ListingSearchExperience);
