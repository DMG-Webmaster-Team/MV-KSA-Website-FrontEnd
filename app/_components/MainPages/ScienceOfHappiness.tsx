'use client'
import { useState } from 'react'
import HeroSection, { HeroSectionProps } from '../CommonComp/HeroSection'
import { OverviewSectionProps } from '../CommonComp/OverviewSection'
import SingleAccordion from '../CommonComp/SingleAccordion'
import { Repeater } from '../CommonComp/TextComp'
import Image from 'next/image'




interface Props {
    data: {
        HeroSection: HeroSectionProps,
        OverviewSection: OverviewSectionProps,
        TextSection: Repeater,
        Strategies: {
            Title: string,
            Image: {
                data: {
                    attributes: {
                        url: string,
                        alternativeText: string,
                    }
                }
            },
            Repeater: Repeater[]
        }

    }
}
export default function ScienceOfHappinessPage({ data }: Props) {
    const [openfaq, setOpenfaq] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setOpenfaq(index === openfaq ? null : index);
    };
    return (
        <>
            <HeroSection data={data.HeroSection} />
            <div className=' bg-gray flex'>
                <div className='w-[50%] relative'>
                    <div className='max-w-[750px] relative aspect-[1512/1524] ms-auto'>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Strategies.Image.data.attributes.url}`}
                            alt={`${data.Strategies.Image.data.attributes.alternativeText ?? ""}`}
                            fill
                            className='object-contain'
                        />
                    </div>

                </div>
                <div className='w-[50%]  p-[120px]'>
                    <div className='w-[516px] flex flex-col gap-5'>
                        <h2 className=' text-4xl text-primary font-medium'>{data.Strategies.Title}</h2>
                        <div>
                            {data.Strategies.Repeater.map((item: Repeater, index: number) => (
                                <SingleAccordion item={item} key={index} handleClick={handleClick} openfaq={openfaq} index={index} />
                            ))}
                        </div>

                    </div>
                </div>

            </div>
            <div className='max-w-[1448px] mx-auto px-4 py-20'>
                <h2 className=' text-primary text-4xl font-medium text-center'>{data.TextSection.Title}</h2>
                <p className=' text-center text-4xl mt-6 text-primary text-opacity-50'>{data.TextSection.Description}</p>
            </div>

        </>
    )
}
