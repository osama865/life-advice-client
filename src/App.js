import React from 'react'
import { Routes, Route } from 'react-router-dom';
import FetchSavedAdvises from './components/fetch-saved';
import FetchOneAdvise from './components/random';
import FetchAllAdvises from './components/all';
import NotFound from './components/404';
import Navbar from './components/navbar';
import { useIndexDB } from './db/indexedDB';


export default function App() {
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

