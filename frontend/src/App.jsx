import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Register from './pages/authentication-pages/Register';
import Login from './pages/authentication-pages/Login';
import Home from './pages/Home';
const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
   </Routes>
   </>
  )
}

export default App
