"use client";

import { JSX } from "react";
import Loading from "../Common/LoadingPageComponent";
import { LazyMotion, m, domAnimation } from "framer-motion";

interface RichTextChild {
  text: string;
  bold?: boolean;
  type: "text";
}

interface RichTextBlock {
  type: "heading" | "paragraph";
  level?: number;
  children: RichTextChild[];
}

interface PageData {
  Title: string;
  content: RichTextBlock[];
}


interface PolicyData {
  data: {
    data: {
      attributes: PageData;
    };
  };
}

export default function PrivacyPage(data: PolicyData) {
  if (!data) {
    return <Loading white />;
  }

  const pageData = data.data.data.attributes;

  const containerStyles =
    "max-w-[1112px] lg:py-[120px] py-10 md:px-7 px-4 mx-auto";
  const contentStyles =
    "flex flex-col md:gap-[60px] gap-[44px] md:pt-0 pt-5 justify-start w-full";
  const titleStyles =
    "lg:text-[80px] text-start md:text-[64px] text-[44px] leading-[52.8px] md:leading-[76.8px] lg:leading-[96px] text-primary";
  const widgetContainerStyles = "w-full flex flex-col gap-[60px]";
  const widgetItemStyles = "flex-col flex justify-start gap-3";
  const widgetTitleStyles =
    "text-[28px] text-start md:leading-[33.6px] text-[#101010]";
  const widgetDescriptionStyles =
    "md:text-xl text-sm md:leading-[28px] leading-[18.2px] font-normal text-start text-[#666666]";

  return (
    <section className={containerStyles}>
      <LazyMotion features={domAnimation}>
        <m.div
          className={contentStyles}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <h1 className={titleStyles}>{pageData.Title}</h1>

          <div className={widgetContainerStyles}>
            {pageData.content
              .filter(item => !(item.type === "paragraph" && item.children.length === 1 && item.children[0].text === ""))
              .reduce((acc: JSX.Element[], item: RichTextBlock, index: number) => {
                if (item.type === "heading") {
                  acc.push(
                    <div key={`group-${index}`} className={widgetItemStyles}>
                      <h2 className={widgetTitleStyles}>{item.children.map(child => child.text).join("")}</h2>
                      {pageData.content[index + 1]?.type === "paragraph" && (
                        <p className={widgetDescriptionStyles}>
                          {pageData.content[index + 1].children.map(child => child.text).join("")}
                        </p>
                      )}
                    </div>
                  );
                } else if (index === 0 || pageData.content[index - 1]?.type !== "heading") {
                  acc.push(
                    <div key={`group-${index}`} className={widgetItemStyles}>
                      <p className={widgetDescriptionStyles}>{item.children.map(child => child.text).join("")}</p>
                    </div>
                  );
                }
                return acc;
              }, [])}
          </div>
        </m.div>
      </LazyMotion>
    </section>
  );
}
