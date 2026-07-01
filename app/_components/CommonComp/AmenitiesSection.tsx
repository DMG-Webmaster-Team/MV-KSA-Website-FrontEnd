import Image from "next/image";
import React from "react";

export interface AmenityItem {
  Number: string;
  Label: string;
  Icon: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}

export interface AmenitiesSectionProps {
  TitleAr: string;
  TitleEn: string;
  BackgroundImage?: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
  Items: AmenityItem[];
}

export default function AmenitiesSection({
  data,
}: {
  data: AmenitiesSectionProps;
}) {
  if (!data?.Items?.length) return null;

  return (
    <section className="relative w-full overflow-hidden">
      {data.BackgroundImage?.data?.attributes?.url && (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.BackgroundImage.data.attributes.url}`}
          alt={data.BackgroundImage.data.attributes.alternativeText ?? ""}
          fill
          className="object-cover object-top"
        />
      )}
      {/* white/50% overlay matching Figma */}
      <div className="absolute inset-0 bg-white/50" />
      <div className="relative z-10 mx-auto max-w-[1512px] px-16 py-20">
        <div className="mb-[60px] text-center">
          <h2 className="text-[36px] font-medium leading-[125%] text-[#001A70]">
            {data.TitleAr}
          </h2>
          <p className="text-[36px] font-medium leading-[125%] text-[#001A70]">
            {data.TitleEn}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {data.Items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 border border-[#001A70] border-opacity-10 px-6 py-5"
            >
              <div>
                <p className="text-[48px] font-medium leading-tight text-[#001A70]">
                  {item.Number}
                </p>
                <p className="mt-1 text-sm font-medium text-[#001A70] opacity-60">
                  {item.Label}
                </p>
              </div>
              {item.Icon?.data?.attributes?.url && (
                <div className="relative h-14 w-14 shrink-0 opacity-80">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Icon.data.attributes.url}`}
                    alt={item.Icon.data.attributes.alternativeText ?? item.Label}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
