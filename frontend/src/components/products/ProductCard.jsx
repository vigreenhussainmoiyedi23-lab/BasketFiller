import React from "react";

import { Link } from "react-router-dom"
import AddToCartFeauture from "./AddToCartFeauture";

const ProductCard = ({ product }) => {
  const { title, rating, description, price, discount, finalPrice, thumbnail, stock } = product
  const id = product._id

  return (
    <div className="bg-zinc-800 h-150 relative rounded-2xl border border-zinc-700 shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-cyan-500/20 transition-all duration-300">
      {/* 🖼️ Product Image */}
      <div className="w-full hover:h-full  active:h-full active:z-1 relative hover:z-1 h-50 overflow-hidden">
        <h1 className="absolute bottom-0 right-0 font-bold text-black/50"> Click Or Hover Me</h1>
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* 🧾 Product Info */}
      <Link to={`/product/${id}`} className="px-5 py-2 h-30 ">
        <div>
          <h2 className="text-white text-xl font-semibold mb-2">{title}</h2>
          <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{description}</p>
        </div>

        {/* 💰 Price */}
        <div className="flex items-center justify-between mb-4 flex-wrap">
          <div>
            <span className="text-cyan-400 text-lg font-semibold mr-2">
              ₹{finalPrice}
            </span>
           {discount != 0 ? <span className="text-zinc-500 line-through text-sm">
              ₹{price}
            </span>:""}
          </div>
          {stock < 100 ? <span className="text-white rounded-4xl whitespace-nowrap bg-gray-700 py-2 px-3 font-bold text-sm">
            Only {stock} left
          </span> : ""}
         {discount!=0 && (<span className="text-red-400 font-semibold text-sm">
            {discount}% OFF
          </span>)}
          <span className="mb-2 text-sm">{rating + "⭐" || ""}</span>
        </div>
      </Link>
      <div className="flex flex-col items-center justify-between mb-4 flex-wrap relative">
        <AddToCartFeauture stock={stock} id={id} />
      </div>
    </div>
  );
};

export default ProductCard;
