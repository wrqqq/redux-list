import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getList = createAsyncThunk('list', async () => {
  return fetch('/api/article').then((res) => res.json())
})

const listSlice = createSlice({
  name: 'list',
  initialState: {
    list: [],
    filteredList: [],
    loading: true,
  },
  reducers: {
    filterList: (state, action) => {
      state.filteredList = action.payload
    },
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

export const { filterList } = listSlice.actions

export default listSlice.reducer
