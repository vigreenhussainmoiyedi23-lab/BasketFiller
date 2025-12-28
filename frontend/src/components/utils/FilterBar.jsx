import React, { useState } from "react";
import { SlidersHorizontal, Search, X } from "lucide-react";
import AdvancedFilters from "./AdvancedFilters";

const FilterBar = ({ filter, setFilter, categouries }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const toggleAdvanced = () => setShowAdvanced(!showAdvanced);
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-zinc-950 p-4 rounded-xl shadow-sm border border-zinc-800">
      {/* 🔍 Search */}
      <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 w-full md:w-auto flex-1">
        <Search className="text-zinc-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search  products..."
          value={filter?.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className="flex-1 bg-transparent outline-none text-zinc-100 text-sm placeholder:text-zinc-500"
        />
      </div>

      {/* ⚙️ Filters Button */}
      <button
        onClick={toggleAdvanced}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </button>

      {/* 📱 Advanced Popup */}
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
