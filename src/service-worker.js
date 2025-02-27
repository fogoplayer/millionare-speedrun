// @ts-nocheck remove later
const VERSION = "1.0.0";

// This is the "Offline copy of assets" service worker

const CACHE = "pwabuilder-offline";

importScripts("./libs/workbox-sw.js");

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp("/*"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
  })
);
