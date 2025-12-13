import React from 'react'

const ProductCard = () => {
    return (
        <div className='rounded-md h-75 w-50 px-5 py-2 bg-white/20 backdrop-blur-3xl overflow-hidden'>
            <img className='w-full h-1/2 object-center object-cover rounded-md'
             src="/images/bg.jpg"
              alt="Product Thumbnail"/>
            <h1 className='font-bold text-xl tracking-tight text-blue-950'>Product Name</h1>
            <p className='text-xs text-gray-700 tracking-tighter overflow-hidden w-full h-12.5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo odio ullam quasi modi veniam dicta, quibusdam accusamus facilis quae aliquam, incidunt asperiores, exercitationem similique ipsum tenetur. Ducimus, distinctio ipsam amet similique sunt aliquid nam illo et in sit. Sequi illum laborum nemo culpa reiciendis suscipit!</p>
            <div className='flex items-center justify-center rounded-full overflow-hidden bg-gray-800 text-white'>
                <button className='w-[calc(100%/3 - 10px)] mx-0.5 p-2 bg-blue-500 hover:bg-blue-600'>Edit</button>
                <button className='w-[calc(100%/3 - 10px)] mx-0.5 p-2 bg-red-500 hover:bg-red-700'>Delete</button>
                <button className='w-[calc(100%/3 - 10px)] mx-0.5 p-2 bg-gray-500 hover:bg-gray-600'>More</button>
            </div>
        </div>
    )
}

export default ProductCard
