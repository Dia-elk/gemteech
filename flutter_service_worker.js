'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "eec07f4f9cadbc72a9396f0c4023b1d9",
"index.html": "ba961603564d633713148f564c32ba4e",
"/": "ba961603564d633713148f564c32ba4e",
"main.dart.js": "7f38e40de3040b3344128b2b29e45a98",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"favicon.png": "abca93463f424f58be2817563ba46289",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "5c4af59f6dc44a57e6d124f9299f68aa",
"assets/images/manReview.png": "edadf7b7290ecd891a00b58b129cbb57",
"assets/images/bgDisplay.png": "6e9d4eb5d6dce175d16c629563a28223",
"assets/images/8.png": "025d586b8fcef542b1ab8089557d7f4c",
"assets/images/9.png": "2c240fa9e102ca0faeae0acf6fa27ac2",
"assets/images/dot.svg": "5d9ba3429a1c17b761af60898e35e850",
"assets/images/14.png": "1b3ee1ec7612eba0b1eb35f8752e78c1",
"assets/images/thirdR.svg": "e4350c27c774bcad4652c1f8fa5b4078",
"assets/images/logoWhite.svg": "44fd59b61b1274df916ea1707c1fb1c5",
"assets/images/terms.svg": "d90addcf62be88f32bc09c387c09b6f5",
"assets/images/15.png": "33437a8d6b1b65fe0c1484698151437c",
"assets/images/firstR.svg": "141b3c6c534b39960d81c0ec87d79415",
"assets/images/12.png": "9e0b94c7e4ec5bb1d1edf5aa68d9ed91",
"assets/images/13.png": "9e0b94c7e4ec5bb1d1edf5aa68d9ed91",
"assets/images/refund.svg": "51580339ecbf7d20008bdbb25624f1c6",
"assets/images/11.png": "b4b1a40d44c684e85e1b3668de508095",
"assets/images/10.png": "cadb20a93d6d22d11dbf5687f4fd5763",
"assets/images/secondR.svg": "47b3c38794b0da8cc36d3666927409dd",
"assets/images/bg.svg": "10ee61428cc7872998ce5e6b5029cc23",
"assets/images/drawerBg.png": "2374a4054db454433cc851b898edb67f",
"assets/images/popularBg.png": "29e2b6df65255c45853c27e25a7d895f",
"assets/images/footerBg.png": "79c560814a8244304e1281d80523b893",
"assets/images/4.png": "47b5a229bb1446e09b69f44991939df8",
"assets/images/5.png": "c795a4f83e88c47a94256d1a69396395",
"assets/images/7.png": "2fd9a98c4d234c10e22599c092f261df",
"assets/images/display.svg": "b20e6539f71e1edb02efeb2cbf9e12c7",
"assets/images/6.png": "f1f7f712c930f87438ac76a0d959b27c",
"assets/images/logo.svg": "d71e17624320464d498937c1e98559cd",
"assets/images/2.png": "15725b3eb2dd516b0c88fe8c8d995b62",
"assets/images/girlReview.png": "79adc053fb9d12d8b894f5a744af6140",
"assets/images/3.png": "083f1155817c687416b3fb3a103db4b3",
"assets/images/1.png": "ef45564aeb19bd481621a509d9fa5611",
"assets/images/bg.png": "c0cabbe440406a6f680cda621851b81d",
"assets/images/Privacy.svg": "d8fea731a24229c689319a2d8128c629",
"assets/AssetManifest.json": "0ee1ae5c3da8ce4f6dccc9eb1c9c14ac",
"assets/NOTICES": "f884b98872f60cde8da401fcc764491a",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "042d2d5435acf4c1d9464c6f3020d16f",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"favicon.svg": "3f0583385ba29cfa6ac80fb67929a7b9",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
