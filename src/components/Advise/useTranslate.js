import React, { useEffect, useRef, useState } from 'react'

export default function useTranslate(advise, to = "") {
    const [translated, setTranslated] = useState(advise)

    const url = new URL(`https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${to}&api-version=3.0&profanityAction=NoAction&textType=plain`)
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '956152c248mshb998fd97efb63f7p1f7930jsn67bc3343263f',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        body: JSON.stringify([{ "Text": advise.text }, { "Text": advise.author }])
    };

    const changeText = () => {
        fetch(url, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                const data = {
                    text: response[0].translations[0].text,
                    author: response[1].translations[0].text,
                    _id: advise._id,
                    index: advise.index,
                    note: advise.index || "",
                    language: advise.language,
                    date: advise.date,
                }
                console.log(data, "im the new translated advise");
                setTranslated(data)
            })
            .catch(err => console.error(err));
        // settranslated({ text: " ", author: "" })
    }

    return { translated, changeText, setTranslated }
}
