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
    res = fetchData(route,req)
    return res;
}

async function fetchData(route, req) {
    let url = `http://localhost:3001/${route}`
    let response = await fetch(url, req)
    return response.json()
}

random().then(res=>{
    console.log(res);
    
})



