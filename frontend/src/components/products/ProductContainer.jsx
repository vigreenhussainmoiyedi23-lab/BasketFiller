import React from 'react'
import ProductCard from './ProductCard'

const ProductContainer = ({ products }) => {


    if (!products || products.length === 0) {
        return <p className='text-4xl font-bold animate-pulse'>No products Found</p>
    }
    return (
        <div className='h-max w-full gap-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 p-4'>
            {products.map(product => {
                return <ProductCard
                    key={product._id}
                    product={product}
                />
            })}
        </div>
    )
}
export default ProductContainer
