'use client'
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainHeader() {
    const locale = useLocale()
    const t = useTranslations();
    const Pathname = usePathname();
    console.log(Pathname);
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
                <Link className=" relative w-[268px] aspect-[401/105]" href={`${locale == "en" ? "/en" : ""}/`}>
                    <Image
                        src={'/logowhite.webp'}
                        alt="Logo MV KSA"
                        fill
                    />
                </Link>
                <div className="w-[calc(100%-268px-200px)] ">
                    <div className="flex gap-[28px]">
                        {Menu.map((item: { name: string, link: string }, index: number) => (
                            <Link
                                className={`${Pathname === item.link ? " before:opacity-100 pointer-events-none" : " before:opacity-0"} relative text-base font-bold text-white hover:text-opacity-60 duration-500 transition-all before:content-normal before:w-full before:h-[2px] before:bg-white before:absolute before:inset-x-0 before:bottom-[-35px]`}
                                key={index}
                                href={`${item.link}`}>
                                {item.name}
                            </Link>
                        ))}

                    </div>
                </div>


            </div>

        </div>
    )
}
