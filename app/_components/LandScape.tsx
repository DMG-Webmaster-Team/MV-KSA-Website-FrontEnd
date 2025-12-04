import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { LandScapeProps } from "../types/PartnerShip";
import ArrowLong from "./SVGS/ArrowLong";

export default function LandScape({ data }: { data: LandScapeProps }) {
  const t = useTranslations();

  return (
    <>
      <div className="relative h-[60vh] max-h-[800px] w-full md:h-[96vh]">
        {data?.Image?.data && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Image.data?.attributes?.url}`}
            alt={
              data.Image.data.attributes.alternativeText ?? "Landscape image"
            }
            fill
            className={`object-cover ${data.rotate ? "-scale-x-100" : ""}`}
          />
        )}
      </div>
      <div className="mx-auto max-w-[1448px] px-4 py-5 md:py-10">
        <div className=" ms-auto w-full bg-white px-5 ">
          <ul className="space-y-1">
            {data.List.map((item: { Name: string }, index: number) => (
              <li
                key={index}
                className="flex items-center gap-3 text-xl font-medium text-primary md:gap-5 md:text-2xl"
              >
                <span className="h-1 w-1 rounded-full bg-primary" />
                {item.Name}
              </li>
            ))}
          </ul>

          <Link
            href={data.Buttonlink}
            className="mt-10 flex w-fit items-center gap-3 rounded-sm bg-Gray05 px-4 py-3 text-sm font-bold leading-[9px] text-primary transition-all duration-500 hover:bg-[#DDDDDD]"
            target="_blank"
          >
            {t("data.discover_more")}
            <span className="h-5 w-5 ltr:rotate-180">
              <ArrowLong />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
