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
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations();
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [data.Description, expanded]);
  return (
    <div
      className={`max-w-[1910px] mx-auto flex ${
        white ? "" : " bg-gray"
      } flex-col-reverse  ${reverse ? " lg:flex-row-reverse" : "lg:flex-row"} `}
    >
      <div className="lg:w-[50%] xl:p-[100px] md:py-[100px] md:px-10 py-[44px] px-4 content-center">
        <div className="md:max-w-[516px] flex flex-col gap-3">
          <h2 className=" text-primary lg:text-6xl font-medium lg:leading-[75px] md:text-4xl text-[28px]">
            {data.Title}
          </h2>
          <motion.div
            initial={false}
            animate={{ height: expanded ? height : 110 }}
            style={{ overflow: "hidden" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              ref={contentRef}
              className={`md:text-xl text-base text-primary opacity-50 ${
                !expanded ? "line-clamp-4" : ""
              }`}
            >
              {data.Description}
            </p>
          </motion.div>
          {data?.Btn && data?.href && (
            <Link href={data.href}>
              <span className="group-hover:bg-primary group-hover:text-white transition-all duration-500 bg-white w-fit mt-10 rounded-[2px] md:py-5 py-2.5 px-4 md:text-base text-sm font-bold flex text-primary gap-3 items-center">
                <span className="leading-[10px]">{data.Btn}</span>
                <span className="w-5 h-5 ltr:rotate-180">
                  <ArrowLong />
                </span>
              </span>
            </Link>
          )}

          {!data?.Btn &&
            !data?.href &&
            data.Description?.split(" ").length > 30 && (
              <button
                className="text-primary flex items-center mt-3 gap-1 md:text-base text-sm font-bold py-1 border-b border-primary border-opacity-20 w-fit"
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
      <div className="lg:w-[50%] relative lg:aspect-[800/634] aspect-[1/1]">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Image.data.attributes.url}`}
          alt={data.Image.data.attributes.alternativeText ?? ""}
          fill
          className=" object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
