// import React, { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axiosInstance from "../../utils/AxiosInstance";
// import { Link, useNavigate } from "react-router-dom"
// import ProductCard from "../products/ProductCard";

// const FeaturedProducts = () => {
// const [isLoading, setIsLoading] = useState(true)
// const [feauturedProducts, setFeauturedProducts] = useState([])
// async function GetFeaturedProducts() {
//   try {
//     const res=await axiosInstance.get("/product/featured")
//     setFeauturedProducts(res.data.featuredProducts)
//     setIsLoading(false)
//   } catch (error) {
//     console.log(error)
//   }
// } 
// useEffect(() => {
//   GetFeaturedProducts()
// }, [])

//   return (
//     <div className="w-full py-14 text-white px-4">
//       <h2 className="text-center text-4xl sm:text-5xl font-bold mb-10">
//         Featured <span className="text-purple-400">Products</span>
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">

//         {/* Loading Shimmer */}
//         {isLoading &&
//           [...Array(4)].map((_, i) => (
//             <div
//               key={i}
//               className="w-[250px] h-[330px] rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 animate-pulse"
//             ></div>
//           ))}

//         {/* Product Cards */}
//         {!isLoading &&
//           feauturedProducts?.map((p) => (
//           <ProductCard product={p}/>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedProducts;
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import ProductCard from "../products/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const FeaturedProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  async function GetFeaturedProducts() {
    try {
      const res = await axiosInstance.get("/product/featured");
      setFeaturedProducts(res.data.featuredProducts);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetFeaturedProducts();
  }, []);

  return (
    <div className="w-full py-14 text-white px-4 my-4">
      <h2 className="text-center text-4xl sm:text-5xl font-bold mb-10">
        Featured <span className="text-purple-400">Products</span>
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={25}
        centeredSlides={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-12"
      >
        {/* 🌀 Loading Shimmer Slides */}
        {isLoading &&
          [...Array(4)].map((_, i) => (
            <SwiperSlide key={i}>
              <div className="w-62.5 h-82.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 animate-pulse mx-auto"></div>
            </SwiperSlide>
          ))}

        {/* 🛍 Product Slides */}
        {!isLoading &&
          featuredProducts?.map((p, index) => (
            <SwiperSlide key={index}>
              <ProductCard product={p} />
            </SwiperSlide>
          ))}
      </Swiper>
   
    </div>
  );
};

export default FeaturedProducts;
