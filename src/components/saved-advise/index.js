import React, { useRef, useState } from 'react'
import { UseIndexedDB } from '../../DB';
import useTranslate from '../Advise/useTranslate';
import { FavoritsOptions } from '../options';

export default function SavedAdvises({ advise, _id, color }) {
  // states
  const [editedNote, setEditedNote] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);
  const [to, setTo] = useState("");
  const [dir, setDir] = useState("");
  // refs
  const note = useRef();
  // hooks
  const { remove, update } = UseIndexedDB();
  const { changeText, translated } = useTranslate(advise, to, dir)

  // handlers
  const updateNote = () => {
    advise.note = editedNote
    update(advise._id, advise);
  };

  /*
  const clearNote = (e) => {
    note.current.value = "";
    setEditedNote("");
  };
  */

  const removeAdvice = () => {
    remove(_id);
    setIsRemoved(true);
  };

  return (
    <>
      <div hidden={isRemoved}>
        <blockquote className={`blockquote color${color}`}>
          <h4>{translated?.text || advise.text}</h4>
          <span>ــ {translated?.author || advise.author}</span>
          <div className="options">
            <textarea
              autoComplete="false"
              dir={translated?.dir || dir}
              placeholder="Add notes."
              spellCheck="false"
              cols="20"
              rows="5"
              ref={note}
              defaultValue={advise.note}
              onChange={(e) => setEditedNote(e.target.value)}
              onBlur={updateNote}
            />
          </div>
          <div className="center">
            <FavoritsOptions advise={advise} changeText={changeText} setTo={setTo} removeAdvice={removeAdvice} setDir={setDir} />
          </div>
        </blockquote>
      </div>
    </>
  );
}
/**
 * <button className="btn" onClick={clearNote}>
              <i class="fa fa-language"></i> Translate.
            </button>
            <button className="btn" onClick={clearNote}>
            <i class="fa fa-magnifying-glass"></i> Search.
            </button><button className="btn" onClick={clearNote}>
              <i class="fa fa-language"></i> Translate.
            </button>
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