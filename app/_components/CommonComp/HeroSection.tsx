import Image from "next/image";
import Link from "next/link";
import React from "react";
import ArrowLong from "../SVGS/ArrowLong";
import { useLocale, useTranslations } from "next-intl";

export interface HeroSectionProps {
  Title: string;
  ShortDescription?: string;
  Media: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
  Logo?: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
  Buttonlink?: string;
  ButtonText?: string;
}

export default function HeroSection({
  data,
  singleProject,
}: {
  data: HeroSectionProps;
  singleProject?: boolean;
}) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <section
      className="w-full md:h-[90vh] h-[93vh] relative heroSection"
      style={{ boxShadow: "0px 1000px 4px 0px #00000033 inset" }}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Media.data.attributes.url}`}
        alt={data.Media.data.attributes.alternativeText ?? "Image"}
        fill
        priority
        className=" object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div
        className={`${
          singleProject ? " space-y-10" : ""
        } absolute w-fit h-fit m-auto inset-0 z-20 text-center px-2`}
      >
        {data.Logo && (
          <div
            className={`${
              singleProject ? "md:h-[200px] h-[100px]" : "h-[140px]  mb-20"
            } relative w-[305px]  mx-auto`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Logo.data.attributes.url}`}
              alt={data.Media.data.attributes.alternativeText ?? "Image"}
              fill
              className=" object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div>
          <h1
            className={`${
              singleProject
                ? "md:text-[52px] text-4xl"
                : "lg:text-[100px] lg:leading-[100px] md:text-6xl text-4xl"
            } text-white   font-medium`}
          >
            {data.Title}
          </h1>
          <p
            className={`${
              singleProject
                ? "md:text-2xl text-base"
                : "lg:text-[60px] md:text-4xl text-base  opacity-70 "
            } text-white  font-medium mt-2`}
          >
            {data.ShortDescription}
          </p>
        </div>

        {data?.Buttonlink && (
          <Link
            href={`${locale == "en" ? "/en" : ""}${data.Buttonlink}`}
            className="text-primary bg-white hover:bg-darkblue hover:text-white transition-all duration-500 flex md:py-[18px] py-2.5 px-4 w-fit mx-auto md:text-base text-sm font-bold md:gap-3 gap-2 rounded-sm"
          >
            {data.ButtonText}

            <span className="md:w-5 md:h-5 w-4 h-4 ltr:rotate-180">
              <ArrowLong />
            </span>
          </Link>
        )}
      </div>
      <Link
        href={"#Overview"}
        className=" text-white md:text-xl text-xs font-medium text-center  absolute md:bottom-8 bottom-4 flex flex-col md:gap-5 gap-3 w-full z-20"
      >
        {t("data.scroll_text")}
        <span className="w-[1px] md:h-[70px] h-[50px] bg-white mx-auto" />
      </Link>
    </section>
  );
}
