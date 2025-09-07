'use client'
import { CalendlyProps } from "@/app/types/Pages";
import Script from "next/script";
import { useState } from "react";

export default function CalendlyPage({ data }: CalendlyProps) {
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading)
  return (
    <div className=" mb-10">
      <div className=" md:pt-20 pt-[30px] pb-4 text-center space-y-6">
        <span className=" text-primary md:text-xl text-sm font-medium">
          {data.Label}
        </span>
        <h1 className=" text-primary lg:text-[100px] font-medium lg:leading-[100px] md:text-5xl text-4xl">
          {data.Title}
        </h1>
      </div>
      <div className="relative min-w-[320px] mx-auto">
        <div
          className="calendly-inline-widget"
          data-url={data.Calendly_Link}
          style={{ minWidth: "320px", height: "700px" }}
        ></div>
      </div>
      <Script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
