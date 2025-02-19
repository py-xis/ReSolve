import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ProblemPage from './pages/ProblemPage'
import ProfilePage from './pages/ProfilePage'

function App() {

  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problem" element={<ProblemPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </HashRouter>
    </>
  )
}

export default App
