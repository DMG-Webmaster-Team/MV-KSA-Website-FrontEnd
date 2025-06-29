"use client";
import React from "react";
import HeroSection, { HeroSectionProps } from "../CommonComp/HeroSection";
import OverviewSection, {
  OverviewSectionProps,
} from "../CommonComp/OverviewSection";
import Widgets, { WidgetProps } from "../CommonComp/Widgets";
import DownloadButton from "../CommonComp/DownloadButton";
import { useTranslations } from "next-intl";

interface Props {
  data: {
    MainData: {
      slug: string;
      HeroSection: HeroSectionProps;
      OverviewSection: OverviewSectionProps;
      Widgets: WidgetProps[];
      PDF: {
        data: {
          attributes: {
            url: string;
            name: string;
          };
        };
      };
      Numbers: {
        Title: string;
        Description: string;
      }[];
    };
  };
}
export default function SingleProject({ data }: Props) {
  const t = useTranslations();
  return (
    <div>
      <HeroSection data={data.MainData.HeroSection} singleProject />
      <OverviewSection data={data.MainData.OverviewSection} singleProject />
      <div className="-mt-10">
        <DownloadButton
          title={t("Buttons.download_PDF")}
          PDFurl={data.MainData.PDF.data.attributes.url}
          PDFName={data.MainData.PDF.data.attributes.name}
        />
      </div>
      <div className=" my-10 max-w-[1200px] mx-auto flex rtl:divide-x-reverse divide-x-2 divide-primary divide-opacity-10">
        {data.MainData.Numbers.map(
          (item: { Title: string; Description: string }, index: number) => (
            <div key={index} className="w-[calc(100%/3)] text-center space-y-3">
              <h3 className=" text-7xl text-medium font-FreightNeoPro text-primary">
                {item.Description}
              </h3>
              <p className="text-primary text-xl font-medium opacity-50">
                {item.Title}
              </p>
            </div>
          )
        )}
      </div>
      {data?.MainData.Widgets?.map((item: WidgetProps, index: number) => (
        <Widgets data={item} key={index} reverse={index % 2 == 0} />
      ))}
    </div>
  );
}
