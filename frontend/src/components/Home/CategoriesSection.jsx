import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

const CategoriesSection = () => {
  const categories = [
    { name: "Groceries", img: "/images/cat1.jpg" },
    { name: "Home Care", img: "/images/cat2.jpg" },
    { name: "Snacks", img: "/images/cat3.jpg" },
    { name: "Personal Care", img: "/images/cat4.jpg" },
    { name: "Stationery", img: "/images/cat5.jpg" },
  ];

  return (
    <div className="w-full py-16 text-white">
      <h2 className="text-center text-4xl sm:text-5xl font-bold mb-10">
        Shop By <span className="text-purple-400">Categories</span>
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={1.4}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
        }}
        freeMode={true}
        modules={[FreeMode]}
        className="px-6"
      >
        {categories.map((cat, i) => (
          <SwiperSlide
            key={i}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-lg flex flex-col items-center"
          >
            <div className="w-full h-[180px] overflow-hidden rounded-lg">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover hover:scale-110 transition-all"
              />
            </div>
            <p className="text-xl mt-3 font-semibold">{cat.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriesSection;
