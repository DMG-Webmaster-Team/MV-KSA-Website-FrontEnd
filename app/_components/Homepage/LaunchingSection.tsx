import React from "react";
import ArrowLong from "../SVGS/ArrowLong";
import Link from "next/link";
import Image from "next/image";

export interface LaunchingProps {
  ButtonOneLink: string;
  ButtonOneText: string;
  ButtonTwoLink: string;
  ButtonTwoText: string;
  Tagline: string;
  Title: string;
  Title2: string;
  Image: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}

export default function LaunchingSection({
  LaunchingSection,
}: {
  LaunchingSection: LaunchingProps;
}) {
  return (
    <div className="relative w-full md:h-[80vh] h-[60vh]">
      {LaunchingSection.Image && (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${LaunchingSection.Image.data.attributes.url}`}
          alt={
            LaunchingSection.Image.data.attributes.alternativeText ??
            "Landscape image"
          }
          fill
          className=" object-cover"
        />
      )}

      <div className="max-w-[1448px] mx-auto relative md:py-8 py-5 flex md:items-center items-end justify-center h-full">
        <div className="bg-white md:w-[695px] w-[calc(100%-32px)] md:ms-auto md:me-0 mx-auto md:p-10 p-5 md:space-y-10 space-y-[28px] ">
          <div className="md:space-y-3 space-y-2">
            <span className=" text-primary md:text-xl text-sm font-medium">
              {LaunchingSection.Tagline}
            </span>
            <h2 className=" text-primary font-medium space-y-3 ">
              <span className="block md:text-[60px] text-4xl">
                {LaunchingSection.Title}
              </span>
              <span className="block md:text-5xl text-[28px] opacity-50">
                {LaunchingSection.Title2}
              </span>
            </h2>
          </div>
          <div className="flex gap-3 md:w-[380px]">
            <Link
              href={LaunchingSection.ButtonOneLink ?? ""}
              className="flex gap-3 bg-primary text-white md:w-1/2 w-fit md:text-base text-sm font-bold px-4 md:py-3 py-2.5 rounded-sm justify-center whitespace-nowrap"
            >
              {LaunchingSection.ButtonOneText}
              <span className="md:w-5 md:h-5 w-4 h-4 ltr:rotate-180 ">
                <ArrowLong />
              </span>
            </Link>
            <Link
              href={LaunchingSection.ButtonTwoLink ?? ""}
              className="flex gap-3 bg-Gray05 text-primary md:w-1/2 w-fit md:text-base text-sm font-bold px-4 md:py-3 py-2.5 rounded-sm justify-center"
            >
              {LaunchingSection.ButtonTwoText}
              <span className="md:w-5 md:h-5 w-4 h-4 ltr:rotate-180">
                <ArrowLong />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
