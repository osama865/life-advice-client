import React, { useState } from 'react'

export default function Fetch_Multiple() {
    const [authKey, setAuthKey] = useState("");
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [showMessage, setShowMessage] = useState(false);
    const [response, setResponse] = useState({});

    const dev = 'http://localhost:3003/multiple'
    const handleFetch = (e) => {
        e.preventDefault()
        const data = JSON.stringify({ authKey: authKey, limit: limit, skip: skip })
        fetch(dev, {
            headers: {
                "Content-Type": "application/json"
            },
            body: data,
            method: "POST"
        }).then((response) => {
            return response.json()
        }).then((res) => {
            setShowMessage(true)
            setResponse(res)
            console.log(res)
        }).catch((err) => {
            console.error(err);
        })
    }
    return (
        <>
            <form style={{ textAlign: "center", color: "wheat" }}>
                <label>Enter Authentication key:
                    <input
                        type="text"
                        value={authKey}
                        onChange={(e) => setAuthKey(e.target.value)}
                        required
                    />
                </label>
                <label>Enter Skip amount "The numbers of quotes want be skipped from the start, leave Empty if you don't want to skip any thing":
                    <input
                        type="number"
                        value={skip}
                        onChange={(e) => setSkip(e.target.valueAsNumber)}
                    />
                </label>
                <label>Enter limit amount of fetched qoute, "how many qoutes you want to fetch in one request, default is 10":
                    <input
                        type="number"
                        value={limit}
                        onChange={(e) => setLimit(e.target.valueAsNumber)}
                    />
                </label>
                <input type="submit" onClick={handleFetch} />
            </form>
            {
                showMessage && <div>
                    <h2>
                        {response?.message}
                    </h2>
                    <h3>
                        {response?.advices}
                    </h3>
                </div>
            }
        </>
    )
}
