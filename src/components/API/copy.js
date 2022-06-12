import React, { useState } from 'react'

export default function CopyAuthKey({ authKey }) {
    const [copied, setCopied] = useState(false)

    const copyAuthKey = (authKey) => {
        try {
            navigator.clipboard.writeText(`${authKey}`);
            // console.log('Page URL copied to clipboard');
            setCopied(true)
            setInterval(() => {
                setCopied(false)
            }, 1000 * 3)
        } catch (err) {
            console.error('Failed to copy: ', err);
            setCopied(false)
        }
    }

    return (
        <button onClick={() => { copyAuthKey(authKey) }}>
            {copied === false ? 'Copy Auth Key' : "Copied"}
        </button>
    )
}
