"use client";
import React from "react";
import HeroSection, { HeroSectionProps } from "../CommonComp/HeroSection";
import Image from "next/image";
import Link from "next/link";
import ArrowLong from "../SVGS/ArrowLong";

interface Props {
  HeroSection: HeroSectionProps;
  OverviewSection: string;
  NumbersList: {
    Title: string;
    Description: string;
  }[];
  BoxOne: {
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
  }[];
  LaunchingSection: {
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
  };
  Widget: {
    Description: string;
    Title: string;
    Tagline: string;
    Image: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
  };
}

export default function Homepage({ data }: { data: Props }) {
  
  return (
    <div>
      <HeroSection data={data.HeroSection} home />
      <div className="max-w-[1144px] mx-auto px-4 pt-20">
        <p className=" text-2xl text-primary text-center">
          {data.OverviewSection}
        </p>
      </div>
      <div className=" my-10 max-w-[1200px] mx-auto md:flex-row flex-col flex rtl:divide-x-reverse divide-x-2 divide-primary gap-y-10 flex-wrap divide-opacity-10">
        {data.NumbersList.slice(0, 3).map(
          (item: { Title: string; Description: string }, index: number) => (
            <div
              key={index}
              className="md:w-[calc(100%/3)] w-full text-center space-y-3"
            >
              <h3 className=" xl:text-7xl text-5xl text-medium font-FreightNeoPro text-primary">
                {item.Title}
              </h3>
              <p className="text-primary xl:text-xl md:text-lg text-sm font-medium opacity-50">
                {item.Description}
              </p>
            </div>
          )
        )}
      </div>
      <div className=" my-10 max-w-[1200px] mx-auto md:flex-row flex-col flex rtl:divide-x-reverse divide-x-2 divide-primary gap-y-10 flex-wrap divide-opacity-10 mb-20">
        {data.NumbersList.slice(3, 6).map(
          (item: { Title: string; Description: string }, index: number) => (
            <div
              key={index}
              className="md:w-[calc(100%/3)] w-full text-center space-y-3"
            >
              <h3 className=" xl:text-7xl text-5xl text-medium font-FreightNeoPro text-primary">
                {item.Title}
              </h3>
              <p className="text-primary xl:text-xl md:text-lg text-sm font-medium opacity-50">
                {item.Description}
              </p>
            </div>
          )
        )}
      </div>
      <div className="relative w-full md:h-[80vh] h-[60vh]">
        {data?.LaunchingSection.Image && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.LaunchingSection.Image.data.attributes.url}`}
            alt={
              data.LaunchingSection.Image.data.attributes.alternativeText ??
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
                {data.LaunchingSection.Tagline}
              </span>
              <h2 className=" text-primary font-medium space-y-3 ">
                <span className="block text-[60px]">
                  {data.LaunchingSection.Title}
                </span>
                <span className="block text-5xl opacity-50">
                  {data.LaunchingSection.Title2}
                </span>
              </h2>
            </div>
            <div className="flex gap-3 w-[380px]">
              <Link
                href={data.LaunchingSection.ButtonOneLink ?? ""}
                className="flex gap-3 bg-primary text-white w-1/2 text-base font-bold px-4 py-3 rounded-sm justify-center"
              >
                {data.LaunchingSection.ButtonOneText}
                <span className="w-5 h-5">
                  <ArrowLong />
                </span>
              </Link>
              <Link
                href={data.LaunchingSection.ButtonTwoLink ?? ""}
                className="flex gap-3 bg-Gray05 text-primary w-1/2 text-base font-bold px-4 py-3 rounded-sm justify-center"
              >
                {data.LaunchingSection.ButtonTwoText}
                <span className="w-5 h-5">
                  <ArrowLong />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
