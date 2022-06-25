import UseIndexedDB from "../db/indexedDB";
import { subscribeUser } from "../notification";

const { insert } = UseIndexedDB()

const proxy = 'https://cors-proxy4.p.rapidapi.com/?url=https%3A%2F%2Flife-advise-server.herokuapp.com%2F'
const dev = 'http://localhost:3002/'

// we'll use proxy to froward the requests/response to/from our server
export async function random() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '956152c248mshb998fd97efb63f7p1f7930jsn67bc3343263f',
            'X-RapidAPI-Host': 'cors-proxy4.p.rapidapi.com'
        }
    };

    let res = await fetchData("random", options)

    return res

    /**const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '956152c248mshb998fd97efb63f7p1f7930jsn67bc3343263f',
            'X-RapidAPI-Host': 'cors-proxy4.p.rapidapi.com'
        }
     * await fetch('https://cors-proxy4.p.rapidapi.com/?url=https%3A%2F%2Flife-advise-server.herokuapp.com%2Frandom', options)
        .then(response => {
            console.log(response, 'response');
            return response.clone().json()
        })
        .then(response => {
            console.log(response, 'response');
            return response
        })
        .catch(err => console.error(err));
    };

    let res = await fetchData("random", options)
     */
}



async function unsubscribeNotifications(data = {}) {
    let route = `unsubscribe`
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            origin: 'example.com',
            'x-requested-with': 'example.com',
            'X-RapidAPI-Key': '956152c248mshb998fd97efb63f7p1f7930jsn67bc3343263f',
            'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com'
        },
        body: JSON.stringify(data)
    };

    let res = await fetch('https://http-cors-proxy.p.rapidapi.com/https://life-advise-server.herokuapp.com/unsubscribe', options)
        .then(response => response.clone().json())
        .then(response => response)
        .catch(err => console.error(err));
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
export async function fetchMultiple(skip) {
    let limit = 10
    // let skip = localStorage.getItem('skip')
    let opt = {
        skip,
        limit
    }

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            origin: 'example.com',
            'x-requested-with': 'example.com',
            'X-RapidAPI-Key': '956152c248mshb998fd97efb63f7p1f7930jsn67bc3343263f',
            'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com'
        },
        body: JSON.stringify(opt)
    };

    let res = await fetch('https://http-cors-proxy.p.rapidapi.com/https://life-advise-server.herokuapp.com/multiple', options)
        .then(response => response.clone().json())
        .then(response => response)
        .catch(err => console.error(err));

    return res
}
/**
 * 
 * let route = `multiple`
    const options = {
        method: 'POST',
        body: JSON.stringify(opt),
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '956152c248mshb998fd97efb63f7p1f7930jsn67bc3343263f',
            'X-RapidAPI-Host': 'cors-proxy4.p.rapidapi.com',
        }
    };
    console.log('response from multiple api', res.body);
    return res
 * @param {*} route 
 * @param {*} options 
 * @returns 
 */


async function fetchData(route, options) {
    console.log("fetch request", `${proxy}${route}`);
    let res = await fetch(`${proxy}${route}`, options)
        .then(response => {
            console.log("res", response)
            return response.clone().json()
        })
        .then(response => response)
        .catch(err => { console.error("error occured in the fetch step", err) });
    return res;
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
            navigator.clipboard.writeText(`${advice.text}     - ${advice.author}`);
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

export const copy = ({ text, author }) => {
    try {
        navigator.clipboard.writeText(text + "    -" + author);
        // console.log('Page URL copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}