import { useState, useEffect } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NavBar from './components/NavBar'


function App() {
  

  return (
    <div className = 'container'>

      {/* NavBar */}
      <NavBar/>

      {/* Routes */}
      <Routes>
        <Route path = '/' element = {<Login/>}/>
        <Route path = '/register' element = {<Register/>}/>
        <Route path = '/home' element = {<Home/>}/>
      </Routes>
    
    </div>
  )
}

export default App
