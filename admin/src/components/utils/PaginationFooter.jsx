import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationFooter = ({ filter, setFilter, totalPages }) => {
  const currentPage = filter?.page || 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setFilter({ ...filter, page });
    }
  };

  // Helper: create a small range for visible pages
  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
useEffect(() => {
  getPageNumbers()
}, [totalPages])

  return (
    <div className="flex justify-center items-center gap-2 mt-6 select-none">
      {/* ◀️ Prev Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <ChevronLeft size={18} className="text-gray-700" />
      </button>

      {/* 🔢 Page Numbers */}
      {getPageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => handlePageChange(num)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
            num === currentPage
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
          } transition-all duration-200`}
        >
          {num}
        </button>
      ))}

      {/* ▶️ Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <ChevronRight size={18} className="text-gray-700" />
      </button>
    </div>
  );
};

export default PaginationFooter;
