"use client";
import React from "react";
import ArrowLong from "../SVGS/ArrowLong";

export default function ScrollTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className=" bg-primary hover:bg-darkblue transition-all duration-500 rounded-full p-3 md2:flex hidden items-center justify-center"
    >
      <span className="w-6 h-6 rotate-90 text-white">
        <ArrowLong />
      </span>
    </button>
  );
}
