import React, { useEffect, useState } from "react";
import { subscribeUser } from "../../notification";
import "./style.css";

export default function Notifications() {
  const [show, setShow] = useState(true);

  const handleLater = (e) => {
    e.preventDefault();
    // no premission
    // try to ask for the premission later.
    // dismiss modal, for now
    setShow(false);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    // hide the modal first
    setShow(false);
    // request premissin
    subscribeUser()
  };

  useEffect(() => {
    // make sure the notifications feature is supported by the user's browser.
    if (!("Notification" in window)) {
      // later show modal instead of this stupid alert.
      alert(
        "This browser does not support desktop notification, you'll be missing an important feature. Please update or use another browser."
      );
      setShow(false);
    }

    // if user already decided then don't bother
    if (Notification.permission === "granted" || Notification.permission === "denied") {
      setShow(false)
    }
  }, []);

  return (
    <>
      {show && (
        <div className="confirm">
          <h1>Allow Receiving Notifications</h1>
          <p>
            <strong> via Notifications </strong>
            you'll be able to see daily advices without opening the App, If confirmed you'll
            recive sample notification to show you how things work.
          </p>
          <button onClick={handleLater}>
            <i className="fa fa-clock"></i> Later
          </button>
          <button onClick={handleConfirm} autoFocus>
            <i className="fa fa-check"></i> Confirm
          </button>
        </div>
      )}
    </>
  );
}
