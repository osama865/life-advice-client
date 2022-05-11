import React, { useEffect, useState } from 'react'
import { UseIndexedDB } from '../../db/indexedDB';

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
  const { insert, find , update} = UseIndexedDB()
  // add advise to indexedDB

  const handleChange = (e) => {
    e.preventDefault();
    setEditedNote(e.target.value);
  };

  const handleSave = () => {
    setIsSaved(true)
    findMatched()
    advise.note = editedNote
    insert(advise).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.error(err);
    });
  }

  const findMatched = () => {
    find().then((res) => {
      res.map((advise) => {
        if (id === advise._id) {
          setIsSaved(true)
        }
      })
    })
  }

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
            <button className="btn favorite saved" onClick={handleSave}>
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