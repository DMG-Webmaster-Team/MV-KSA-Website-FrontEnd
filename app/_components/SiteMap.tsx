import Image from "next/image";
import React from "react";
import ArrowLong from "./SVGS/ArrowLong";
import Link from "next/link";
import GoogleIcon from "./SVGS/GoogleIcon";
import { useTranslations } from "next-intl";
export interface siteMap {
  Title: string;
  Description: string;
  Exploremorelink: string;
  GoogleMapsLink: string;
  Image: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
  Repeater: {
    Title: string;
    Description: string;
  }[];
}
export default function SiteMap({ data }: { data: siteMap }) {
  const t = useTranslations();
  return (
    <div className={`max-w-[1910px] mx-auto flex items-center bg-gray`}>
      <div className="lg:w-[50%] xl:p-[100px] md:py-[100px] md:px-10 py-[84px] px-4 content-center">
        <div className="space-y-5">
          <h2 className=" text-primary lg:text-6xl font-medium lg:leading-[75px] md:text-4xl text-[28px]">
            {data.Title}
          </h2>
          <h3 className="text-primary text-5xl opacity-50">
            {data.Description}
          </h3>
          <div className="flex gap-5">
            {data.Exploremorelink && (
              <Link
                href={data.Exploremorelink}
                target="_blank"
                className=" flex text-primary bg-white text-xm w-fit items-center gap-3 py-[18px] font-bold px-3 rounded-sm hover:bg-[#DDDDDD] transition-all duration-500 "
              >
                {t("data.discover_more")}
                <span className="w-4 h-4">
                  <ArrowLong />
                </span>
              </Link>
            )}
            {data.GoogleMapsLink && (
              <Link
                href={data.GoogleMapsLink}
                target="_blank"
                className=" flex text-primary bg-white text-xm w-fit items-center gap-3 py-[18px] font-bold px-3 rounded-sm hover:bg-[#DDDDDD] transition-all duration-500 "
              >
                {t("data.google_link")}
                <span className="w-5 h-5">
                  <GoogleIcon />
                </span>
              </Link>
            )}
          </div>
          <div className="flex flex-wrap">
            {data.Repeater.map(
              (item: { Title: string; Description: string }, index: number) => {
                const [number, word] = item.Title.split(" ");
                return (
                  <div
                    key={index}
                    className={`w-[50%] p-5 pt-2 space-y-5 leading-[75px]  border-gray2
                        ${
                          data.Repeater.length - 1 === index ||
                          data.Repeater.length - 2 === index
                            ? ""
                            : "border-b"
                        }
                        ${index % 2 == 0 ? "" : " border-s"} `}
                  >
                    <p className="text-primary flex items-end">
                      <span className="text-[100px] font-FreightNeoPro ">
                        {number}
                      </span>
                      <span className="text-xl opacity-50">{word}</span>
                    </p>
                    <p className="text-sm text-primary font-medium">
                      {item.Description}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      <div className="lg:w-[50%] relative lg:aspect-[800/734] aspect-[800/604]">
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
