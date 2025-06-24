// BreadCrumbs.tsx
import Link from "next/link";
import React from "react";
import Arrow from "../SVGS/Arrow";
import { useLocale } from "next-intl";

interface BreadCrumbItem {
  Name: string;
  Link?: string;
}

interface BreadCrumbsProps {
  ListProps: BreadCrumbItem[];
}

export default function BreadCrumbs({ ListProps }: BreadCrumbsProps) {
  const locale = useLocale();
  return (
    <div className="flex gap-[6px] items-center">
      {ListProps.map((item, index) => (
        <p
          key={index}
          className="flex items-center gap-2  text-primary md:text-base text-sm "
        >
          {item.Link ? (
            <Link
              className="leading-[22px] hover:underline transition-all duration-500"
              href={item.Link}
            >
              {item.Name}
            </Link>
          ) : (
            <span className=" opacity-50 leading-[22px]">{item.Name}</span>
          )}

          {index < ListProps.length - 1 && (
            <span
              className={`md:w-4 md:h-4 w-2 h-2 ${
                locale == "ar" ? " rotate-90" : " -rotate-90"
              }`}
            >
              <Arrow />
            </span>
          )}
        </p>
      ))}
    </div>
  );
}
