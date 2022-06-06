import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, Grid, TextField, Button } from '@mui/material'
import { useState } from 'react'

function AddForm({ isDialogOpen, closeDialog, onSendPost }) {
  const [postName, setPostName] = useState('')

  const inputHandler = (e) => {
    setPostName(e.target.value)
  }

  const sendHandler = () => {
    if (!postName.length > 0) {
      return
    }
    const data = {
      id: Math.random().toString(16).slice(2),
      date: new Date(),
      title: postName.toString(),
    }
    onSendPost(data)
    closeDialog()
    setPostName('')
  }
  return (
    <Grid xs={12} item={true}>
      <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth>
        <DialogContent>
          <DialogContentText>Форма добавления статьи</DialogContentText>
          <TextField
            value={postName}
            id="standard-basic"
            label="Введите название новости"
            variant="standard"
            onChange={inputHandler}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Отменить</Button>
          <Button onClick={() => sendHandler()}>Создать</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default AddForm
