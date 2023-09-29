function getTimezoneOffset(timeZone = 'UTC', date = new Date()) {
	const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
	const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));

	return (tzDate.getTime() - utcDate.getTime()) / 6e4;
}

const quebecTimezoneOffset = getTimezoneOffset("America/Toronto");

export function getCurrentDateInQuebec() {
	const userDate = new Date();
	const userTimezoneOffset = userDate.getTimezoneOffset()

	return new Date(userDate.getTime() - (userTimezoneOffset * 60 * 1000) + quebecTimezoneOffset);
}
