"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Arrow from "../SVGS/Arrow";
import { motion } from "framer-motion";
import ArrowLong from "../SVGS/ArrowLong";
import Link from "next/link";
export interface WidgetProps {
  Title: string;
  Description: string;
  Image: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
  Btn?: string;
  href?: string;
}
export default function Widgets({
  data,
  reverse,
  white,
}: {
  data: WidgetProps;
  reverse: boolean;
  white?: boolean;
}) {
  const t = useTranslations();
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    setMounted(true); // Ensures client-side render only
  }, []);
  
  useEffect(() => {
    if (mounted && contentRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(contentRef.current).lineHeight || "24"
      );
      const maxHeight = lineHeight * 4; // 4 lines
      setIsOverflowing(contentRef.current.scrollHeight > maxHeight);
    }
  }, [mounted, data.Description]);
  
  return (
    <div
      className={`max-w-[1910px] mx-auto flex ${
        white ? "" : " bg-gray"
      } flex-col-reverse  ${reverse ? " lg:flex-row-reverse" : "lg:flex-row"} `}
    >
      <div className="content-center px-4 py-[44px] md:px-10 md:py-4 lg:w-[50%] xl:px-[100px]">
        <div className="flex flex-col gap-3 md:max-w-[516px]">
          <h2 className="text-[28px] font-medium text-primary md:text-4xl lg:text-6xl lg:leading-[75px]">
            {data.Title}
          </h2>
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 110 }} // optional, you can remove if you only want line-clamp
            style={{ overflow: "hidden" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              ref={contentRef}
              className={`md:text-xl text-base text-primary opacity-50 transition-all duration-300 ${
                !expanded ? "line-clamp-4" : ""
              }`}
            >
              {data.Description}
            </p>
          </motion.div>
          {data?.Btn && data?.href && (
            <Link href={data.href}>
              <span className="mt-10 flex w-fit items-center gap-3 rounded-[2px] bg-white px-4 py-2.5 text-sm font-bold text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white md:py-5 md:text-base">
                <span className="leading-[10px]">{data.Btn}</span>
                <span className="h-5 w-5 ltr:rotate-180">
                  <ArrowLong />
                </span>
              </span>
            </Link>
          )}
          {mounted && isOverflowing && (
            <button
              className="mt-3 flex w-fit items-center gap-1 border-b border-primary border-opacity-20 py-1 text-sm font-bold text-primary md:text-base"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? t("data.see_less") : t("data.see_more")}
              <span className={`w-4 h-4 ${expanded ? "rotate-180" : ""}`}>
                <Arrow />
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="relative aspect-[1/1] lg:aspect-[800/634] lg:w-[50%]">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Image.data.attributes.url}`}
          alt={data.Image.data.attributes.alternativeText ?? ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
