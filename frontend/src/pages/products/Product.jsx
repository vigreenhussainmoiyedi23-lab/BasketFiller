import React from 'react'
import ProductContainer from '../../components/products/ProductContainer'
import Navbar from '../../components/utils/Navbar'
import FilterBar from '../../components/utils/FilterBar'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../utils/AxiosInstance'

const Product = () => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, Infinity],
    sortBy: '',
    search: '',
    page:1
  })
  const [products, setProducts] = useState([])
  async function GetProducts() {
    try {
      const res = await axiosInstance.post('/product/filter',filters)
      setProducts(res.data.products)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    GetProducts()
  }, [filters])
  
  return (
    <div className='bg-zinc-950 min-h-screen text-4xl text-white font-bold'>
      <Navbar />
      <FilterBar setFilters={setFilters} filters={filters} />
      <ProductContainer products={products} setProducts={setProducts} />
    </div>
  )
}

export default Product
