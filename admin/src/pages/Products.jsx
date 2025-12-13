import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import ProductContainer from '../components/ProductContainer'
import Input from '../components/Input'
import CreateProduct from '../components/CreateProduct'


const Products = () => {

  return (
    <div className='w-full min-h-screen relative '>
      <Sidebar />
      <Navbar />
      <div className=' md:w-[calc(100vw-256px)] md:top-0 top-[10vh] min-h-screen bg-gray-200 w-full absolute right-0'>
        <CreateProduct />
        <ProductContainer />
      </div>
    </div>
  )
}

export default Products
