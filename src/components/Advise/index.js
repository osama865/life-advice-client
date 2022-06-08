import React, { useEffect, useRef, useState } from 'react'
import { copy } from '../../APIs';
import { UseIndexedDB } from '../../db/indexedDB';
import Copy from '../copy';
import Options from '../options';
import Share from '../share';

// add advise to local db and 
// make sure when random / multiple fetch to notify the user
// if the fetched advise is saved or not
/*

const findIds = async () => {
    try {
        let res = await db.advises.toArray()
        res.map((advise)=>{
            console.log(advise._id);
        })
        console.log(res, 'hoooo');
        return res
    } catch {
        
    }
}
*/
export default function Advise({ advise, id, color }) {
  const [editedNote, setEditedNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const textfield = useRef();
  const { insert, find } = UseIndexedDB()
  // add advise to indexedDB
  //console.log(id, "sssssssss");

  const handleChange = (e) => {
    e.preventDefault();
    setEditedNote(e.target.value);
  };

  const handleSave = () => {
    // e.preventDefault()
    advise.note = editedNote
    insert(advise).then((result) => {
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
    setEditedNote("")
  }, [advise._id]);

  return (
    <div className="container">
      <blockquote className={`blockquote color${color}`}>
        <h4>{advise.text}</h4>
        <span> ــ {advise.author}</span>
        {isSaved === false ? (
          <div className="options">
            <textarea
              dir={advise.language === "ar" ? "rtl" : "ltr"}
              value={editedNote}
              placeholder={
                advise.language === "ar"
                  ? "اضف افكارك"
                  : "Add notes."
              }
              onChange={handleChange}
              ref={textfield}
              cols="20"
              rows="5"
            />
            <Options advise={advise} handleSave={handleSave} />
          </div>
        ) : (
          <Options advise={advise} isSaved={isSaved} />
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