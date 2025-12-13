// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import Skeleton from "react-loading-skeleton";
// import 'react-loading-skeleton/dist/skeleton.css'


// const ProductCard = ({ title, thumbnail, price, discount,description,id }) => {
//     const [isLoading, setIsLoading] = useState(true)
//     return (
//         <div className='rounded-md  shadow-md drop-shadow-2xl shadow-black/50 h-max min-h-75 w-50 px-5 py-2 bg-white/20 backdrop-blur-3xl overflow-hidden'>
//            { !isLoading?
//            <img className='w-full h-1/2 object-center object-cover rounded-md'
//                 src={thumbnail}
//                 loading='lazy'
//                 onLoad={()=>{setIsLoading(false)}}
//                 alt="Product Thumbnail" />:
//                 <div className='w-full h-25 rounded-2xl overflow-hidden bg-black/30'>
//                 <Skeleton width={'100%'} height={100}/>
//                 </div>
//                 }
//             <h1 className='font-bold text-xl tracking-tight text-blue-950'>{title}</h1>
//             <div className='flex items-center justify-around text-xl h-max'>
//                 <h1 className='text-yellow-500 font-semibold'><span className='line-through text-red-600'>₹{price}</span> {price*(100-discount)/100}</h1>
//                 <h1 className='text-red-500 font-semibold'>{discount}%</h1>
//             </div>
//             <p className='text-xs text-gray-700 tracking-tighter overflow-hidden w-full h-12.5'>{description}</p>
//             <div className='flex items-center justify-center rounded-full overflow-hidden bg-gray-800 text-white'>
//                 <Link to={`/product/edit/${id}`} className='w-1/3 mx-0.5 p-2 bg-blue-500 hover:bg-blue-600'>Edit</Link>
//                 <Link to={`/product/delte/${id}`} className='w-1/3 mx-0.5 p-2 bg-red-500 hover:bg-red-700'>Delete</Link>
//                 <Link to={`/product/more/${id}`} className='w-1/3 mx-0.5 p-2 bg-gray-500 hover:bg-gray-600'>More</Link>
//             </div>
//         </div>
//     )
// }

// export default ProductCard

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCard = ({ title, thumbnail, price, discount, description, id }) => {
  const [isLoading, setIsLoading] = useState(true);
setTimeout(() => {
    setIsLoading(false)
}, 3000);

  return (
    <div className="rounded-md shadow-md drop-shadow-2xl shadow-black/50 h-max min-h-75 w-50 md:w-full  px-5 py-2 bg-white/20 backdrop-blur-3xl overflow-hidden">
      {/* 🖼️ Image */}
      <div className="relative w-full h-40 rounded-md overflow-hidden">
        {isLoading && <Skeleton width="100%" height={160} />}
        <img
          src={thumbnail}
          alt="Product Thumbnail"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={(e) => console.error("❌ Image failed to load:", e)}
          className={`absolute top-0 left-0 w-full h-full object-cover rounded-md transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* 🧾 Title */}
      {isLoading ? (
        <Skeleton height={20} width="100%" className="mt-2" />
      ) : (
        <h1 className="font-bold text-xl tracking-tight text-blue-950 mt-2">
          {title}
        </h1>
      )}

      {/* 💰 Price + Discount */}
      {isLoading ? (
        <Skeleton height={25} width="100%" className="mt-2" />
      ) : (
        <div className="flex items-center justify-around text-xl h-max mt-1">
          <h1 className="text-yellow-500 font-semibold">
            <span className="line-through text-red-600">₹{price}</span>{" "}
            {price * (100 - discount) / 100}
          </h1>
          <h1 className="text-white font-semibold bg-red-500 rounded-[calc(50%+5px)] p-2  min-h-max">{discount}%</h1>
        </div>
      )}

      {/* 📄 Description */}
      {isLoading ? (
        <div className="mt-2 space-y-1">
          <Skeleton height={15} width="100%" />
          <Skeleton height={15} width="100%" />
          <Skeleton height={15} width="100%" />
        </div>
      ) : (
        <p className="text-xs text-gray-700 tracking-tighter overflow-hidden w-full h-12.5 mt-2">
          {description}
        </p>
      )}

      {/* 🔘 Buttons */}
      {isLoading ? (
        <Skeleton height={35} width="100%" className="mt-3 rounded-full" />
      ) : (
        <div className="flex items-center justify-center rounded-full overflow-hidden bg-gray-800 text-white mt-3">
          <Link
            to={`/product/edit/${id}`}
            className="w-1/3 mx-0.5 p-2 bg-blue-500 hover:bg-blue-600 text-center"
          >
            Edit
          </Link>
          <Link
            to={`/product/delete/${id}`}
            className="w-1/3 mx-0.5 p-2 bg-red-500 hover:bg-red-700 text-center"
          >
            Delete
          </Link>
          <Link
            to={`/product/more/${id}`}
            className="w-1/3 mx-0.5 p-2 bg-gray-500 hover:bg-gray-600 text-center"
          >
            More
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

