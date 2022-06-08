import React, { useState } from 'react'

export default function Check() {
    const [name, setName] = useState("");
    const [authKey, setAuthKey] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [response, setResponse] = useState({});

    const dev = 'http://localhost:3003/check'
    const handleRegistration = (e) => {
        e.preventDefault()
        const data = JSON.stringify({ name: name, authKey : authKey })
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
                <label>Enter your name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>Enter Authentication key:
                    <input
                        type="text"
                        value={authKey}
                        onChange={(e) => setAuthKey(e.target.value)}
                    />
                </label>
                <input type="submit" onClick={handleRegistration} />
            </form>
            {
                showMessage && <div>
                    <h2>
                        {response?.message}
                    </h2>
                    <h3>
                        {response?.authKey}
                    </h3>
                </div>
            }
        </>
    )
}
