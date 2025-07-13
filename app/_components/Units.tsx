import React from "react";
import SlickMultipleItems from "./SlickMultipleItems";
import Image from "next/image";

interface SingleList {
  Text: string;
  Icon: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}

interface SingleUnitProps {
  attributes: {
    Title: string;
    slug: string;
    Model: string;
    amenities: {
      List: SingleList[];
    };
    Hero_Media: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
  };
}

export interface UnitsProps {
  Title: string;
  Description: string;
  units: {
    data: SingleUnitProps[];
  };
}

export default function Units({ data }: { data: UnitsProps }) {
  console.log(data.units);
  return (
    <div className="bg-gray py-[60px]">
      <div className="max-w-[1448px] px-4 mx-auto space-y-3 ">
        <h2 className=" text-[60px] leading-[75px] text-primary font-medium">
          {data.Title}
        </h2>
        <p className=" text-primary opacity-50 font-medium text-xl">
          {data.Description}
        </p>
      </div>
      <SlickMultipleItems>
        {data.units.data.map((item: SingleUnitProps, index: number) => (
          <div
            key={index}
            className="md:w-[600px] flex-mobile p-3 bg-white rounded-sm space-y-3"
          >
            <div className="w-full h-[300px] relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.attributes.Hero_Media.data.attributes.url}`}
                alt={
                  item.attributes.Hero_Media.data.attributes.alternativeText ??
                  "Widget image"
                }
                fill
              />
              <span className="bg-white text-[#1C1B1C] text-opacity-50 text-sm font-medium px-1.5 py-[3px]  relative rounded-sm top-3 start-3">
                {item.attributes.Model}
              </span>
            </div>
            <div className="space-y-4">
              <h3 className=" text-primary text-4xl font-medium pb-5">
                {item.attributes.Title}
              </h3>
              <ul className="flex flex-wrap pe-[60px] gap-y-2">
                {item.attributes.amenities.List.map(
                  (itemList: SingleList, index: number) => (
                    <li key={index} className="w-1/2 flex items-center gap-3">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${itemList.Icon.data.attributes.url}`}
                        alt={
                          itemList.Icon.data.attributes.alternativeText ??
                          "Icon"
                        }
                        width={24}
                        height={24}
                      />
                      <span className=" text-primary text-sm font-medium">
                        {itemList.Text}
                      </span>
                    </li>
                  )
                )}
              </ul>
              <div>
                
              </div>
            </div>
          </div>
        ))}
      </SlickMultipleItems>
    </div>
  );
}
