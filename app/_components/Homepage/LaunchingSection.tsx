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

      <div className="max-w-[1448px] px-4 mx-auto relative md:py-8 py-5 flex items-center justify-center h-full">
        <div className="bg-white w-[695px] ms-auto md:p-10 p-5 space-y-10 ">
          <div className="space-y-3">
            <span className=" text-primary text-xl font-medium">
              {LaunchingSection.Tagline}
            </span>
            <h2 className=" text-primary font-medium space-y-3 ">
              <span className="block text-[60px]">
                {LaunchingSection.Title}
              </span>
              <span className="block text-5xl opacity-50">
                {LaunchingSection.Title2}
              </span>
            </h2>
          </div>
          <div className="flex gap-3 w-[380px]">
            <Link
              href={LaunchingSection.ButtonOneLink ?? ""}
              className="flex gap-3 bg-primary text-white w-1/2 text-base font-bold px-4 py-3 rounded-sm justify-center"
            >
              {LaunchingSection.ButtonOneText}
              <span className="w-5 h-5">
                <ArrowLong />
              </span>
            </Link>
            <Link
              href={LaunchingSection.ButtonTwoLink ?? ""}
              className="flex gap-3 bg-Gray05 text-primary w-1/2 text-base font-bold px-4 py-3 rounded-sm justify-center"
            >
              {LaunchingSection.ButtonTwoText}
              <span className="w-5 h-5">
                <ArrowLong />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
