import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Progress from '../Progress/Progress'
import { Box, Button, Divider, Grid, List, ListItem, ListItemText, TextField } from '@mui/material'
import DatePicker from 'react-datepicker/dist/react-datepicker'
import { filterList } from '../../redux/slices/list.slice'

import 'react-datepicker/dist/react-datepicker.css'

const style = {
  width: '100%',
  maxWidth: 720,
  bgcolor: 'grey',
  margin: 'auto',
}

export default function MainList() {
  const dispatch = useDispatch()
  const { list, loading, filteredList } = useSelector((state) => state.list)
  const [search, setSearch] = useState('')
  const [listData, setListData] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)
  const [clearDate, setClearDate] = useState(false)

  useEffect(() => {
    setListData(list.data)
  }, [list])

  const onChange = (dates) => {
    const [start, end] = dates
    let resultProductData = []
    setStartDate(start)
    setEndDate(end)
    if (start && end) {
      resultProductData = list.data.filter((a) => {
        var date = new Date(a.date)
        return date >= start && date <= end
      })
    }
    dispatch(filterList(resultProductData))
    setListData(resultProductData)
    setClearDate(true)
  }

  const clearHandler = () => {
    setListData(list.data)
    setClearDate(false)
    setStartDate(new Date(list.data[0]?.date))
    setEndDate(null)
  }

  useEffect(() => {
    if (list && list.data) {
      setStartDate(new Date(list.data[3]?.date))
    }
  }, [list])

  const inputHandler = (e) => {
    setSearch(e.target.value)
    setListData(list.data.filter((el) => el.title.includes(e.target.value)))
  }

  const clearInput = () => {
    setSearch('')
    setListData(list.data)
  }

  useEffect(() => {
    console.log(filterList)
  }, [filterList])

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <Grid container spacing={2}>
        <Grid xs={6}>
          <h3>Фильтровать по дате:</h3>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            isClearable={true}
          />
        </Grid>
        <Grid xs={6}>
          <h3>Поиск по тайтлу:</h3>
          <TextField value={search} id="standard-basic" label="Standard" variant="standard" onChange={inputHandler} />
          {search && <Button onClick={clearInput}>Очистить</Button>}
        </Grid>
      </Grid>
      {clearDate && <Button onClick={clearHandler}>Очистить</Button>}
      {loading ? (
        <Progress />
      ) : (
        listData?.map(({ title, id }) => {
          return (
            <Box key={id}>
              <ListItem button>
                <ListItemText primary={title} />
              </ListItem>
              <Divider />
            </Box>
          )
        })
      )}
    </List>
  )
}
