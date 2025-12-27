import React from "react";

const BestProductShowcase = ({ productOfTheDay, productOfTheMonth, productOfTheYear }) => {
  const products = [
    { ...productOfTheDay, label: "Product of the Day" },
    { ...productOfTheMonth, label: "Product of the Month" },
    { ...productOfTheYear, label: "Product of the Year" },
  ].filter(p => p && p.product);

  if (!products.length) {
    return (
      <div className="text-center p-10 bg-gray-100 text-gray-500 rounded-xl">
        No product data available 😔
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-gray-800 text-2xl font-bold mb-6 text-center">
        🏆 Best Performing Products
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map(({ product, quantityPurchased, label }, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
          >
            {/* 🖼️ Product Image */}
            <div className="w-full h-56 bg-gray-50 overflow-hidden">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 🧾 Product Info */}
            <div className="p-4 flex flex-col gap-2 text-center">
              <span className="text-sm font-semibold text-indigo-500 uppercase tracking-wide">
                {label}
              </span>
              <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                {product.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>

              {/* 💰 Price and Stats */}
              <div className="flex justify-center items-center flex-wrap gap-2 mt-2">
                <span className="text-lg font-semibold text-emerald-600">
                  ₹{product.finalPrice}
                </span>
                {product.discount > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.price}
                  </span>
                )}
                <span className="text-yellow-500 font-medium">{product.rating.toFixed(1)}⭐</span>
              </div>

              <div className="mt-3 flex justify-center">
                <span className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
                  {quantityPurchased} sold
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Category: <span className="text-gray-600">{product.categoury}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestProductShowcase;
