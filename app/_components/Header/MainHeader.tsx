'use client'
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Arrow from "../SVGS/Arrow";
import ArrowLong from "../SVGS/ArrowLong";
import BurgerMenu from "../SVGS/BurgerMenu";
import Calender from "../SVGS/Calender";
import Close from "../SVGS/Close";
import Phone from "../SVGS/Phone";
import Search from "../SVGS/Search";
import LangSwitcher from "./LangSwitcher";

export default function MainHeader() {
    const locale = useLocale()
    const t = useTranslations();
    const Pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false)
    const Menu = [
        {
            name: t("Menu.home"),
            link: `${locale == "en" ? "/en" : ""}/`
        },
        {
            name: t("Menu.our_story"),
            link: `${locale == "en" ? "/en" : ""}/our-story`
        },
        {
            name: t("Menu.our_com"),
            link: `${locale == "en" ? "/en" : ""}/our-communities`
        },
        {
            name: t("Menu.vision"),
            link: `${locale == "en" ? "/en" : ""}/vision-2030`
        },
        {
            name: t("Menu.lifeAtMV"),
            link: `${locale == "en" ? "/en" : ""}/life-at-mv`
        },
    ]

    useEffect(() => {

        if (openMenu) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [openMenu]);

    const StableHeader = Pathname == "/calendly" || Pathname == "/en/calendly";

    return (
        <>
            <div className={`${openMenu ? " bg-darkblue" : ""} ${StableHeader ? "" : "absolute top-0"} transition-all duration-500  w-full z-40 py-2.5 border-b-[2px] border-white border-opacity-20`}>
                <div className="max-w-[1448px] px-4 mx-auto flex justify-between items-center">
                    <Link className=" relative rtl:2xl:w-[268px] rtl:xl:w-[220px] rtl:sm:w-[200px] rtl:w-[153px] ltr:w-[240px] aspect-[401/105]" href={`${locale == "en" ? "/en" : ""}/`}>
                        <Image
                            src={'/logowhite.webp'}
                            alt="Logo MV KSA"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </Link>
                    <div className="rtl:2xl:w-[calc(100%-268px-140px)] rtl:xl:w-[calc(100%-220px-100px)] rtl:w-[calc(100%-200px-20px)] ltr:w-[calc(100%-240px-50px)] rtl:2xl:gap-[60px] xl:gap-[50px] gap-8 ltr:2xl:gap-[40px] items-center justify-between lg:flex hidden ">
                        <div className="lg:flex hidden xl:gap-[28px] gap-4 rtl:xl:w-[calc(100%-422px-50px)] rtl:w-[calc(100%-359px-50px)] ltr:2xl:w-[calc(100%-485px-50px)] ltr:w-[calc(100%-429px-50px)]">
                            {Menu.map((item: { name: string, link: string }, index: number) => (
                                <Link
                                    className={`${Pathname === item.link ? " before:opacity-100 pointer-events-none" : " before:opacity-0"} relative rtl:2xl:text-base rtl:xl:text-sm rtl:text-xs ltr:text-sm font-bold ${StableHeader ? "text-primary before:bg-primary" : "text-white before:bg-white"}  hover:text-opacity-60 duration-500 transition-all before:content-normal before:w-full before:h-[2px]  before:absolute before:inset-x-0 rtl:2xl:before:bottom-[-35px] rtl:xl:before:bottom-[-31px] rtl:before:bottom-[-28px] before:bottom-[-34px]`}
                                    key={index}
                                    href={`${item.link}`}>
                                    {item.name}
                                </Link>
                            ))}

                        </div>
                        <div className="flex xl:gap-8 gap-5 items-center rtl:xl:w-[422px] rtl:w-[359px] ltr:2xl:w-[485px] ltr:w-[429px] justify-between">
                            <div className="lg:block hidden">
                                <LangSwitcher />
                            </div>

                            <div className={`${StableHeader ? "border-primary divide-primary" : "border-white divide-white"} lg:flex hidden border  rtl:divide-x-reverse ltr:divide-x divide-x-[1px]  rounded-sm`}>
                                <Link
                                    className={`${StableHeader ? " text-primary hover:bg-primary hover:text-white" : "text-white hover:bg-primary"}  xl:p-2.5 p-1.5  transition-all duration-500 content-center`}
                                    href={'/calendly'}>
                                    <span className=" xl:w-6 xl:h-6 w-5 h-5 block">
                                        <Calender />
                                    </span>
                                </Link>
                                <Link
                                    className={` ${StableHeader ? " text-primary hover:bg-primary hover:text-white" : "text-white hover:bg-primary"} xl:p-2.5 p-1.5  transition-all duration-500 content-center`}
                                    href={'tel:'}>
                                    <span className=" xl:w-6 xl:h-6 w-5 h-5 block">
                                        <Phone />
                                    </span>
                                </Link>
                                <button
                                    className={` ${StableHeader ? " text-primary hover:bg-primary hover:text-white" : "text-white hover:bg-primary"} xl:p-2.5 p-1.5  transition-all duration-500 content-center`}
                                >
                                    <span className=" xl:w-6 xl:h-6 w-5 h-5 block">
                                        <Search />
                                    </span>
                                </button>
                            </div>
                            <Link href={'/contact-us'}
                                className={`${StableHeader ? "bg-primary text-white hover:bg-darkblue" : "bg-white text-primary hover:bg-primary hover:text-white"}  xl:px-4 px-3 xl:py-3 py-2 rtl:xl:text-base text-sm font-bold  lg:flex hidden gap-3 items-center rounded-sm  transition-all duration-500 `}
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
                    <div className="lg:hidden flex border border-white rtl:divide-x-reverse ltr:divide-x divide-x-[1px] divide-white rounded-sm ">
                        <button
                            className=" text-white p-2.5 hover:bg-primary transition-all duration-500"
                        >
                            <span className=" w-5 h-5 block">
                                <Search />
                            </span>
                        </button>
                        <Link
                            className=" text-white p-2.5 hover:bg-primary transition-all duration-500"
                            href={'/calendly'}>
                            <span className=" w-5 h-5 block">
                                <Calender />
                            </span>
                        </Link>
                        <button
                            onClick={() => { setOpenMenu(!openMenu) }}
                            className="text-white p-2.5 transition-all duration-500">
                            <span className="w-5 h-5 block">
                                {
                                    !openMenu ?
                                        <BurgerMenu /> :
                                        <Close />
                                }

                            </span>
                        </button>
                    </div>

                </div>

            </div>
            <motion.div
                className=" pt-[64px] fixed inset-0 w-full h-[100vh] bg-darkblue z-30 px-4 lg:hidden block"
                initial={{
                    y: -200,
                    opacity: 0,
                    visibility: openMenu ? "visible" : "hidden"
                }}
                animate={{
                    y: openMenu ? 0 : -200,
                    opacity: openMenu ? 1 : 0,
                    visibility: openMenu ? "visible" : "hidden"
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                }}
            >
                <div className=" py-[46px]">
                    {Menu.map((item: { name: string, link: string }, index: number) => (
                        <Link
                            href={`${item.link}`}
                            key={index}
                            onClick={() => { setOpenMenu(!openMenu) }}
                            className={` ${Pathname === item.link ? "text-yellow" : "  text-white"} justify-between flex items-center text-[22px] font-medium py-4 border-b border-white border-opacity-10`}
                        >
                            <span className="flex gap-3 items-center">
                                <span className={`${Pathname === item.link ? "block" : " hidden"} w-3 h-3 bg-yellow rounded-full`} />
                                {item.name}
                            </span>


                            <span className="w-5 h-5 rtl:rotate-90 ltr:-rotate-90">
                                <Arrow />
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col gap-[33px]">
                    <Link href={'/contact-us'}
                        className="bg-white xl:px-4 px-3 py-2.5 text-sm font-bold text-primary flex justify-center gap-3 items-center rounded-sm hover:bg-primary hover:text-white transition-all duration-500 "
                    >
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

    )
}
