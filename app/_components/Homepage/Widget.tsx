import Image from "next/image";
import Link from "next/link";
import React from "react";
import ArrowLong from "../SVGS/ArrowLong";
import { useLocale, useTranslations } from "next-intl";
import { WidgetProps } from "@/app/types/HomePage";


export default function WidgetSection({ Widget }: { Widget: WidgetProps }) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="flex lg:flex-row flex-col">
      <div className="lg:w-1/2 w-full aspect-[1134/874] relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${Widget.Image.data.attributes.url}`}
          alt={Widget.Image.data.attributes.alternativeText ?? "Widget"}
          fill
          className="object-cover"
        />
      </div>
      <div className="lg:w-1/2 w-full bg-darkblue lg:p-[60px] px-4 py-12 pe-4">
        <div className="max-w-[700px] me-auto h-full flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-white md:text-xl text-sm font-medium">
              {Widget.Tagline}
            </span>
            <h2 className="xl:text-[60px] md:text-5xl text-3xl text-white md:max-w-[80%]">
              {Widget.Title}
            </h2>
            <p className=" text-white opacity-55 md:text-xl text-base font-medium">
              {Widget.Description}
            </p>
          </div>
          <Link
            href={`${locale == "en" ? "/en/" : "/"}our-story`}
            className="md:mt-20 mt-10 flex text-primary bg-white text-base gap-3 font-bold md:py-[18px] py-2 px-4 w-fit hover:bg-primary hover:text-white transition-all duration-500"
          >
            {t("data.discover_more")}
            <span className="md:w-5 md:h-5 w-6 h-6 ltr:rotate-180">
              <ArrowLong />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
