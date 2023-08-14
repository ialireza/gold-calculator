if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/sw.js")
        .then(reg => {
            console.log("Service worker registred successfully", reg);
        })
        .catch(err => {
            console.log("service worker not registred !!", err);
        });
}

const staticCacheName = "site-static-v1";
const cacheAssets = [
    "/",
    "/index.html",
    "/assets/css/bootstrap.rtl.min.css",
    "/assets/css/font-face.css",
    "/assets/js/bootstrap.min.js",
    "/assets/js/jquery-3.6.0.min.js",
];

self.addEventListener("install", evt => {
    evt.waitUntil(
        caches
            .open(staticCacheName)
            .then(cache => {
                console.log("caching assets...");
                cache.addAll(cacheAssets);
            })
            .catch(err => {
            })
    );
});

self.addEventListener("fetch", evt => {
    evt.respondWith(
        caches
            .match(evt.request)
            .then(res => {
                return res || fetch(evt.request);
            })
            .catch(err => {
                if (evt.request.url.indexOf(".html") > -1) {
                    return caches.match("./index.html");
                }
            })
    );
});