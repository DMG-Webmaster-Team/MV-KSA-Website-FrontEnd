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
import { SingleProjectProps } from "@/app/types/Pages";

export default function SingleProject({ data }: SingleProjectProps) {
  const t = useTranslations();
  return (
    <div>
      <HeroSection data={data.MainData.HeroSection} singleProject />
      <OverviewSection data={data.MainData.OverviewSection} singleProject />
      {data.MainData.PDF?.data?.attributes && (
        <div className="md:-mt-10">
          <DownloadButton
            title={t("Buttons.download_PDF")}
            PDFurl={data.MainData.PDF.data.attributes.url}
            PDFName={data.MainData.PDF.data.attributes.name}
          />
        </div>
      )}
      <div className=" my-10 max-w-[1200px] mx-auto md:flex-row flex-col gap-y-3 flex rtl:divide-x-reverse divide-x-2 divide-primary divide-opacity-10">
        {data.MainData.Numbers.map(
          (item: { Title: string; Description: string }, index: number) => (
            <div
              key={index}
              className="md:w-[calc(100%/3)] w-full text-center space-y-3"
            >
              <h3 className=" xl:text-7xl text-5xl text-medium font-FreightNeoPro text-primary">
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

      <LandScape data={data.MainData.Landscape} />
      <Units data={data.MainData.Units} ProjectSlug={data.MainData.slug} />
      {data.MainData.Gallery?.data?.length > 0 && (
        <Gallery data={data.MainData.Gallery} />
      )}

      <PartnerShipSection data={data.MainData.PartnerSection} />
    </div>
  );
}
