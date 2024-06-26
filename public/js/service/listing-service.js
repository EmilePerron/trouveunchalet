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

const cache = {};

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

	/** The previous search query as a URL search params string. Allows us to prevent duplicate requests. */
	#previousSearchQuery = "";

	/** Used to cancel old fetch requests that aren't wanted anymore. */
	#abortController = new AbortController();

	/** Whether the service has been used to load any data so far. */
	#hasBeenUsed = false;

	constructor() {
		// Load search and filtering data from the URL when possible.
		const url = new URL(location.href);
		this.searchRadius = url.searchParams.get("search_radius") ?? 125;
		this.latitude = url.searchParams.get("latitude") ?? "";
		this.longitude = url.searchParams.get("longitude") ?? "";
		this.numberOfGuests = url.searchParams.get("number_of_guests") ?? "";
		this.numberOfBedrooms = url.searchParams.get("number_of_bedrooms") ?? "";
		this.dogsAllowed = (url.searchParams.get("dogs_allowed") ?? "") == 1 ? 1 : 0;
		this.hasWifi = (url.searchParams.get("has_wifi") ?? "") == 1 ? 1 : 0;
		this.hasFireplace = (url.searchParams.get("has_fireplace") ?? "") == 1 ? 1 : 0;
		this.hasWoodStove = (url.searchParams.get("has_wood_stove") ?? "") == 1 ? 1 : 0;
		this.dateArrival = url.searchParams.get("date_arrival") ?? "";
		this.dateDeparture = url.searchParams.get("date_departure") ?? "";

		ListingServiceEvents.eventTarget.dispatchEvent(new CustomEvent(ListingServiceEvents.EVENT_LOADING));

		// Listen for links that would change the search filters to run them in-page instead.
		window.addEventListener("click", (e) => {
			if (!e.target.matches("a, a *")) {
				return;
			}

			if (!this.#hasBeenUsed) {
				return;
			}

			const linkUrl = new URL(e.target.closest("a").href);

			if (linkUrl.searchParams.get("latitude")) {
				e.preventDefault();

				for (const key of linkUrl.searchParams.keys()) {
					this.#searchFilters.set(key, linkUrl.searchParams.get(key));
				}

				this.search();
			}
		});
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

	get dogsAllowed() {
		return this.#searchFilters.get("dogs_allowed") == 1 ? 1 : 0;
	}

	set dogsAllowed(dogsAllowed) {
		return this.#searchFilters.set("dogs_allowed", dogsAllowed);
	}

	get numberOfGuests() {
		return this.#searchFilters.get("number_of_guests") ?? "";
	}

	set numberOfGuests(numberOfGuests) {
		return this.#searchFilters.set("number_of_guests", numberOfGuests);
	}

	get numberOfBedrooms() {
		return this.#searchFilters.get("number_of_bedrooms") ?? "";
	}

	set numberOfBedrooms(numberOfBedrooms) {
		return this.#searchFilters.set("number_of_bedrooms", numberOfBedrooms);
	}

	get dogsAllowed() {
		return this.#searchFilters.get("dogs_allowed") == 1 ? 1 : 0;
	}

	set dogsAllowed(dogsAllowed) {
		return this.#searchFilters.set("dogs_allowed", dogsAllowed);
	}

	get hasWifi() {
		return this.#searchFilters.get("has_wifi") == 1 ? 1 : 0;
	}

	set hasWifi(hasWifi) {
		return this.#searchFilters.set("has_wifi", hasWifi);
	}

	get hasFireplace() {
		return this.#searchFilters.get("has_fireplace") == 1 ? 1 : 0;
	}

	set hasFireplace(hasFireplace) {
		return this.#searchFilters.set("has_fireplace", hasFireplace);
	}

	get hasWoodStove() {
		return this.#searchFilters.get("has_fireplace") == 1 ? 1 : 0;
	}

	set hasWoodStove(hasWoodStove) {
		return this.#searchFilters.set("has_wood_stove", hasWoodStove);
	}

	get dateArrival() {
		return this.#searchFilters.get("date_arrival");
	}

	set dateArrival(dateArrival) {
		return this.#searchFilters.set("date_arrival", dateArrival);
	}

	get dateDeparture() {
		return this.#searchFilters.get("date_departure");
	}

	set dateDeparture(dateDeparture) {
		return this.#searchFilters.set("date_departure", dateDeparture);
	}

	get numberOfActiveFilters() {
		let activeFilterCount = 0;
		const excludedKeys = ['search_radius', 'latitude', 'longitude', 'date_departure'];

		for (const [key, value] of this.#searchFilters.entries()) {
			if (excludedKeys.includes(key) || value === '' || value == 0) {
				continue;
			}

			activeFilterCount++;
		}

		return activeFilterCount;
	}

	async updateCoordsWithUserGeolocation() {
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
			this.searchRadius = 150;
		} catch (error) {
			console.error(error);
		}
	}

	async search(scrollToTop = true) {
		this.#hasBeenUsed = true;

		// If the search query hasn't changed, do not query for it again.
		if (this.#previousSearchQuery == this.#searchFilters.toString()) {
			return;
		}

		if (this.#isLoading) {
			this.#abortController.abort("A newer search query has been submitted.");
			this.#abortController = new AbortController();
		}

		ListingServiceEvents.eventTarget.dispatchEvent(new CustomEvent(ListingServiceEvents.EVENT_LOADING));

		if (!this.latitude) {
			// Provide a default to load the map somewhere...
			this.latitude = 48.512461;
			this.longitude = -71.88658;
		}

		this.#updateUrlToMatchSearchFilters();

		this.#isLoading = true;
		this.#previousSearchQuery = this.#searchFilters.toString();

		try {
			const url = new URL("/api/listing/search", window.location.origin);
			this.#searchFilters.forEach((value, key) => {
				url.searchParams.set(key, value);
			});

			const response = await fetch(url, { signal: this.#abortController.signal });
			const results = await response.json();

			this.#listings = results;
			this.#isLoading = false;
			this.#cacheListings(results);

			ListingServiceEvents.eventTarget.dispatchEvent(new CustomEvent(ListingServiceEvents.EVENT_LOADED, { detail: { scrollToTop }}));
		} catch (err) {
			if (err.name != "AbortError") {
				throw err;
			}
		}
	}

	async getListing(listingId) {
		if (cache[listingId] !== undefined) {
			return cache[listingId];
		}

		const response = await fetch(`/api/listing/get/${listingId}`);
		const listing = await response.json();

		cache[listing.id] = listing

		return listing;
	}

	#cacheListings(listings) {
		for (const listing of listings) {
			cache[listing.id] = listing;
		}
	}

	#updateUrlToMatchSearchFilters() {
		const url = new URL(`${location.origin}${location.pathname}?${this.#searchFilters.toString()}`).toString();

		if (url !== window.location.href) {
			history.pushState({}, "", url);
		}
	}
}

export const listingService = new ListingService();
