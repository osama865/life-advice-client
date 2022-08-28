import React, { useEffect, useState } from 'react'
import { fetchMultiple } from '../../services'
import Advise from '../Advise'
import Offline from '../offline';
import infinteScroll from './customHook'

function coloring() {
  let colorNumber = Math.floor(Math.abs(Math.random() * 10 - 4));
  if (colorNumber > 4 || colorNumber <= 0) {
    colorNumber = 3;
  }
  return colorNumber;
}

export default function FetchAllAdvises() {
  const [advises, setAdvises] = useState([])
  const { last } = infinteScroll(setAdvises)
  const [online, setOnline] = useState(navigator.onLine)

  window.addEventListener('offline', (ev) => {
    setOnline(false)
  })

  window.addEventListener('online', (ev) => {
    setOnline(true)
  })


  useEffect(() => {
    console.log('hey multiple advices');
    fetchMultiple(0).then(res => {
      console.error('hey multiple advices' , res);
      setAdvises((prev) => {
        return [...new Set([...prev, ...res])];
      });
    }, err => {
      console.error(err);
    })
  }, [])

  return (
    <>
      {
        online && <div className="container1" >
          {advises?.map((ad, i) => {
            if (i + 1 === advises.length) {
              return (
                <div key={i} ref={last}>
                  <Advise advise={ad} id={ad._id} key={i} color={coloring()} />
                </div>
              );
            } else {
              return <Advise advise={ad} id={ad._id} key={i} color={coloring()} />;
            }
          })}
        </div>
      }
      {
        !online && (<Offline />)
      }
    </>
  )
}
/**
 * import React, { useEffect, useState, useCallback, useRef } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import {Advise} from "../Advise";
import advisesCollection from "../../../../database/collections/advisesCollection";
import customHook from "./customHook";
("./customHook");

function coloring() {
  let colorNumber;
  colorNumber = Math.floor(Math.abs(Math.random() * 10 - 4));
  if (colorNumber > 4 || colorNumber <= 0) {
    colorNumber = 3;
  }
  return colorNumber;
}

export default function FetchAllAdvises() {
  const [advises, setAdvises] = useState([]);
  let advs = [];
  advs = useTracker(() => {
    Meteor.subscribe("advises");
    advs = advisesCollection.find({}, { limit: 5 }).fetch();
    return advs;
  });

  const { last, result } = customHook();

  useEffect(() => {
    setAdvises((prev) => {
      return [...new Set([...prev, ...result])];
    });
  }, [result]);

  return (
    <div className="container1">
      {advs?.map((ad, i) => {
        if (i + 1 === advs.length) {
          return (
            <div key={i} ref={last}>
              <Advise advise={ad} id={ad._id} key={i} color={coloring()} />
            </div>
          );
        } else {
          return <Advise advise={ad} id={ad._id} key={i} color={coloring()} />;
        }
      })}
      {advises?.map((ad, i) => {
        if (i + 1 === advises.length) {
          return (
            <div key={i} ref={last}>
              <Advise advise={ad} id={ad._id} key={i} color={coloring()} />
            </div>
          );
        } else {
          return <Advise advise={ad} id={ad._id} key={i} color={coloring()} />;
        }
      })}
    </div>
  );
}

 */