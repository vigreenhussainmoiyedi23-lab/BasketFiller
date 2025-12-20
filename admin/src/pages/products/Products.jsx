import React, { useState } from 'react'
import Sidebar from '../../components/common/Sidebar'
import Navbar from '../../components/common/Navbar'
import ProductContainer from '../../components/products/ProductContainer'
import CreateProduct from '../../components/products/CreateProduct'


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
