const HTMLToCache = "/";
const urlsToCache = [];
const version = "1.0.0v`";
let self = this

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(version).then(cache => {
      console.log("opened cache");
      return cache.addAll(urlsToCache);
    })
  );

  self.skipWaiting()
});


self.addEventListener("activate", async function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (version !== cacheName) return caches.delete(cacheName);
          })
        )
      )
      .then(self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const requestToFetch = event.request.clone();
  event.respondWith(
    caches.match(event.request.clone()).then((cached) => {
      // We don't return cached HTML (except if fetch failed) fetch("http://localhost:3000/random")
      if (cached) {
        const resourceType = cached.headers.get("content-type");
        // We only return non css/js/html cached response e.g images
        if (!hasHash(event.request.url) && !/text\/html/.test(resourceType)) {
          return cached;
        }

        // If the CSS/JS didn't change since it's been cached, return the cached version
        if (
          hasHash(event.request.url) &&
          hasSameHash(event.request.url, cached.url)
        ) {
          return cached;
        }
      }
      return fetch(requestToFetch)
        .then((response) => {
          const clonedResponse = response.clone();
          const contentType = clonedResponse.headers.get("content-type");

          if (
            !clonedResponse ||
            clonedResponse.status !== 200 ||
            clonedResponse.type !== "basic" ||
            /\/sockjs\//.test(event.request.url)
          ) {
            return response;
          }

          if (/html/.test(contentType)) {
            caches
              .open(version)
              .then((cache) => cache.put(HTMLToCache, clonedResponse));
          } else {
            // Delete old version of a file
            if (hasHash(event.request.url)) {
              caches.open(version).then((cache) =>
                cache.keys().then((keys) =>
                  keys.forEach((asset) => {
                    if (
                      new RegExp(removeHash(event.request.url)).test(
                        removeHash(asset.url)
                      )
                    ) {
                      cache.delete(asset);
                    }
                  })
                )
              );
            }

            caches
              .open(version)
              .then((cache) => cache.put(event.request, clonedResponse));
          }

          return fetch(event.request).then((fetchedResponse) => {
            // Add the network response to the cache for later visits
            caches.open(version).then(cache => {
              cache.put(event.request, fetchedResponse.clone());
            })
            // Return the network response
            return fetchedResponse;
          });

          // return response;
        })
        .catch(() => {
          if (hasHash(event.request.url))
            return caches.match(event.request.url);
          // If the request URL hasn't been served from cache and isn't sockjs we suppose it's HTML
          else if (!/\/sockjs\//.test(event.request.url))
            return caches.match(HTMLToCache);
          // Only for sockjs
          return new Response("No connection to the server", {
            status: 503,
            statusText: "No connection to the server",
            headers: new Headers({ "Content-Type": "text/plain" }),
          });
        });
    })
  );
});

function removeHash(element) {
  if (typeof element === "string") return element.split("?hash=")[0];
}

function hasHash(element) {
  if (typeof element === "string") return /\?hash=.*/.test(element);
}

function hasSameHash(firstUrl, secondUrl) {
  if (typeof firstUrl === "string" && typeof secondUrl === "string") {
    return /\?hash=(.*)/.exec(firstUrl)[1] === /\?hash=(.*)/.exec(secondUrl)[1];
  }
}

// NOTIFICATION
let payload = {}
self.addEventListener('push', event => {
  console.log('New notification', event)
  payload = event.data.json();
  console.log(payload);

  // change close to copy
  const options = {
    body: `${payload.text}    - ${payload.author}`,
    actions: [
      {
        action: 'save',
        title: 'Save',
      },
      {
        action: 'show',
        title: 'Open',
      },
      {
        action: 'copy',
        title: 'Copy',
      },


    ],
    data: {
      date: payload.data,
      _id: payload._id
    },
    icon: "./assets/advise.jpg",
    badge: "https://example.com/badge.png",
    image: "./assets/photo-facebook-notification-laptop-screen-facebook-notification-screenshot-128761275.jpg",
    dir: payload.language === "en" ? "ltr" : "rtl",
    lang: payload.language,
    requireInteraction: true,
    tag: `${payload._id}`,
    vibrate: [200, 100, 200, 100],
    renotify: true,
    timestamp: Date.now()
  };

  console.log(options, "options");
  event.waitUntil(
    self.registration.showNotification('Advice', options)
  );
})

// https://web.dev/push-notifications-display-a-notification/
// notifications images and icons
https://javascript-conference.com/wp-content/uploads/2018/11/Advanced_Progressive_Web_Apps_-_Push_Notifications_under_Control.pdf

addEventListener('click', function (e) {
})

self.addEventListener('notificationclick', function (e) {
  e.preventDefault()
  var notification = e.notification;
  console.log("you click me and this is my event object: ", notification.tag);
  var action = e.action;
  const channel = new BroadcastChannel('advice');

  if (action === 'close') {
    console.log(action, 'hehehe');
    channel.postMessage(payload)
    channel.close()
    notification.close();
  } else if (action === 'save') {
    // Connect to the channel named "advice".
    payload.type = 'save'
    // Send a message on "advice".
    channel.postMessage(payload);
    channel?.close()
    notification.close();
  }
  // advice to copy
  else if (action === "copy") {
    // Connect to the channel named "advice".
    payload.type = 'copy'
    // Send a message on "advice".
    channel.postMessage(payload);
    channel.close()
    notification.close();
  } else if (action === "show") {
    const notif = self.registration.getNotifications(notification.tag)
    console.log("dddddddddddd", notif);
    let dev = 'http://localhost:3000'
    let prod = 'https://life-advise.netlify.app'
    // add params to url 
    let url = `${dev}/random/?text=${payload.text}&author=${payload.author}&language=${payload.language}&_id=${payload._id}`
    // open url
    clients.openWindow(url)
    notification.close();
  }
  /**
   * getNotifications() https://developer.chrome.com/blog/notifying-you-of-changes-to-notifications/
  // advice to save :payload.type = 'show'
    channel.postMessage(payload)
    channel?.close()
  self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim().then(() => {
    // See https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
    return self.clients.matchAll({type: 'window'});
  }).then(clients => {
    return clients.map(client => {
      // Check to make sure WindowClient.navigate() is supported.
      if ('navigate' in client) {
        return client.navigate('activated.html');
      }
    });
  }));
});
   */
  // assume notification clicked 
});
/**
 self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  }));
});

The data option attaches custom data to the notification,
so that the service worker can retrieve it when the user interacts with the notification.
For instance, adding a unique "id" or "key" option to the data allows us to determine which
notification was clicked when the service worker handles the click event.

data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'Close notification',
            icon: 'images/xmark.png'},
        ]

        https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications#:~:text=The%20Push%20API%20allows%20a,relays%20them%20to%20your%20application.
        https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification

        self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});


self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('http://www.example.com');
    notification.close();
  }
});

Notice we check for the close action first and handle the explore action in an else block.
This is a best practice as not every platform supports action buttons, and not every platform displays all your actions.
Handling actions in this way provides a default experience that works everywhere.


The following summarizes the process of sending and receiving a push message and then displaying a push notification.

On the client:

Subscribe to the push service
Send the subscription object to the server
On the server:

Generate the data that we want to send to the user
Encrypt the data with the user public key
Send the data to the endpoint URL with a payload of encrypted data.
The message is routed to the user's device. This wakes up the browser,
which finds the correct service worker and invokes a "push" event. Now, on the client:

Receive the message data (if there is any) in the "push" event
Perform some custom logic in the push event
Show a notification


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(reg) {
    console.log('Service Worker Registered!', reg);

    reg.pushManager.getSubscription().then(function(sub) {
      if (sub === null) {
        // Update UI to ask user to register for Push
        console.log('Not subscribed to push service!');
      } else {
        // We have a subscription, update the database
        console.log('Subscription object: ', sub);
      }
    });
  })
   .catch(function(err) {
    console.log('Service Worker registration failed: ', err);
  });
}

We should perform this check whenever the user accesses our app
because subscription objects may change during their lifetime.
We need to make sure that it is synchronized with our server.
If there is no subscription object we can update our UI to ask the user if they would like receive notifications.
 */