/**
 * @param {object} listing
 * @return {object} The GeoJSON feature object.
 */
export function convertListingToGeoJsonFeature(listing) {
	return {
		type: "Feature",
		properties: listing,
		geometry: {
			type: "Point",
			coordinates: [listing.longitude, listing.latitude],
		},
	};
}
