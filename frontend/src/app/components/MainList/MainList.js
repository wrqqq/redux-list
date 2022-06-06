import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Progress from '../Progress/Progress'
import { Box, Button, Container, Divider, Grid, List, ListItem, ListItemText, TextField } from '@mui/material'
import DatePicker from 'react-datepicker/dist/react-datepicker'
import { sendPost } from '../../redux/slices/list.slice'
import AddForm from '../AddForm/AddForm'
import moment from 'moment'
import { getList } from '../../redux/slices/list.slice'

import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'

const style = {
  width: '100%',
  maxWidth: 720,
  bgcolor: 'grey',
  margin: 'auto',
}

export default function MainList() {
  const { posts, loading } = useSelector((state) => state.list)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [listData, setListData] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)
  const [clearDate, setClearDate] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  useEffect(() => {
    dispatch(getList())
  }, [dispatch])

  useEffect(() => {
    setListData(posts)
  }, [posts])

  useEffect(() => {
    if (listData) {
      setStartDate(moment(listData[3]?.date).toDate())
    }
  }, [listData])

  const onChange = (dates) => {
    const [start, end] = dates
    let resultProductData = []
    setStartDate(start)
    setEndDate(end)
    if (start && end) {
      resultProductData = posts.filter((a) => {
        var date = new Date(a.date)
        return date >= start && date <= end
      })
    }
    setListData(resultProductData)
    setClearDate(true)
  }

  const clearHandler = () => {
    setListData(posts)
    setClearDate(false)
    setStartDate(moment(listData[3]?.date).toDate())
    setEndDate(null)
  }

  const inputHandler = (e) => {
    setSearch(e.target.value)
    setListData(posts.filter((el) => el.title.includes(e.target.value)))
  }

  const clearInput = () => {
    setSearch('')
    setListData(posts)
  }

  const openDialog = () => {
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
  }

  const handleSendPost = (data) => {
    dispatch(sendPost(data))
  }

  return (
    <Container>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <Grid container spacing={2}>
          <Grid xs={6} item={true}>
            <h3>Фильтровать по дате:</h3>

            <DatePicker
              dateFormat="MM-DD-YYYY"
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              isClearable={true}
            />
          </Grid>
          <Grid xs={6} item={true}>
            <h3>Поиск по тайтлу:</h3>
            <TextField
              value={search}
              id="standard-basic"
              label="Введите часть строки"
              variant="standard"
              onChange={inputHandler}
            />
            {search && (
              <Button onClick={clearInput} variant="outlined">
                Очистить
              </Button>
            )}
          </Grid>
        </Grid>
        {clearDate && (
          <Button onClick={clearHandler} variant="outlined">
            Очистить
          </Button>
        )}
        {loading ? (
          <Progress />
        ) : (
          listData?.map((el) => {
            return (
              <Link key={el.id} to={'posts/' + el.id}>
                <Box>
                  <ListItem button>
                    <ListItemText primary={el.title} />
                  </ListItem>
                  <Divider />
                </Box>
              </Link>
            )
          })
        )}
      </List>
      <Button onClick={openDialog} variant="contained">
        Добавить статью
      </Button>
      <AddForm isDialogOpen={dialogOpen} onSendPost={handleSendPost} variant="contained" closeDialog={closeDialog} />
    </Container>
  )
}
