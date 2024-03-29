const convertedVapidKey = urlBase64ToUint8Array(
  "BPTCTTUsrJvWHHQky2K_ECoaY2Y33CGLJTXuSW1Vf2Hfk95TYQ-JHXFCMXQSEqbv52rnbJCY8QP3GRtyj-jnVmA"
);

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  // eslint-disable-next-line
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const prod =
  "https://cors-proxy4.p.rapidapi.com/?url=https%3A%2F%2Flife-advise-server.herokuapp.com%2Fsubscribe";
const dev = "http://localhost:5000/subscribe";

async function sendSubscription(subscription) {
  // console.log(prod);
  console.log("hshshhs", subscription);
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(subscription),
  };

  return await fetch(dev, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

/**
 function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(reg) {

      reg.pushManager.subscribe({
        userVisibleOnly: true
      }).then(function(sub) {
        console.log('Endpoint URL: ', sub.endpoint);
      }).catch(function(e) {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });
    })
  }
}

It's best practice to call the subscribeUser() function in response to a user action signalling 
they would like to subscribe to push messages from our app.

In the above example we call the subscribe method on the pushManager and log the subscription object to the console.

Notice we are passing a flag named userVisibleOnly to the subscribe method. 
By setting this to true, the browser ensures that every incoming message has a matching (and visible) notification.


 */
export function subscribeUser() {
  if ("serviceWorker" in navigator) {
    Notification.requestPermission();
    navigator.serviceWorker.ready
      .then(function (registration) {
        if (!registration.pushManager) {
          console.log("Push manager unavailable.");
          return;
        }

        registration.pushManager
          .getSubscription()
          .then(function (existedSubscription) {
            if (existedSubscription === null) {
              console.log("No subscription detected, make a request.");
              registration.pushManager
                .subscribe({
                  applicationServerKey: convertedVapidKey,
                  userVisibleOnly: true,
                })
                .then(function (newSubscription) {
                  console.log("New subscription added.");
                  sendSubscription(newSubscription);
                })
                .catch(function (e) {
                  if (Notification.permission !== "granted") {
                    console.log("Permission was not granted.");
                  } else {
                    console.error(
                      "An error ocurred during the subscription process.",
                      e
                    );
                  }
                });
            } else {
              console.log("Existed subscription detected.");
              sendSubscription(existedSubscription);
            }
          });
      })
      .catch(function (e) {
        console.error(
          "An error ocurred during Service Worker registration.",
          e
        );
      });
  }
}
