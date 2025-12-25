import React from 'react'

import axiosInstance from "../../utils/AxiosInstance";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react';

const AddToCartFeauture = ({stock,id}) => {
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
            if (result?.data) setInCart(true)
        } catch (error) {
            console.error("Error adding to cart:", error);
            if (error?.response?.data?.redirectTo) {
                navigate(error?.response?.data?.redirectTo)
            }
        }
    }
    const RemoveFromCart = async () => {
        try {
            const result = await axiosInstance.post(`/cart/remove/${id}`)
            if (result?.data) setInCart(false)
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
        <>
            {!stock > 0 ? <p className="text-red-600 text-sm md:text-xl">No stock available</p> : !inCart ?
                <button
                    onClick={AddToCart}
                    className="w-full bg-yellow-600 hover:bg-yellow-500 scale-75 text-white font-semibold py-2 rounded-xl transition-all duration-200">
                    Add to Cart
                </button> : <> <button
                    onClick={RemoveFromCart}
                    className="w-full bg-red-500 hover:bg-red-600 scale-75 tracking-tighter text-white font-semibold py-2 rounded-xl transition-all duration-200">
                    Remove from Cart
                </button>
                    <button
                        onClick={() => { navigate("/cart") }}
                        className="w-full bg-gray-500 hover:bg-cyan-600 scale-75 tracking-tighter text-white font-semibold py-2 rounded-xl transition-all duration-200">
                        View  Cart
                    </button>
                </>
            }
        </
        >
    )
}

export default AddToCartFeauture
