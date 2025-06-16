import Image from 'next/image'
import React from 'react'


export interface HeroSectionProps {
    Title: string,
    ShortDescription?: string,
    Media: {
        data: {
            attributes: {
                url: string,
                alternativeText: string,
            }
        }
    },
    Logo?: {
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
        <section className='w-full md:h-[90vh] h-[70vh] relative herosection' style={{ boxShadow: "0px 1000px 4px 0px #00000033 inset" }}>
            <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Media.data.attributes.url}`}
                alt={data.Media.data.attributes.alternativeText ?? "Image"}
                fill
                priority
                className=' object-cover'
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className='absolute w-fit h-fit m-auto inset-0 z-20 text-center'>
                {data.Logo &&
                    <div className=' relative w-[305px] h-[140px] mb-20 mx-auto'>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Logo.data.attributes.url}`}
                            alt={data.Media.data.attributes.alternativeText ??  "Image"}
                            fill
                            className=' object-contain'
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                }
                <h1 className='  text-white  lg:text-[100px] lg:leading-[100px] md:text-6xl text-4xl font-medium'>{data.Title}</h1>
                <p className=' text-white opacity-70 lg:text-[60px] md:text-4xl text-base font-medium'>{data.ShortDescription}</p>
            </div>

        </section>
    )
}
