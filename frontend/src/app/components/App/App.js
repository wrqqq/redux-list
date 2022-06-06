import { Container } from '@mui/system'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, Switch } from 'react-router-dom'
import { getList } from '../../redux/slices/list.slice'
import DetailPost from '../DetailPost/DetailPost'
import MainList from '../MainList/MainList'

function App() {
  const { posts } = useSelector((state) => state.list)
  useEffect(() => {
    console.log(posts)
  }, [])
  return (
    <Container fixed>
      <Routes>
        <Route path="/" element={<MainList />} />
        <Route path="/posts/:id" element={<DetailPost />} />
      </Routes>
    </Container>
  )
}

export default App
