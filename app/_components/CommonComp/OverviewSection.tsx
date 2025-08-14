import Image from "next/image";
import React from "react";

export interface OverviewSectionProps {
  Label?: string;
  Title: string;
  Description: string;
  Logo?: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}

export default function OverviewSection({
  data,
  FullWidth,
  vision,
  singleProject,
}: {
  data: OverviewSectionProps;
  FullWidth?: boolean;
  vision?: boolean;
  singleProject?: boolean;
}) {
  return (
    <section
      id="Overview"
      className={`${
        FullWidth
          ? "w-full md:text-start text-center"
          : "max-w-[1112px] mx-auto text-center md:py-20 py-10"
      }   flex flex-col ${
        vision ? "gap-10" : "md:gap-6 gap-5"
      } md:px-0 px-4 justify-center`}
    >
      {data?.Label && (
        <span className="  text-2xl opacity-50 text-primary">{data.Label}</span>
      )}
      {data.Logo && (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Logo.data.attributes.url}`}
          alt={data.Logo.data.attributes.alternativeText ?? "Logo"}
          width={128}
          height={86}
          className="md:w-[128px] md:h-[86px] !w-[89px] !h-[60px] md:mx-0 mx-auto"
        />
      )}
      <h2
        className={`${
          vision
            ? " md:text-4xl text-[22px]  lg:text-[52px] lg:leading-[4rem] font-medium"
            : "md:text-[52px] md:leading-[65px] text-[28px] font-medium"
        } text-pretty  text-primary `}
      >
        {data?.Title}
      </h2>
      {data?.Description && (
        <p
          className={`${
            singleProject ? "md:text-2xl" : "md:text-xl"
          }  text-base font-medium text-primary opacity-50 `}
        >
          {data.Description}
        </p>
      )}
    </section>
  );
}
