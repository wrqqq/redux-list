import { configureStore } from '@reduxjs/toolkit'
import listSlice from './slices/list.slice'

export const store = configureStore({
  reducer: {
    list: listSlice,
  },
})
