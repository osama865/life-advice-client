import React from 'react'
import Copy from '../copy'
import RemoveAdvice from '../removeAdvice'
import Share from '../share'
import Translate from '../translate'

export default function FavoritsOptions({ advise = {}, removeAdvice = () => { }, changeText = () => { }, setTo = () => { } }) {
    return (
        <div className="center">
            <Copy advise={advise} />
            <Share advise={advise} />
            <RemoveAdvice removeAdvice={removeAdvice} />
            <Translate changeText={changeText} setTo={setTo} />
        </div>
    )
}
