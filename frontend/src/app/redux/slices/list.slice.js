import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getList = createAsyncThunk('list/getList', async () => {
  return await fetch('/api/article').then((res) => {
    return res.json().then((data) => {
      return data.data
    })
  })
})

export const sendPost = createAsyncThunk('list/sendPost', async (post) => {
  const rawResponse = await fetch('api/article', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
  const content = await rawResponse.json()
  return content
})

export const getPost = createAsyncThunk('list/getPost', async (id) => {
  return await fetch(`/api/article/${id}`).then((res) => {
    return res.json().then((data) => {
      return data
    })
  })
})

export const getComments = createAsyncThunk('list/getComments', async (id) => {
  return await fetch(`/api/comment?article=${id}`).then((res) => {
    return res.json().then((data) => {
      return data
    })
  })
})

const listSlice = createSlice({
  name: 'list',
  initialState: {
    posts: [],
    singlePost: {},
    comments: [],
    error: false,
    loading: true,
  },
  reducers: {
    deletePost: (state, action) => {
      state.posts = state.posts.filter((el) => {
        return el.id !== action.payload
      })
    },
  },
  extraReducers: {
    [getList.pending]: (state) => {
      state.loading = true
    },
    [getList.fulfilled]: (state, action) => {
      state.loading = false
      state.posts = action.payload
    },
    [getList.rejected]: (state) => {
      state.loading = false
      state.error = true
    },
    [sendPost.pending]: (state) => {
      state.loading = true
    },
    [sendPost.fulfilled]: (state, action) => {
      state.loading = false
      state.posts.push(action.payload)
    },
    [sendPost.rejected]: (state) => {
      state.loading = false
    },
    [getPost.pending]: (state) => {
      state.loading = true
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false
      state.singlePost = action.payload
    },
    [getPost.rejected]: (state) => {
      state.loading = false
    },
    [getComments.pending]: (state) => {
      state.loading = true
    },
    [getComments.fulfilled]: (state, action) => {
      state.loading = false
      state.comments = action.payload
    },
    [getComments.rejected]: (state) => {
      state.loading = false
    },
  },
})

export const { deletePost } = listSlice.actions

export default listSlice.reducer
