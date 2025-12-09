import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Register from './pages/authentication-pages/Register';
import Login from './pages/authentication-pages/Login';
import Home from './pages/Home';
const App = () => {

  return (
   <>
   <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/' element={<Home/>}/>
   </Routes>
   </>
  )
}

export default App
