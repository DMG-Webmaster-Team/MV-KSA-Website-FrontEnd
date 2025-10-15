import Image from "next/image";
import Link from "next/link";
import React from "react";
import ArrowLong from "../SVGS/ArrowLong";
import { useTranslations } from "next-intl";
import { BoxProps } from "@/app/types/HomePage";

export default function Boxes({ BoxOne }: { BoxOne: BoxProps[] }) {
  const t = useTranslations();
  return (
    <div className="flex flex-col lg:flex-row">
      {BoxOne.map((item: BoxProps, index: number) => (
        <div className="relative aspect-[1.1] w-full lg:w-1/2" key={index}>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Image.data.attributes.url}`}
            alt={item.Image.data.attributes.alternativeText ?? item.Title}
            fill
            className="object-cover"
          />
          {item.Logo.data ? (
            <div className="relative ms-auto flex h-full flex-col justify-between p-4 md:p-8 lg:max-w-[700px]">
              <div className="space-y-3">
                <span className="text-sm font-medium text-white md:text-xl">
                  {item.Tagline}
                </span>
                <h2 className="text-[clamp(2rem,6.8vw,100px)] font-medium leading-[clamp(2rem,6.8vw,100px)] text-white">
                  {item.Title}
                </h2>

                <Link
                  href={item.Buttonlink ?? ""}
                  className="flex w-fit gap-3 bg-white px-4 py-2.5 text-sm font-bold text-primary transition-all duration-500 hover:bg-primary hover:text-white md:py-[18px] md:text-base"
                >
                  {t("data.discover_more")}
                  <span className="h-4 w-4 md:h-5 md:w-5 ltr:rotate-180">
                    <ArrowLong />
                  </span>
                </Link>
              </div>
              <div className="space-y-[22px]">
                <div className="relative ms-auto aspect-[359/60] h-10">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Logo.data.attributes.url}`}
                    alt={
                      item.Logo?.data?.attributes.alternativeText ?? item.Title
                    }
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-pretty text-2xl font-medium text-white">
                  {item.Description}
                </p>
              </div>
            </div>
          ) : (
            <div className="relative me-auto flex h-full max-w-[700px] flex-col justify-end p-4 md:p-8">
              <span className="text-sm font-medium text-white md:text-xl">
                {item.Tagline}
              </span>
              <h2
                className="text-2xl font-medium text-white md:text-[52px] md:leading-[66px]"
                dangerouslySetInnerHTML={{ __html: item.Title }}
              />
              <Link
                href={item.Buttonlink ?? ""}
                className="mt-5 flex w-fit gap-3 bg-white px-4 py-2.5 text-base font-bold text-primary transition-all duration-500 hover:bg-primary hover:text-white md:mt-20 md:py-[18px]"
              >
                {t("data.explore_more")}
                <span className="h-4 w-4 md:h-5 md:w-5 ltr:rotate-180">
                  <ArrowLong />
                </span>
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
