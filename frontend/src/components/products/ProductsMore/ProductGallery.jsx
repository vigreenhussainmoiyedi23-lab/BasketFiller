import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

const ProductGallery = ({ product }) => {
  const [zoomImage, setZoomImage] = useState(null);

  return (
    <>
      {/* Swiper gallery */}
      <Swiper
        slidesPerView={1}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        centeredSlides
        spaceBetween={20}
        className="mb-8"
      >
        {[product.thumbnail, ...product.photos].map((img, i) => (
          <SwiperSlide key={i}>
        <h1 className="absolute bottom-5 right-5 font-bold text-black/90 pointer-events-none"> Click Image</h1>
            <img
              onClick={() => setZoomImage(img)} // 👈 click to zoom
              src={img}
              alt={product.title}
              className="rounded-xl h-96 w-full object-cover cursor-pointer hover:scale-105 transition-transform"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Zoom overlay (Portal so it’s outside Swiper transform context) */}
      {zoomImage &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-6 right-6 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
            >
              <X size={28} />
            </button>
            <img
              src={zoomImage}
              alt="Zoomed Product"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-xl"
            />
          </div>,
          document.body
        )}
    </>
  );
};

export default ProductGallery;
