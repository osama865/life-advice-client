import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

export default function Offline() {
  return (
    <>
      <div class="popup container1">
        <h2>Sorry!</h2>
          <p>
            It looks like there is connection issue, please refresh
            You can visit your Favorites Advice and Quotes.
          </p>
          <Link to={'/saved'}>
            <i className="fas fa-heart"></i>
            Favorites
          </Link>
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
