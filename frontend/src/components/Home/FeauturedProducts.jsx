import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/AxiosInstance";

const FeaturedProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products/featured");
      return res.data.products;
    },
  });

  return (
    <div className="w-full py-14 text-white px-4">
      <h2 className="text-center text-4xl sm:text-5xl font-bold mb-10">
        Featured <span className="text-purple-400">Products</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">

        {/* Loading Shimmer */}
        {isLoading &&
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-[250px] h-[330px] rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 animate-pulse"
            ></div>
          ))}

        {/* Product Cards */}
        {!isLoading &&
          data?.map((p) => (
            <div
              key={p._id}
              className="w-[250px] h-[330px] bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:scale-105 transition-all"
            >
              <div className="w-full h-[180px] rounded-lg overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover hover:scale-110 duration-300"
                />
              </div>

              <p className="mt-3 text-xl font-semibold">{p.name}</p>
              <p className="text-purple-300 text-lg font-bold">₹{p.price}</p>

              <button className="mt-3 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
