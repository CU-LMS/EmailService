import { useContext, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import './app.css'
import { AuthContext } from './context/authContext'
import NavBar from './components/NavBar'
import Manage from './pages/Manage'
function App() {
const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={user?.isAdmin == true?<Home />: <Navigate to="/login"/>} />
        <Route exact path="/manage" element={user?.isAdmin == true?<Manage />: <Navigate to="/login"/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
