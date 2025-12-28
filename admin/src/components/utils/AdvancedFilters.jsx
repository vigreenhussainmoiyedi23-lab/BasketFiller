
import React from "react";
import { X } from "lucide-react";

const AdvancedFilters = ({ toggleAdvanced, filter, setFilter, categouries }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-11/12 max-w-md rounded-xl shadow-2xl p-6 relative border border-gray-200">
        {/* ❌ Close Button */}
        <button
          onClick={toggleAdvanced}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Advanced Filters
        </h3>

        <div className="flex flex-col gap-4">
          {/* 🧩 Category */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <select
              value={filter.category}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  category: e.target.value,
                  page: 1, // reset page when filter changes
                })
              }
              className="w-full outline-none px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Categories</option>
              {categouries.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* 💰 Price Range */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">
                Min Price
              </label>
              <input
                type="number"
                value={filter.minPrice}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    minPrice: Number(e.target.value),
                    page: 1,
                  })
                }
                max={filter.maxPrice}
                placeholder="0"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 text-sm placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">
                Max Price
              </label>
              <input
                type="number"
                value={filter.maxPrice}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    maxPrice: Number(e.target.value),
                    page: 1,
                  })
                }
                min={filter.minPrice}
                placeholder="100000"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 text-sm placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* 🏷️ Sort By */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Sort By</label>
            <select
              value={filter.sortBy}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  sortBy: e.target.value,
                  page: 1,
                })
              }
              className="w-full outline-none px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* 🧮 Rating Filter */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Minimum Rating
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={filter.rating}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  rating: Number(e.target.value),
                  page: 1,
                })
              }
              className="w-full accent-indigo-600"
            />
            <p className="text-sm text-gray-500 mt-1">
              {filter.rating} ⭐ & above
            </p>
          </div>

          {/* ✅ In-Stock Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={filter.instock}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  instock: e.target.checked,
                  page: 1,
                })
              }
              className="w-4 h-4 accent-indigo-600"
            />
            <label className="text-sm text-gray-700 select-none">
              Show only in-stock products
            </label>
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={toggleAdvanced}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-all"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilters;
