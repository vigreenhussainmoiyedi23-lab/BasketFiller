import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductGallery = ({ product }) => {
  return (
    <Swiper
      slidesPerView={1}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      centeredSlides
      spaceBetween={20}
      className="mb-8"
    >
      {[product.thumbnail, ...product.photos].map((img, i) => (
        <SwiperSlide key={i}>
          <img
            src={img}
            alt={product.title}
            className="rounded-xl h-96 w-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductGallery;
