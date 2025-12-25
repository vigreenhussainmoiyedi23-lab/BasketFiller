import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import axiosInstance from '../../utils/axiosInstance'

const ProductContainer = ({reload}) => {
  const [products, setProducts] = useState([])
  async function GetProducts() {
    const result = await axiosInstance.get('/product')
    if (result.data.products) setProducts(result.data.products)
  }
  useEffect(() => {
    GetProducts()
  }, [])
  return (
    <>
      <h1 className='text-slate-900 md:text-3xl  sm:text-2xl text-xl font-semibold capitalize'>products</h1>
      <div className='px-2 grid gap-2 items-center justify-center grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  min-h-screen'>{/*a product card Container */}
        {(products && products.length > 0) ? products.map(product => {
          return <ProductCard key={product._id} id={product._id} product={product} reload={reload}/>
        }) :
          <h1>There are no products yet</h1>}
      </div>
    </>
  )
}

export default ProductContainer
