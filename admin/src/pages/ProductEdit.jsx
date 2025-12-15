import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Input from '../components/Input'
import axiosInstance from '../utils/axiosInstance'

const ProductEdit = () => {
    const { id } = useParams()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [product, setProduct] = useState(null);
    const [categoury, setCategoury] = useState('')
    const [categouries, setCategouries] = useState([
        'electronics',
        'fashion',
        'home-appliances',
        'books',
        'groceries',
        'beauty-products',
        'toys',
        'sports',
        'automotive',
        'furniture',
        'jewelry',
        'Other',
    ])
    const navigate = useNavigate()
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title || product?.title);
            formData.append("description", description || product?.description);
            formData.append("price", price || product?.price);
            formData.append("discount", discount || product?.discount);
            formData.append("stock", stock || product?.stock);
            formData.append("categoury", categoury || product?.categoury);
            const result = await axiosInstance.post(`/product/edit/${id}`, formData);
            window.history.back();
        } catch (error) {
            const data = error?.response?.data;
            console.log(data)
            if (error.status === 401) {
                return alert("You are not the admin.");
            }
            if (data?.redirectTo) {
                navigate(data.redirectTo);
            }
        }
    }

    if (product) {
        return (
            <div className='bg-gray-100 flex items-center justify-center text-gray-900 p-4 rounded shadow-md w-screen h-screen'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-xl bg-white p-6 rounded shadow-md'>
                    <h1 className='text-blue-500 text-center font-bold  sm:text-3xl text-2xl md:text-4xl'>Update Product</h1>
                    <p className=''>Title</p>
                    <Input name="title" placeholder="Enter the new Title" value={title || product?.title} onChange={(e) => { setTitle(e.target.value) }} />
                    <p className=''>stock</p>
                    <Input name="stock" type='Number' placeholder="Enter the new Stock" value={stock || product?.stock} onChange={(e) => { setStock(e.target.value) }} />
                    <p className=''>price</p>
                    <Input name="price" type='Number' placeholder="Enter the new Price" value={price || product?.price} onChange={(e) => { setPrice(e.target.value) }} />
                    <p className=''>discount</p>
                    <Input name="discount" type='Number' placeholder="Enter the new Discount" value={discount || product?.discount} onChange={(e) => { setDiscount(e.target.value) }} />
                    <textarea name="description" id="description"
                        className="resize-none w-full max-w-xl h-30 max-h-50 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 text-base sm:text-lg shadow-sm transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 focus:outline-none ${className}"
                        placeholder='Enter the new description'
                        value={description || product?.description} onChange={(e) => { setDescription(e.target.value) }}>
                    </textarea>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Category</label>
                        <select
                            className="border-2 w-[95%] outline-none"
                            name="categoury" id="categoury" onChange={(e) => { setCategoury(e.target.value) }} value={categoury}>
                            <option value="">Select a Category</option>
                            {!categouries.length == 0 ? categouries.map(categoury => { return <option value={categoury}>{categoury}</option> }) : ''}
                        </select>
                    </div>
                    <div className='flex items-center justify-around gap-2'>
                        <button
                            className='bg-blue-400 active:bg-blue-900 active:scale-95 hover:bg-blue-500 rounded-4xl text-white min-w-max w-1/2 py-2 px-4 text-center'>
                            Update Product
                        </button>
                        <Link
                            onClick={(e) => {
                                e.preventDefault();
                                window.history.back();
                            }}
                            className='bg-blue-400 active:bg-blue-900 active:scale-95 hover:bg-blue-500 rounded-4xl text-white min-w-max w-1/2 py-2 px-4 text-center'>
                            Go Back
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
    return <div className="flex justify-center items-center h-screen bg-gray-50">
        <h1 className="text-gray-700 text-2xl font-semibold animate-pulse">
            Loading product details...
        </h1>
    </div>
}

export default ProductEdit
