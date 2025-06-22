"use client";

import Image from "next/image";
import { CareerWidget } from "../_types/Common";

interface Props {
  data: {
    MainData: {
      Title: string;
      Description: string;
      ListTitle: string;
      HeroImage: {
        data: {
          attributes: {
            url: string;
            alternativeText: string;
          };
        };
      };
      OverviewSection: {
        Title: string;
        Description: string;
      };
    };
    AllCareersData: {
      data: CareerWidget[];
    };
  };
}

export default function CareersPage({ data }: Props) {
  return (
    <div>
      <div className="md:py-20 py-10 text-center space-y-6 mx-auto max-w-[840px]">
        <h1 className="text-primary lg:text-[100px] font-medium lg:leading-[100px] md:text-5xl text-4xl text-balance">
          {data.MainData.Title}
        </h1>
        <p className=" text-primary text-xl font-medium">
          {data.MainData.Description}
        </p>
      </div>
      <div className="relative aspect-[3840/2560] h-[600px] w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.MainData.HeroImage.data.attributes.url}`}
          alt={
            data.MainData.HeroImage.data.attributes.alternativeText ??
            "Careers Image"
          }
          fill
          className=" object-cover"
        />
      </div>
      <div className="max-w-[1112px] mx-auto py-20 xl:px-0 px-4 space-y-6 text-center">
        <h2 className=" text-primary text-5xl font-medium ">
          {data.MainData.OverviewSection.Title}
        </h2>
        <p className=" text-primary text-xl  font-medium">
          {data.MainData.OverviewSection.Description}
        </p>
      </div>
      <div className="max-w-[1448px] px-4 mx-auto  ">
        <div className="py-6">
          <h2 className=" text-5xl font-medium text-primary">
            {data.MainData.ListTitle}
          </h2>
        </div>
        <div>
          {data.AllCareersData.data.map((item: CareerWidget, index: number) => (
            <div key={index}>
                
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
