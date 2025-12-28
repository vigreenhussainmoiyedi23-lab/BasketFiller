import React, { useState } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import AdvancedFilters from "./AdvancedFilters";

const FilterBar = ({ filter, setFilter, categouries }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const toggleAdvanced = () => setShowAdvanced(!showAdvanced);

  return (
    <div className="flex flex-col my-5 md:flex-row gap-4 bg-gray-200 p-4 rounded-xl shadow-sm border border-gray-200">
      {/* 🔍 Search Bar */}
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto flex-1">
        <Search className="text-gray-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search products..."
          value={filter?.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className="flex-1 bg-transparent outline-none text-gray-700 text-sm placeholder:text-gray-400"
        />
      </div>

      {/* ⚙️ Filters Button */}
      <button
        onClick={toggleAdvanced}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </button>

      {/* 📱 Advanced Filters Popup */}
      {showAdvanced && (
        <AdvancedFilters
          categouries={categouries}
          filter={filter}
          setFilter={setFilter}
          toggleAdvanced={toggleAdvanced}
        />
      )}
    </div>
  );
};

export default FilterBar;
