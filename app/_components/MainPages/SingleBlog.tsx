"use client";
import React from "react";
import BreadCrumbs from "../CommonComp/BreadCrumbs";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ImageData } from "../_types/Common";
import ShareButtons from "./Share";

export interface MainItem {
  type: "heading" | "paragraph" | "list" | "link" | "image";
  level?: number;
  format?: "unordered" | "ordered";
  url?: string;
  children: (TextNode | LinkNode | ListItemNode)[];
  image?: ImageData;
}

interface TextNode {
  type: "text";
  text: string;
  bold?: boolean;
}

interface LinkNode {
  type: "link";
  text: string;
  url: string;
}

interface ListItemNode {
  type: "listItem";
  children: (TextNode | LinkNode)[];
}

interface Props {
  data: {
    MainData: {
      Title: string;
      slug: string;
      publishedAt: string;
      Content: MainItem[];
      author: {
        data: {
          attributes: {
            Name: string;
          };
        };
      };
      blogs_type: {
        data: {
          attributes: {
            Name: string;
          };
        };
      };
    };
  };
}
export default function SingleBlog({ data }: Props) {
  const locale = useLocale();
  const t = useTranslations();
  const List = [
    { Name: t("Menu.home"), Link: locale == "en" ? "/en" : "/" },
    {
      Name: t("Menu.media_center"),
      Link: locale == "en" ? "/en/media-center" : "/media-center",
    },
    { Name: data.MainData.Title },
  ];
  function formatDate(dateString: string, locale: string) {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    const usedLocale = locale === "ar" ? "ar-EG" : "en-GB";
    return new Date(dateString).toLocaleDateString(usedLocale, options);
  }
  return (
    <div className="relative before:content-normal before:w-full md:before:h-[800px] before:h-[650px] before:bg-gray before:absolute before:inset-0 before:-top-[143px] before:z-[-1]">
      <div className="max-w-[1112px] mx-auto xl:px-0 px-4 my-[50px] relative">
        <div className="md:md:space-y-10 space-y-5">
          <p className=" bg-beige w-fit px-3 pt-[9px] pb-[3px] rounded-full">
            <span className="text-sm text-black opacity-50">
              {data.MainData.blogs_type.data.attributes.Name}
            </span>
          </p>

          <BreadCrumbs ListProps={List} />

          <h1 className=" lg:text-[60px] md:text-5xl text-4xl text-primary lg:leading-[75px]">
            {data.MainData.Title}
          </h1>
          <div className="flex justify-between">
            <div className="flex gap-4 text-primary text-sm font-medium items-center">
              <p>{formatDate(data.MainData.publishedAt, locale)}</p>
              {data?.MainData?.author?.data?.attributes && (
                <p className="flex gap-4 items-center">
                  <span className="bg-primary opacity-20 w-[1px] h-5"></span>
                  {data.MainData.author.data.attributes.Name}
                </p>
              )}
            </div>
            <div>
              <ShareButtons
                url={`${locale == "en" ? "/en/" : "/"}media-center/${
                  data.MainData.slug
                }`}
              />
            </div>
          </div>
        </div>
        <div className=" mt-[60px] md:space-y-10 space-y-5">
          {data.MainData.Content.map((item: MainItem, index: number) => (
            <div key={index} className=" text-primary font-medium">
              {item.type === "heading" && item.children.length > 0 && (
                <>
                  {item.level === 2 && item.children[0]?.type === "text" && (
                    <h2 className="md:text-[48px] text-[28px]">
                      {item.children[0].text}
                    </h2>
                  )}
                  {item.level === 3 && item.children[0]?.type === "text" && (
                    <h3 className="md:text-4xl text-2xl">
                      {item.children[0].text}
                    </h3>
                  )}

                  {item.level === 4 && item.children[0]?.type === "text" && (
                    <h4 className={` `}>{item.children[0].text}</h4>
                  )}
                  {item.level === 5 && item.children[0]?.type === "text" && (
                    <h5 className="md:text-2xl text-lg">
                      {item.children[0].text}
                    </h5>
                  )}
                  {item.level === 6 && item.children[0]?.type === "text" && (
                    <h6 className="md:text-xl text-base">
                      {item.children[0].text}
                    </h6>
                  )}
                </>
              )}

              {item.type === "paragraph" && (
                <p className=" md:text-xl text-base">
                  {item.children.map((child, inx) => {
                    if (child.type === "text") {
                      return (
                        <span
                          key={inx}
                          style={{ fontWeight: child.bold ? "bold" : "normal" }}
                        >
                          {child.text}
                        </span>
                      );
                    } else if (child.type === "link") {
                      return (
                        <a
                          key={inx}
                          href={child.url}
                          className="text-blue-500 underline"
                        >
                          {child.text}
                        </a>
                      );
                    }
                  })}
                </p>
              )}
              {item.type === "image" && item.image && (
                <div className="relative aspect-[1000/562] w-full overflow-hidden">
                  <Image
                    priority
                    src={`${item.image.url}`}
                    alt={
                      item.image.alternativeText
                        ? item.image.alternativeText
                        : "Image"
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className=" object-cover"
                  />
                </div>
              )}

              {item.type === "list" && (
                <ul
                  className={`${
                    item.format === "unordered" ? "list-disc" : "list-decimal"
                  }`}
                >
                  {item.children.map((listItem, inde) => (
                    <li key={inde} className={` `}>
                      {(listItem as ListItemNode).children.map(
                        (listItemChild, ind) =>
                          listItemChild.type === "link" ? (
                            <a
                              key={ind}
                              href={listItemChild.url}
                              className="text-blue-500 underline"
                            >
                              {listItemChild.text}
                            </a>
                          ) : (
                            <span key={ind}>{listItemChild.text}</span>
                          )
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {item.type === "link" &&
                item.url &&
                item.children.length > 0 &&
                "text" in item.children[0] && (
                  <a href={item.url} className="text-blue-500 underline">
                    {item.children[0].text}
                  </a>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
