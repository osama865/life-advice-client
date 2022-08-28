import React from 'react'
import Copy from './copy'
import Share from './share'
import Translate from './translate'

// TODO make generic option button function
export default function Options({ advise = {}, handleSave = () => { }, changeText = () => { }, isSaved = false, setTo = () => { }, setDir = () => { } }) {
    return (
        <>
            <div className="center">
                <Share advise={advise} />
                {isSaved === false ? (
                    <button className="btn favorite saved" onClick={handleSave}>
                        <i className="far fa-heart"></i> Favorite
                    </button>
                ) : (
                    <button className="btn favorite">
                        <i className="fas fa-heart"></i> allready there!
                    </button>
                )
                }
                <Copy advise={advise} />
                <Translate changeText={changeText} setTo={setTo} setDir={setDir}/>
            </div>
        </>
    )
}
