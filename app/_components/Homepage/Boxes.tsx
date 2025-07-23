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
    <div className="flex lg:flex-row flex-col">
      {BoxOne.map((item: BoxProps, index: number) => (
        <div
          className="lg:w-1/2 w-full relative aspect-[1134/1194]"
          key={index}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Image.data.attributes.url}`}
            alt={item.Image.data.attributes.alternativeText ?? item.Title}
            fill
            className=" object-cover"
          />
          {item.Logo.data ? (
            <div className="relative lg:max-w-[700px] ms-auto md:p-8 p-4 flex flex-col justify-between h-full">
              <div className=" space-y-3">
                <span className=" text-white md:text-xl text-sm font-medium">
                  {item.Tagline}
                </span>
                <h2 className=" text-white font-medium md:text-[100px] md:leading-[100px] text-4xl">
                  {item.Title}
                </h2>
                <Link
                  href={item.Buttonlink ?? ""}
                  className=" flex text-primary bg-white md:text-base text-sm gap-3 font-bold md:py-[18px] py-2.5 px-4 w-fit hover:bg-primary hover:text-white transition-all duration-500"
                >
                  {t("data.discover_more")}
                  <span className="md:w-5 md:h-5 w-4 h-4 ltr:rotate-180">
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
                <p className="text-white text-2xl font-medium text-pretty">
                  {item.Description}
                </p>
              </div>
            </div>
          ) : (
            <div className="relative h-full flex flex-col justify-end md:p-8 p-4 max-w-[700px] me-auto">
              <span className=" text-white md:text-xl text-sm font-medium">
                {item.Tagline}
              </span>
              <h2
                className=" text-white md:text-[52px] font-medium md:leading-[66px] text-4xl"
                dangerouslySetInnerHTML={{ __html: item.Title }}
              />
              <Link
                href={item.Buttonlink ?? ""}
                className="md:mt-20 mt-5 flex text-primary bg-white text-base gap-3 font-bold md:py-[18px] py-2.5 px-4 w-fit hover:bg-primary hover:text-white transition-all duration-500"
              >
                {t("data.discover_more")}
                <span className="md:w-5 md:h-5 w-4 h-4 ltr:rotate-180">
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
