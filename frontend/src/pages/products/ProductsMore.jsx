import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";
import ProductGallery from "../../components/products/ProductsMore/ProductGallery";
import ProductInfo from "../../components/products/ProductsMore/ProductInfo";
import AllReviews from "../../components/products/ProductsMore/AllReviews";
import UserReviews from "../../components/products/ProductsMore/UserReviews";
import ReviewForm from "../../components/products/ProductsMore/ReviewForm";
import FeaturedProducts from "../../components/Home/FeauturedProducts"

const ProductsMore = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [userReviews, setUserReviews] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getProduct = async () => {
        try {
            const { data } = await axiosInstance.get(`/product/more/${id}`);
            setProduct(data.product);
        } catch (err) {
            setError(err.message);
        }
    };

    const getUserReviews = async () => {
        try {
            const { data } = await axiosInstance.post(`/comment/user/${id}`);
            setUserReviews(data.userReviews);
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteHandler = async (commentId) => {
        if (!confirm("Are you sure you want to delete this?")) return;
        try {
            await axiosInstance.post(`/comment/delete/${id}/${commentId}`);
            getUserReviews();
            getProduct();
        } catch (err) {
            setError(err.message);
        }
    };
    const UpdateHandler = async (commentId, review) => {
        try {
            await axiosInstance.post(`/comment/edit/${id}/${commentId}`, review);
            getUserReviews();
            getProduct();
        } catch (err) {
            setError(err.message);
        }
    };

    const submitReview = async (review) => {
        try {
            await axiosInstance.post(`/comment/create/${id}`, review);
            getProduct();
            getUserReviews();
        } catch (err) {
            if (err.status === 401 || err.status === 403) return navigate("/login");
            alert(err?.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        getProduct();
        getUserReviews();
    }, [id]);

    if (error) return <h1 className="text-white text-center text-4xl">{error}</h1>;
    if (!product)
        return <h1 className="text-white text-center text-4xl">Loading...</h1>;

    return (
        <div className="p-6 text-white max-w-6xl mx-auto">
            <ProductGallery product={product} />
            <ProductInfo product={product} />

            <AllReviews comments={product.comments} />
            <UserReviews reviews={userReviews} onDelete={deleteHandler} onUpdate={UpdateHandler} />
            <ReviewForm onSubmit={submitReview} />
        </div>
    );
};

export default ProductsMore;
