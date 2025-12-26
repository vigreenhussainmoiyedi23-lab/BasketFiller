import { X } from 'lucide-react'
import React from 'react'

const ProductZoom = ({ thumbnail, setZoom }) => {
    return (
        <div className='fixed w-screen h-screen overflow-hidden bg-black/5 backdrop-blur-3xl top-0 left-0 z-50'>
            <button 
            onClick={()=>{setZoom(false)}}
            className='absolute bg-red-500/50 text-4xl rounded-full text-white top-10 right-10'>
                <X />
            </button>
            <img
                className='w-full h-full object-contain object-center'
                src={thumbnail} alt="Zoomed Product thumbnail" />
        </div>
    )
}

export default ProductZoom 
