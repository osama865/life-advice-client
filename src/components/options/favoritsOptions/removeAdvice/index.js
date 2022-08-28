import React from 'react'

export default function RemoveAdvice({removeAdvice = () => { } }) {
    return (
        <button onClick={removeAdvice} className="btn favorite">
            <i className="fa fa-trash"></i> Delete
        </button>
    )
}
