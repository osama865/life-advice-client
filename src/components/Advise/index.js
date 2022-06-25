import React, { useEffect, useRef, useState } from 'react'
import { UseIndexedDB } from '../../db/indexedDB';
import Options from '../options';
import useTranslate from './useTranslate';

export default function Advise({ advise, color }) {
  const [editedNote, setEditedNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [to, setTo] = useState("");
  const [dir, setDir] = useState("");

  const textfield = useRef();
  const { insert, find } = UseIndexedDB()

  const handleChange = (e) => {
    e.preventDefault();
    setEditedNote(e.target.value);
  };

  const { changeText, translated, setTranslated } = useTranslate(advise, to, dir)

  const handleEditNote = () => {
    let ad = translated || advise
    ad.note = editedNote
  }

  const handleSave = () => {
    // e.preventDefault()
    // TODO use onBlur to set the user note instead of setting it when he make save
    let ad = translated || advise
    insert(ad).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.error(err);
    });
    setIsSaved(true)
  }

  const findMatched = () => {
    // setIsSaved(false)
    find().then((res) => {
      console.log(res, "saved ids", "sssssssssssssss", advise._id);
      res.map((val) => {
        if (val._id === advise._id) {
          setIsSaved(true)
        } else {
          // setIsSaved(false)
        }
      })
    })
  }

  useEffect(() => {
    findMatched();
  }, []);

  useEffect(() => {
    setIsSaved(false);
    setTranslated(undefined)
    setEditedNote("")
  }, [advise]);

  return (
    <div className="container">
      <blockquote className={`blockquote color${color}`}>
        <h4 dir={translated?.dir}>{translated?.text || advise.text}</h4>
        <span dir={translated?.dir}>ــ {translated?.author || advise.author}</span>
        {isSaved === false ? (
          <div className="options">
            <textarea
              dir={translated?.dir || dir}
              value={editedNote}
              placeholder="Add notes."
              onChange={handleChange}
              onBlur={handleEditNote}
              ref={textfield}
              cols="20"
              rows="5"
            />
            <Options advise={translated || advise} changeText={changeText} handleSave={handleSave} setTo={setTo} setDir={setDir} />
          </div>
        ) : (
          <Options advise={advise} isSaved={isSaved} setTo={setTo} setDir={setDir} />
        )}
      </blockquote>
    </div>
  );
}
/**
 * import React, { useState, useRef, useEffect } from "react";
import { useIndexDB } from "../../../../database/client/indexDB";

const advises = useIndexDB("advises");
const ids = useIndexDB("ids");

export default function Advise({ advise, id, color }) {
  const [editedNote, setEditedNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const textfield = useRef();

  const saveAdvise = () => {
    advise.note = editedNote;
    let _id = id;
    advises.insert(advise);
    setIsSaved(true);
  };

  const findMatched = () => {
    advises.find().then((res) => {
      console.log('res promise', res);
      res?.map((val) => {
        if (val._id === id) {
          setIsSaved(true);
        }
      });
    })

  };

  const handleChange = (e) => {
    e.preventDefault();
    setEditedNote(e.target.value);
  };

  useEffect(() => {
    findMatched();
  }, []);

  return (
    <div className="container">
      <blockquote className={`blockquote color${color}`}>
        {advise.text}
        <span> ــ {advise.author}</span>
        {isSaved === false ? (
          <div className="options">
            <textarea
              dir={advise.language === "ar" ? "rtl" : "ltr"}
              ref={textfield}
              value={editedNote}
              placeholder={
                advise.language === "ar"
                  ? "احفظها واضف افكارك ?"
                  : "Save it with note?"
              }
              onChange={handleChange}
              cols="20"
              rows="5"
            />
            <button className="btn favorite saved" onClick={saveAdvise}>
              <i className="far fa-heart"></i> add to favorite
            </button>
          </div>
        ) : (
          <div className="options">
            <button className="btn favorite">
              <i className="fas fa-heart"></i> allready there!
            </button>
          </div>
        )}
      </blockquote>
    </div>
  );
}

 */