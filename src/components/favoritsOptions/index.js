import React from 'react'
import Copy from '../copy'
import RemoveAdvice from '../removeAdvice'
import Share from '../share'

export default function FavoritsOptions({ advise = {}, removeAdvice = () => { } }) {
    return (
        <div className="center">
            <Copy advise={advise} />
            <Share advise={advise} />
            <RemoveAdvice removeAdvice={removeAdvice} />
        </div>
    )
}
