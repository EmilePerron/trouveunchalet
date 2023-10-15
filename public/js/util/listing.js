export function renderPricePerNight(listing) {
	if (!listing.minimumPricePerNight) {
		if (listing.averagePricePerNight) {
			return `${listing.averagePricePerNight}$ / nuit`;
		}

		return "Prix inconnu";
	}

	if (listing.maximumPricePerNight == listing.minimumPricePerNight) {
		return `${listing.maximumPricePerNight}$ / nuit`;
	}

	return `<span>${listing.minimumPricePerNight}$</span> - <span>${listing.maximumPricePerNight}$</span> / nuit`;
}
