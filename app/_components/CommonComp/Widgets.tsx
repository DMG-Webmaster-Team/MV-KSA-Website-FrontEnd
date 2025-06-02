"use client"
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Arrow from '../SVGS/Arrow'
import { motion } from 'framer-motion';


export interface WidgetProps {
    Title: string,
    Description: string,
    Image: {
        data: {
            attributes: {
                url: string,
                alternativeText: string
            }
        }
    }
}
export default function Widgets({ data, reverse }: {
    data: WidgetProps, reverse: boolean
}) {
    const [expanded, setExpanded] = useState(false);
    const t = useTranslations()
    const contentRef = useRef<HTMLParagraphElement>(null);
    const [height, setHeight] = useState(0);
  
    useEffect(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    }, [data.Description, expanded]);
  
    console.log(data.Image.data.attributes.url)
    return (
        <div className={`max-w-[1660px] mx-auto flex bg-gray ${reverse ? " flex-row-reverse" : "flex-row"} `}>
            <div className='w-[50%] p-[100px] content-center'>
                <div className='max-w-[516px] flex flex-col gap-3'>
                    <h2 className=' text-primary text-6xl font-medium leading-[75px]'>{data.Title}</h2>
                    <motion.div
                        initial={false}
                        animate={{ height: expanded ? height : 110 }} // 110px ≈ 6.9rem fixed collapsed height
                        style={{ overflow: 'hidden' }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p
                                  ref={contentRef}

                        className={`text-xl text-primary text-opacity-50 ${!expanded ? 'line-clamp-4' : ''}`}>
                            {data.Description}
                        </p>
                    </motion.div>
                    {data.Description?.split(' ').length > 20 && (
                        <button
                            className=" text-primary flex items-center mt-3 gap-1 text-base font-bold py-1 border-b border-primary border-opacity-20 w-fit"
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? t("data.see_less") : t("data.see_more")}
                            <span className={`w-4 h-4 ${expanded ? " rotate-180" : ""}`}>
                                <Arrow />
                            </span>

                        </button>
                    )}
                </div>

            </div>
            <div className='w-[50%] relative aspect-[800/1064]'>
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Image.data.attributes.url}`}
                    alt={data.Image.data.attributes.alternativeText ?? ""}
                    fill
                    className=' object-cover'
                />
            </div>
        </div>
    )
}
