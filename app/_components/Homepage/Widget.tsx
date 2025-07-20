import Image from "next/image";
import Link from "next/link";
import React from "react";
import ArrowLong from "../SVGS/ArrowLong";
import { useTranslations } from "next-intl";

export interface WidgetProps {
  Description: string;
  Title: string;
  Tagline: string;
  Image: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}
export default function WidgetSection({ Widget }: { Widget: WidgetProps }) {
  const t = useTranslations();
  return (
    <div className="flex">
      <div className="w-[50%] aspect-[1134/874] relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${Widget.Image.data.attributes.url}`}
          alt={Widget.Image.data.attributes.alternativeText ?? "Widget"}
          fill
          className="object-cover"
        />
      </div>
      <div className="w-1/2 bg-darkblue p-[60px]">
        <div className="max-w-[700px] me-auto h-full flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-white text-xl font-medium">
              {Widget.Tagline}
            </span>
            <h2 className="text-[60px] text-white max-w-[80%]">
              {Widget.Title}
            </h2>
            <p className=" text-white opacity-55 text-xl font-medium">
              {Widget.Description}
            </p>
          </div>
          <Link
            href={"/our-story"}
            className="mt-20 flex text-primary bg-white text-base gap-3 font-bold py-[18px] px-4 w-fit hover:bg-primary hover:text-white transition-all duration-500"
          >
            {t("data.discover_more")}
            <span className="w-5 h-5">
              <ArrowLong />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
