"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import BreadCrumbs from "../CommonComp/BreadCrumbs";
import CareerForm from "../Forms/CareerForm";
interface SingleContent {
  Title: string;
  Details: {
    type: string;
    format?: string;
    children: {
      text: string;
      type: string;
      url?: string;
      children?: {
        text: string;
      }[];
    }[];
  }[];
}

interface Props {
  data: {
    MainData: {
      Title: string;
      slug: string;
      Content: SingleContent[];
      department: {
        data: {
          attributes: {
            Name: string;
          };
        };
      };
      role_type: {
        data: {
          attributes: {
            Name: string;
          };
        };
      };
      Image: {
        data: {
          attributes: {
            alternativeText: string;
            url: string;
          };
        };
      };
    };
  };
}

export default function SingleCareerPage({ data }: Props) {
  console.log(data);

  const t = useTranslations();
  const List = [
    { Name: t("Menu.home"), Link: "/" },
    { Name: t("Menu.careers"), Link: "/careers" },
    { Name: data.MainData.Title },
  ];
  return (
    <div className="max-w-[1448px] px-4 mx-auto">
      <div className="flex justify-between md:items-end py-[60px] md:flex-row flex-col gap-y-10">
        <div className=" md:space-y-5 space-y-3">
          <BreadCrumbs ListProps={List} />
          <h1 className=" md:text-[64px] text-5xl text-primary md:first-letter:leading-[64px]">
            {data.MainData.Title}
          </h1>
          <div className=" flex text-[#666666] md:text-xl text-base gap-1 ">
            <span>{data.MainData.role_type.data.attributes.Name}</span>
            <span> - {data.MainData.department.data.attributes.Name}</span>
          </div>
        </div>
        <Link
          href={"#form"}
          className=" bg-primary hover:bg-darkblue transition-all duration-500 text-white rounded-[2px] text-lg font-bold py-4 px-7 md:w-fit w-full text-center "
        >
          {t("Buttons.apply_now")}
        </Link>
      </div>
      <div className="flex justify-between mb-[100px] items-start lg:flex-row flex-col-reverse gap-y-10">
        <div className="xl:w-[616px] lg:w-[50%] w-full flex flex-col md:gap-20 gap-10">
          {data.MainData.Content.map((item: SingleContent, index: number) => (
            <div key={index} className="">
              <h4 className="flex md:text-[52px] text-3xl gap-2.5 items-center font-semibold">
                {item.Title}
              </h4>

              <div className=" md:mt-12 mt-6">
                {item?.Details?.map((item: any, index: number) => (
                  <div key={index}>
                    {item.type === "paragraph" && (
                      <p className="lg:text-xl text-lg font-normal xl:pb-6 pb-3 text-[#252526] text-pretty">
                        {item.children.map((child: any, inx: number) => {
                          if (child.type === "text") {
                            return <span key={inx}>{child.text}</span>;
                          }
                          if (child.type === "link") {
                            return (
                              <a
                                key={inx}
                                href={child.url}
                                className="text-[#0000ff] hover:underline"
                              >
                                {child.children?.[0]?.text}
                              </a>
                            );
                          }
                          return null;
                        })}
                      </p>
                    )}

                    {item.type === "image" && (
                      <div className="w-full relative md:h-[300px] h-[200px] my-5">
                        <Image
                          priority
                          src={`${item.image.url}`}
                          alt={
                            item.image.alternativeText
                              ? item.image.alternativeText
                              : data.MainData.Title
                          }
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          fill
                        />
                      </div>
                    )}
                    {item.type === "list" && (
                      <ul
                        className={`ms-4 ${
                          item.format === "unordered"
                            ? "list-disc"
                            : "list-decimal"
                        } my-5 lg:text-xl text-lg font-normal ml-5 `}
                      >
                        {item.children.map((listItem: any, inde: number) => (
                          <li
                            key={inde}
                            className={`${
                              item.children.length - 1 == inde ? "" : "mb-4"
                            }`}
                          >
                            {listItem.children.map(
                              (listItemChild: any, ind: number) => (
                                <span
                                  key={ind}
                                  style={{
                                    fontWeight: listItemChild.bold
                                      ? "bold"
                                      : "normal",
                                  }}
                                >
                                  {listItemChild.text}
                                </span>
                              )
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.type === "link" && (
                      <a
                        href={item.url}
                        className="text-blue-500 hover:underline"
                      >
                        {item.children[0].text}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="" id="form">
            <h2 className="  xl:text-[52px] md:text-4xl text-[28px] font-medium md:mb-12 mb-6">
              {t("data.apply")}
            </h2>
            <CareerForm Title={data.MainData.Title} />
          </div>
        </div>
        <div className="relative xl:w-[calc(100%-616px-80px)] lg:w-[calc(50%-50px)] w-full aspect-[616/434]">
          <Image
            alt={
              data.MainData.Image.data.attributes.alternativeText ??
              data.MainData.Title
            }
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.MainData.Image.data.attributes.url}`}
            fill
          />
        </div>
      </div>
    </div>
  );
}
