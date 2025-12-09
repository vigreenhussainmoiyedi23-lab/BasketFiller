import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Register from './pages/authentication-pages/Register';
import Login from './pages/authentication-pages/Login';
import Home from './pages/Home';
import User from './pages/User/User';
import EditProfile from './pages/User/EditProfile';
const App = () => {

  return (
   <>
   <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/profile' element={<User/>}/>
    <Route path='/profile/edit/:id' element={<EditProfile/>}/>
   </Routes>
   </>
  )
}

export default App
