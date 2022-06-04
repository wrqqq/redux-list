import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getList = createAsyncThunk('list', async () => {
  return fetch('/api/article').then((res) => res.json())
})

const listSlice = createSlice({
  name: 'list',
  initialState: {
    list: [],
    loading: false,
  },
  extraReducers: {
    [getList.pending]: (state, action) => {
      state.loading = true
    },
    [getList.fulfilled]: (state, action) => {
      state.loading = false
      state.list = action.payload
    },
    [getList.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default listSlice.reducer
