"use client";
import { useState } from "react";
import HeroSection, { HeroSectionProps } from "../CommonComp/HeroSection";
import OverviewSection, {
  OverviewSectionProps,
} from "../CommonComp/OverviewSection";
import SingleAccordion from "../CommonComp/SingleAccordion";
import { Repeater } from "../CommonComp/TextComp";
import Image from "next/image";

interface Props {
  data: {
    HeroSection: HeroSectionProps;
    OverviewSection: OverviewSectionProps;
    TextSection: Repeater;
    Strategies: {
      Title: string;
      Image: {
        data: {
          attributes: {
            url: string;
            alternativeText: string;
          };
        };
      };
      Repeater: Repeater[];
    };
  };
}
export default function ScienceOfHappinessPage({ data }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenFaq(index === openFaq ? null : index);
  };
  return (
    <>
      <HeroSection data={data.HeroSection} />
      <OverviewSection data={data.OverviewSection} />
      <div className=" bg-gray flex overflow-hidden lg:flex-row flex-col">
        <div className="md:w-[50%] w-full lg:mx-0 mx-auto relative">
          <div className="max-w-[750px] relative aspect-[1512/1524] ms-auto">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Strategies.Image.data.attributes.url}`}
              alt={`${
                data.Strategies.Image.data.attributes.alternativeText ?? ""
              }`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="lg:w-[50%] w-full  xl:p-[120px] lg:p-10 p-4 content-center">
          <div className="xl:w-[516px] w-full flex flex-col gap-5">
            <h2 className=" lg:text-4xl md:text-3xl text-[28px]  text-primary font-medium">
              {data.Strategies.Title}
            </h2>
            <div>
              {data.Strategies.Repeater.map((item: Repeater, index: number) => (
                <SingleAccordion
                  item={item}
                  key={index}
                  handleClick={handleClick}
                  openFaq={openFaq}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1448px] mx-auto px-4 md:py-20 py-10">
        <h2 className=" text-primary lg:text-4xl md:text-2xl text-base font-medium text-center">
          {data.TextSection.Title}
        </h2>
        <p className=" text-center lg:text-4xl md:text-2xl text-base mt-6 text-primary opacity-50">
          {data.TextSection.Description}
        </p>
      </div>
    </>
  );
}
