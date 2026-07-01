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
  Title: string;
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
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.BackgroundImage.data?.attributes?.url}`}
          alt={data.BackgroundImage.data?.attributes?.alternativeText ?? ""}
          fill
          className="object-cover object-top"
        />
      )}
      <div className="absolute inset-0" style={{ background: "#FFFFFF80" }} />
      <div className="relative z-10 mx-auto max-w-[1512px] px-4 py-[111px]">
        <div className="mb-[60px] text-center">
          <h2 className="text-[36px] font-medium leading-[125%] text-[#001A70]">
            {data.Title}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {data.Items.map((item, index, arr) => {
            const cols = 4;
            const col = index % cols;
            const row = Math.floor(index / cols);
            const totalRows = Math.ceil(arr.length / cols);
            const borderRight = col < cols - 1 ? "ltr:border-r ltr:border-r-[#001A7033] rtl:border-l rtl:border-l-[#001A7033]" : "";
            const borderBottom = row < totalRows - 1 ? "border-b border-b-[#001A7033]" : "";
            return (
              <div
                key={index}
                className={`flex items-center justify-between gap-4 py-8 px-[42px] ${borderRight} ${borderBottom}`}
              >
                <div>
                  <p className="text-[48px] font-medium leading-tight text-[#001A70]">
                    {item.Number}
                  </p>
                  <p className="mt-1 text-[24px] font-medium text-[#001A70]">
                    {item.Label}
                  </p>
                </div>
                {item.Icon?.data?.attributes?.url && (
                  <div className="relative h-[60px] w-[60px] shrink-0">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Icon.data?.attributes?.url}`}
                      alt={item.Icon.data?.attributes?.alternativeText ?? item.Label}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
