import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function MainList() {
  const { list, loading } = useSelector((state) => state.list)
  const [listData, setListData] = useState([])
  useEffect(() => {
    console.log(list.data)
    setListData(list)
  }, [list])

  return (
    <div>
      {listData.data?.map((listElement) => {
        return <div>{listElement.title}</div>
      })}
    </div>
  )
}
