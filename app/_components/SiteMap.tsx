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
      className={`max-w-[1910px] mx-auto flex  bg-gray lg:flex-row flex-col-reverse `}
    >
      <div className="lg:w-[50%] w-full 2xl:p-[100px] lg:py-[100px] lg:px-10 md:py-[84px] py-6 px-4 content-center">
        <div className="space-y-5">
          <h2 className=" text-primary xl:text-6xl font-medium lg:leading-[75px] md:text-4xl text-[28px]">
            {data.Title}
          </h2>
          <h3 className="text-primary xl:text-5xl text-3xl opacity-50">
            {data.Description}
          </h3>
          <div className="flex gap-5 ">
            {data.Exploremorelink && (
              <Link
                href={data.Exploremorelink}
                target="_blank"
                className=" flex text-primary bg-white md:text-base text-sm w-fit items-center gap-3 py-[18px] font-bold px-3 rounded-sm hover:bg-[#DDDDDD] transition-all duration-500 "
              >
                {t("data.discover_more")}
                <span className="w-4 h-4 ltr:rotate-180">
                  <ArrowLong />
                </span>
              </Link>
            )}
            {data.GoogleMapsLink && (
              <Link
                href={data.GoogleMapsLink}
                target="_blank"
                className=" flex text-primary bg-white  md:text-base text-sm w-fit items-center gap-3 py-[18px] font-bold px-3 rounded-sm hover:bg-[#DDDDDD] transition-all duration-500 "
              >
                {t("data.google_link")}
                <span className="w-5 h-5">
                  <GoogleIcon />
                </span>
              </Link>
            )}
          </div>
          <div className="flex lg:flex-wrap lg:overflow-auto overflow-x-auto lg:mx-0 -mx-4">
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
                    <p className="text-primary flex items-end">
                      <span className="md:text-[100px] text-[60px] font-FreightNeoPro ">
                        {number}
                      </span>
                      <span className="md:text-xl text-sm opacity-50">
                        {word}
                      </span>
                    </p>
                    <p className="md:text-sm text-xs text-primary font-medium">
                      {item.Description}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      <div className="lg:w-[50%] relative lg:aspect-[800/734] aspect-[822/800] w-full">
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
