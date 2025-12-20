import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axiosInstance from "../../utils/axiosInstance";
import { Navigate, useParams } from "react-router-dom";

const statusColor = {
    placed: "bg-yellow-500/10 text-yellow-400",
    shipped: "bg-blue-500/10 text-blue-400",
    delivered: "bg-green-500/10 text-green-400",
    cancelled: "bg-red-500/10 text-red-400",
};

const OrderMore = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('')
    const updateStatus = async (newStatus) => {
        if (!confirm(`are u sure u want to set it to be ${newStatus}`)) {
            return
        }
        try {
            await axiosInstance.post(`/order/update/${order._id}/${newStatus}`);
            setStatus(newStatus);
        } catch (error) {
            const data = error?.response?.data;
            if (error.status === 403) return alert("You are not the admin.");
            if (data?.redirectTo) navigate(data.redirectTo);
            alert(data?.errors?.[0]?.msg || data?.message || "Something went wrong");
        }
    };
    const cancelOrder = async () => {
        try {
            await axiosInstance.post(`/order/cancel/${order._id}`);
            setStatus("cancelled");
        } catch (error) {
            const data = error?.response?.data;
            if (error.status === 403) return alert("You are not the admin.");
            if (data?.redirectTo) navigate(data.redirectTo);
            alert(data?.errors?.[0]?.msg || data?.message || "Something went wrong");
        }
    };
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axiosInstance.get(`/order/admin/${id}`);
                setOrder(res.data.order);
                setLoading(false);
                setStatus(res.data.order.orderStatus)

            } catch (error) {
                if (error.status == 403 || error.status==401) {
                    alert("Only Admin Can Access this page")
                    window.history.back()
                }
            }
        };
        fetchOrder();
    }, [id]);
    if (loading)
        return (
            <div className="min-h-screen bg-cyan-100 flex items-center justify-center text-zinc-800">
                Loading order...
            </div>
        );

    return (
        <div className="min-h-screen bg-cyan-200">
            {/* CENTERED CONTAINER */}
            <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 text-zinc-950">

                {/* Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-sm sm:text-xl md:text-2xl font-semibold break-all">
                        Order{" "}
                        <span className="text-zinc-800 text-xs sm:text-sm">
                            #{order._id}
                        </span>
                    </h1>

                    <span
                        className={`px-4 py-1 rounded-full text-xs sm:text-sm font-medium capitalize w-fit
          ${statusColor[order.orderStatus]}`}
                    >
                        {order.orderStatus}
                    </span>
                </div>

                {/* Order Summary + Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Order Summary */}
                    <div className="bg-cyan-200 border border-zinc-800 rounded-xl p-5 space-y-2">
                        <h2 className="text-base font-semibold mb-2">Order Summary</h2>

                        <p className="text-sm">
                            <span className="text-zinc-400">Payment Option:</span>{" "}
                            {order.paymentOption}
                        </p>
                        <p className="text-sm">
                            <span className="text-zinc-400">Payment Status:</span>{" "}
                            {order.paymentStatus}
                        </p>
                        <p className="text-sm">
                            <span className="text-zinc-400">Total Amount:</span>{" "}
                            ₹{order.totalAmount}
                        </p>
                        <p className="text-sm">
                            <span className="text-zinc-400">Ordered On:</span>{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Address */}
                    <div className="bg-cyan-200 border border-zinc-800 rounded-xl p-5 space-y-2">
                        <h2 className="text-base font-semibold mb-2">Shipping Address</h2>

                        <p className="font-medium text-sm">{order.fullName}</p>
                        <p className="text-sm text-zinc-400">{order.phoneNumber}</p>
                        <p className="text-sm text-zinc-400">
                            {order.street}, {order.city}
                        </p>
                        <p className="text-sm text-zinc-400">{order.state}</p>
                    </div>
                </div>

                {/* Products */}
                <div className="bg-cyan-200 border border-zinc-800 rounded-xl p-5">
                    <h2 className="text-base font-semibold mb-4">Ordered Products</h2>

                    <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={16}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {order.products.map((item) => (
                            <SwiperSlide key={item._id} className="h-auto">
                                <div className="h-full bg-cyan-300 border border-zinc-800 rounded-lg p-4 flex flex-col">
                                    <img
                                        src={item.product.thumbnail}
                                        alt={item.product.name}
                                        className="w-full h-40 object-cover rounded-md bg-zinc-800"
                                    />

                                    <div className="mt-3 space-y-1 flex-1">
                                        <h3 className="text-sm font-medium">
                                            {item.product.name}
                                        </h3>

                                        <p className="text-xs text-zinc-800">
                                            Quantity: {item.quantity}
                                        </p>
                                        <p className="text-xs text-zinc-800">
                                            Price: ₹{item.product.price}
                                        </p>
                                        <p className="text-sm font-semibold text-zinc-950">
                                            Total: ₹{item.totalPrice}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Cancel Order */}

                <div className="bg-cyan-200 text-zinc-900 lg:text-2xl sm:text-xl border flex sm:flex-row flex-col gap-2 items-center justify-center border-zinc-800 rounded-xl p-5">
                    <button
                        onClick={() => { window.history.back() }}
                        className="bg-cyan-300 font-bold rounded-4xl px-3 py-2"
                    >
                        Go Back
                    </button>
                    {status === "placed" && (
                        <>
                            <button
                                onClick={() => updateStatus("shipped")}
                                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
                            >
                                Mark as Shipped
                            </button>
                            <button
                                onClick={() => cancelOrder()}
                                className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                    {status === "shipped" && (
                        <button
                            onClick={() => updateStatus("delivered")}
                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
                        >
                            Mark as Delivered
                        </button>
                    )}
                    {status === "delivered" && (
                        <span className="text-green-600 font-semibold text-sm flex items-center gap-1">
                            ✅ Delivered
                        </span>
                    )}
                    {status === "cancelled" && (
                        <span className="text-red-600 font-semibold text-sm flex items-center gap-1">
                            ❌ Cancelled
                        </span>
                    )}
                </div>
            </div>
        </div>
    );

};

export default OrderMore;
