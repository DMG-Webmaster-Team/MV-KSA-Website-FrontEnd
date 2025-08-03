"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const ChevronRight = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ChevronLeft = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { ChevronRight, ChevronLeft };

export default function NotFound() {
  const t = useTranslations("NotFound");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const DirectionalIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div
      className={`flex flex-col-reverse md:flex-row md:pt-[74px] pt-5 md:gap-[93px] gap-5`}
    >
      <div className="md:w-1/2">
        <Image
          src="/not-found.webp"
          alt={t("imageAlt")}
          width={756}
          height={800}
        />
      </div>
      <div
        className={`text-start flex justify-start items-center md:pt-0 pt-8 md:w-1/2 md:px-0 px-4`}
      >
        <div className="">
          <div className="md:pt-0 pt-3 rounded-full text-[#001A70] uppercase font-normal md:text-[120px] text-[48px]">
            404
          </div>
          <div className=" rounded-full pb-[6px] text-[#001A70] uppercase font-medium md:text-[40px] text-[22px]">
            {t("title")}
          </div>
          <p className="text-[#AAAAAA] font-normal py-2 lg:text-[40px] md:text-xl text-lg leading-[22px] lg:leading-[48px] md:leading-[28px]">
            {t("description")}
          </p>
          <div className="text-center flex flex-row gap-3 pt-5">
            <button className="py-4 hover:bg-[#E8E9E4] transition bg-[#E8E9E4] text-[#003DA6] rounded-[2px] px-5 flex justify-center gap-3">
              <Link href={`/${locale}/our-story`} className="text-center">
                <div className="flex gap-x-1 gap-y-2.5">
                  <p className="font-medium text-base leading-[24px]">
                    {t("ourStory")}
                  </p>
                  <span className="w-6 h-6">
                    <DirectionalIcon />
                  </span>
                </div>
              </Link>
            </button>
            <button className="py-4 bg-[#003DA6] rounded-[2px] px-5 flex justify-center gap-3">
              <Link href={`/${locale}`} className="text-center">
                <div className="flex gap-x-1 gap-y-2.5 text-white">
                  <p className="font-medium text-base leading-[24px] capitalize">
                    {t("Home")}
                  </p>
                  <span className="md:w-6 md:h-6 w-4 h-4">
                    <DirectionalIcon />
                  </span>
                </div>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
