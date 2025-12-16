import React, { useEffect } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
const ProductCard = ({ title, description, price, discount, finalPrice, thumbnail, id, stock }) => {
  const [inCart, setInCart] = useState(null)
  const navigate = useNavigate()
  const IsProductInCart = async () => {
    try {
      const result = await axiosInstance.get(`/cart/${id}`)
      if (result.data.inCart) setInCart(result.data.inCart)
    } catch (error) {
      console.error("Error rendering logic for cart:", error);
    }
  }
  const AddToCart = async () => {
    try {
      const result = await axiosInstance.post(`/cart/add/${id}`)
      if (result.data) setInCart(true)
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response.data.redirectTo) {
        navigate(error.response.data.redirectTo)
      }
    }
  }
  const RemoveFromCart = async () => {
    try {
      const result = await axiosInstance.post(`/cart/remove/${id}`)
      if (result.data) setInCart(false)
    } catch (error) {
      console.error("Error removing from cart:", error);
      if (error.response.data.redirectTo) {
        navigate(error.response.data.redirectTo)
      }
    }
  }
  useEffect(() => {
    IsProductInCart()
  }, [inCart])

  return (
    <div className="bg-zinc-800 rounded-2xl border border-zinc-700 shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-cyan-500/20 transition-all duration-300">
      {/* 🖼️ Product Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* 🧾 Product Info */}
      <div className="p-5">
        <h2 className="text-white text-xl font-semibold mb-2">{title}</h2>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{description}</p>

        {/* 💰 Price */}
        <div className="flex items-center justify-between mb-4 flex-wrap">
          <div>
            <span className="text-cyan-400 text-lg font-semibold mr-2">
              ₹{finalPrice}
            </span>
            <span className="text-zinc-500 line-through text-sm">
              ₹{price}
            </span>
          </div>
          <span className="text-white rounded-4xl whitespace-nowrap bg-gray-700 py-2 px-3 font-bold text-sm">
            {stock} left
          </span>
          <span className="text-red-400 font-medium text-sm">
            {discount}% OFF
          </span>
        </div>

        {/* 🔘 Button */}
        {!inCart ?
          <button
            onClick={AddToCart}
            className="w-full bg-cyan-600 hover:bg-cyan-500 scale-75 text-white font-semibold py-2 rounded-xl transition-all duration-200">
            Add to Cart
          </button> : <> <button
            onClick={RemoveFromCart}
            className="w-full bg-red-500 hover:bg-red-600 scale-75 tracking-tighter text-white font-semibold py-2 rounded-xl transition-all duration-200">
            Remove from Cart
          </button>
            <button
              onClick={()=>{navigate("/cart")}}
              className="w-full bg-cyan-500 hover:bg-cyan-600 scale-75 tracking-tighter text-white font-semibold py-2 rounded-xl transition-all duration-200">
              View  Cart
            </button>
          </>
        }
      </div>
    </div>
  );
};

export default ProductCard;
