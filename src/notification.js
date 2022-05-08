
const convertedVapidKey = urlBase64ToUint8Array("BAHPN9XNOB9KiLT7KCnxZoJN8mLkMpG-PhNvLQShm91boF93h9RQiXY96XTTTwyRjAB6TLknbjs_Zpoohwtg-Uk")

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const prod = 'https://life-advise-server.herokuapp.com'
const dev = 'http://localhost:3001'

const env = () => (process.env.NODE_ENV === prod ? prod : dev)
function sendSubscription(subscription) {
  console.log('hshshhs', subscription);
  return fetch(`https://life-advise-server.herokuapp.com/subscribe`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      if (!registration.pushManager) {
        console.log('Push manager unavailable.')
        return
      }

      registration.pushManager.getSubscription().then(function (existedSubscription) {
        if (existedSubscription === null) {
          console.log('No subscription detected, make a request.')
          registration.pushManager.subscribe({
            applicationServerKey: convertedVapidKey,
            userVisibleOnly: true,
          }).then(function (newSubscription) {
            console.log('New subscription added.')
            sendSubscription(newSubscription)
          }).catch(function (e) {
            if (Notification.permission !== 'granted') {
              console.log('Permission was not granted.')
            } else {
              console.error('An error ocurred during the subscription process.', e)
            }
          })
        } else {
          console.log('Existed subscription detected.')
          sendSubscription(existedSubscription)
        }
      })
    })
      .catch(function (e) {
        console.error('An error ocurred during Service Worker registration.', e)
      })
  }
}



