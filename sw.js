const cacheVersion = "v1119";
const filesToCache = ["favicon.ico"];

self.addEventListener("install", event => {
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(cacheVersion).then(cache => {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("activate", event => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheVersion) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  // console.log('[ServiceWorker] fetch', event.request);
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener("notificationclick", event => {
  const notification = event.notification;
  const action = event.action;
  const link = notification.data.link;
  const link_ok = notification.data.link_ok;
  const link_ng = notification.data.link_ng;
  switch (action) {
    case "yes":
      if (link_ok) {
        clients.openWindow(link_ok);
      }
      break;
    case "no":
      if (link_ng) {
        clients.openWindow(link_ng);
      }
      break;
    case "close":
      break;
    default:
      if (link) {
        clients.openWindow(link);
      }
      break;
  }
  notification.close();
  console.log("notificationclick action is", action);
});

self.addEventListener("push", event => {
  console.log("[Service Worker] Push Received.");
  if (event.data) {
    console.log(event.data.text());
    console.log(event.data);
  }
  const title = "後端 提示";
  const options = {
    body: "主動推送 通知"
    //,    icon: "./assets/images/android_048.png"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

console.log("sw.js");
