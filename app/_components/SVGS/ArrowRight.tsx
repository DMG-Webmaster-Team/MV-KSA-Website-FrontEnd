import React from "react";

export default function ArrowRight({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.80078 12.7592H18.1007L12.1008 19.9391L12.8808 20.7191L21.2207 12.3592V11.5592L12.8808 3.19922L12.1008 3.97922L18.1007 11.1592H2.80078V12.7592Z"
        fill="currentColor"
      />
    </svg>
  );
}
