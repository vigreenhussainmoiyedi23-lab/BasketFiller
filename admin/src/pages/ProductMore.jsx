import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { DeleteHandler } from "../../../backend/src/controllers/product.controllers";

const ProductMore = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
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
  const GetProductDetails = async () => {
    try {
      const result = await axiosInstance.get(`/product/more/${id}`);
      setProduct(result.data.product);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  useEffect(() => {
    GetProductDetails();
  }, [id]);
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <h1 className="text-gray-700 text-xl font-semibold animate-pulse">
          Loading product details...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* 🖼️ Product Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl overflow-hidden shadow-md">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {product.photos &&
              product.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Product photo ${index + 1}`}
                  className="rounded-xl object-cover w-full h-40 border border-gray-200 hover:scale-[1.03] transition-transform duration-200"
                />
              ))}
          </div>
        </div>

        {/* 🧾 Product Details */}
        <div className="border-t border-gray-200 pt-6">
          <h1 className="md:text-3xl sm:text-2xl text-xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-gray-900 mb-3 capitalize ">
            {product.title}
          </h1>
          <div className="flex items-center justify-around">
            <div className="w-max min-w-20 h-max p-3 bg-slate-800 text-gray-300 text-xl font-bold rounded-4xl">Stock Left <span>{product.stock}</span></div>
            <div className="w-max min-w-20 h-max p-3 bg-gray-800 text-gray-300 text-xl font-bold rounded-4xl">Categoury <span>{product.categoury}</span></div>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6 sm:text-xl lg:text-2xl text-sm tracking-tighter">
            {product.description}
          </p>

          {/* 💰 Price Section */}
          <div className="flex items-center gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-blue-600">
                ₹{product.price * (100 - product.discount) / 100}
              </h2>
              <span className="text-gray-500 line-through text-lg">
                ₹{product.price}
              </span>
            </div>
            <span className="text-red-500 font-semibold text-lg">
              {product.discount}% OFF
            </span>
          </div>
        </div>

        {/* 🛒 Add to Cart Button */}
        <div className="flex items-center justify-center rounded-full overflow-hidden bg-gray-800 text-white mt-3">
          <Link
            to={`/product/edit/${id}`}
            className="w-1/2 mx-0.5 p-2 bg-blue-500 hover:bg-blue-600 text-center"
          >
            Edit
          </Link>
          <Link
            onClick={deleteHandler}
            className="w-1/2 mx-0.5 p-2 bg-red-500 hover:bg-red-700 text-center"
          >
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductMore;
