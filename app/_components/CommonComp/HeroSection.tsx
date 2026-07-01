"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ArrowLong from "../SVGS/ArrowLong";
import { useLocale, useTranslations } from "next-intl";
import { HeroSectionProps } from "../_types/Common";

export default function HeroSection({
  data,
  singleProject,
  home,
  srOnly,
}: {
  data: HeroSectionProps;
  singleProject?: boolean;
  home?: boolean;
  srOnly?: boolean;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const mediaUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Media?.data?.attributes?.url ?? ""}`;
  const isVideo = /\.(mp4|webm)$/i.test(data.Media?.data?.attributes?.url ?? "");
  const [utmSource, setUtmSource] = useState("general");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("utm_source");
    if (source) {
      setUtmSource(source);
    }
  }, []);
  return (
    <section
      className="heroSection relative h-[73vh] min-h-[700px] w-full overflow-hidden md:h-[100vh]"
      style={{ boxShadow: "0px 1000px 4px 0px #00000033 inset" }}
    >
      {/* Top gradient to ensure header content stays readable */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />
      {isVideo ? (
        <video
          className="absolute inset-0 h-full w-full scale-150 object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src={mediaUrl}
            type={`video/${mediaUrl.endsWith(".webm") ? "webm" : "mp4"}`}
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={mediaUrl}
          alt={data.Media?.data?.attributes?.alternativeText ?? "Image"}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}

      <div
        className={`${
          singleProject ? "space-y-6 md:space-y-10" : ""
        } absolute w-fit h-fit m-auto inset-0 z-20 text-center px-2`}
      >
        {data.Logo && (
          <div
            className={`${
              singleProject ? "md:h-[200px] h-[100px]" : "h-[140px]  mb-20"
            } relative w-[305px]  mx-auto`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Logo?.data?.attributes?.url}`}
              alt={data.Media?.data?.attributes?.alternativeText ?? "Image"}
              fill
              className="object-contain"
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
            } text-white font-medium ${srOnly?"sr-only":""}`}
          >
            {data.Title}
          </h1>
          <p
            className={`${
              singleProject
                ? "md:text-2xl text-base"
                : "lg:text-[60px] lg:leading-[70px]  text-base text-center "
            } text-white mx-auto  font-medium mt-2 ${
              home ? "" : " opacity-70"
            }`}
          >
            {data.ShortDescription}
          </p>
        </div>

        {data?.Buttonlink && (
          <Link
            href={`${locale == "en" ? "/en" : ""}${
              data.Buttonlink
            }?projectname=${data.subTitle}&utm_source=${utmSource}`}
            className="mx-auto flex w-fit gap-2 rounded-sm bg-white px-4 py-2.5 text-sm font-bold text-primary transition-all duration-500 hover:bg-darkblue hover:text-white md:gap-3 md:py-[18px] md:text-base"
          >
            {data.ButtonText}

            <span className="h-4 w-4 md:h-5 md:w-5 ltr:rotate-180">
              <ArrowLong />
            </span>
          </Link>
        )}
      </div>
      <Link
        href={"#Overview"}
        className="absolute bottom-4 z-20 flex w-full flex-col gap-3 text-center text-xs font-medium text-white md:bottom-2 md:gap-5 md:text-xl lg:bottom-4"
      >
        {t("data.scroll_text")}
        <span className="mx-auto h-[50px] w-[1px] bg-white md:h-[70px]" />
      </Link>
    </section>
  );
}
