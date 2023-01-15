import React from 'react'
import { useParams } from 'react-router-dom'

const AdInfo = () => {
  const {adid} = useParams()
  return (
    <div>{adid}</div>
  )
}

export default AdInfo