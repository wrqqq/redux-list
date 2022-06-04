import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { getList } from '../../redux/slices/list.slice'
import MainList from '../MainList/MainList'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getList())
  }, [])
  return (
    <Routes>
      <Route path="/" element={<MainList />} />
    </Routes>
  )
}

export default App
