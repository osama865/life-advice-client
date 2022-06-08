import React from 'react'
import Copy from '../copy'
import Share from '../share'

export default function Options({ advise = {}, handleSave = () => { }, isSaved = false }) {
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
            </div>
        </>
    )
}
