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

async function fetchData(route = '', req) {
    let production = "https://life-advise-server.herokuapp.com"
    let local = 'http://localhost:3002'
    let url = `${production}/${route}`
    let response = await fetch(url, req)
    return response.json()
}




