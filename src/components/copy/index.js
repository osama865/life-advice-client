import React, { useEffect, useState } from 'react'
import { copy } from '../../APIs'

export default function Copy({ advise }) {
    const [copied, setCopied] = useState(false)

    const copyAdvice = () => {
        if (advise._id !== null || advise.text !== null) {
            copy(advise)
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 1000 * 3)
        }
    }
    useEffect(() => {
        setCopied(false)
    }, [])
    return (
        <button onClick={copyAdvice} className="btn favorite">
            <i className="fa fa-clipboard"></i> {copied ? "Allready Copied" : "Copy"}
        </button>
    )
}
