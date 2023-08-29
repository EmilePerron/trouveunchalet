import "./listing-map-popup.js";
import "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js";

const markerHeight = 50;
const markerRadius = 10;
const linearOffset = 25;
const popupOffsets = {
	top: [0, 0],
	"top-left": [0, 0],
	"top-right": [0, 0],
	bottom: [0, -markerHeight],
	"bottom-left": [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
	"bottom-right": [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
	left: [markerRadius, (markerHeight - markerRadius) * -1],
	right: [-markerRadius, (markerHeight - markerRadius) * -1],
};

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(`
	listing-map { display: block; position: relative; }
	listing-map .map { width: 100%; height: 100%; }
	listing-map .empty-state-overlay { display: flex; justify-content: center; align-items: center; width: 100%; padding: .75rem 1rem; font-size: 1rem; font-weight: 600; text-align: center; color: white; background-color: var(--color-primary-800); background-color: color-mix(in srgb, var(--color-primary-800) 75%, transparent); backdrop-filter: blur(2px); position: absolute; bottom: 0; left: 0; z-index: 1000; pointer-events: none; }
	listing-map .search-here-overlay { display: flex; justify-content: center; align-items: center; width: 100%; padding: .75rem 1rem; font-size: 1rem; font-weight: 600; text-align: center; color: white; position: absolute; top: 0; left: 0; z-index: 1001; pointer-events: none; }
	listing-map .search-here-overlay button { pointer-events: auto; }
	listing-map [aria-hidden="true"] { display: none; }
`);

export class ListingMap extends HTMLElement {
	/** @var {array} listings */
	#listings = [];

	/** Mapbox public key. Provided via the `mapbox-public-key` attribute. */
	#mapboxPublicKey = "";

	/** Filters that will be used to search calls */
	#searchFilters = new URLSearchParams("");

	/** Whether the listings are being loaded right now */
	#isLoading = false;

	/** Mapbox map object */
	#map = null;

	/** @var {HTMLElement} #emptyStateOverlay */
	#emptyStateOverlay;

	/** @var {HTMLElement} #searchHereOverlay */
	#searchHereOverlay;

	/** @var {HTMLButtonElement} #searchHereButton */
	#searchHereButton;

	constructor() {
		super();

		document.adoptedStyleSheets.push(stylesheet);
		this.innerHTML = `
			<div class="map"></div>
			<div class="empty-state-overlay" aria-hidden="true">
				Aucun résultats ne correspond à votre recherche.<br>
				Essayez d'adapter vos filtres ou de visionner un autre emplacement.
			</div>
			<div class="search-here-overlay" aria-hidden="true">
				<button type="button">Chercher ici</button
			</div>
		`;

		this.#emptyStateOverlay = this.querySelector(".empty-state-overlay");
		this.#searchHereOverlay = this.querySelector(".search-here-overlay");
		this.#searchHereButton = this.#searchHereOverlay.querySelector("button");

		this.#searchHereButton.addEventListener("click", () => {
			this.#searchHereCallback();
		});
	}

	connectedCallback() {
		this.#mapboxPublicKey = this.getAttribute("mapbox-public-key");

		if (!this.#mapboxPublicKey) {
			throw new Error("A valid Mapbox public key must be provided via the `mapbox-public-key` attribute.");
		}

		// Load search and filtering data from the URL when possible.
		const url = new URL(location.href);
		this.#searchFilters.set("search_radius", url.searchParams.get("max_distance") ?? 150);
		this.#searchFilters.set("latitude", url.searchParams.get("latitude") ?? "");
		this.#searchFilters.set("longitude", url.searchParams.get("longitude") ?? "");

		this.#initializeMapbox();
		this.#search();
	}

	async #getSearchCoords() {
		let latitude = this.#searchFilters.get("latitude");
		let longitude = this.#searchFilters.get("longitude");

		if (!latitude || !longitude) {
			const geolocationPermission = await navigator.permissions.query({ name: "geolocation" });

			if (geolocationPermission.state == "granted") {
				try {
					const userLocation = await new Promise((resolve, reject) => {
						navigator.geolocation.getCurrentPosition((position) => {
							resolve(position.coords);
						}, reject);
					});
					latitude = userLocation.latitude;
					longitude = userLocation.longitude;
				} catch (error) {
					// oh well.
				}
			}

			// Provide a default to load the map somewhere...
			if (!latitude || !longitude) {
				latitude = 48.512461;
				longitude = -71.88658;
			}
		}

		return { latitude, longitude };
	}

	async #initializeMapbox() {
		const coords = await this.#getSearchCoords();
		const maxDistance = this.#searchFilters.get("search_radius");
		mapboxgl.accessToken = this.#mapboxPublicKey;

		this.#map = new mapboxgl.Map({
			container: this.querySelector(".map"),
			style: "mapbox://styles/mapbox/streets-v12",
			center: [coords.longitude, coords.latitude],
			zoom: maxDistance < 100 ? 10 : maxDistance < 200 ? 8 : maxDistance < 300 ? 7 : 6,
		});
	}

	async #search() {
		if (this.#isLoading) {
			return;
		}

		if (!this.#searchFilters.get("latitude")) {
			const coords = await this.#getSearchCoords();
			this.#searchFilters.set("latitude", coords.latitude);
			this.#searchFilters.set("longitude", coords.longitude);
		}

		this.#isLoading = true;
		this.setAttribute("aria-busy", "true");

		try {
			const url = new URL("/api/listing/search", window.location.origin);
			this.#searchFilters.forEach((value, key) => {
				url.searchParams.set(key, value);
			});

			const response = await fetch(url);
			const results = await response.json();

			this.#listings = results;
			this.#renderListings();
		} finally {
			this.#isLoading = false;
			this.setAttribute("aria-busy", "false");
		}
	}

	async #searchHereCallback() {
		// Update latitude and longitude based on map position
		this.#searchFilters.set("latitude", this.#map.getCenter().lat);
		this.#searchFilters.set("longitude", this.#map.getCenter().lng);

		this.#search();
	}

	#renderListings() {
		this.#emptyStateOverlay.setAttribute("aria-hidden", this.#listings.length === 0 ? "false" : "true");

		console.log(this.#listings);
		for (const listing of this.#listings) {
			new mapboxgl.Marker()
				.setLngLat([listing.longitude, listing.latitude])
				.setPopup(
					new mapboxgl.Popup({ offset: popupOffsets, className: "listing-popup" })
						.setLngLat([listing.longitude, listing.latitude])
						.setHTML(
							`
							<listing-map-popup listing-data="${JSON.stringify(listing).replaceAll('"', "&#34;")}"></listing-map-popup>
						`
						)
						.setMaxWidth(null)
						.addTo(this.#map)
				)
				.addTo(this.#map);
		}
	}
}

customElements.define("listing-map", ListingMap);
