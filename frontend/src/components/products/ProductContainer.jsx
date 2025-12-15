import React from 'react'
import ProductCard from './ProductCard'

const ProductContainer = ({products}) => {


    if (!products || products.length === 0) {
        return <p className='text-4xl font-bold animate-pulse'>loading products</p>
    }
    return (
        <div className='h-max w-full gap-2 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-4'>
            {products.map(product => {
                return <ProductCard
                    key={product._id}
                    title={product.title}
                    price={product.price}
                    discount={product.discount}
                    description={product.description}
                    thumbnail={product.thumbnail} 
                    stock={product.stock}
                    id={product._id} />
            })}
        </div>
    )
}
export default ProductContainer
