import React from "react";
import { useLocale } from "next-intl";
import { CareerWidget } from "../_types/Common";
import ArrowLong from "../SVGS/ArrowLong";

export default function CareerWidgetComp({
  item,
  end,
}: {
  item: CareerWidget;
  end?: boolean;
}) {
  const locale = useLocale();
  return (
    <div
      className={`${
        end ? "" : "border-b border-gray "
      }  relative hover:bg-gray transition-all duration-500`}
    >
      <a
        href={`${locale == "en" ? "/en/" : "/"}careers/${item.attributes.slug}`}
        className=" absolute w-full h-full inset-0"
      />
      <div className=" max-w-[1448px] mx-auto md:grid md:grid-cols-4 flex items-center md:py-11 py-[18px] px-4">
        <div>
          <h3 className=" md:text-2xl text-[22px] text-primary w-fit">
            {item.attributes.Title}
          </h3>
          <div className="md:hidden flex gap-2 md:mt-0 mt-[6px]">
            <h4 className="text-sm text-DarkGray w-fit">
              {item.attributes.department.data.attributes.Name}
            </h4>
            <p className="text-sm text-DarkGray w-fit flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-DarkGray" /> {item.attributes.role_type.data.attributes.Name}
            </p>
          </div>
        </div>

        <h4 className=" text-xl text-DarkGray w-fit md:block hidden">
          {item.attributes.department.data.attributes.Name}
        </h4>
        <p className=" text-xl text-DarkGray w-fit md:block hidden">
          {item.attributes.role_type.data.attributes.Name}
        </p>
        <span
          className={`md:w-9 md:h-9 w-6 h-6 ms-auto text-primary block ${
            locale == "en" ? " rotate-180" : ""
          }`}
        >
          <ArrowLong />
        </span>
      </div>
    </div>
  );
}
