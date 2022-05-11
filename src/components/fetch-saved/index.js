import React, { useEffect, useState } from "react";
import { UseIndexedDB } from "../../db/indexedDB";
import SavedAdvises from "../saved-advise";

function coloring() {
  let colorNumber;
  colorNumber = Math.floor(Math.abs(Math.random() * 10 - 4));
  if (colorNumber > 4 || colorNumber <= 0) {
    colorNumber = 3;
  }
  return colorNumber;
}

export default function FetchSavedAdvises() {
  const [advises, setAdvises] = useState([]);
  const { find } = UseIndexedDB();

  useEffect(() => {
    find().then((res) => {
      setAdvises(res.reverse())
    })
  },[]);

  return (
    <div className="container1" >
      {advises?.map((advise, i) => {
        return <SavedAdvises advise={advise} _id={advise._id} key={i} color={coloring()} />;
      })}
    </div>
  );
}

/**
 * import React, { useEffect, useState } from "react";
import SavedAdvises from "../saved-advise";
import { useIndexDB } from "../../../../database/client/indexDB";

const savedAdvisesDB = useIndexDB("advises");
export default function FetchSavedAdvises() {
  const [advises, setAdvises] = useState([]);

  useEffect(() => {
    let advs = [];
    savedAdvisesDB.find().then((res) => {
      setAdvises(res)
    })
  },[]);

  function coloring() {
    let colorNumber;
    colorNumber = Math.floor(Math.abs(Math.random() * 10 - 4));
    if (colorNumber > 4 || colorNumber <= 0) {
      colorNumber = 3;
    }
    return colorNumber;
  }

  return (
    <div className="container1" >
      {advises?.map((advise, i) => {
        return <SavedAdvises advise={advise} _id={advise._id} key={i} color={coloring()} />;
      })}
    </div>
  );
}

 */