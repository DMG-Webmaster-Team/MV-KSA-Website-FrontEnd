"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import "swiper/css";
import { HeroSectionProps } from "../_types/Common";
import CompoundComponent, {
  SingleCompoundProps,
} from "../CommonComp/CompoundComponent";
import DownloadButton from "../CommonComp/DownloadButton";
import HeroSection from "../CommonComp/HeroSection";
import OverviewSection, {
  OverviewSectionProps,
} from "../CommonComp/OverviewSection";
import Widgets, { WidgetProps } from "../CommonComp/Widgets";
import SlickMultipleItems from "../SlickMultipleItems";
import WidgetComp from "../SmallWidgets/WidgetComp";

import { Swiper, SwiperSlide } from "swiper/react";
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
  // const [height, setHeight] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    if (contentRef.current) {
      const el = contentRef.current;
      setIsOverflowing(el.scrollHeight > 120);
    }
  }, [data.OwnerMessage.Message]);
  

  return (
    <>
      <HeroSection data={data.HeroSection} />
      <OverviewSection data={data.OverviewSection} />
      {data?.Widgets?.map((item: WidgetProps, index: number) => (
        <Widgets data={item} key={index} reverse={index % 2 == 0} />
      ))}
      <div className="px-4 lg:px-0">
        <div className="mx-auto my-20 flex max-w-[1448px] flex-col items-center justify-between gap-y-[28px] rounded-xl bg-gray p-5 px-4 lg:flex-row">
          <div className="relative aspect-[1067/1088] w-full overflow-hidden rounded md:aspect-[1067/1600] md:w-[500px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.OwnerMessage.Image.data.attributes.url}`}
              alt={
                data.OwnerMessage.Image.data.attributes.alternativeText ??
                data.OwnerMessage.Title
              }
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-5 lg:w-[calc(100%-500px-50px)] lg:pe-10 xl:w-[calc(100%-500px-100px)] xl:pe-20">
            <h2 className="mb-5 whitespace-pre-line text-4xl font-medium text-primary xl:text-5xl">
              {data.OwnerMessage.Title}
            </h2>

            <div
              className={`text-primary text-sm md:text-lg xl:text-xl font-medium transition-all duration-300 ${
                expanded ? "max-h-none" : "max-h-[220px] overflow-hidden line-clamp-6"
              }`}
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
            </div>

            {isOverflowing && (
              <button
                className="mt-3 inline-flex text-sm font-bold text-primary underline"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? t("data.see_less") : t("data.see_more")}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1300px] py-20">
        {data?.Compounds?.Title && (
          <h2 className="text-center text-[36px] font-medium text-primary md:text-[60px]">
            {data.Compounds.Title}
          </h2>
        )}
        <div className="hidden flex-col gap-10 md:flex">
          {data?.Compounds?.SingleCompound.length > 0 && (
            <div className="mb-[100px] mt-[60px]">
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
        </div>
        <div className="flex pb-20 md:hidden">
          <Swiper spaceBetween={0} slidesPerView={1.1} centeredSlides={false}>
            {data.Compounds.SingleCompound.map(
              (item: SingleCompoundProps, index: number) => (
                <SwiperSlide key={index}>
                  <CompoundComponent
                    item={item}
                    index={index}
                    lastone={index === data.Compounds.SingleCompound.length - 1}
                    open={openPopupIndex === index}
                    onOpen={() => setOpenPopupIndex(index)}
                    onClose={() => setOpenPopupIndex(null)}
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
        {data?.Compounds?.PDF?.data?.attributes?.url && (
          <DownloadButton
            title={t("Buttons.download_company_profile")}
            PDFurl={data.Compounds.PDF.data.attributes.url}
            PDFName={data.Compounds.PDF.data.attributes.name}
          />
        )}
      </div>
      <div className="relative mb-20">
        <h2 className="mb-2 text-center text-[36px] font-medium text-primary md:text-[52px]">
          {data.BrandAuthenticity.Title}
        </h2>

        <div className="hidden md:block">
          <SlickMultipleItems noMargin customArrow>
            {data.BrandAuthenticity.Widgets.map(
              (item: WidgetProps, index: number) => (
                <WidgetComp item={item} key={index} />
              )
            )}
          </SlickMultipleItems>
        </div>
        <div className="block md:hidden">
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
