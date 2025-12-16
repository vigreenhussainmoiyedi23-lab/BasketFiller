import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
const CategoriesSection = () => {
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


  return (
    <div className="w-full py-16 text-white">
      <h2 className="text-center text-4xl sm:text-5xl font-bold mb-10">
        Shop By <span className="text-purple-400">Categories</span>
      </h2>
      <div className="w-screen overflow-hidden relative flex  h-max min-h-15">
        <div className="text-3xl xl:text-5xl w-max absolute top-0 animate-linearLoop flex gap-10 ">
          {categouries.map(cat => {
            return <p className="shrink-0 uppercase"><i>{cat}</i></p>
          })}
        </div>
      
      </div>

    </div>

  );
};

export default CategoriesSection;
