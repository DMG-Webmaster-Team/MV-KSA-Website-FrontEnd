import Image from "next/image";
import React from "react";
import ArrowLong from "./SVGS/ArrowLong";
import Link from "next/link";
import GoogleIcon from "./SVGS/GoogleIcon";
import { useTranslations } from "next-intl";
import { siteMap } from "./_types/Common";

export default function SiteMap({ data }: { data: siteMap }) {
  const t = useTranslations();
  return (
    <div
      className={`mx-auto flex max-w-[1910px] flex-col-reverse bg-gray lg:flex-row`}
    >
      <div className="w-full content-center px-4 py-6 md:py-[84px] lg:w-[50%] lg:px-10 lg:py-[100px] 2xl:p-[100px]">
        <div className="space-y-5">
          <h2 className="text-[28px] font-medium text-primary md:text-4xl lg:leading-[75px] xl:text-5xl">
            {data.Title}
          </h2>
          <h3 className="text-3xl text-primary opacity-50 xl:text-5xl">
            {data.Description}
          </h3>
          <div className="flex gap-5">
            {data.Exploremorelink && (
              <Link
                href={data.Exploremorelink}
                target="_blank"
                className="flex w-fit items-center gap-3 text-nowrap rounded-sm bg-white px-3 py-[18px] text-sm font-bold text-primary transition-all duration-500 hover:bg-[#DDDDDD] md:text-base"
              >
                {t("data.discover_more")}
                <span className="h-4 w-4 ltr:rotate-180">
                  <ArrowLong />
                </span>
              </Link>
            )}
            {data.GoogleMapsLink && (
              <Link
                href={data.GoogleMapsLink}
                target="_blank"
                className="flex w-fit items-center gap-3 text-nowrap rounded-sm bg-white px-3 py-[18px] text-sm font-bold text-primary transition-all duration-500 hover:bg-[#DDDDDD] md:text-base"
              >
                {t("data.google_link")}
                <span className="h-5 w-5">
                  <GoogleIcon />
                </span>
              </Link>
            )}
          </div>
          <div className="-mx-4 flex overflow-x-auto lg:mx-0 lg:flex-wrap lg:overflow-auto">
            {data.Repeater.map(
              (item: { Title: string; Description: string }, index: number) => {
                const [number, word] = item.Title.split(" ");
                return (
                  <div
                    key={index}
                    className={`w-[50%] flex-mobile p-5 pt-2 space-y-5 leading-[75px]  lg:border-gray2 border-transparent
                        ${
                          data.Repeater.length - 1 === index ||
                          data.Repeater.length - 2 === index
                            ? ""
                            : "border-b"
                        }
                        ${index % 2 == 0 ? "" : " border-s"} `}
                  >
                    <p className="flex items-end text-primary">
                      <span className="font-Poppins text-[60px] md:text-[80px]">
                        {number}
                      </span>
                      <span className="text-sm opacity-50 md:text-xl">
                        {word}
                      </span>
                    </p>
                    <p className="text-xs font-medium text-primary md:text-sm">
                      {item.Description}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      {data.Image?.data?.attributes && (
        <div className="relative aspect-[822/800] w-full lg:aspect-[800/734] lg:w-[50%]">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Image.data.attributes.url}`}
            alt={data.Image.data.attributes.alternativeText ?? ""}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
    </div>
  );
}
