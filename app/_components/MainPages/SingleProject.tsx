"use client";
import { useTranslations } from "next-intl";
import DownloadButton from "../CommonComp/DownloadButton";
import HeroSection from "../CommonComp/HeroSection";
import OverviewSection from "../CommonComp/OverviewSection";
import Widgets, { WidgetProps } from "../CommonComp/Widgets";
import SiteMap from "../SiteMap";
import LandScape from "../LandScape";
import Units from "../Units";
import PartnerShipSection from "../PartnerShipSection";
import Gallery from "../Gallery";
import AmenitiesSection from "../CommonComp/AmenitiesSection";
import { SingleProjectProps } from "@/app/types/Pages";

export default function SingleProject({ data }: SingleProjectProps) {
  const t = useTranslations();
  return (
    <div>
      <HeroSection data={data.MainData.HeroSection} singleProject />
      <OverviewSection data={data.MainData.OverviewSection} singleProject />
      {(data.MainData.PDF?.data?.attributes || data.MainData.Button?.Buttonlink) && (
        <div className="md:-mt-10 flex flex-col items-center gap-4 px-8 md:flex-row md:gap-8 md:px-0 md:w-fit md:mx-auto">
          {data.MainData.PDF?.data?.attributes && (
            <DownloadButton
              title={t("Buttons.download_PDF")}
              PDFurl={data.MainData.PDF.data.attributes.url}
              PDFName={data.MainData.PDF.data.attributes.name}
              className="w-full md:w-fit"
            />
          )}
          {data.MainData.Button?.Buttonlink && (
            <a
              href={data.MainData.Button.Buttonlink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full justify-center items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-bold text-white transition-all duration-500 hover:bg-darkblue md:w-auto"
            >
              {data.MainData.Button.ButtonText}
            </a>
          )}
        </div>
      )}
      <div className=" my-10 max-w-[1200px] mx-auto md:flex-row flex-col gap-y-5 flex rtl:divide-x-reverse divide-x-2 divide-primary divide-opacity-10">
        {data.MainData.Numbers.map(
          (item: { Title: string; Description: string }, index: number) => (
            <div
              key={index}
              className="md:w-[calc(100%/3)] w-full text-center space-y-2"
            >
              <h3 className=" xl:text-7xl text-5xl text-medium font-Poppins text-primary">
                {item.Description}
              </h3>
              <p className="text-primary xl:text-xl md:text-lg text-sm font-medium opacity-50">
                {item.Title}
              </p>
            </div>
          )
        )}
      </div>
      {data?.MainData.Widgets?.map((item: WidgetProps, index: number) => (
        <Widgets data={item} key={index} reverse={index % 2 == 0} />
      ))}
      <SiteMap data={data.MainData.SiteMap} />
      {data.MainData.OverviewSection2 && (
        <OverviewSection data={data.MainData.OverviewSection2} />
      )}

      {data.MainData.AmenitiesSection && (
        <AmenitiesSection data={data.MainData.AmenitiesSection} />
      )}
      <LandScape data={data.MainData.Landscape} />
     {data.MainData.Units&& <Units data={data.MainData.Units} ProjectSlug={data.MainData.slug} />}
      {data.MainData.Gallery?.data?.length > 0 && (
        <Gallery data={data.MainData.Gallery} />
      )}

      <PartnerShipSection data={data.MainData.PartnerSection} />
    </div>
  );
}
