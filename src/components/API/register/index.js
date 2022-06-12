import React, { useState } from 'react'
import CopyAuthKey from '../copy';
import SaveAuthKey from '../save';

export default function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [response, setResponse] = useState({});

    const dev = 'http://localhost:3003/register'
    const handleRegistration = (e) => {
        e.preventDefault()
        const data = JSON.stringify({ name: name, password: password })
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
                <label>Enter your password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        <input defaultValue={response?.authKey} readOnly />
                        <SaveAuthKey authKey={response?.authKey} />
                        <CopyAuthKey authKey={response?.authKey} />
                    </h3>
                </div>
            }
        </>
    )
}
