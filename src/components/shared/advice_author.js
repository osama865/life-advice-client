import React from 'react'

export default function Author({ author = "", dir = "" }) {
    return (
        <span dir={dir}>ــ {author}</span>
    )
}
