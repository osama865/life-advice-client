import React, { useEffect, useState } from 'react'
import { random } from '../../APIs'
import Advise from '../Advise'

function coloring() {
  let colorNumber = Math.floor(Math.abs(Math.random() * 10 - 4));
  if (colorNumber > 4 || colorNumber <= 0) {
    colorNumber = 3;
  }
  return colorNumber;
}

export default function FetchOneAdvise() {
  const [advice, setAdvice] = useState({})

  const fetchMore = (e) => {
    e.preventDefault()
    random().then(res => {
      setAdvice(res)
    })
  }

  useEffect(() => {
    random().then(res => {
      setAdvice(res)
    })
  }, [])

  return (
    <>
      <div className="container1">
        <Advise advise={advice} id={advice._id} color={coloring()} />
        <div className="center">
          <button className="btn favorite" onClick={fetchMore}>
            <i className="fas fa-comment-alt"></i> Get More Advices
          </button>
        </div>
      </div>
    </>
  )
}
/**
 * return (
    <div className="random">
      {end === true ? (
        <h1>we dont have another advises</h1>
      ) : (
        <>
          {advise?.map((ad, i) => (
            <Advise advise={ad} id={ad._id} key={i} color={coloring()} />
          ))}
          {skip !== undefined && (
            <div className="center">
              <button onClick={fetchAdvise} className="btn favorite">
                <i className="fas fa-comment-alt"></i> Get More Advices
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
 */