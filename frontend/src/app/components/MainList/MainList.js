import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Progress from '../Progress/Progress'
import { Box, Divider, List, ListItem, ListItemText } from '@mui/material'
import { DateRange } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const style = {
  width: '100%',
  maxWidth: 720,
  bgcolor: 'grey',
  margin: 'auto',
}

export default function MainList() {
  const { list, loading } = useSelector((state) => state.list)
  const [listData, setListData] = useState([])
  const [date, setDate] = useState([
    {
      startDate: Date.now(),
      endDate: null,
      key: 'selection',
    },
  ])
  useEffect(() => {
    setListData(list)
    console.log(list)
    //setDate({
    //startDate: Date.parse(list?.data[0].date),
    // endDate: Date.parse(list?.data[list.data.length - 1].date),
    // })
  }, [list])

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      {loading ? (
        <Progress />
      ) : (
        list?.data.map(({ title, id }) => {
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
