import React, { useEffect, useState, useCallback, useRef } from 'react'
import { fetchMultiple } from '../../APIs'
import Advise from '../Advise'
import infinteScroll from './customHook'

function coloring() {
  let colorNumber;
  colorNumber = Math.floor(Math.abs(Math.random() * 10 - 4));
  if (colorNumber > 4 || colorNumber <= 0) {
    colorNumber = 3;
  }
  return colorNumber;
}

export default function FetchAllAdvises() {
  const [advises, setAdvises] = useState([{ _id: "61d553b2f7e27f9a58952f20", text: "Most of what matters in our lives takes place in our absence.", author: "Salman Rushdie", date: "2021-11-30T08:02:42.027Z", index: 0, language: "en" },
  { _id: "61d553b2f7e27f9a58952f21", text: "Human happiness and moral duty are inseparably connected.", author: "George Washington", date: "2021-11-30T08:02:42.065Z", index: 1, language: "en" },
  { _id: "61d553b2f7e27f9a58952f22", text: "No better words than \"thank you\" have yet been discovered to express the sincere gratitude of one's heart, when the two words are sincerely spoken.", author: "Alfred Montapert", date: "2021-11-30T08:02:42.077Z", index: 2, language: "en" },
  { _id: "61d553b2f7e27f9a58952f23", text: "Poetry is just the evidence of life. If your life is burning well, poetry is just the ash.", author: "Leonard Cohen", date: "2021-11-30T08:02:42.080Z", index: 3, language: "en" },
  { _id: "61d553b2f7e27f9a58952f24", text: "The moment a little boy is concerned with which is a jay and which is a sparrow, he can no longer see the birds or hear them sing.", author: "Eric Berne", date: "2021-11-30T08:02:42.083Z", index: 4, language: "en" },
  { _id: "61d553b2f7e27f9a58952f25", text: "Love is never wrong no matter what society says.", author: "Anthony T.Hincks", date: "2021-11-30T08:02:42.087Z", index: 5, language: "en" },
  { _id: "61d553b2f7e27f9a58952f26", text: "It is not reputation, wealth, fame, success or religiosity that glorifies God. It's slavery.", author: "indonesia123", date: "2021-11-30T08:02:42.090Z", index: 6, language: "en" },
  { _id: "61d553b2f7e27f9a58952f27", text: "Some things in life are too complicated to explain in any language.", author: "Haruki Murakami", date: "2021-11-30T08:02:42.094Z", index: 7, language: "en" },
  { _id: "61d553b2f7e27f9a58952f28", text: "To succeed in the new year, you have to set your priority right, pursue your goals with zeal and do away with procrastination.", author: "Bamigboye Olurotimi", date: "2021-11-30T08:02:42.097Z", index: 8, language: "en" },
  { _id: "61d553b2f7e27f9a58952f29", text: "Remember, you are not aspiring for perfection, Bombshell. You are aspiring for progress, one step at a time.", author: "Amber Hurdle", date: "2021-11-30T08:02:42.101Z", index: 9, language: "en" }
  ])
  const { skip, last } = infinteScroll(setAdvises)

  useEffect(() => {
    fetchMultiple(0).then(res => {
      setAdvises((prev) => {
        return [...new Set([...prev, ...res])];
      });
    }, err => {
      console.error(err);
    })
  }, [])

  return (
    <>
      {advises?.map((ad, i) => {
        if (i + 1 === advises.length) {
          return (
            <div key={i} ref={last}>
              <Advise advise={ad} id={ad._id} key={i} color={coloring()}/>
            </div>
          );
        } else {
          return <Advise advise={ad} id={ad._id} key={i} color={coloring()} />;
        }
      })}
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