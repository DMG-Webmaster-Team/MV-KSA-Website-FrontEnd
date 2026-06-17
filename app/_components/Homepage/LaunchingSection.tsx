"use client";
import React, { useEffect, useState } from "react";
import ArrowLong from "../SVGS/ArrowLong";
import Link from "next/link";
import Image from "next/image";
import { LaunchingProps } from "@/app/types/HomePage";
import { useLocale } from "next-intl";

export default function LaunchingSection({
  LaunchingSection,
  second,
}: {
  LaunchingSection: LaunchingProps;
  second?: boolean;
}) {
  const [utmSource, setUtmSource] = useState("general");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("utm_source");
    if (source) {
      setUtmSource(source);
    }
  }, []);
  const locale = useLocale();

  return (
    <div className="relative h-[60vh] w-full md:h-[80vh]">
      {LaunchingSection.Image && (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${LaunchingSection.Image.data.attributes.url}`}
          alt={
            LaunchingSection.Image.data.attributes.alternativeText ??
            "Landscape image"
          }
          fill
          className="object-cover"
        />
      )}

      <div className="relative mx-auto flex h-full max-w-[1448px] items-end justify-center py-5 md:items-center md:py-8">
        <div className={`bg-white md:w-[695px] w-[calc(100%-32px)] md:p-10 p-5 md:space-y-10 space-y-[28px] ${second ? "md:ms-0 md:me-auto mx-auto" : "md:ms-auto md:me-0 mx-auto"}`}>
          <div className="space-y-2 md:space-y-3">
            <span className="text-sm font-medium text-primary md:text-xl">
              {LaunchingSection.Tagline}
            </span>
            <h2 className="space-y-3 font-medium text-primary">
              <span className="block text-4xl md:text-[60px]">
                {LaunchingSection.Title}
              </span>
              <span className="block text-[28px] opacity-50 md:text-5xl">
                {LaunchingSection.Title2}
              </span>
            </h2>
          </div>
          <div className="flex gap-3 md:w-[380px]">
            <Link
              href={LaunchingSection.ButtonOneLink ?? ""}
              className="flex w-fit justify-center gap-3 whitespace-nowrap rounded-sm bg-primary px-4 py-2.5 text-sm font-bold text-white md:w-1/2 md:py-3 md:text-base"
            >
              {LaunchingSection.ButtonOneText}
              <span className="h-4 w-4 ltr:rotate-180 md:h-5 md:w-5">
                <ArrowLong />
              </span>
            </Link>
            <Link
              // href={LaunchingSection.ButtonTwoLink ?? ""}
              href={`${
                locale == "en" ? "/en/" : "/"
              }contact-us?projectname=${LaunchingSection.ButtonTwoLink?.toLowerCase()}&utm_source=${utmSource}`}
              className="flex w-fit justify-center gap-3 whitespace-nowrap rounded-sm bg-Gray05 px-4 py-2.5 text-sm font-bold text-primary md:w-1/2 md:py-3 md:text-base"
            >
              {LaunchingSection.ButtonTwoText}
              <span className="h-4 w-4 ltr:rotate-180 md:h-5 md:w-5">
                <ArrowLong />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
