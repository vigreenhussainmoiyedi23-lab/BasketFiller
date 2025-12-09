import React from "react";

function Input({ type = "text", name, value, onChange, placeholder, className = "" }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className={`border-2 placeholder-zinc-400 bg-white/5 backdrop-blur-2xl font-mono block min-w-max outline-none text-center placeholder-md py-2 px-6 text-2xl border-stone-400 rounded-lg p-2 sm:w-[60%] md:w-[min(60%,400px)] w-[max(60%,310px)] lg:w-[50%] ${className}`}
    />
  );
}

export default Input;
