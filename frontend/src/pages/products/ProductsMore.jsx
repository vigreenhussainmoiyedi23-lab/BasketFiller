import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const ProductsMore = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [userReviews, setUserReviews] = useState(null)
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const [review, setReview] = useState({
        title: "",
        description: "",
        rating: 5,
    });

    const getProduct = async () => {
        try {
            const { data } = await axiosInstance.get(`/product/more/${id}`);
            setProduct(data.product);
            console.log(data)
        } catch (err) {
            setError(err.message);
        }
    };
    const GetUserReviews = async () => {
        try {
            const { data } = await axiosInstance.post(`/comment/user/${id}`);
            setUserReviews(data.userReviews);
            console.log(data)
        } catch (err) {
            setError(err.message);
        }
    };
    const deleteHandler = async (commentId) => {
        if (!confirm("are you sure You want to delete this")) return
        try {
            const { data } = await axiosInstance.post(`/comment/delete/${id}/${commentId}`);
            setUserReviews(data.userReviews);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        getProduct();
        GetUserReviews()
    }, [id]);

    const submitReview = async () => {
        try {
            await axiosInstance.post(`/comment/create/${id}`, review);
            getProduct();
            setReview({ title: "", description: "", rating: 5 });
        } catch (err) {
            if (err.status == 401 || err.status == 403) {
                return navigate("/login")
            }
            if (err.response.data.message) {
                return alert(err.response.data.message)
            }
            else if (err.response.data.errors[0]) {
                return alert(err.response.data.errors[0].msg)
            }
            else {
                return alert("Something went wrong")
            }
        }
    };

    if (error) {
        return <h1 className="text-white text-center text-4xl">{error}</h1>;
    }

    if (!product) {
        return <h1 className="text-white text-center text-4xl">Loading...</h1>;
    }

    return (
        <div className="p-6 text-white max-w-6xl mx-auto">

            {/* IMAGE SWIPER */}
            <Swiper
                slidesPerView={1.5}
                centeredSlides={true}
                spaceBetween={20}
                className="mb-8"
            >
                {[product.thumbnail, ...product.photos].map((img, i) => (
                    <SwiperSlide key={i}>
                        <img
                            src={img}
                            alt=""
                            className="rounded-xl h-96 w-full object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* PRODUCT INFO */}
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <p className="text-gray-300 mt-2">{product.description}</p>

            {/* PRICE */}
            <div className="mt-4 flex gap-4 items-center">
                <span className="text-3xl font-bold text-green-400">
                    ₹{product.finalPrice}
                </span>
                {product.discount > 0 && (
                    <span className="line-through text-gray-400">
                        ₹{product.price}
                    </span>
                )}
            </div>

            {/* STOCK */}
            {product.stock < 100 && (
                <p className="mt-2 text-red-400">
                    Hurry! Only {product.stock} items left
                </p>
            )}

            {/* RATING */}
            <div className="flex items-center gap-2 mt-4">
                {[...Array(5)].map((_, i) => (
                    <FaStar
                        key={i}
                        color={i < Math.round(product.rating) ? "gold" : "gray"}
                    />
                ))}
                <span>({product.rating?.toFixed(1) || 0})</span>
            </div>

            {/* REVIEWS */}
            <div className="mt-10">
                <h2 className="text-2xl mb-4">All Reviews</h2>
                {product.comments.length == 0 ? <h1>no reviews yet</h1> : product.comments.map((c, i) => (
                    <div key={i} className="bg-zinc-800 p-4 rounded-xl mb-3 ">
                        <div className="flex gap-1 mb-1 items-center justify-between">
                            <div className="flex gap-1 mb-1">
                                {[...Array(5)].map((_, j) => (
                                    <FaStar
                                        key={j}
                                        color={j < c.rating ? "gold" : "gray"}
                                    />
                                ))}
                            </div>
                            <h1>{c.User.username}</h1>
                        </div>
                        <h3 className="font-bold">{c.title}</h3>
                        <p className="text-gray-300">{c.description}</p>
                    </div>
                ))}
            </div>
            {/* Users Reviews */}
            {(userReviews && userReviews.length > 0) ?
                <div className="mt-10">
                    <h2 className="text-2xl mb-4">Your Reviews</h2>
                    {userReviews.length == 0 ? <h1>no reviews yet</h1> : userReviews.map((c, i) => (
                        <div key={i} className="bg-zinc-800 p-4 rounded-xl mb-3 ">
                            <div className="flex gap-1 mb-1 items-center justify-between">
                                <div className="flex gap-1 mb-1">
                                    {[...Array(5)].map((_, j) => (
                                        <FaStar
                                            key={j}
                                            color={j < c.rating ? "gold" : "gray"}
                                        />
                                    ))}
                                </div>
                                <h1>{c.User.username}</h1>
                            </div>
                            <div className="flex gap-1 mb-1 items-center justify-between">
                                <button

                                    className="bg-blue-500 rounded-4xl px-5 py-2 text-center min-w-10 text-white shadow  ">
                                    Edit
                                </button>
                                <button
                                onClick={()=>{deleteHandler(c._id)}}
                                    className="bg-red-600 rounded-4xl px-5 py-2 text-center min-w-10 text-white shadow ">
                                    Delete
                                </button>
                            </div>

                            <h3 className="font-bold">{c.title}</h3>
                            <p className="text-gray-300">{c.description}</p>

                        </div>
                    ))}
                </div>
                : ""}
            {/* ADD REVIEW */}
            <div className="mt-8 bg-zinc-900 p-6 rounded-xl">
                <h2 className="text-xl mb-4">Add Review</h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={review.title}
                    onChange={(e) => setReview({ ...review, title: e.target.value })}
                    className="w-full p-2 mb-2 bg-zinc-800 rounded outline-none"
                />

                <textarea
                    placeholder="Description"
                    value={review.description}
                    onChange={(e) =>
                        setReview({ ...review, description: e.target.value })
                    }
                    className="w-full p-2 mb-2 bg-zinc-800 rounded resize-none outline-none"
                />

                <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <FaStar
                            key={num}
                            size={24}
                            className="cursor-pointer"
                            color={num <= review.rating ? "gold" : "gray"}
                            onClick={() => setReview({ ...review, rating: num })}
                        />
                    ))}
                </div>

                <button
                    onClick={submitReview}
                    className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
                >
                    Submit Review
                </button>
            </div>
        </div>
    );
};

export default ProductsMore;
