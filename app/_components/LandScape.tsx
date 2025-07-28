import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ArrowLong from "./SVGS/ArrowLong";

export interface LandScapeProps {
  Buttonlink: string;
  Image: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
  List: {
    Name: string;
  }[];
}

export default function LandScape({ data }: { data: LandScapeProps }) {
  const t = useTranslations();
  return (
    <div className="relative w-full md:h-[80vh] h-[60vh]">
      {data?.Image?.data && (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Image.data?.attributes?.url}`}
          alt={data.Image.data.attributes.alternativeText ?? "Landscape image"}
          fill
          className=" object-cover"
        />
      )}

      <div className="max-w-[1448px] px-4 mx-auto relative md:py-8 py-5">
        <div className="bg-white max-w-[700px] ms-auto md:p-10 p-5">
          <ul className=" space-y-1">
            {data.List.map((item: { Name: string }, index: number) => (
              <li
                key={index}
                className="text-primary md:text-2xl text-xl font-medium flex items-center md:gap-5 gap-3"
              >
                <span className="w-1 h-1 rounded-full bg-primary" />
                {item.Name}
              </li>
            ))}
          </ul>

          <Link
            href={data.Buttonlink}
            className="mt-10 flex items-center w-fit text-primary text-sm leading-[9px] font-bold bg-Gray05 hover:bg-[#DDDDDD] transition-all duration-500 gap-3 py-3 px-4 rounded-sm "
            target="_blank"
          >
            {t("data.discover_more")}
            <span className="w-5 h-5 ltr:rotate-180 ">
              <ArrowLong />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
