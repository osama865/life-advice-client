import React from 'react'

export default function Text({ text = "", dir = "" }) {
    return (
        <h4 dir={dir}>{text}</h4>
    )
}
