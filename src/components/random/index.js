import React from 'react'
import Advise from '../Advise'


export default function FetchOneAdvise() {
  let ad = {
    text: "hello",
    author: "osama",
    note: "hey",
    _id: "kdkfdskf",
    language : "en"
  }

  let skip = 10
  return (
    <>

      <Advise advise={ad} id={ad._id} color={4} />
      {skip !== undefined && (
        <div className="center">
          <button className="btn favorite">
            <i className="fas fa-comment-alt"></i> Get More Advices
          </button>
        </div>
      )}
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