import React from "react";

function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className={`w-full max-w-md rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 text-base sm:text-lg shadow-sm transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 focus:outline-none ${className}`}
    />
  );
}

export default Input;
