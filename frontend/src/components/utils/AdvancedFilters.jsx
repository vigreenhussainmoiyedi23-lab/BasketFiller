import React from "react";
import { X } from "lucide-react";

const AdvancedFilters = ({
  toggleAdvanced,
  filter,
  setFilter,
  categouries,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex   justify-center items-center bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-900 w-11/12 max-w-md rounded-xl shadow-2xl p-6 relative border border-zinc-700">
        <button
          onClick={toggleAdvanced}
          className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-semibold text-zinc-100 mb-4">
          Advanced Filters
        </h3>

        <div className="flex flex-col gap-4">
          {/* Category */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Category</label>
            <select
              value={filter.category}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  category: e.target.value,
                })
              }
              className="w-full outline-none px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 text-sm"
            >
              <option value="">All Categories</option>
              {categouries.map((c) => {
               return <option value={c}>{c}</option>;
              })}
            </select>
          </div>

          {/* Price range */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm text-zinc-400 mb-1">
                Min Price
              </label>
              <input
                type="number"
                value={filter.priceRange[0]}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    priceRange: filter.priceRange.splice(0, 1, e.target.value),
                  })
                }
                max={filter.priceRange[1]}
                placeholder="0"
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 text-sm placeholder:text-zinc-500 outline-none"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm text-zinc-400 mb-1">
                Max Price
              </label>
              <input
                type="number"
                value={filter.priceRange[1]}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    priceRange: filter.priceRange.splice(1, 1, e.target.value),
                  })
                }
                placeholder="10000"
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 text-sm placeholder:text-zinc-500 outline-none"
              />
            </div>
          </div>
        </div>

        <button
          onClick={toggleAdvanced}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilters;
