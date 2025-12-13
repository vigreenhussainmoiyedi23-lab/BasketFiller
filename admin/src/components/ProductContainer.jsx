import React from 'react'
import ProductCard from './ProductCard'

const ProductContainer = () => {
  return (
    <>
       <h1 className='text-slate-900 md:text-3xl sm:text-2xl text-xl font-semibold capitalize'>products</h1>
     <div className='md:px-20 py-5 sm:px-10 px-5'>{/*a product card Container */}
<ProductCard/>
     </div>
    </>
  )
}

export default ProductContainer
