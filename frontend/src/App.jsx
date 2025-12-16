import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Register from './pages/authentication-pages/Register';
import Login from './pages/authentication-pages/Login';
import Home from './pages/Home';
import User from './pages/User/User';
import EditProfile from './pages/User/EditProfile';
import UpdateProfile from './pages/User/UpdatePassword';
import ContactUs from './pages/ContactUs';
import Product from './pages/products/Product';
import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
const App = () => {

  return (
   <>
   <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/contact' element={<ContactUs/>}/>
    <Route path='/profile' element={<User/>}/>
    <Route path='/products' element={<Product/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/checkout' element={<CheckoutPage/>}/>
    <Route path='/profile/edit/:id' element={<EditProfile/>}/>
    <Route path='/profile/security/:id' element={<UpdateProfile/>}/>
    
   </Routes>
   </>
  )
}

export default App
