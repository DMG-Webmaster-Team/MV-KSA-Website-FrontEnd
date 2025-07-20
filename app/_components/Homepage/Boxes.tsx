import Image from "next/image";
import Link from "next/link";
import React from "react";
import ArrowLong from "../SVGS/ArrowLong";
import { useTranslations } from "next-intl";
export interface BoxProps {
  Buttonlink: string;
  Description: string;
  Image: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
  Logo: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
  Tagline: string;
  Title: string;
}
export default function Boxes({ BoxOne }: { BoxOne: BoxProps[] }) {
  const t = useTranslations();
  return (
    <div className="flex">
      {BoxOne.map((item: BoxProps, index: number) => (
        <div className="w-[50%] relative aspect-[1134/874]" key={index}>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Image.data.attributes.url}`}
            alt={item.Image.data.attributes.alternativeText ?? item.Title}
            fill
            className=" object-cover"
          />
          {item.Logo.data ? (
            <div className="relative max-w-[700px] ms-auto p-8 flex flex-col justify-between h-full">
              <div className=" space-y-3">
                <span className=" text-white text-xl font-medium">
                  {item.Tagline}
                </span>
                <h2 className=" text-white font-medium text-[100px] leading-[100px]">
                  {item.Title}
                </h2>
                <Link
                  href={item.Buttonlink ?? ""}
                  className=" flex text-primary bg-white text-base gap-3 font-bold py-[18px] px-4 w-fit hover:bg-primary hover:text-white transition-all duration-500"
                >
                  {t("data.discover_more")}
                  <span className="w-5 h-5">
                    <ArrowLong />
                  </span>
                </Link>
              </div>
              <div className="space-y-[22px]">
                <div className="relative aspect-[359/60] h-10 ms-auto">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Logo.data.attributes.url}`}
                    alt={
                      item.Logo?.data?.attributes.alternativeText ?? item.Title
                    }
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-white text-2xl font-medium">
                  {item.Description}
                </p>
              </div>
            </div>
          ) : (
            <div className="relative h-full flex flex-col justify-end p-8 max-w-[700px] me-auto">
              <span className=" text-white text-xl font-medium">
                {item.Tagline}
              </span>
              <h2
                className=" text-white text-[52px] font-medium leading-[66px]"
                dangerouslySetInnerHTML={{ __html: item.Title }}
              />
              <Link
                href={item.Buttonlink ?? ""}
                className="mt-20 flex text-primary bg-white text-base gap-3 font-bold py-[18px] px-4 w-fit hover:bg-primary hover:text-white transition-all duration-500"
              >
                {t("data.discover_more")}
                <span className="w-5 h-5">
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
