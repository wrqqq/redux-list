import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Progress from '../Progress/Progress'
import { Box, Button, Divider, List, ListItem, ListItemText } from '@mui/material'
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
    console.log(start, end)
    setStartDate(start)
    setEndDate(end)
    console.log(list)
    if (start && end) {
      resultProductData = list.data.filter((a) => {
        var date = new Date(a.date)
        console.log(date)
        return date >= start && date <= end
      })
    }
    console.log(resultProductData)
    dispatch(filterList(resultProductData))
    setListData(resultProductData)
    setClearDate(true)
    //clearHandler()
    //console.log(filteredList)
  }

  const clearHandler = () => {
    setListData(list.data)
    setClearDate(false)
    setStartDate(new Date(list.data[0]?.date))
    setEndDate(new Date(list.data[list.data.length - 1]?.date))
  }

  useEffect(() => {
    if (list && list.data) {
      setStartDate(new Date(list.data[3]?.date))
    }
  }, [list])

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        isClearable={true}
      />
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
