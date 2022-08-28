import { useCallback, useRef, useState } from "react";
import { fetchMultiple } from "../../services";

export default function InfinteScroll(setAdvises) {
  const [result, setResult] = useState([]);
  let skip = parseInt(localStorage.getItem("skip"));
  const observer = useRef();
  const last = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      // declare a new observer and check if it is interscting or appeared in the view
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          skip = skip + 10;
          localStorage.setItem("skip", skip);
          fetchMultiple(skip).then(
            (res) => {
              setAdvises((prev) => {
                return [...new Set([...prev, ...res])];
              });
              //console.log('intersected and here the result', res);
              //console.log('intersected and skipped ', skip);
            },
            (err) => {
              console.error(err);
            }
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    []
    // whenever these deps changes , run the callback
  );

  return { last, skip };
}
