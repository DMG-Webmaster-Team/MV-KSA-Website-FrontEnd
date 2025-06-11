'use client'
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ArrowLong from "../SVGS/ArrowLong";
import Calender from "../SVGS/Calender";
import Phone from "../SVGS/Phone";
import Search from "../SVGS/Search";
import LangSwitcher from "./LangSwitcher";
import BurgerMenu from "../SVGS/BurgerMenu";

export default function MainHeader() {
    const locale = useLocale()
    const t = useTranslations();
    const Pathname = usePathname();
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
    return (
        <div className=' fixed w-full z-20 py-2.5 border-b-[2px] border-white border-opacity-20'>
            <div className="max-w-[1448px] px-4 mx-auto flex justify-between items-center">
                <Link className=" relative rtl:2xl:w-[268px] rtl:xl:w-[220px] rtl:w-[200px] ltr:w-[240px] aspect-[401/105]" href={`${locale == "en" ? "/en" : ""}/`}>
                    <Image
                        src={'/logowhite.webp'}
                        alt="Logo MV KSA"
                        fill
                    />
                </Link>
                <div className="rtl:2xl:w-[calc(100%-268px-140px)] rtl:xl:w-[calc(100%-220px-100px)] rtl:w-[calc(100%-200px-20px)] ltr:w-[calc(100%-240px-50px)] flex rtl:2xl:gap-[60px] xl:gap-[50px] gap-8 ltr:2xl:gap-[40px] items-center justify-between ">
                    <div className="lg:flex hidden xl:gap-[28px] gap-4 rtl:xl:w-[calc(100%-422px-50px)] rtl:w-[calc(100%-359px-50px)] ltr:2xl:w-[calc(100%-485px-50px)] ltr:w-[calc(100%-429px-50px)]">
                        {Menu.map((item: { name: string, link: string }, index: number) => (
                            <Link
                                className={`${Pathname === item.link ? " before:opacity-100 pointer-events-none" : " before:opacity-0"} relative rtl:2xl:text-base rtl:xl:text-sm rtl:text-xs ltr:text-sm font-bold text-white hover:text-opacity-60 duration-500 transition-all before:content-normal before:w-full before:h-[2px] before:bg-white before:absolute before:inset-x-0 rtl:2xl:before:bottom-[-35px] rtl:xl:before:bottom-[-31px] rtl:before:bottom-[-28px] before:bottom-[-34px]`}
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

                        <div className="lg:flex hidden border border-white rtl:divide-x-reverse ltr:divide-x divide-x-[1px] divide-white rounded-sm">
                            <Link
                                className=" text-white rlt:xl:p-2.5 p-1.5 hover:bg-primary transition-all duration-500"
                                href={'/calendly'}>
                                <span className=" rlt:xl:w-6 rtl:xl:h-6 w-5 h-5 block">
                                    <Calender />
                                </span>
                            </Link>
                            <Link
                                className=" text-white rtl:xl:p-2.5 p-1.5 hover:bg-primary transition-all duration-500"
                                href={'tel:'}>
                                <span className=" rlt:xl:w-6 rtl:xl:h-6 w-5 h-5 block">
                                    <Phone />
                                </span>
                            </Link>
                            <button
                                className=" text-white rtl:xl:p-2.5 p-1.5 hover:bg-primary transition-all duration-500"
                            >
                                <span className=" rlt:xl:w-6 rtl:xl:h-6 w-5 h-5 block">
                                    <Search />
                                </span>
                            </button>
                        </div>
                        <Link href={'/contact-us'}
                            className="bg-white xl:px-4 px-3 xl:py-3 py-2 rtl:xl:text-base text-sm font-bold text-primary lg:flex hidden gap-3 items-center rounded-sm hover:bg-primary hover:text-white transition-all duration-500 "
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
                <div className="lg:hidden flex border border-white rtl:divide-x-reverse ltr:divide-x divide-x-[1px] divide-white rounded-sm">
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
                    <div className="text-white p-2.5 hover:bg-primary transition-all duration-500">
                        <span className="w-5 h-5 block">
                            <BurgerMenu />
                        </span>
                    </div>
                </div>

            </div>

        </div>
    )
}
