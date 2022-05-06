import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import FetchSavedAdvises from './components/fetch-saved';
import FetchOneAdvise from './components/random';
import FetchAllAdvises from './components/all';
import NotFound from './components/404';
import Navbar from './components/navbar';
import { useIndexDB } from './db/indexedDB';
import "./components/testing/index"


const { find, insert } = useIndexDB()
insert({
  text: "hello",
  author: "osama",
  note: "hey",
  _id: "kdkfdskf",
  language: "en",
  id: 200
})

export default function App() {
  const getData = () => {
    fetch('./all.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(function (myJson) {
        console.log("hhhhhhhhhhhh", myJson);
      }).catch((err) => {
        console.error(err);
      });
  }
  useEffect(() => {
    // getData()
  }, [])
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/saved" element={<FetchSavedAdvises />} />
        <Route exact path="/random" element={<FetchOneAdvise />} />
        <Route exact path="/" element={<FetchOneAdvise />} />
        <Route exact path="/all" element={<FetchAllAdvises />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

