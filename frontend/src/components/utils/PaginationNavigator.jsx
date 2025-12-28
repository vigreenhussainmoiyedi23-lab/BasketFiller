import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationNavigator = ({ filter, setFilter, totalPages }) => {
  const currentPage = filter?.page || 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setFilter({ ...filter, page });
    }
  };

  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex justify-center  mb-5 items-center gap-2 mt-6 select-none">
      {/* ◀️ Prev Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <ChevronLeft size={18} className="text-zinc-300" />
      </button>

      {/* 🔢 Page Numbers */}
      {getPageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => handlePageChange(num)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
            num === currentPage
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          }`}
        >
          {num}
        </button>
      ))}

      {/* ▶️ Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <ChevronRight size={18} className="text-zinc-300" />
      </button>
    </div>
  );
};

export default PaginationNavigator;
