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
    <section className="relative w-full overflow-hidden py-14 md:py-20">
      {data.BackgroundImage?.data?.attributes?.url && (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.BackgroundImage.data.attributes.url}`}
          alt={data.BackgroundImage.data.attributes.alternativeText ?? ""}
          fill
          className="object-cover object-top"
        />
      )}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-medium text-primary md:text-3xl">
            {data.TitleAr}
          </h2>
          <p className="mt-1 text-lg font-medium text-primary opacity-50 md:text-xl">
            {data.TitleEn}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {data.Items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 border border-primary border-opacity-10 px-6 py-5"
            >
              <div>
                <p className="text-3xl font-medium text-primary md:text-4xl">
                  {item.Number}
                </p>
                <p className="mt-1 text-sm font-medium text-primary opacity-60 md:text-base">
                  {item.Label}
                </p>
              </div>
              {item.Icon?.data?.attributes?.url && (
                <div className="relative h-12 w-12 shrink-0 opacity-70">
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
