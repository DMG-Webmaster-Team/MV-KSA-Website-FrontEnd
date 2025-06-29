"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface BlogWidget {
  attributes: {
    Title: string;
    slug: string;
    publishedAt: string;
    blogs_type: {
      data: {
        attributes: {
          Name: string;
        };
      };
    };
    WidgetImage: {
      data: {
        attributes: {
          url: string;
          alternativeText: string | null;
        };
      };
    };
  };
}

interface Props {
  data: {
    MainData: {
      Title: string;
    };
    Blogs: BlogWidget[];
  };
}

export default function MediaCenter({ data }: Props) {
  const [selectedType, setSelectedType] = useState("All");
  const t = useTranslations();
  const locale = useLocale();
  // Extract unique blog types
  const blogTypes = useMemo(() => {
    const types = data.Blogs.map(
      (item) => item.attributes.blogs_type?.data?.attributes?.Name
    );
    return [t("data.all"), ...Array.from(new Set(types))];
  }, [data.Blogs, t]);

  // Filtered blogs based on selected type
  const filteredBlogs = useMemo(() => {
    if (selectedType === "All") return data.Blogs;
    return data.Blogs.filter(
      (item) =>
        item.attributes.blogs_type?.data?.attributes?.Name === selectedType
    );
  }, [selectedType, data.Blogs]);

  return (
    <div>
      <div className="md:py-20 py-10 text-center space-y-6">
        <h1 className="text-primary lg:text-[100px] font-medium lg:leading-[100px] md:text-5xl text-4xl">
          {data.MainData.Title}
        </h1>
      </div>

      <div className="max-w-[1448px] px-4 mx-auto  mb-[100px]">
        <div className="flex overflow-x-auto gap-3 mb-10 md:mx-0 -mx-4 md:px-0 px-4">
          {blogTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-[14px] text-base font-bold leading-[10px] whitespace-nowrap pt-2.5 pb-[5px] transition-all duration-500 rounded-full ${
                selectedType === type
                  ? "bg-primary text-white"
                  : "bg-CoolGray text-primary hover:bg-primary hover:text-white "
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-10">
          {filteredBlogs.map((item, index) => {
            const { Title, slug, publishedAt, blogs_type, WidgetImage } =
              item.attributes;
            const image = WidgetImage?.data?.attributes;
            const blogType = blogs_type?.data?.attributes?.Name;

            return (
              <Link
                key={index}
                href={`${locale == "en" ? "/en/" : "/"}media-center/${slug}`}
                className="block space-y-3 lg:w-[calc(100%/3-14px)] md:w-[calc(100%/2-10px)] w-full group  "
              >
                <p className=" bg-beige w-fit px-3 pt-[9px] pb-[3px] rounded-full">
                  <span className="text-sm text-black opacity-50">
                    {blogType}
                  </span>
                </p>

                {image?.url && (
                  <div className="relative w-full h-60 overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${image.url}`}
                      alt={image.alternativeText || Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                )}
                <h3 className="text-2xl text-primary font-medium md:min-h-[96px]">
                  {Title}
                </h3>

                <p
                  className="text-sm text-primary opacity-50 font-medium rtl:text-right"
                  style={{ direction: "ltr" }}
                >
                  {new Date(publishedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
