export class ListingServiceEvents {
	static EVENT_INITIALIZED = "listing_service_initialized";
	static EVENT_LOADING = "listing_service_loading";
	static EVENT_LOADED = "listing_service_loaded";
	static EVENT_FILTERS_CHANGED = "listing_service_filters_changed";

	/** The element on which events are triggered (and on which event listeners should be registered). */
	static get eventTarget() {
		return window;
	}
}

/**
 * Singleton service that handles searching and storing listings.
 *
 * Event listeners can be registered on the `ListingServiceEvents.eventTarget` element,
 * using the event constants defined as the `ListingServiceEvents.EVENT_XXX` class constants.
 */
class ListingService {
	/** @var {array} listings */
	#listings = [];

	/** Filters that will be used to search calls */
	#searchFilters = new URLSearchParams("");

	/** Whether the listings are being loaded right now */
	#isLoading = false;

	constructor() {
		// Load search and filtering data from the URL when possible.
		const url = new URL(location.href);
		this.searchRadius = url.searchParams.get("max_distance") ?? 150;
		this.latitude = url.searchParams.get("latitude") ?? "";
		this.longitude = url.searchParams.get("longitude") ?? "";

		ListingServiceEvents.eventTarget.dispatchEvent(new CustomEvent(ListingServiceEvents.EVENT_LOADING));
	}

	get isLoading() {
		return this.#isLoading;
	}

	get listings() {
		return this.#listings;
	}

	get searchRadius() {
		return this.#searchFilters.get("search_radius");
	}

	set searchRadius(radius) {
		return this.#searchFilters.set("search_radius", radius);
	}

	get latitude() {
		return this.#searchFilters.get("latitude");
	}

	set latitude(latitude) {
		return this.#searchFilters.set("latitude", latitude);
	}

	get longitude() {
		return this.#searchFilters.get("longitude");
	}

	set longitude(longitude) {
		return this.#searchFilters.set("longitude", longitude);
	}

	async updateCoordsWithUserGeolocation() {
		// Provide a default to load the map somewhere...
		if (!this.latitude) {
			this.latitude = 48.512461;
			this.longitude = -71.88658;
		}

		const geolocationPermission = await navigator.permissions.query({ name: "geolocation" });

		if (geolocationPermission.state == "denied") {
			return;
		}

		try {
			const userLocation = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition((position) => {
					resolve(position.coords);
				}, reject);
			});
			this.latitude = userLocation.latitude;
			this.longitude = userLocation.longitude;
		} catch (error) {
			console.error(error);
		}
	}

	async search() {
		if (this.#isLoading) {
			// @TODO: cancel previous request and make new one if the search query has changed
			return;
		}

		ListingServiceEvents.eventTarget.dispatchEvent(new CustomEvent(ListingServiceEvents.EVENT_LOADING));

		if (!this.latitude) {
			await this.updateCoordsWithUserGeolocation();
		}

		this.#isLoading = true;

		try {
			const url = new URL("/api/listing/search", window.location.origin);
			this.#searchFilters.forEach((value, key) => {
				url.searchParams.set(key, value);
			});

			const response = await fetch(url);
			const results = await response.json();

			this.#listings = results;
		} finally {
			this.#isLoading = false;
			ListingServiceEvents.eventTarget.dispatchEvent(new CustomEvent(ListingServiceEvents.EVENT_LOADED));
		}
	}
}

export const listingService = new ListingService();
