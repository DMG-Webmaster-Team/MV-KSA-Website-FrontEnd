"use client";
import React from "react";
import { OverviewSectionProps } from "../CommonComp/OverviewSection";
import { SingleList } from "../UnitWidget";
import Image from "next/image";
import Link from "next/link";
import Close from "../SVGS/Close";
import LangSwitcher from "../Header/LangSwitcher";
import { useTranslations } from "next-intl";
import Calender from "../SVGS/Calender";
import Gallery, { singleImage } from "../Gallery";
import Widgets, { WidgetProps } from "../CommonComp/Widgets";
import DownloadButton from "../CommonComp/DownloadButton";
interface ImageProps {
  data: {
    attributes: {
      alternativeText: string;
      url: string;
    };
  };
}
interface Props {
  Title: string;
  slug: string;
  Hero_Media: ImageProps;
  OverviewSection: OverviewSectionProps;
  Gallery: {
    data: singleImage[];
  };
  amenities: {
    Description: string;
    Image: ImageProps;
    List: SingleList[];
  };
  Repeater: {
    Title: string;
    Description: string;
    Image: ImageProps;
  }[];
  PDF: {
    data: {
      attributes: {
        url: string;
        name: string;
      };
    };
  };
}
export default function UnitPage({ data }: { data: Props }) {
  const t = useTranslations();
  return (
    <div>
      <div className=" w-full h-[80vh] HeroUnit relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Hero_Media.data.attributes.url}`}
          alt={data.Hero_Media.data.attributes.alternativeText ?? data.Title}
          fill
          className=" object-cover"
        />
        <div className="relative max-w-[1448px] px-4 mx-auto z-10 pt-[60px] flex justify-between items-start">
          <h1 className="text-white text-[100px] max-w-[70%] leading-[100px]">
            {data.Title}
          </h1>
          <div className="flex gap-8 items-center">
            <LangSwitcher />
            <Link
              href={`/projects/one-mountain-view`}
              className=" bg-white flex rounded-full p-4 text-primary hover:text-white hover:bg-primary duration-500 transition-all"
            >
              <span className="w-6 h-6 ">
                <Close />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="py-20 max-w-[1448px] px-4 mx-auto text-primary font-medium text-4xl space-y-6">
        <h2 className=" opacity-50">{data.OverviewSection.Title}</h2>
        <p className=" ">{data.OverviewSection.Description}</p>
        <Link
          href={`/contact-us`}
          className="flex bg-primary text-white w-fit text-base font-bold gap-3 px-4 py-2.5 items-center hover:bg-darkblue transition-all duration-500"
        >
          {t("Buttons.register_your_interest")}
          <span className="w-5 h-5">
            <Calender />
          </span>
        </Link>
      </div>
      <Gallery data={data.Gallery} />
      <div
        className={`max-w-[1910px] mx-auto flex bg-gray flex-col-reverse  lg:flex-row-reverse  `}
      >
        <div className="lg:w-[50%] xl:p-[100px] md:py-[100px] md:px-10 py-[84px] px-4 content-center">
          <div className="md:max-w-[516px] space-y-10">
            <p className=" text-xl font-medium text-primary">
              {data.amenities.Description}
            </p>
            {data.amenities?.List.length > 0 && (
              <ul className="flex flex-wrap pe-[60px] gap-y-2">
                {data?.amenities?.List.map(
                  (itemList: SingleList, index: number) => (
                    <li key={index} className="w-full flex items-center gap-3">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${itemList.Icon.data.attributes.url}`}
                        alt={
                          itemList.Icon.data.attributes.alternativeText ??
                          "Icon"
                        }
                        width={32}
                        height={32}
                      />
                      <span className=" text-primary text-xl font-medium">
                        {itemList.Text}
                      </span>
                    </li>
                  )
                )}
              </ul>
            )}

            <DownloadButton
              title={t("Buttons.download_PDF")}
              PDFurl={data.PDF.data.attributes.url}
              PDFName={data.PDF.data.attributes.name}
            />
          </div>
        </div>
        <div className="lg:w-[50%] relative lg:aspect-[800/634] aspect-[800/604]">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.amenities.Image.data.attributes.url}`}
            alt={data.amenities.Image.data.attributes.alternativeText ?? ""}
            fill
            className=" object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      {data.Repeater?.map((item: WidgetProps, index: number) => (
        <Widgets data={item} key={index} reverse={index % 2 != 0} />
      ))}
    </div>
  );
}
