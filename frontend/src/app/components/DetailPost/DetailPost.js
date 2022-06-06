import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es'
import { Link, useParams } from 'react-router-dom'
import { getComments, getPost } from '../../redux/slices/list.slice'
import { Button } from '@mui/material'
import { useState } from 'react'

export default function DetailPost() {
  const { singlePost, comments } = useSelector((state) => state.list)
  const [openComments, setOpenComments] = useState(false)
  let { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPost(id))
  }, [dispatch, id])

  const commentsHandler = (id) => {
    console.log(`id`, id)
    dispatch(getComments(id))
    setOpenComments(!openComments)
  }

  return (
    <div>
      <div>{singlePost?.title}</div>
      <Link to={'/'}> К списку </Link>
      <Button onClick={() => commentsHandler(id)}>
        {openComments ? 'Скрыть комментарии' : 'Показать комментарии'}
      </Button>
      {openComments
        ? comments.records?.map((el) => {
            return (
              <div>
                <div>{el.user}</div>
                <div>{el.text}</div>
              </div>
            )
          })
        : ''}
    </div>
  )
}
