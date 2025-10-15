"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MegaMenu, Menu } from "./MainHeader";

export default function MenuDesktop({
  data,
  StableHeader,
}: {
  data: Menu[];
  StableHeader: boolean;
}) {
  const Pathname = usePathname();
  return (
    <>
      {data.map((item: Menu, index: number) =>
        item.Link ? (
          <Link
            className={`${
              Pathname === item.Link
                ? " before:opacity-100 pointer-events-none"
                : " before:opacity-0"
            } relative rtl:2xl:text-base rtl:lg:text-xs rtl:text-xs ltr:xl:text-sm ltr:2xl:text-base font-bold ${
              StableHeader
                ? "text-primary before:bg-primary"
                : "text-white before:bg-white"
            } whitespace-nowrap hover:text-opacity-60 duration-500 transition-all before:content-normal before:w-full before:h-[2px]  before:absolute before:inset-x-0 rtl:2xl:before:bottom-[-35px] rtl:xl:before:bottom-[-31px] rtl:before:bottom-[-28px] ltr:2xl:before:bottom-[-32px] ltr:xl:before:bottom-[-28px] ltr:before:bottom-[-26px]`}
            key={index}
            href={`${item.Link}`}
          >
            {item.Title}
          </Link>
        ) : (
          <div key={index} className="group relative">
            <p
              className={`relative rtl:2xl:text-base rtl:lg:text-xs rtl:text-xs ltr:xl:text-sm ltr:2xl:text-base font-bold cursor-pointer whitespace-nowrap ${
                StableHeader
                  ? "text-primary before:bg-primary"
                  : "text-white before:bg-white"
              }`}
            >
              {item.Title}
            </p>
            <div
              className="invisible absolute top-12 flex w-[370px] flex-col gap-1 rounded-lg bg-white p-2 opacity-0 transition-all duration-500 group-hover:visible group-hover:opacity-100"
              style={{ boxShadow: "0px 4px 12px 0px #0000001A" }}
            >
              {item.Megamenu.map((item: MegaMenu, ind: number) => (
                <div
                  key={ind}
                  className={`p-3 flex items-center justify-between rounded-lg hover:bg-gray transition-all duration-500 relative ${
                    item.Link ? "" : " pointer-events-none"
                  }`}
                >
                  {item.Link && (
                    <a
                      href={item.Link}
                      target={
                        item.Link ===
                        "https://mountainviewegypt.com/communities"
                          ? "_blank"
                          : "_self"
                      }
                      rel={
                        item.Link ===
                        "https://mountainviewegypt.com/communities"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="absolute inset-0 z-10 h-full w-full"
                    />
                  )}

                  <div className="h-[90px] w-[90px] overflow-hidden rounded-md">
                    {item.Media?.data?.attributes?.url && (
                      <video
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Media.data.attributes.url}`}
                        muted
                        autoPlay
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="w-[calc(100%-90px-12px)] space-y-1 text-xl font-medium text-primary">
                    <h4 className="">{item.Title}</h4>
                    <p className="opacity-70">{item.Description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
}
