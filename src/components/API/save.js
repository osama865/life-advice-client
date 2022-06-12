import React, { useState } from 'react'

export default function SaveAuthKey({ authKey }) {
    const [saved, setSaved] = useState(false)
    const saveAuthKeyOnLocalDevice = (authKey = "") => {
        localStorage.setItem("authKey", authKey)
        setSaved(true)
    }

    return (
        <button onClick={() => { saveAuthKeyOnLocalDevice(authKey) }}>
            {saved === false ? "Save Auth Key" : "Saved"}
        </button>
    )
}
