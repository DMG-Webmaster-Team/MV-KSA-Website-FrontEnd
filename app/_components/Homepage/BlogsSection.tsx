import Image from "next/image";
import Link from "next/link";
import React from "react";
import SlickMultipleItems from "../SlickMultipleItems";
import { BlogWidget } from "../MainPages/MediaCenter";
import ArrowLong from "../SVGS/ArrowLong";
import { useLocale, useTranslations } from "next-intl";

export default function BlogsSection({ Blogs }: { Blogs: BlogWidget[] }) {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <div className="mb-[64px] relative">
      <div className="max-w-[1448px] px-4 mx-auto flex items-center justify-between py-[64px]">
        <h2 className="text-primary text-5xl font-medium">
          {t("data.latest_news")}
        </h2>
        <Link
          href={"/media-center"}
          className="flex text-white bg-primary text-base gap-3 font-bold py-[18px] px-4 w-fit hover:bg-darkblue transition-all duration-500 !m-0"
        >
          {t("Buttons.go_to_media_center")}
          <span className="w-5 h-5">
            <ArrowLong />
          </span>
        </Link>
      </div>
      <SlickMultipleItems customArrow>
        {Blogs.map((item: BlogWidget, index: number) => (
          <Link
            key={index}
            href={`${locale == "en" ? "/en/" : "/"}media-center/${
              item.attributes.slug
            }`}
            className="block space-y-3 lg:w-[calc(100%/3-14px)] md:w-[calc(100%/2-10px)] w-full group  "
          >
            <p className=" bg-beige w-fit px-3 pt-[9px] pb-[3px] rounded-full">
              <span className="text-sm text-black opacity-50">
                {item.attributes.blogs_type.data.attributes.Name}
              </span>
            </p>

            {item.attributes.WidgetImage.data.attributes?.url && (
              <div className="relative w-full h-60 overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.attributes.WidgetImage.data.attributes.url}`}
                  alt={
                    item.attributes.WidgetImage.data.attributes
                      .alternativeText || item.attributes.Title
                  }
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-500"
                />
              </div>
            )}
            <h3 className="text-2xl text-primary font-medium md:min-h-[96px]">
              {item.attributes.Title}
            </h3>

            <p
              className="text-sm text-primary opacity-50 font-medium rtl:text-right"
              style={{ direction: "ltr" }}
            >
              {new Date(item.attributes.publishedAt).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </p>
          </Link>
        ))}
      </SlickMultipleItems>
    </div>
  );
}
