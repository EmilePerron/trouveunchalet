export function renderPricePerNight(listing) {
	if (!listing.minimumPricePerNight) {
		if (listing.averagePricePerNight) {
			return `<span>${listing.averagePricePerNight}$</span> / nuit`;
		}

		return "Prix inconnu";
	}

	if (listing.maximumPricePerNight == listing.minimumPricePerNight) {
		return `<span>${listing.maximumPricePerNight}$</span> / nuit`;
	}

	return `<span>${listing.minimumPricePerNight}$</span> - <span>${listing.maximumPricePerNight}$</span> / nuit`;
}
