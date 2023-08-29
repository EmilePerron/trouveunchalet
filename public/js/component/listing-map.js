import { convertListingToGeoJsonFeature } from "../geojson.js";
import "./listing-map-popup.js";

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
const sourceDataTemplate = {
	type: "FeatureCollection",
	features: [],
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

	/** Mapbox spiderifier instance */
	#spiderifier = null;

	/** Mapbox popup instance */
	#previousPopup = null;

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

		this.#initializeMapbox().then(() => {
			this.#search();
		});
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

		const map = new mapboxgl.Map({
			container: this.querySelector(".map"),
			style: "mapbox://styles/mapbox/streets-v12",
			center: [coords.longitude, coords.latitude],
			zoom: maxDistance < 100 ? 10 : maxDistance < 200 ? 8 : maxDistance < 300 ? 7 : 6,
		});
		this.#map = map;

		map.on("move", () => {
			this.#searchHereOverlay.setAttribute("aria-hidden", "false");
		});

		this.#spiderifier = new MapboxglSpiderifier(map, {
			onClick: (e, spiderLeg) => {
				e.preventDefault();
				e.stopPropagation();

				if (this.#previousPopup) {
					this.#previousPopup.remove();
				}

				var popup = this.createListingPopup(spiderLeg.feature, MapboxglSpiderifier.popupOffsetForSpiderLeg(spiderLeg));
				spiderLeg.mapboxMarker.setPopup(popup);
				popup.addTo(map);

				this.#previousPopup = popup;
			},
		});

		await new Promise((resolve) => {
			map.on("load", () => {
				map.addSource("listings", {
					type: "geojson",
					data: sourceDataTemplate,
					cluster: true,
					// clusterMaxZoom: 15, // Max zoom to cluster points on
					clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
				});

				map.addLayer({
					id: "clusters",
					type: "circle",
					source: "listings",
					filter: ["has", "point_count"],
					paint: {
						// Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
						// with three steps to implement three types of circles:
						//   * Blue, 20px circles when point count is less than 10
						//   * Yellow, 30px circles when point count is between 10 and 25
						//   * Pink, 40px circles when point count is greater than or equal to 25
						"circle-color": ["step", ["get", "point_count"], "#437055", 10, "#30503d", 30, "#1d3025"],
						"circle-radius": ["step", ["get", "point_count"], 20, 10, 30, 30, 40],
					},
				});

				map.addLayer({
					id: "cluster-count",
					type: "symbol",
					source: "listings",
					filter: ["has", "point_count"],
					layout: {
						"text-field": ["get", "point_count_abbreviated"],
						"text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
						"text-size": 14,
					},
					paint: {
						"text-color": "#ffffff",
					},
				});

				map.addLayer({
					id: "unclustered-point",
					type: "circle",
					source: "listings",
					filter: ["!", ["has", "point_count"]],
					paint: {
						"circle-color": "#56906e",
						"circle-radius": 10,
						"circle-stroke-width": 1,
						"circle-stroke-color": "#fff",
					},
				});

				map.on("zoom", (e) => {
					this.#spiderifier.unspiderfy();
				});

				// Zoom in on a cluster on click
				map.on("click", "clusters", async (e) => {
					const features = map.queryRenderedFeatures(e.point, {
						layers: ["clusters"],
					});

					if (!features.length) {
						return;
					}

					const clusterId = features[0].properties.cluster_id;
					const source = map.getSource("listings");

					const clusterChildren = await new Promise((resolve, reject) => {
						source.getClusterChildren(clusterId, (error, children) => {
							if (error) {
								reject(error);
							} else {
								resolve(children);
							}
						});
					});

					let shouldSpiderResults = true;
					let previousCoordinate = clusterChildren[0].geometry.coordinates;

					for (const children of clusterChildren) {
						if (children.geometry.coordinates[0] !== previousCoordinate[0] || children.geometry.coordinates[1] !== previousCoordinate[1]) {
							shouldSpiderResults = false;
							break;
						}
					}

					if (shouldSpiderResults) {
						map.getSource("listings").getClusterLeaves(clusterId, 50, 0, (err, leafFeatures) => {
							if (err) {
								return console.error("error while getting leaves of a cluster", err);
							}
							var markers = leafFeatures.map((leafFeature) => leafFeature.properties);
							this.#spiderifier.spiderfy(features[0].geometry.coordinates, markers);
						});
					} else {
						map.getSource("listings").getClusterExpansionZoom(clusterId, (err, zoom) => {
							if (err) {
								console.error(err);
								return;
							}

							map.easeTo({
								center: features[0].geometry.coordinates,
								zoom: zoom,
							});
						});
					}
				});

				// When clicking on a specific point...
				map.on("click", "unclustered-point", (e) => {
					const coordinates = e.features[0].geometry.coordinates.slice();
					const listing = e.features[0].properties;

					// Ensure that if the map is zoomed out such that
					// multiple copies of the feature are visible, the
					// popup appears over the copy being pointed to.
					while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
						coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
					}

					this.createListingPopup(listing, coordinates).addTo(map);
				});

				map.on("mouseenter", "unclustered-point", () => {
					map.getCanvas().style.cursor = "pointer";
				});
				map.on("mouseleave", "unclustered-point", () => {
					map.getCanvas().style.cursor = "";
				});

				map.on("mouseenter", "clusters", () => {
					map.getCanvas().style.cursor = "pointer";
				});
				map.on("mouseleave", "clusters", () => {
					map.getCanvas().style.cursor = "";
				});

				resolve();
			});
		});
	}

	createListingPopup(listing, coordinatesOrOffset) {
		const popup = new mapboxgl.Popup({
			closeOnClick: true,
		})
			.setHTML(`<listing-map-popup listing-data="${JSON.stringify(listing).replaceAll('"', "&#34;")}"></listing-map-popup>`)
			.setMaxWidth(null);

		if (Array.isArray(coordinatesOrOffset)) {
			popup.setLngLat(coordinatesOrOffset);
		} else {
			popup.setOffset(coordinatesOrOffset);
		}

		return popup;
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
		this.#searchHereOverlay.setAttribute("aria-hidden", "true");

		// Update latitude and longitude based on map position
		this.#searchFilters.set("latitude", this.#map.getCenter().lat);
		this.#searchFilters.set("longitude", this.#map.getCenter().lng);

		this.#search();
	}

	#renderListings() {
		this.#emptyStateOverlay.setAttribute("aria-hidden", this.#listings.length === 0 ? "false" : "true");

		const source = this.#map.getSource("listings");
		const updatedData = sourceDataTemplate;
		updatedData.features = this.#listings.map(convertListingToGeoJsonFeature);
		source.setData(updatedData);
	}
}

customElements.define("listing-map", ListingMap);
