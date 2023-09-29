import { convertListingToGeoJsonFeature } from "../geojson.js";
import { ListingServiceEvents, listingService } from "../service/listing-service.js";
import "./listing-map-popup.js";

// @TODO: Replace spiderification by a single popup that allows you to paginate through all of the listings in a cluster

document.head.insertAdjacentHTML("beforeend", `
	<link rel="stylesheet" href="/ext/mapboxgl-spiderifier/index.css" />
	<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css">
`);

const sourceDataTemplate = {
	type: "FeatureCollection",
	features: [],
};

const stylesheet = document.createElement("style");
stylesheet.innerHTML = `
	listing-map { display: block; position: relative; }
	listing-map .map { width: 100%; height: 100%; }
	listing-map .empty-state-overlay { display: flex; justify-content: center; align-items: center; width: 100%; padding: .75rem 1rem; font-size: 1rem; font-weight: 600; text-align: center; color: white; background-color: var(--color-primary-800); background-color: color-mix(in srgb, var(--color-primary-800) 75%, transparent); backdrop-filter: blur(2px); position: absolute; bottom: 0; left: 0; z-index: 1000; pointer-events: none; }
	listing-map .search-here-overlay { display: flex; justify-content: center; align-items: center; width: 100%; padding: .75rem 1rem; font-size: 1rem; font-weight: 600; text-align: center; color: white; position: absolute; top: 0; left: 0; z-index: 1001; pointer-events: none; }
	listing-map .search-here-overlay button { animation: pulse 1s ease-in-out infinite alternate; pointer-events: auto; }
	listing-map [aria-hidden="true"] { display: none; }
	listing-map[aria-busy="true"]::after { content: 'Chargement...'; display: block; width: 100%; height: 100%; padding: 3rem 1.5rem; font-size: 1.1rem; font-weight: 600; color: var(--color-gray-900); text-align: center; background-color: rgb(255 255 255 / 50%); position: absolute; top: 0; left: 0; z-index: 1000; }
`;
document.head.append(stylesheet);

export class ListingMap extends HTMLElement {
	/** Mapbox public key. Provided via the `window.mapboxPublicKey` global. */
	#mapboxPublicKey = "";

	/** Mapbox map object */
	#map = null;

	/**
	 * Mapbox map initialization promise
	 * @var {Promise}
	 */
	#mapInitialization = null;

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

		this.innerHTML = `
			<div class="map"></div>
			<div class="empty-state-overlay" aria-hidden="true">
				Aucun résultats ne correspond à votre recherche.<br>
				Essayez d'adapter vos filtres ou de visionner un autre emplacement.
			</div>
			<div class="search-here-overlay" aria-hidden="true">
				<button type="button" class="primary">
					Chercher ici
					<i class="fas fa-search"></i>
				</button
			</div>
		`;

		this.#emptyStateOverlay = this.querySelector(".empty-state-overlay");
		this.#searchHereOverlay = this.querySelector(".search-here-overlay");
		this.#searchHereButton = this.#searchHereOverlay.querySelector("button");

		this.#searchHereButton.addEventListener("click", () => {
			this.#searchHereCallback();
		});

		ListingServiceEvents.eventTarget.addEventListener(ListingServiceEvents.EVENT_LOADING, () => {
			this.setAttribute("aria-busy", "true");
			this.#searchHereOverlay.setAttribute("aria-hidden", "true");
		});
		ListingServiceEvents.eventTarget.addEventListener(ListingServiceEvents.EVENT_LOADED, () => {
			this.setAttribute("aria-busy", "false");
			this.#searchHereOverlay.setAttribute("aria-hidden", "true");

			this.#mapInitialization.then(() => {
				this.#renderListings();

				if (listingService.latitude != this.#map.getCenter().lat) {
					const url = new URL(location.href);

					if (url.searchParams.get("search_radius")) {
						this.#map.setZoom(this.getZoomLevelFromSearchRadius(url.searchParams.get("search_radius")));
					}

					this.#map.panTo([listingService.longitude, listingService.latitude]);
				}
			});
		});
	}

	connectedCallback() {
		this.#mapboxPublicKey = window.mapboxPublicKey;

		if (!this.#mapboxPublicKey) {
			throw new Error("A valid Mapbox public key must be provided via the `window.mapboxPublicKey` global variable.");
		}

		this.#mapInitialization = this.#initializeMapbox().then(() => {
			listingService.search();
		});
	}

	async #initializeMapbox() {
		if (!listingService.latitude || !listingService.longitude) {
			await listingService.updateCoordsWithUserGeolocation();
		}

		const searchRadius = listingService.searchRadius;
		window.mapboxgl.accessToken = this.#mapboxPublicKey;

		const map = new window.mapboxgl.Map({
			container: this.querySelector(".map"),
			style: "mapbox://styles/mapbox/streets-v12",
			center: [listingService.longitude, listingService.latitude],
			zoom: this.getZoomLevelFromSearchRadius(searchRadius),
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

	getZoomLevelFromSearchRadius(searchRadius) {
		return searchRadius < 100 ? 10 : searchRadius < 200 ? 8 : searchRadius < 300 ? 7 : 6;
	}

	getSearchRadiusFromZoomLevel() {
		const mapBounds = this.#map.getBounds();
		const longitudeDiff = Math.abs(mapBounds._ne.lng - mapBounds._sw.lng);
		const latitudeDiff = Math.abs(mapBounds._ne.lng - mapBounds._sw.lng);
		const averageDiff = (longitudeDiff + latitudeDiff) / 2;
		const distanceInKm = averageDiff * 111.139;

		return Math.ceil(distanceInKm / 2);
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

	async #searchHereCallback() {
		// Update latitude and longitude based on map position
		listingService.latitude = this.#map.getCenter().lat;
		listingService.longitude = this.#map.getCenter().lng;
		listingService.searchRadius = this.getSearchRadiusFromZoomLevel();

		listingService.search();
	}

	#renderListings() {
		this.#emptyStateOverlay.setAttribute("aria-hidden", listingService.listings.length === 0 ? "false" : "true");

		this.#mapInitialization.then(() => {
			const source = this.#map.getSource("listings");
			const updatedData = sourceDataTemplate;
			updatedData.features = listingService.listings.map(convertListingToGeoJsonFeature);
			source.setData(updatedData);
		});
	}
}

customElements.define("listing-map", ListingMap);
