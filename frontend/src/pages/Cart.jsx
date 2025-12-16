import React from "react";
import axiosInstance from "../utils/AxiosInstance";
import { useState } from "react";
import { useEffect } from "react";
import { Minus, Plus, Trash } from "lucide-react";
import Navbar from "../components/utils/Navbar";
import Footer from "../components/Home/Footer";
import { useNavigate, Link } from 'react-router-dom'

const Cart = () => {
    const [cartItems, setCartItems] = useState(null)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()
    async function GetCartItems() {
        try {
            const response = await axiosInstance.get('/cart')
            setCartItems(response.data.cartItems);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            if (error.response.data.redirectTo) {
                navigate(error.response.data.redirectTo)
            }
        }
    }
    useEffect(() => {
        GetCartItems();
    }, [updated])
    const CartFunctions = {
        IncreaseQuantity: async (productId) => {
            try {
                const response = await axiosInstance.post(`/cart/increase/${productId}`);
                setUpdated(prev => !prev)
            } catch (error) {
                console.error("Error increasing quantity:", error);
            }
        },
        DecreaseQuantity: async (productId) => {
            try {
                const response = await axiosInstance.post(`/cart/decrease/${productId}`);
                setUpdated(prev => !prev)

            } catch (error) {
                console.error("Error decreasing quantity:", error);
            }
        },
        RemoveFromCart: async (productId) => {
            try {
                const response = await axiosInstance.post(`/cart/remove/${productId}`);
                setUpdated(prev => !prev)

            } catch (error) {
                console.error("Error removing from cart:", error);
                if (error.response.data.redirectTo) {

                }
            }
        },

    }

if (!cartItems) {
    return <><div className="w-screen h-screen bg-zinc-950">Loding CartItems</div></>
}


    // Calculate total
    const total = cartItems.reduce(
        (acc, item) => acc + ((item.product.price * (100 - item.product.discount) / 100) * item.quantity),
        0
    );
    return (
        <div className="bg-zinc-950 w-full h-max min-h-screen">
            <Navbar />
            <div className="min-h-screen bg-zinc-950 text-white flex justify-center items-start p-6">

                <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
                    {/* Cart Items */}
                    <div className="flex-1 bg-zinc-900 rounded-lg sm:p-6 p-3 md:w-max w-full md:justify-normal justify-around">
                        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
                        {cartItems.length === 0 ? (<>
                            <p className="text-gray-400 mb-4">Your cart is empty.</p>
                        </>
                        ) : (
                            <div className="space-y-4 h-max  w-full max-w-lg">
                                {cartItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex sm:flex-row   flex-col gap-2 items-center justify-between bg-zinc-800 rounded-lg p-4 "
                                    >
                                        <div className="flex items-center gap-4 ">
                                            <img
                                                src={item.product.thumbnail}
                                                alt={item.product.title}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div>
                                                <h3 className="font-medium tracking-tighter ">{item.product.title}</h3>
                                                <p className="text-gray-400"><span className="text-red-400 line-through">₹{item.product.price}</span>₹{item.product.price * (100 - item.product.discount) / 100}</p>
                                            </div>
                                        </div>
                                        {/* Quantity Manipulation And Removeing the product */}
                                        <div className="flex items-center gap-4 ">
                                            <button
                                                onClick={() => { CartFunctions.IncreaseQuantity(item.product._id) }}
                                                className="bg-cyan-200/10  p-1 rounded-xl font-bold text-xl md:text-2xl">
                                                <Plus />
                                            </button>
                                            <span className="bg-zinc-700 px-3 py-1 rounded-md whitespace-nowrap">
                                                Qty: {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => { CartFunctions.DecreaseQuantity(item.product._id) }}
                                                className="bg-cyan-200/10  p-1 rounded-xl font-bold text-xl md:text-2xl">
                                                <Minus />
                                            </button>
                                            <button onClick={() => { CartFunctions.RemoveFromCart(item.product._id) }} className="text-red-500 hover:text-red-400">
                                                <Trash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    {/* Summary */}
                    <div className="w-full md:w-1/3 bg-zinc-900 rounded-lg p-6 flex flex-col gap-6">
                        <h2 className="text-2xl font-semibold">Order Summary</h2>
                        <div className="flex justify-between text-gray-300">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <hr className="border-zinc-700" />
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>₹{(total)}</span>
                        </div>
                        {cartItems.length===0?
                        
                        <button
                            onClick={() => { navigate("/products") }}
                            className="bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-medium py-3 rounded-lg">
                            Add Products In cart
                        </button>:<button
                            onClick={() => { navigate("/checkout") }}
                            className="bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-medium py-3 rounded-lg">
                            Checkout
                        </button>
                        }
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Cart;
