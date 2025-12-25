import React, { useState } from "react";
import Input from "../common/Input";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const CreateProduct = ({ reload }) => {

  async function GetCategouryEnumValues() {
    try {
      const res = await axiosInstance.get("/product/categouryEnum")
      setCategouries(res.data.categouryEnum)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    GetCategouryEnumValues()
  }, [])
  const [thumbnail, setThumbnail] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState('');
  const [categoury, setCategoury] = useState('Other')
  const [errorMessage, setErrorMessage] = useState(null)
  const [categouries, setCategouries] = useState()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitted)
      return
    setSubmitted(true)
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("price", price);
    fd.append("discount", discount); // ✅ fixed misplaced parenthesis
    fd.append("thumbnail", thumbnail);
    fd.append("stock", stock);
    fd.append("categoury", categoury);

    // ✅ If multiple photos are uploaded
    if (photos && photos.length > 0) {
      photos.forEach((photo) => {
        fd.append("productImages", photo);
      });
    }

    try {
      const result = await axiosInstance.post("/product/create", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setDescription('')
      setTitle('')
      setPrice('')
      setDiscount(0)
      setStock('')
      setCategoury('')
      setPhotos([])
      setThumbnail(null)
      reload(prev => prev + 1)
      setSubmitted(false)
    } catch (error) {
      const data = error?.response?.data;
      setSubmitted(false)

      if (error.status === 401) {
        return alert("You are not the admin.");
      }
      if (data?.redirectTo) {
        navigate(data.redirectTo);
      }
      if (data?.errors?.[0]?.msg) {
        setErrorMessage(data.errors[0].msg);
      } else if (data?.message) {
        setErrorMessage(data.message);
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  if (!categouries) {
    return <><h1>Loading essential things</h1></>
  }

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
              className="w-full resize-none max-w-xl border border-gray-300 rounded-xl p-3 text-gray-800 placeholder-gray-400 text-base sm:text-lg shadow-sm focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 outline-none"
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
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category</label>
            <select
              className="border-2 w-[95%] outline-none"
              name="categoury" id="categoury" onChange={(e) => { setCategoury(e.target.value) }} value={categoury}>
              {!categouries.length == 0 ? categouries.map((categoury, idx) => { return <option key={idx} value={categoury}>{categoury}</option> }) : ''}
            </select>
          </div>

          {/* Discount + stock*/}
          <div className="grid grid-cols-2 gap-4">
            {/* discount */}
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
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Stock Left
              </label>
              <Input
                type="number"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Enter stock left "
              />
            </div>
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
          {errorMessage ? <p className="text-red-500 text-sm text-center w-full">⚠️ {errorMessage}</p> : ''}

          <button
            type="submit"
            className="bg-cyan-600 active:bg-cyan-900 active:scale-70 hover:bg-cyan-700 transition-all text-white font-semibold py-3 rounded-xl shadow-md mt-4"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
