var REQUIRED_ASSETS = [
  'index.html',
  'js/bundle.js',
  'css/style.min.css',
  'assets/emoji.json',
  'assets/images/n1.png',
  'assets/images/n2.png',
  'assets/images/n3.png',
  'assets/images/n4.png',
  'assets/images/n5.png',
  'assets/images/n6.png',
  'assets/images/n7.png',
  'assets/images/n8.png',
  'assets/images/n9.png',
  'assets/images/n10.png'
];

self.addEventListener('install', function (evt) {
  evt.waitUntil(
    caches.open('nippler-cache')
      .then(function (cache) {
        return cache.addAll(REQUIRED_ASSETS)
      })
  )
});

self.addEventListener('fetch', function (evt) {
  evt.respondWith(
    caches.match(evt.request)
      .then(function (res) {
        if (res) {
          return res
        } else {
          return fetch(evt.request)
        }
      })
  )
});

self.addEventListener('activate', function (evt) {
  evt.waitUntil(self.clients.claim())
});
