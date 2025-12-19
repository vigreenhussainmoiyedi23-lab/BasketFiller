
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axiosInstance from "../../utils/axiosInstance";

const ProductCard = ({ title, thumbnail, price, discount, description, id, stock }) => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false)
  }, 3000);
  const deleteHandler = async () => {
    try {
      const result = await axiosInstance.get(`/product/delete/${id}`)
      console.log(result)
    } catch (error) {
      const data = error?.response?.data;
      console.log(data)
      if (error.status === 401) {
        alert("You are not the admin.");
      }
      if (data?.redirectTo) {
        return navigate(data.redirectTo);
      }
    }
  }
  return (
    <div className="rounded-md hover:scale-110 hover:z-9 hover:border-2 hover:shadow-2xl hover:shadow-black/30 hover:border-blue-300 transition-all duration-175 ease-linear self-center shadow-md drop-shadow-2xl shadow-black/50 h-max mx-auto min-h-75 w-full sm:max-w-md max-w-100  px-5 py-2 bg-white backdrop-blur-3xl overflow-hidden">
      {/* 🖼️ Image */}
      <div className="relative w-full h-40 rounded-md overflow-hidden">
        {isLoading && <Skeleton width="100%" height={160} />}
        <img
          src={thumbnail}
          alt="Product Thumbnail"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={(e) => console.error("❌ Image failed to load:", e)}
          className={`absolute top-0 left-0 w-full h-full object-cover rounded-md transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"
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

      {/* 💰 Price + Discount + stock*/}
      {isLoading ? (
        <Skeleton height={25} width="100%" className="mt-2" />
      ) : (
        <div className="flex items-center justify-around text-xl h-max mt-1">
          <h1 className="text-yellow-500 font-semibold">
            {discount > 0 ? <><span className="line-through text-red-600 text-sm text-center">₹{price}</span> <br /></> : ''}

            ₹{price * (100 - discount) / 100}
          </h1>
          <p className="text-sm font-semibold text-gray-100 bg-gray-600 tracking-tighter overflow-hidden py-2 px-3 w-max h-max rounded-lg mt-2">
            {stock} left
          </p>
          {discount > 0 ? <h1 className="text-white font-semibold bg-red-500 rounded-[calc(50%+5px)] p-2  min-h-max">{discount}%</h1> : ""}
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
        <p className="text-xs font-semibold text-gray-700 tracking-tighter overflow-hidden w-full h-12.5 mt-2">
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
          <button
            onClick={deleteHandler}
            className="w-1/3 mx-0.5 p-2 bg-red-500 hover:bg-red-700 text-center"
          >
            Delete
          </button>
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