import React, { useEffect, useState } from 'react'
import { random, coloring, getParameters } from '../../services'
import Advise from '../Advise'
import Notifications from '../notification'
import Offline from '../offline'


export default function FetchOneAdvise() {
  const url = window.location.search
  const [advice, setAdvice] = useState(getParameters(url))
  const [online, setOnline] = useState(navigator.onLine)
  console.log(advice, 'oooooooooooooooo');

  const fetchMore = () => {
    if (navigator.onLine) {
      random().then(res => {
        console.log(res, "raaaaaaaandooooom");
        setAdvice(res)
      })
    } else {
      setOnline(false)
    }
  }

  window.addEventListener('offline', (ev) => {
    setOnline(false)
  })

  window.addEventListener('online', (ev) => {
    setOnline(true)
  })

  useEffect(() => {
    if (advice._id === null) {
      random().then(res => {
        console.log(res, "raaaaaaaandooooom");
        setAdvice(res)
      })
    }
  }, [])

  return (
    <>
      {
        online && (<>
          <div className="container1">
            <Advise advise={advice} id={advice._id} color={coloring()} setAdvice={setAdvice} />
            <div className="center">
              <button className="btn favorite" onClick={fetchMore}>
                <i className="fas fa-comment-alt"></i> Get More Advices
              </button>
            </div>
          </div>
          <Notifications />
        </>)
      }
      {
        !online && (<Offline />)
      }
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