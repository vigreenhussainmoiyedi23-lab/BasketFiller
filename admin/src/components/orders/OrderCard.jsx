// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import axiosInstance from "../../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";

// const OrderCard = ({ order }) => {
//   const [status, setStatus] = useState(order.orderStatus);
//  const navigate=useNavigate()
//   const handleShip = async () => {
//     try {
//       await axiosInstance.post(`/order/update/${order._id}/shipped`)
//       setStatus("shipped")
      
//     } catch (error) {
//       const data = error?.response?.data;

//       if (error.status === 403) {
//         return alert("You are not the admin.");
//       }
//       if (data?.redirectTo) {
//         navigate(data.redirectTo);
//       }
//       if (data?.errors?.[0]?.msg) {
//         alert(data.errors[0].msg);
//       } else if (data?.message) {
//         alert(data.message);
//       } else {
//         alert("Something went wrong");
//       }
//     }
//   };
//   const handleDeliver = async () => {
//     try {
//       await axiosInstance.post(`/order/update/${order._id}/delivered`)
//       setStatus("delivered")
      
//     } catch (error) {
//       const data = error?.response?.data;

//       if (error.status === 403) {
//         return alert("You are not the admin.");
//       }
//       if (data?.redirectTo) {
//         navigate(data.redirectTo);
//       }
//       if (data?.errors?.[0]?.msg) {
//         alert(data.errors[0].msg);
//       } else if (data?.message) {
//         alert(data.message);
//       } else {
//         alert("Something went wrong");
//       }
//     }
//   };
//   const handleCancel = async () => {
//     try {
//       await axiosInstance.post(`/order/update/${order._id}/cancelled`)
//       setStatus("cancelled")
      
//     } catch (error) {
//       const data = error?.response?.data;

//       if (error.status === 403) {
//         return alert("You are not the admin.");
//       }
//       if (data?.redirectTo) {
//         navigate(data.redirectTo);
//       }
//       if (data?.errors?.[0]?.msg) {
//         alert(data.errors[0].msg);
//       } else if (data?.message) {
//         alert(data.message);
//       } else {
//         alert("Something went wrong");
//       }
//     }
//   };

//   return (
//     <div
//       className={`bg-white shadow-md border border-gray-200 rounded-xl p-6 mb-5 transition hover:shadow-lg ${status === "delivered"
//           ? "border-green-400"
//           : status === "cancelled"
//             ? "border-red-400 opacity-75"
//             : "border-yellow-300"
//         }`}
//     >
//       {/* Header */}
//       <div className="flex justify-between items-center border-b pb-3 mb-4">
//         <h3 className="text-lg font-semibold text-gray-800">
//           Order #{order._id.slice(-6)}
//         </h3>

//         <span
//           className={`text-sm font-medium px-3 py-1 rounded-full ${status === "delivered"
//               ? "bg-green-100 text-green-700"
//               : status === "shipped"
//                 ? "bg-blue-100 text-blue-700"
//                 : status === "cancelled"
//                   ? "bg-red-100 text-red-700"
//                   : "bg-yellow-100 text-yellow-700"
//             }`}
//         >
//           {status.toUpperCase()}
//         </span>
//       </div>

//       {/* Product Images Swiper */}
//       <div className="w-full mb-4">
//         <Swiper
//           modules={[Navigation]}
//           navigation
//           spaceBetween={10}
//           slidesPerView={3}
//           className="rounded-md"
//         >
//           {order.products.map((p, i) => (
//             <SwiperSlide key={i}>
//               <img
//                 src={p.product?.thumbnail || "/placeholder.jpg"}
//                 alt={p.product?.title || "Product"}
//                 className="h-32 w-full object-cover rounded-md border"
//               />
//               <p className="text-sm text-gray-600 mt-1 truncate text-center">
//                 product:{p.product?.title || "Product Name"}
//                 <br />
//                 quantity:{p?.quantity || "Product Quantity"}
//               </p>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Details */}
//       <div className="text-sm text-gray-700 space-y-1">
//         <p>
//           <span className="font-semibold">Customer:</span> {order.fullName}
//         </p>
//         <p>
//           <span className="font-semibold">Total Amount:</span> ₹
//           {order.totalAmount}
//         </p>
//         <p className="text-gray-500 text-xs">
//           Ordered on:{" "}
//           {new Date(order.createdAt).toLocaleString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           })}
//         </p>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end gap-3 mt-5">
//         {status === "placed" && (
//           <>
//             <button
//               onClick={handleShip}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//             >
//               Mark as Shipped
//             </button>
//             <button
//               onClick={handleCancel}
//               className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
//             >
//               Cancel
//             </button>
//           </>
//         )}

//         {status === "shipped" && (
//           <button
//             onClick={handleDeliver}
//             className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//           >
//             Mark as Delivered
//           </button>
//         )}

//         {status === "delivered" && (
//           <span className="text-green-600 font-semibold">✅ Delivered</span>
//         )}

//         {status === "cancelled" && (
//           <span className="text-red-600 font-semibold">❌ Cancelled</span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderCard;
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const [status, setStatus] = useState(order.orderStatus);
  const navigate = useNavigate();

  const updateStatus = async (newStatus) => {
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

  return (
    <div
      className={`bg-white border rounded-xl shadow-md hover:shadow-lg transition-all mb-6 overflow-hidden ${
        status === "delivered"
          ? "border-green-400"
          : status === "cancelled"
          ? "border-red-400 opacity-80"
          : "border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 px-5 py-4 border-b gap-2">
        <div>
          <h3 className="text-gray-800 font-semibold text-sm sm:text-base">
            Order #{order._id.slice(-6)}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm">
            Ordered on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-1 sm:mt-0 ${
            status === "delivered"
              ? "bg-green-100 text-green-700"
              : status === "shipped"
              ? "bg-blue-100 text-blue-700"
              : status === "cancelled"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 p-5">
        {/* Swiper */}
        <div className="md:w-1/2 w-full">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={1}
            className="rounded-lg"
          >
            {order.products.map((p, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                  <img
                    src={p.product?.thumbnail || "/placeholder.jpg"}
                    alt={p.product?.title || "Product"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs sm:text-sm">
                    <p className="truncate font-medium">
                      {p.product?.title || "Unnamed Product"}
                    </p>
                    <p className="opacity-90">
                      Qty: {p.quantity} × ₹{p.product?.finalPrice || "—"}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Details */}
        <div className="md:w-1/2 w-full flex flex-col justify-between gap-3 text-gray-700">
          <div className="space-y-1 text-sm sm:text-base">
            <p>
              <span className="font-semibold text-gray-900">Customer:</span>{" "}
              {order.fullName}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Phone:</span>{" "}
              {order.phoneNumber.toString().slice(0,2)}XXXXXXXX
            </p>
            <p>
              <span className="font-semibold text-gray-900">Payment:</span>{" "}
              {order.paymentOption} ({order.paymentStatus})
            </p>
          </div>

          <div className="text-sm sm:text-base font-semibold border-t pt-2">
            Total Amount: ₹{order.totalAmount.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-end gap-3 px-5 py-4 bg-gray-50 border-t">
        {status === "placed" && (
          <>
            <button
              onClick={() => updateStatus("shipped")}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
            >
              Mark as Shipped
            </button>
            <button
              onClick={() => updateStatus("cancelled")}
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
  );
};

export default OrderCard;
