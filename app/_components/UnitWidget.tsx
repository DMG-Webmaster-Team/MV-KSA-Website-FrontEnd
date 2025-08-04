import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ArrowLong from './SVGS/ArrowLong';
import { SingleList, SingleUnitProps } from '../types/UnitWidget';

export default function UnitWidget({ data, ProjectSlug }: { data: SingleUnitProps, ProjectSlug: string }) {
    const t = useTranslations();
    const locale = useLocale();
    return (
        <div
            className="md:w-[600px]  w-full p-3 bg-white rounded-sm space-y-3"
        >
            <div className="w-full h-[300px] relative">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.attributes.Hero_Media.data.attributes.url}`}
                    alt={
                        data.attributes.Hero_Media.data.attributes.alternativeText ??
                        "Widget image"
                    }
                    fill
                    className=' object-cover'
                />
                <span className="bg-white text-[#1C1B1C] text-opacity-50 text-sm font-medium px-1.5 py-[3px]  relative rounded-sm top-3 start-3">
                    {data.attributes.Model}
                </span>
            </div>
            <div className="flex flex-col gap-4 justify-between h-[calc(100%-300px-12px)]">
                <h3 className=" text-primary md:text-4xl text-2xl font-medium pb-5">
                    {data.attributes.Title}
                </h3>
                {data.attributes?.amenities?.List.length > 0 &&
                    <ul className="flex flex-wrap pe-[60px] gap-y-2">
                        {data?.attributes?.amenities?.List.map(
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
                }

                <div className='flex gap-2 !mb-3 md:flex-row flex-col-reverse'>
                    <Link
                        className='bg-Gray05 hover:bg-[#DDDDDD] text-primary transition-all duration-500 md:w-[calc(50%-4px)] w-full flex justify-between items-center py-2 px-4 font-bold text-sm'
                        href={`${locale == "en" ? "/en/" : "/"}projects/${ProjectSlug}/units/${data.attributes.slug}`}>
                        {t("data.discover_more")}
                        <span className='w-4 h-4 ltr:rotate-180'><ArrowLong /></span>
                    </Link>
                    <Link href={`${locale == "en" ? "/en/" : "/"} contact-us`}
                        className='bg-primary hover:bg-darkblue transition-all duration-500 text-white md:w-[calc(50%-4px)] w-full flex justify-between items-center py-2 px-4 font-bold text-sm'
                    >
                        {t("Buttons.register_your_interest")}
                        <span className='w-4 h-4 ltr:rotate-180'><ArrowLong /></span>

                    </Link>
                </div>
            </div>
        </div>
    )
}
