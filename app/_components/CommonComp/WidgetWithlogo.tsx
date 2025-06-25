import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import ArrowLong from "../SVGS/ArrowLong";

export interface WidgetProps {
  Title: string;
  ShortDescription: string;
  Link: string;
  Image: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
  Logo: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}

export default function WidgetWithLogo({ data }: { data: WidgetProps }) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="relative lg:w-[50%] w-full aspect-[1000/835] group overflow-hidden">
      <a
        className=" absolute w-full h-full inset-0 z-20"
        href={`${locale === "en" ? "/en/" : "/"}${data.Link}`}
      />
      <Image
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Image.data.attributes.url}`}
        alt={`${data.Image.data.attributes.alternativeText ?? data.Title}`}
        className=" group-hover:scale-110 transition-all duration-500 object-cover"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className=" relative flex flex-col justify-between z-10 h-full">
        <div className="relative xl:w-[260px] xl:h-[120px] md:w-[200px] md:h-[90px] w-[160px] h-[60px] md:m-10 p-5 m-5 !ms-auto">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Logo.data.attributes.url}`}
            alt={`${data.Logo.data.attributes.alternativeText ?? data.Title}`}
            fill
            className={` object-contain`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div
          className="p-8"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
          }}
        >
          <div className="flex flex-col gap-3">
            <h2 className=" text-white font-medium xl:text-[52px] md:text-4xl text-[28px] xl:leading-[65px]">
              {data.Title}
            </h2>
            <p className=" text-white text-opacity-80 xl:text-4xl md:text-2xl text-base">
              {data.ShortDescription}
            </p>
          </div>

          <p className="group-hover:bg-primary group-hover:text-white transition-all duration-500 bg-white w-fit mt-10 rounded-[2px] md:py-5 py-2.5 px-4 md:text-base text-sm font-bold flex text-primary gap-3 items-center">
            <span className=" leading-[10px]">{t("data.discover_more")}</span>

            <span className="w-5 h-5 ltr:rotate-180">
              <ArrowLong />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
