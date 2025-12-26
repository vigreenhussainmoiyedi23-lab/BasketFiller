import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import AddToCartFeauture from "./AddToCartFeauture";

const ProductCard = ({ product }) => {
  const { title, rating, description, price, discount, finalPrice, thumbnail, stock } = product;
  const id = product._id;
  const [zoomed, setZoomed] = useState(false);

  // 🌀 refs to store RAF id and mouse position
  const frameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const imageRef = useRef(null);

  // 🔁 RAF animation loop
  const animateTilt = () => {
    if (!imageRef.current) return;

    const el = imageRef.current;
    const rect = el.getBoundingClientRect();

    // calculate center-based tilt
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((mouseRef.current.y - midY) / midY) * 10;
    const rotateY = ((mouseRef.current.x - midX) / midX) * -10;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    // keep looping
    frameRef.current = requestAnimationFrame(animateTilt);
  };

  const handleMouseEnter = () => {
    // start the animation loop
    if (!frameRef.current) frameRef.current = requestAnimationFrame(animateTilt);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    if (imageRef.current) {
      imageRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  // optional: disable background scroll when zoomed
  useEffect(() => {
    document.body.style.overflow = zoomed ? "hidden" : "auto";
  }, [zoomed]);

  return (
    <>
      {/* 🧱 Product Card */}
      <div className="bg-zinc-800 md:h-150 h-100 min-h-max  relative rounded-2xl border border-zinc-700 shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-cyan-500/20 transition-all duration-300">
        {/* 🖼️ Product Image */}
        <div
          style={{ perspective: "300px" }}
          className="w-full  h-50 overflow-hidden hover:h-full hover:absolute hover:top-0 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            ref={imageRef}
            src={thumbnail}
            alt={title}
            className="w-full h-full sm:object-cover object-contain   transition-transform duration-200 cursor-pointer will-change-transform"
            onClick={() => setZoomed(true)}
          />
        </div>

        {/* 🧾 Product Info */}
        <Link to={`/product/${id}`} className="px-5 py-2 min-h-30 max-h-70 block">
          <div>
            <h2 className="text-white text-xl font-semibold mb-2">{title}</h2>
            <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{description}</p>
          </div>

          {/* 💰 Price Section */}
          <div className="flex items-center justify-between mb-4 flex-wrap min-h-max h-20">
            <div className="flex flex-col">
              <span className="text-[yellow] text-lg font-semibold mr-2">₹{finalPrice}</span>
              {discount !== 0 && (
                <span className="text-red-500 line-through text-sm">₹{price}</span>
              )}
            </div>
            {stock < 100 && (
              <span className="text-white rounded-4xl whitespace-nowrap bg-gray-700 py-2 px-3 font-bold text-sm">
                Only {stock} left
              </span>
            )}
            {discount !== 0 && (
              <span className="text-red-400 font-semibold text-sm">{discount}% OFF</span>
            )}
            <span className="mb-2 text-sm">{rating + "⭐" || ""}</span>
          </div>
        </Link>
        <AddToCartFeauture stock={stock} id={id} />
      </div>

      {/* 🔍 Zoom Modal (renders outside swiper via portal) */}
      {zoomed &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <button
              onClick={() => setZoomed(false)}
              className="absolute top-6 right-6 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
            >
              <X size={28} />
            </button>
            <img
              src={thumbnail}
              alt="Zoomed Product"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-xl"
            />
          </div>,
          document.body
        )}
    </>
  );
};

export default ProductCard;
