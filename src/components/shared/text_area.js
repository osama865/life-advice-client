import React, { useEffect, useRef, useState } from 'react'

export default function Textarea({ advice = {} }) {
    const [editedNote, setEditedNote] = useState("");

    const textfield = useRef();

    const handleChange = (e) => {
        e.preventDefault();
        setEditedNote(e.target.value);
    };

    const handleEditNote = () => {
        let ad = advice
        ad.note = editedNote
    }

    useEffect(() => {
        setEditedNote("")

    }, [advice])

    return (
        <textarea
            dir={advice?.dir || "ltr"}
            value={editedNote}
            placeholder="Add notes."
            onChange={handleChange}
            onBlur={handleEditNote}
            ref={textfield}
            cols="20"
            rows="5"
        />
    )
}
