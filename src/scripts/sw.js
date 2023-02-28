// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', () => {
  // eslint-disable-next-line no-console
  console.log('Installing Service Worker ...');

  // TODO: Caching App Shell Resource
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', () => {
  // eslint-disable-next-line no-console
  console.log('Activating Service Worker ...');

  // TODO: Delete old caches
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  // eslint-disable-next-line no-console
  console.log(event.request);

  event.respondWith(fetch(event.request));
  // TODO: Add/get fetch request to/from caches
});
