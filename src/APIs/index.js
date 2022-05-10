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

fetchMultiple()

async function fetchData(route, req) {
    let url = `http://localhost:3002/${route}`
    let response = await fetch(url, req)
    return response.json()
}




