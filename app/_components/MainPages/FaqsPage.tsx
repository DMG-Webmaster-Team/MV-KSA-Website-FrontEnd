"use client";
import React, { useState } from "react";
import { SingleFaq } from "../_types/Common";
import SingleAccordion from "../CommonComp/SingleAccordion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import ArrowLong from "../SVGS/ArrowLong";

interface Props {
  data: {
    MainData: {
      Title: string;
      Text: {
        Title: string;
        Description: string;
      };
    };
    FaqsData: SingleFaq[];
  };
}

export default function FaqsPage({ data }: Props) {
  const locale = useLocale();
  const [activeType, setActiveType] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = useTranslations();
  const handleClick = (index: number) => {
    setOpenFaq(index === openFaq ? null : index);
  };
  const types = Array.from(
    new Set(
      data.FaqsData.map((faq) =>
        faq.attributes.faqs_type?.data?.attributes?.Title?.trim()
      ).filter(Boolean)
    )
  ) as string[];

  const filteredFaqs = activeType
    ? data.FaqsData.filter(
        (faq) =>
          faq.attributes.faqs_type?.data?.attributes?.Title?.trim() ===
          activeType
      )
    : data.FaqsData;

  return (
    <div>
      <div className="md:py-20 py-10 text-center space-y-6">
        <h1 className="text-primary lg:text-[100px] font-medium lg:leading-[100px] md:text-5xl text-4xl">
          {data.MainData.Title}
        </h1>
      </div>

      <div className=" max-w-[1448px] px-4 mx-auto  md:mb-[100px] mb-[50px]">
        <div className="flex flex-wrap gap-4 mb-10">
          <button
            onClick={() => {
              setOpenFaq(null);
              setActiveType(null);
            }}
            className={`py-2 px-[14px] rounded-full text-base font-bold transition ${
              !activeType ? "bg-primary text-white" : "text-primary bg-CoolGray"
            }`}
          >
            {t("data.all")}
          </button>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => {
                setOpenFaq(null);
                setActiveType(type);
              }}
              className={`py-2 px-[14px] rounded-full text-base font-bold transition ${
                activeType === type
                  ? "bg-primary text-white"
                  : "text-primary bg-CoolGray"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex justify-between gap-10 items-start lg:flex-row flex-col">
          <div className="xl:w-[calc(100%-600px)] lg:w-[calc(100%-450px)] w-full space-y-6">
            {filteredFaqs.map((faq, index) => (
              <SingleAccordion
                item={{
                  Title: faq.attributes.Question,
                  Description: faq.attributes.Answer,
                }}
                index={index}
                key={index}
                handleClick={handleClick}
                openFaq={openFaq}
                Big
              />
            ))}
          </div>

          <div className="xl:w-[500px] lg:w-[400px] w-full bg-beige xl:p-10 p-7 flex flex-col gap-5">
            <h3 className="text-primary md:text-4xl text-2xl font-medium text-pretty">
              {data.MainData.Text.Title}
            </h3>
            <p className="text-primary md:text-xl text-base">
              {data.MainData.Text.Description}
            </p>
            <Link
              href={`${locale === "en" ? "/en/" : "/"}contact-us`}
              className="flex items-center bg-primary hover:bg-darkblue transition-all duration-500 text-white py-3 px-4 rounded-sm w-fit gap-3 text-base"
            >
              {t("Buttons.call_us")}
              <span className="w-5 h-5 ltr:rotate-180">
                <ArrowLong />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
