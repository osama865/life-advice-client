import React, { useState } from 'react'

export default function Fetch_One() {
    const [authKey, setAuthKey] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [response, setResponse] = useState({});

    const dev = 'http://localhost:3003/one'
    const handleFetch = (e) => {
        e.preventDefault()
        const data = JSON.stringify({ authKey: authKey })
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
                        {response?.advice}
                    </h3>
                </div>
            }
        </>
    )
}
