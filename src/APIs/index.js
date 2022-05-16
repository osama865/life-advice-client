import UseIndexedDB from "../db/indexedDB";

const { insert } = UseIndexedDB()
export async function random() {
    let res = {};
    let route = "random"
    let req = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    res = fetchData(route, req)
    return res;
}

localStorage.setItem('skip', 0)
export async function fetchMultiple(skip = 0) {
    let res = {};
    let limit = 10
    // let skip = localStorage.getItem('skip')
    let route = `multiple?skip=${skip}&limit=${limit}`

    let req = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }
    res = fetchData(route, req)
    return res;
}

async function fetchData(route, req) {
    let production = "https://life-advise-server.herokuapp.com"
    let local = 'http://localhost:3002'
    let url = `${local}/${route}`
    console.log(url);
    let response = await fetch(url, req)
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
    } else {
        console.log(advice);
    }
});

