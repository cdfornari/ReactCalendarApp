importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.loadModule('workbox-background-sync');
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const {registerRoute} = workbox.routing;
const {CacheFirst,NetworkFirst,NetworkOnly} = workbox.strategies;
const {BackgroundSyncPlugin} = workbox.backgroundSync;

const cacheNF = [
    '/api/auth/renew',
    '/api/events'
]

registerRoute(
    ({req,url}) => cacheNF.includes(url.pathname) ? true : false,
    new NetworkFirst()
)

const cacheCF = [
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
]

registerRoute(
    ({req,url}) => cacheCF.includes(url.href) ? true : false,
    new CacheFirst()
)

//offline requests

const bgSyncPlugin = new BackgroundSyncPlugin('offline-requests', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
    ({req,url}) => url.pathname === '/api/events' ? true : false,
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
)

registerRoute(
    ({req,url}) => url.pathname.includes('/api/events/') ? true : false,
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'PUT'
)

registerRoute(
    ({req,url}) => url.pathname.includes('/api/events/') ? true : false,
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'DELETE'
)