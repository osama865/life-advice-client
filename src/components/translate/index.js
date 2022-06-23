import React from 'react'
import useTranslate from '../Advise/useTranslate'

export default function Translate({changeText}) {
    
    console.log(changeText);
    return (
        <button onClick={changeText} className="btn favorite">
            <i className="fa-solid fa-language"></i> Translate
        </button>
    )
}
