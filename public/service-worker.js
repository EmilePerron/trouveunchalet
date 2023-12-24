
// Based off of https://github.com/pwa-builder/PWABuilder/blob/main/docs/sw.js

/*
  Welcome to our basic Service Worker! This Service Worker offers a basic offline experience
  while also being easily customizeable. You can add in your own code to implement the capabilities
  listed below, or change anything else you would like.


  Need an introduction to Service Workers? Check our docs here: https://docs.pwabuilder.com/#/home/sw-intro
  Want to learn more about how our Service Worker generation works? Check our docs here: https://docs.pwabuilder.com/#/studio/existing-app?id=add-a-service-worker

  Did you know that Service Workers offer many more capabilities than just offline?
	- Background Sync: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/06
	- Periodic Background Sync: https://web.dev/periodic-background-sync/
	- Push Notifications: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/07?id=push-notifications-on-the-web
	- Badges: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/07?id=application-badges
*/

// The cache release suffix will be changed with every new release in production environments
const CACHE_RELEASE_SUFFIX = "SUFFIX_PLACEHOLDER";
const CACHE_NAME = `pwa-cache-${CACHE_RELEASE_SUFFIX}`;

// The Util Function to hack URLs of intercepted requests
const getFixedUrl = (req) => {
	var now = Date.now()
	var url = new URL(req.url)

	// 1. fixed http URL
	// Just keep syncing with location.protocol
	// fetch(httpURL) belongs to active mixed content.
	// And fetch(httpRequest) is not supported yet.
	url.protocol = self.location.protocol

	// 2. add query for caching-busting.
	// Github Pages served with Cache-Control: max-age=600
	// max-age on mutable content is error-prone, with SW life of bugs can even extend.
	// Until cache mode of Fetch API landed, we have to workaround cache-busting with query string.
	// Cache-Control-Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=453190
	if (url.hostname === self.location.hostname) {
		url.search += (url.search ? '&' : '?') + 'cache-bust=' + now
	}
	return url.href
}

/**
 *  @Lifecycle Activate
 *  New one activated when old isnt being used.
 *
 *  waitUntil(): activating ====> activated
 */
self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
});

/**
 *  @Functional Fetch
 *  All network requests are being intercepted here.
 *
 *  void respondWith(Promise<Response> r)
 */
self.addEventListener('fetch', event => {
	if (event.request.method !== "GET") {
		return;
	}

	const requestUrl = new URL(event.request.url);

	// Use the stale-while-revalidate approach for local scripts, stylesheets, images, etc.
	if (requestUrl.hostname !== self.location.hostname || !/\.(js|css|svg|png|jpg|jpeg)$/.test(requestUrl.pathname)) {
		return;
	}

	console.log(requestUrl);

	// Stale-while-revalidate
	// similar to HTTP's stale-while-revalidate: https://www.mnot.net/blog/2007/12/12/stale
	// Upgrade from Jake's to Surma's: https://gist.github.com/surma/eb441223daaedf880801ad80006389f1
	const cached = caches.open(CACHE_NAME).then((cache) => cache.match(event.request));
	const fixedUrl = getFixedUrl(event.request);
	const fetched = fetch(fixedUrl, { cache: 'no-store' });
	const fetchedCopy = fetched.then(resp => resp.clone());

	// Call respondWith() with whatever we get first.
	// If the fetch fails (e.g disconnected), wait for the cache.
	// If there’s nothing in cache, wait for the fetch.
	// If neither yields a response, return offline pages.
	event.respondWith(
		Promise.race([fetched.catch(_ => cached), cached])
			.then(resp => resp || fetched)
			.catch(_ => { /* eat any errors */ })
	);

	// Update the cache with the version we fetched (only for ok status)
	event.waitUntil(
		Promise.all([fetchedCopy, caches.open(CACHE_NAME)])
			.then(([response, cache]) => {
					// Do not cache PDF files
					if (response.headers.get('content-type') == 'application/pdf') {
						return;
					}

					if (response.ok && !response.redirected) {
						cache.put(event.request, response);
					}
				})
			.catch(_ => { /* eat any errors */ })
	);
});

// Forces the newly updated service worker to replace the existing one
self.addEventListener('install', () => {
    self.skipWaiting();
});
