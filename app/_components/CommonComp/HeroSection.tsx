import Image from 'next/image'
import React from 'react'


export interface HeroSectionProps {
    Title: string,
    Media: {
        data: {
            attributes: {
                url: string,
                alternativeText: string,
            }
        }
    }
}

export default function HeroSection({ data }: { data: HeroSectionProps }) {
    return (
        <section className='w-full h-[90vh] relative herosection' style={{boxShadow:"0px 1000px 4px 0px #00000033 inset"}}>
            <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Media.data.attributes.url}`}
                alt={data.Media.data.attributes.alternativeText ?? ""}
                fill
                priority
                className=' object-cover'
            />
            <h1 className=' absolute w-fit h-fit m-auto text-white z-20 inset-0 text-[100px] font-medium'>{data.Title}</h1>
        </section>
    )
}
