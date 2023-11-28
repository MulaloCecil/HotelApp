import React from "react";

export default function Banner({ children, title, subtitle }) {
  return (
    <div className="banner flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">{title}</h1>
      <div className="w-20 h-1 bg-teal-500 mb-4"></div>
      <p className="text-base md:text-lg lg:text-xl mb-6 text-white">{subtitle}</p>
      {children}
    </div>
  );
}
