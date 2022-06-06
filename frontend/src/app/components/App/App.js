import { Container } from '@mui/system'
import { Route, Routes } from 'react-router-dom'
import DetailPost from '../DetailPost/DetailPost'
import MainList from '../MainList/MainList'

function App() {
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
