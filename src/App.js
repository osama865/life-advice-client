import React from "react";
import { Routes, Route } from "react-router-dom";
import FetchSavedAdvises from "./components/fetch-saved";
import FetchOneAdvise from "./components/random";
import FetchAllAdvises from "./components/all";
import NotFound from "./components/404";
import Navbar from "./components/navbar";
import Proof from "./components/proof";
import Notifications from "./components/notification";
import Register from "./components/API/register";
import Check from "./components/API/check";
import Fetch_One from "./components/API/fetch-one";
import Fetch_Multiple from "./components/API/fetch-multiple";
import TestFetchComponent from "./components/API/testFetchComponent";
import "./App.css"

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/saved" element={<FetchSavedAdvises />} />
        <Route path="/random" element={<FetchOneAdvise />} />
        <Route exact path="/" element={<FetchOneAdvise />} />
        <Route exact path="/notify" element={<Notifications />} />
        <Route exact path="/all" element={<FetchAllAdvises />} />
        <Route path="*" element={<NotFound />} />
        <Route exact path="/proof" element={<Proof />}></Route>
      </Routes></>

  )
}
/**
 *
<Navbar />
      <Routes>
        <Route exact path="/saved" element={<FetchSavedAdvises />} />
        <Route path="/random" element={<FetchOneAdvise />} />
        <Route exact path="/" element={<FetchOneAdvise />} />
        <Route exact path="/notify" element={<Notifications />} />
        <Route exact path="/all" element={<FetchAllAdvises />} />
        <Route path="*" element={<NotFound />} />
        <Route exact path="/proof" element={<Proof />}></Route>
      </Routes>
 */
/**
 {
      offline === true ? (<Routes><Offline /><Routes />) : (
        <>
        <Navbar />
          <Routes>
            <Route exact path="/saved" element={<FetchSavedAdvises />} />
            <Route path="/random" element={<FetchOneAdvise />} />
            <Route exact path="/" element={<FetchOneAdvise />} />
            <Route exact path="/all" element={<FetchAllAdvises />} />
            <Route path="*" element={<NotFound />} />
            <Route exact path="/proof" element={<Proof />}></Route>
          </Routes>
        </>)
    }
 */