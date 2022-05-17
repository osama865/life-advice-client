import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

export default function Offline() {
  return (
    <>
      <div class="popup">
        <h2>I'm Really Sorry!</h2>
        <p>
          It looks like there is an intenr net connection faeild, please reconnect  or you can visit your saved Advices
        </p>
        <Link to={'/saved'}>Let's Go</Link>
      </div>
    </>
  );
}

/**
 {
        offline === true && (
        )
      }
 */
