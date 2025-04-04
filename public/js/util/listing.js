/**
 * @param {object} listing
 * @returns {string}
 */
export function renderPricePerNight(listing) {
	if (!listing.minimumPricePerNight) {
		if (listing.averagePricePerNight) {
			return `<span>${listing.averagePricePerNight}$</span> / nuit`;
		}

		return "Prix inconnu";
	}

	if (!listing.maximumPricePerNight) {
		return `<span>${listing.minimumPricePerNight}$</span> / nuit`;
	}

	if (listing.maximumPricePerNight == listing.minimumPricePerNight) {
		return `<span>${listing.maximumPricePerNight}$</span> / nuit`;
	}

	return `<span>${listing.minimumPricePerNight}$</span> - <span>${listing.maximumPricePerNight}$</span> / nuit`;
}

/**
 * @param {string} listingId
 */
export function getListingImageUrl(listingId) {
	let imgxUrl = `https://files.trouvetonchalet.ca/${listingId}/primary`;

	return imgxUrl;
}
