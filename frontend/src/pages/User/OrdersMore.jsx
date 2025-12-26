import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axiosInstance from "../../utils/AxiosInstance";
import { Navigate, useParams } from "react-router-dom";

const statusColor = {
  placed: "bg-yellow-500/10 text-yellow-400",
  shipped: "bg-blue-500/10 text-blue-400",
  delivered: "bg-green-500/10 text-green-400",
  cancelled: "bg-red-500/10 text-red-400",
};

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axiosInstance.get(`/order/more/${id}`);
      setOrder(res.data.order);
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  const cancelOrder = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    try {
      await axiosInstance.post(`/order/cancel/${id}`);
      alert("Your money will be refunded in 2-3 Buissness days")
      setOrder((prev) => ({ ...prev, orderStatus: "cancelled" }));

    } catch (error) {
      console.log(error)
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
        Loading order...
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* CENTERED CONTAINER */}
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 text-zinc-100">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-sm sm:text-xl md:text-2xl font-semibold break-all">
            Order{" "}
            <span className="text-zinc-400 text-xs sm:text-sm">
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
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-2">
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
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-2">
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
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
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
                <div className="h-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex flex-col">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="w-full h-40 object-cover rounded-md bg-zinc-800"
                  />

                  <div className="mt-3 space-y-1 flex-1">
                    <h3 className="text-sm font-medium">
                      {item.product.name}
                    </h3>

                    <p className="text-xs text-zinc-400">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-xs text-zinc-400">
                      Price: ₹{item.product.price}
                    </p>
                    <p className="text-sm font-semibold text-zinc-200">
                      Total: ₹{item.totalPrice}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Cancel Order */}
        <div className="bg-zinc-900 border flex sm:flex-row flex-col gap-2 items-center justify-center border-zinc-800 rounded-xl p-5">
          <button
            onClick={() => { window.history.back() }}
            className="w-full max-w-md xl:max-w-2xl bg-blue-400 hover:bg-blue-500
              text-white sm:text-sm md:text-xl lg:text-2xl text-xs font-medium px-6 py-3 rounded-4xl transition"
          >
            Go Back
          </button>
          {order.orderStatus === "placed" && (
            <button
              onClick={cancelOrder}
              className="w-full max-w-md xl:max-w-2xl bg-red-600 hover:bg-red-700
                       text-white sm:text-sm md:text-xl lg:text-2xl text-xs font-medium px-6 py-3 rounded-4xl transition"
            >
              Cancel Order
            </button>
          )}

        </div>
      </div>
    </div>
  );

};

export default OrderDetails;
