import React, { useEffect, useState } from 'react'
import { random } from '../../APIs'
import Advise from '../Advise'

export default function Try() {
  const [data, setData] = useState({})

  useEffect(() => {
    random().then(res => {
      setData(res)
    })
  }, [])

  return (
    <Advise advise={data} color={5} id={data._id} >{data._id}</Advise>
  )
}
