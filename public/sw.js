/* itzen.ai service worker — network-first for navigation, cache-first for assets.
   Bump CACHE on each deploy to invalidate old caches. */
const CACHE = "itzen-ai-v1";
const CORE = ["/", "/index.html", "/manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // Never cache analytics / cross-origin API calls.
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first, fall back to cached shell (offline support).
  if (request.mode === "navigate") {
    e.respondWith(
      fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put("/index.html", copy));
        return res;
      }).catch(() => caches.match("/index.html"))
    );
    return;
  }

  // Static assets: cache-first, then network.
  e.respondWith(
    caches.match(request).then((cached) =>
      cached ||
      fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(request, copy));
        return res;
      })
    )
  );
});
