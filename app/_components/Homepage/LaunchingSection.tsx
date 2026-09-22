"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("utm_source");
    if (source) {
      setUtmSource(source);
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const locale = useLocale();

  return (
    <div ref={sectionRef} className="relative h-[60vh] min-h-[540px] w-full md:h-[80vh]">
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
      {/* Top gradient to ensure header content stays readable */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />

      <div className="relative mx-auto flex h-full max-w-[1448px] items-end justify-center py-5 md:items-center md:py-8">
        <div className={`bg-white w-[381px] p-5 space-y-4 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${second ? "md:ms-0 md:me-auto mx-auto" : "md:ms-auto md:me-0 mx-auto"}`}>
          <div className="space-y-1">
            <span className="text-[14px] font-medium text-primary">
              {LaunchingSection.Tagline}
            </span>
            <h2 className="font-medium text-primary">
              <span className="block text-[36px] leading-tight">
                {LaunchingSection.Title}
              </span>
              <span className="block text-[36px] leading-tight opacity-50">
                {LaunchingSection.Title2}
              </span>
            </h2>
          </div>
          <div className="flex gap-3">
            <Link
              href={LaunchingSection.ButtonOneLink ?? ""}
              className="flex w-fit justify-center gap-2 whitespace-nowrap rounded-sm bg-primary px-4 py-2 text-sm font-bold text-white"
            >
              {LaunchingSection.ButtonOneText}
              <span className="h-4 w-4 ltr:rotate-180">
                <ArrowLong />
              </span>
            </Link>
            <Link
              // href={LaunchingSection.ButtonTwoLink ?? ""}
              href={`${
                locale == "en" ? "/en/" : "/"
              }contact-us?projectname=${LaunchingSection.ButtonTwoLink?.toLowerCase()}&utm_source=${utmSource}`}
              className="flex w-fit justify-center gap-2 whitespace-nowrap rounded-sm bg-Gray05 px-4 py-2 text-sm font-bold text-primary"
            >
              {LaunchingSection.ButtonTwoText}
              <span className="h-4 w-4 ltr:rotate-180">
                <ArrowLong />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
