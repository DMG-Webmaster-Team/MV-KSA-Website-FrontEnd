"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MegaMenu, Menu } from "./MainHeader";
import Arrow from "../SVGS/Arrow";
import { useState } from "react";
import { motion } from "framer-motion";

export default function MenuMobile({
  data,
  openMenu,
  setOpenMenu,
}: {
  data: Menu[];
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [openSingleMenu, setOpenSingleMenu] = useState(false);
  const Pathname = usePathname();
  return (
    <>
      {data.map((item: Menu, index: number) =>
        item.Link ? (
          <Link
            href={`${item.Link}`}
            key={index}
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
            className={` ${
              Pathname === item.Link && !openSingleMenu
                ? ""
                : "  text-white"
            } text-white justify-between flex items-center text-[22px] font-medium py-4 border-b border-white border-opacity-10`}
          >
            <span className="flex gap-3 items-center">
              {/* <span
                className={`${
                  Pathname === item.Link && !openSingleMenu
                    ? "block"
                    : " hidden"
                } w-3 h-3 bg-yellow rounded-full`}
              /> */}
              {item.Title}
            </span>

            <span className="w-5 h-5 rtl:rotate-90 ltr:-rotate-90">
              <Arrow />
            </span>
          </Link>
        ) : (
          <div
            key={index}
            className="border-b border-white border-opacity-10 py-4"
          >
            <p
              onClick={() => {
                setOpenSingleMenu(!openSingleMenu);
              }}
              className={` ${
                openSingleMenu ? "text-yellow" : "  text-white"
              } justify-between flex items-center text-[22px] font-medium  `}
            >
              <span className="flex gap-3 items-center">
                <span
                  className={`${
                    openSingleMenu ? "block" : " hidden"
                  } w-3 h-3 bg-yellow rounded-full`}
                />
                {item.Title}
              </span>
              <span
                className={`${
                  openSingleMenu ? "rotate-0" : "rtl:rotate-90 ltr:-rotate-90"
                } w-5 h-5 `}
              >
                <Arrow />
              </span>
            </p>
            <motion.div
              className={`overflow-hidden`}
              initial={false}
              animate={openSingleMenu ? { height: "auto" } : { height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className=" space-y-2 pt-2 px-3">
                {item.Megamenu.map((subItem: MegaMenu, index: number) => (
                  <Link
                    onClick={() => {
                      setOpenMenu(!openMenu);
                    }}
                    href={subItem.Link ?? ""}
                    className={`${
                      subItem.Link ? "" : " pointer-events-none"
                    } text-white text-lg font-medium flex justify-between items-center`}
                    key={index}
                  >
                    {subItem.Title}
                    <span className="w-3 h-3 rtl:rotate-90 ltr:-rotate-90">
                      <Arrow />
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )
      )}
    </>
  );
}
