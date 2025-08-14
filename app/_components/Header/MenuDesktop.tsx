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
            }  hover:text-opacity-60 duration-500 transition-all before:content-normal before:w-full before:h-[2px]  before:absolute before:inset-x-0 rtl:2xl:before:bottom-[-35px] rtl:xl:before:bottom-[-31px] rtl:before:bottom-[-28px] before:bottom-[-34px]`}
            key={index}
            href={`${item.Link}`}
          >
            {item.Title}
          </Link>
        ) : (
          <div key={index} className="relative group ">
            <p
              className={`relative rtl:2xl:text-base rtl:lg:text-xs rtl:text-xs ltr:xl:text-sm ltr:2xl:text-base font-bold cursor-pointer ${
                StableHeader
                  ? "text-primary before:bg-primary"
                  : "text-white before:bg-white"
              }`}
            >
              {item.Title}
            </p>
            <div
              className=" absolute w-[370px] p-2 bg-white rounded-lg top-12 flex flex-col gap-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500"
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
                      href={item.Link} target="_blank"
                      className=" absolute inset-0 w-full h-full z-10"
                    />
                  )}

                  <div className="w-[90px] h-[90px] rounded-md overflow-hidden">
                    {item.Media?.data?.attributes?.url && (
                      <video
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Media.data.attributes.url}`}
                        muted
                        autoPlay
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="w-[calc(100%-90px-12px)] space-y-1 text-primary text-xl font-medium">
                    <h4 className="">{item.Title}</h4>
                    <p className=" opacity-70">{item.Description}</p>
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
