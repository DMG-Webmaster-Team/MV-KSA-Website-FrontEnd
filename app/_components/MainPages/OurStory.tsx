"use client";
import Image from "next/image";
import CompoundComponent, {
  SingleCompoundProps,
} from "../CommonComp/CompoundComponent";
import HeroSection  from "../CommonComp/HeroSection";
import OverviewSection, {
  OverviewSectionProps,
} from "../CommonComp/OverviewSection";
import Widgets, { WidgetProps } from "../CommonComp/Widgets";
import { useState } from "react";
import DownloadButton from "../CommonComp/DownloadButton";
import { useTranslations } from "next-intl";
import SlickMultipleItems from "../SlickMultipleItems";
import WidgetComp from "../SmallWidgets/WidgetComp";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HeroSectionProps } from "../_types/Common";
interface Props {
  data: {
    HeroSection: HeroSectionProps;
    OverviewSection: OverviewSectionProps;
    Widgets: WidgetProps[];
    OwnerMessage: {
      Title: string;
      Message: string;
      Image: {
        data: {
          attributes: {
            url: string;
            alternativeText: string;
          };
        };
      };
    };
    Compounds: {
      Title: string;
      SingleCompound: SingleCompoundProps[];
      PDF: {
        data: {
          attributes: {
            url: string;
            name: string;
          };
        };
      };
    };
    BrandAuthenticity: {
      Title: string;
      Widgets: WidgetProps[];
    };
  };
}
export default function OurStory({ data }: Props) {
  const [openPopupIndex, setOpenPopupIndex] = useState<number | null>(null);
  const t = useTranslations();
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [data.OwnerMessage.Message, expanded]);

  const isLong = data.OwnerMessage.Message.length > 250;
  return (
    <>
      <HeroSection data={data.HeroSection} />
      <OverviewSection data={data.OverviewSection} />
      {data?.Widgets?.map((item: WidgetProps, index: number) => (
        <Widgets data={item} key={index} reverse={index % 2 == 0} />
      ))}
      <div className="lg:px-0 px-4">
        <div className="max-w-[1448px] px-4 mx-auto flex lg:flex-row flex-col items-center justify-between bg-gray p-5 rounded-xl my-20 gap-y-[28px]">
          <div className="md:w-[500px] w-full relative md:aspect-[1067/1600] aspect-[1067/1088] rounded overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.OwnerMessage.Image.data.attributes.url}`}
              alt={
                data.OwnerMessage.Image.data.attributes.alternativeText ??
                data.OwnerMessage.Title
              }
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className=" object-cover object-top"
            />
          </div>
          <div className="xl:w-[calc(100%-500px-100px)] lg:w-[calc(100%-500px-50px)] xl:pe-20 lg:pe-10 space-y-5">
            <h2 className=" xl:text-5xl text-4xl text-primary font-medium mb-5">
              {data.OwnerMessage.Title}
            </h2>
            <motion.div
              initial={false}
              animate={{ height: expanded || !isLong ? height : 120 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
              className="text-primary text-sm md:text-lg xl:text-xl font-medium md:!h-auto overflow-hidden"
            >
              <div
                ref={contentRef}
                dangerouslySetInnerHTML={{
                  __html: data.OwnerMessage.Message.replace(
                    /\n\n/g,
                    "<br><br>"
                  ),
                }}
              />
            </motion.div>

            {isLong && (
              <button
                className="text-primary font-bold text-sm mt-3 underline md:hidden inline-flex"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? t("data.see_less") : t("data.see_more")}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className=" max-w-[880px] mx-auto py-20">
        {data?.Compounds?.Title && (
          <h2 className=" text-primary text-[60px] font-medium text-center">
            {data.Compounds.Title}
          </h2>
        )}
        {data?.Compounds?.SingleCompound.length > 0 && (
          <div className=" mt-[60px] mb-[100px]">
            {data.Compounds.SingleCompound.map(
              (item: SingleCompoundProps, index: number) => (
                <CompoundComponent
                  key={index}
                  item={item}
                  index={index}
                  lastone={index == data.Compounds.SingleCompound.length - 1}
                  open={openPopupIndex === index}
                  onOpen={() => setOpenPopupIndex(index)}
                  onClose={() => setOpenPopupIndex(null)}
                />
              )
            )}
          </div>
        )}
        {data?.Compounds?.PDF && (
          <DownloadButton
            title={t("Buttons.download_company_profile")}
            PDFurl={data.Compounds.PDF.data.attributes.url}
            PDFName={data.Compounds.PDF.data.attributes.name}
          />
        )}
      </div>
      <div className="relative mb-20">
        <h2 className="text-primary text-[52px] font-medium text-center mb-2">
          {data.BrandAuthenticity.Title}
        </h2>

        <div className=" md:block hidden">
          <SlickMultipleItems noMargin customArrow>
            {data.BrandAuthenticity.Widgets.map(
              (item: WidgetProps, index: number) => (
                <WidgetComp item={item} key={index} />
              )
            )}
          </SlickMultipleItems>
        </div>
        <div className="md:hidden block">
          {data?.BrandAuthenticity.Widgets?.map(
            (item: WidgetProps, index: number) => (
              <Widgets data={item} key={index} reverse={index % 2 == 0} />
            )
          )}
        </div>
      </div>
    </>
  );
}
