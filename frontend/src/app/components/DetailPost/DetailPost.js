import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es'
import { Link, useParams } from 'react-router-dom'
import { getPost } from '../../redux/slices/list.slice'

export default function DetailPost() {
  const { singlePost } = useSelector((state) => state.list)
  let { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPost(id))
  }, [dispatch, id])
  return (
    <div>
      <div>{singlePost?.title}</div>
      <Link to={'/'}>К списку</Link>
    </div>
  )
}
