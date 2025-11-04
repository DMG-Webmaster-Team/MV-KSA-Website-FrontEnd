"use client";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ArrowLong from "../SVGS/ArrowLong";
import BurgerMenu from "../SVGS/BurgerMenu";
import Calender from "../SVGS/Calender";
import Close from "../SVGS/Close";
import Phone from "../SVGS/Phone";
import Search from "../SVGS/Search";
import LangSwitcher from "./LangSwitcher";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import SearchComponent from "./SearchComponent";

export interface MegaMenu {
  Title: string;
  Description: string;
  Link?: string;
  Media: {
    data: {
      attributes: {
        alternativeText: string;
        url: string;
      };
    };
  };
}
export interface Menu {
  Title: string;
  Link?: string;
  Megamenu: MegaMenu[];
}

export default function MainHeader({ data }: { data: Menu[] }) {
  const locale = useLocale();
  const t = useTranslations();
  const Pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  useEffect(() => {
    if (openMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [openMenu]);
 const [show, setShow] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (window.innerWidth < 1024) {
        if (currentScrollY < lastScrollY) {
          // scrolling up
          setShow(true);
        } else {
          // scrolling down
          setShow(false);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const StableHeader =

    Pathname == "/calendly" ||
    Pathname == "/en/calendly" ||
    Pathname == "/en/faqs" ||
    Pathname == "/faqs" ||
    Pathname == "/contact-us" ||
    Pathname == "/en/contact-us" ||
    Pathname == "/careers" ||
    Pathname == "/en/careers" ||
    Pathname.startsWith("/careers/") ||
    Pathname.startsWith("/en/careers/") ||
    Pathname == "/media-center" ||
    Pathname == "/en/media-center" ||
    Pathname.startsWith("/media-center/") ||
    Pathname.startsWith("/en/media-center/") ||
    Pathname == "/search" ||
    Pathname == "/en/search";
  const isUnitPage = /^\/(?:[a-z]{2}\/)?projects\/[^/]+\/units\/[^/]+$/.test(
    Pathname
  );

  return (
    <>
      {!isUnitPage && (
        <>
          <div
            className={`${openMenu ? " bg-darkblue " : ""} ${
            show?"bg-[rgba(12,46,48,0.04)] backdrop-blur-[45px] fixed":  StableHeader ? "relative" : "absolute top-0"
            } transition-all duration-500  w-full z-40 py-2.5 border-b-[2px] border-white border-opacity-20`}
          >
            <div className="max-w-[1448px] px-4 mx-auto flex justify-between items-center">
              <Link
                className=" relative rtl:2xl:w-[268px] rtl:xl:w-[220px] rtl:sm:w-[200px] rtl:w-[153px] ltr:2xl:w-[240px] ltr:w-[200px] aspect-[401/105]"
                href={`${locale == "en" ? "/en" : ""}/`}
              >
                {StableHeader && !openMenu ? (
                  <Image
                    src={`/logoblack.png`}
                    alt="Logo MV KSA"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain"
                  />
                ) : (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/logo_White_7bce5b4307.webp`}
                    alt="Logo MV KSA"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain"
                  />
                )}
              </Link>
              <div className="rtl:2xl:w-[calc(100%-268px-140px)] rtl:xl:w-[calc(100%-220px-100px)] rtl:w-[calc(100%-200px-20px)] ltr:2xl:w-[calc(100%-240px-50px)] ltr:w-[calc(100%-200px-50px)] rtl:2xl:gap-[60px] xl:gap-[50px] gap-8 ltr:2xl:gap-[40px] items-center justify-between lg:flex hidden ">
                <div className="lg:flex hidden xl:gap-[28px] gap-4 rtl:xl:w-[calc(100%-422px-50px)] rtl:w-[calc(100%-359px-50px)] ltr:2xl:w-[calc(100%-485px-50px)] ltr:w-[calc(100%-429px-50px)]">
                  <MenuDesktop data={data} StableHeader={StableHeader} />
                </div>
                <div className={`justify-end flex xl:gap-8 gap-5 items-center rtl:xl:w-[422px] rtl:w-[359px] ltr:2xl:w-[485px] ltr:w-[429px]`}>
                  <div className="lg:block hidden">
                    <LangSwitcher DesktopHeader={StableHeader} />
                  </div>

                  {/* <div
                    className={`${
                      StableHeader
                        ? "border-primary divide-primary"
                        : "border-white divide-white"
                    } lg:flex hidden border  rtl:divide-x-reverse ltr:divide-x divide-x-[1px]  rounded-sm`}
                  >
                    <Link
                      className={`${
                        StableHeader
                          ? " text-primary hover:bg-primary hover:text-white"
                          : "text-white hover:bg-primary"
                      }  xl:p-2.5 p-1.5  transition-all duration-500 content-center`}
                      href={`${locale == "en" ? "/en/" : "/"}calendly`}
                    >
                      <span className=" xl:w-6 xl:h-6 w-5 h-5 block">
                        <Calender />
                      </span>
                    </Link>
                    <Link
                      className={` ${
                        StableHeader
                          ? " text-primary hover:bg-primary hover:text-white"
                          : "text-white hover:bg-primary"
                      } xl:p-2.5 p-1.5  transition-all duration-500 content-center`}
                      href={"tel:"}
                    >
                      <span className=" xl:w-6 xl:h-6 w-5 h-5 block">
                        <Phone />
                      </span>
                    </Link> */}
                    {/* <button
                      className={` ${StableHeader
                        ? " text-primary hover:bg-primary hover:text-white"
                        : "text-white hover:bg-primary"
                        } xl:p-2.5 p-1.5  transition-all duration-500 content-center`}
                    >
                      <span className=" xl:w-6 xl:h-6 w-5 h-5 block">
                        <Search />
                      </span>
                    </button> */}
                    {/* <SearchComponent StableHeader={StableHeader} /> */}
                  {/* </div> */}
                  <Link
                    href={`${locale == "en" ? "/en/" : "/"}contact-us`}
                    className={`${
                      StableHeader
                        ? "bg-primary text-white hover:bg-darkblue"
                        : "bg-white text-primary hover:bg-primary hover:text-white"
                    }  xl:px-4 px-3 xl:py-3 py-2 rtl:xl:text-base text-sm font-bold  lg:flex hidden gap-3 items-center rounded-sm  transition-all duration-500 `}
                  >
                    <span className=" leading-[10px] whitespace-nowrap">
                      {t("Buttons.register_your_interest")}
                    </span>

                    <span className="xl:w-5 xl:h-5 w-4 h-4 ltr:rotate-180">
                      <ArrowLong />
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className={`lg:hidden flex border ${
                  StableHeader && !openMenu
                    ? "border-primary divide-primary"
                    : "border-white divide-white"
                } rtl:divide-x-reverse ltr:divide-x divide-x-[1px] rounded-sm `}
              >
                {/* <button
                  className={`${
                    StableHeader && !openMenu
                      ? " text-primary hover:bg-primary hover:text-white"
                      : "text-white hover:bg-primary"
                  } p-2.5 transition-all duration-500`}
                >
                  <span className=" w-5 h-5 block">
                    <Search />
                  </span>
                </button>
                <Link
                  className={`${
                    StableHeader && !openMenu
                      ? " text-primary hover:bg-primary hover:text-white"
                      : "text-white hover:bg-primary"
                  } p-2.5  transition-all duration-500`}
                  href={`${locale == "en" ? "/en/" : "/"}calendly`}
                >
                  <span className=" w-5 h-5 block">
                    <Calender />
                  </span>
                </Link> */}
                <button
                  onClick={() => {
                    setOpenMenu(!openMenu);
                  }}
                  className={`${
                    StableHeader && !openMenu
                      ? " text-primary hover:bg-primary hover:text-white"
                      : "text-white hover:bg-primary"
                  } p-2.5 transition-all duration-500`}
                >
                  <span className="w-5 h-5 block">
                    {!openMenu ? <BurgerMenu /> : <Close />}
                  </span>
                </button>
              </div>
            </div>
          </div>
     <motion.div
     
      className={`pt-[64px] fixed inset-0 w-full h-[100vh] bg-darkblue z-30 px-4 lg:hidden overflow-y-auto`}
    
            initial={{
              y: -200,
              opacity: 0,
              visibility: openMenu ? "visible" : "hidden",
            }}
            animate={{
              y: openMenu ? 0 : -200,
              opacity: openMenu ? 1 : 0,
              visibility: openMenu ? "visible" : "hidden",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <div className=" py-[46px]">
              <MenuMobile
                data={data}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            </div>
            <div className="flex flex-col gap-[33px]">
              <Link
                href={`${locale == "en" ? "/en/" : "/"}contact-us`}
                className="bg-white xl:px-4 px-3 py-2.5 text-sm font-bold text-primary flex justify-center gap-3 items-center rounded-sm hover:bg-primary hover:text-white transition-all duration-500 "
                onClick={() => {
              setOpenMenu(!openMenu);
            }}>
                <span className=" leading-[10px] whitespace-nowrap">
                  {t("Buttons.register_your_interest")}
                </span>
                <span className="xl:w-5 xl:h-5 w-4 h-4 ltr:rotate-180">
                  <ArrowLong />
                </span>
              </Link>
              <LangSwitcher />
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
