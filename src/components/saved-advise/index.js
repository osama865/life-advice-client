import React from 'react'

export default function SavedAdvises() {
  return (
    <div>SavedAdvises</div>
  )
}
/**
 * return (
    <>
      <div hidden={isRemoved}>
        <blockquote className={`blockquote color${color}`}>
          {advise.text}
          <span>ــ {advise.author}</span>
          <div className="options">
            <button className="btn" onClick={clearNote}>
              <i className="fas fa-backspace"></i> Clear Note.
            </button>
            <textarea
              autoComplete="false"
              dir={advise.language === "en" ? "ltr" : "rtl"}
              spellCheck="false"
              cols="20"
              rows="5"
              ref={note}
              defaultValue={advise.note}
              onChange={(e) => setEditedNote(e.target.value)}
            />
          </div>
          <div className="center">
            <button onClick={updateNote} className="btn favorite">
              <i className="far fa-edit"></i> Edit Note
            </button>
            <button onClick={remove} className="btn favorite">
              <i className="fa fa-trash"></i> Delete Advise
            </button>
          </div>
        </blockquote>
      </div>
    </>
  );
 */