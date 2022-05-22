import UseIndexedDB from "../db/indexedDB";
import { subscribeUser } from "../notification";

const { insert } = UseIndexedDB()

const prod = 'https://life-advise-server.herokuapp.com'
const dev = 'http://localhost:3002'


export async function random() {
    let res = {};
    let route = "random"
    let req = {
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    res = fetchData(route, {})
    return res;
}



async function unsubscribeNotifications(data = {}) {
    let route = `unsubscribe`
    let req = {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    let res = fetchData(route, req)
    return res;
}

const unsubscribe = () => {
    // first delete subscription data from database
    // second notify the user he/she will no longer recieve notifications
    // unsubscribe from push manger
    navigator.serviceWorker.ready.then(function (registration) {
        registration.pushManager.getSubscription().then(subscription => {
            console.log("subscription", subscription);
            // first remove subscription from the database
            unsubscribeNotifications(subscription).then((result) => {
                console.log(' the subscription data has been removed from the server. ', result);

                // the subscription data has been removed from the server, now tell the user that.
                subscription.unsubscribe().then(function (successful) {
                    // You've Successfully Unsubscribed
                    console.log("unsubscribing done");
                }).catch(function (e) {
                    // Unsubscribing failed
                    console.error(e);
                })


            }).catch((err) => {
                console.error(err, 'happend when removing subscription data from server');
            });



        })
    })
}

localStorage.setItem('skip', 0)
export async function fetchMultiple(skip = 0) {
    let res = {};
    let limit = 10
    // let skip = localStorage.getItem('skip')
    let route = `multiple?skip=${skip}&limit=${limit}`

    let req = {
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }
    res = fetchData(route, {})
    return res;
}


async function fetchData(route, req) {
    let url = `${dev}/${route}`
    console.log(url);
    let response = await fetch(url)
    return response.clone().json()
}

export function coloring() {
    let colorNumber = Math.floor(Math.abs(Math.random() * 10 - 4));
    if (colorNumber > 4 || colorNumber <= 0) {
        colorNumber = 3;
    }
    return colorNumber;
}


export function getParameters(url) {
    const queryParams = new URLSearchParams(window.location.search);
    const _id = queryParams.get('_id');
    const text = queryParams.get('text');
    const language = queryParams.get('language');
    const author = queryParams.get('author');
    return {
        _id, author, text, language
    }
}


export const test = { _id: "39jd", text: "fgn our absence.", author: "Salman Rushdie", date: "2021-12-30T08:02:42.027Z", index: 5, language: "ar" }


// From your client pages:
const channel = new BroadcastChannel('advice');
channel.addEventListener('message', async event => {
    const advice = event.data
    if (advice.type === 'save') {
        advice.note = ""
        insert(advice)
        console.log('Received', advice);
    } else if (advice.type === 'copy') {
        console.log(advice, 'from apis');
        try {
            navigator.clipboard.writeText(advice.text + "    -" + advice.author);
            // console.log('Page URL copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }

    } else if (advice.type === 'show') {
        console.log(advice);
    } else if (advice.type === 'close') {
        console.log("advice ", advice, " closed");
    } else if (advice.type === 'unsubscribe') {
        console.log('sshhhhhhhhhhhhhhhhhhhe WTF');
        unsubscribe()
    } else if (advice.type === 'subscribe') {
        console.log('sshhhhhhhhhhhhhhhhhhhe WTF');
        subscribeUser()
    }
});

