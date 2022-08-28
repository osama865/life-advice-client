import React, { useState } from 'react'

export default function Share({ advise = {} }) {
    const [canShare, setCanShare] = useState(true)
    const prod = 'https://life-advise.netlify.app'

    const shareAdvice = () => {
        if (!navigator.share) {
            setCanShare(false)
            alert("Sorry But Share Advice Feature is Not Supported in Your Browser, Please Update Your Browser.")
        } else {
            let url = `${prod}/random/?text=${advise.text}&author=${advise.author}&language=${advise.language}&_id=${advise._id}`
            navigator
                .share({
                    title: "Shared Advice from Life-Advise Platform",
                    text: `${advise?.text}`,
                    url: url,
                })
                .then(() => console.log("Successful share"))
                .catch((error) => console.log("Error sharing", error));
        }
    }

    return (
        <button className="btn favorite" onClick={shareAdvice}>
            <i className="fa fa-share-nodes"></i> Sahre
        </button>
    )
}
