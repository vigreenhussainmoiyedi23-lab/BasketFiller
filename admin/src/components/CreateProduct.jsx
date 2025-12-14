import React, { useState } from "react";
import Input from "./Input";
import axiosInstance from "../utils/axiosInstance";



const CreateProduct = () => {


    const [thumbnail, setThumbnail] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);


 const handleSubmit = async (e) => {
  e.preventDefault();

  const fd = new FormData();
  fd.append("title", title);
  fd.append("description", description);
  fd.append("price", price);
  fd.append("discount", discount); // ✅ fixed misplaced parenthesis
  fd.append("thumbnail", thumbnail);

  // ✅ If multiple photos are uploaded
  if (photos && photos.length > 0) {
    photos.forEach((photo) => {
      fd.append("productImages", photo);
    });
  }

  try {
    const result = await axiosInstance.post("/product/create", fd);
    setDescription('')
    setTitle('')
    setPrice(0)
    setDiscount(0)
    setPhotos([])
    setThumbnail(null)
  } catch (error) {
     const data=error?.response?.data;
        console.log(data)
        if (error.status===401) {
          return  alert("You are not the admin.");
        }
        if (data?.redirectTo) {
            navigate(data.redirectTo);
        }
  }
};


  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 py-10">
      <div className="bg-white shadow-xl rounded-2xl w-[90%] max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Create a Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
          encType="multipart/form-data"
        >
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Product Title
            </label>
            <Input
              placeholder="Enter product title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description..."
              className="w-full max-w-md border border-gray-300 rounded-xl p-3 text-gray-800 placeholder-gray-400 text-base sm:text-lg shadow-sm focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 outline-none"
              rows={4}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price (₹)
            </label>
            <Input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Discount (%)
            </label>
            <Input
              type="number"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Enter discount (0-100)"
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Thumbnail (Single)
            </label>
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="w-full max-w-md border border-gray-300 rounded-xl p-3 bg-white text-gray-700 shadow-sm cursor-pointer focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 outline-none"
            />
            {thumbnail && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: {thumbnail.name}
              </p>
            )}
          </div>

          {/* Photos Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Product Photos (Multiple)
            </label>
            <input
              type="file"
              multiple
              name="productImages"
              accept="image/*"
              onChange={(e) => setPhotos(Array.from(e.target.files))}
              className="w-full max-w-md border border-gray-300 rounded-xl p-3 bg-white text-gray-700 shadow-sm cursor-pointer focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 outline-none"
            />
            {photos.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                {photos.length} file(s) selected
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-cyan-600 active:bg-cyan-900 active:scale-95 hover:bg-cyan-700 transition-all text-white font-semibold py-3 rounded-xl shadow-md mt-4"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
