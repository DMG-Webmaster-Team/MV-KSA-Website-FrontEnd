import React from 'react'
import Circle from '../SVGS/Circle'
import Image from 'next/image'
export interface SingleCompoundProps {
    Years: string,
    Title: string,
    WidgetDetails: string,
    PopupDetails: string,
    Image: {
        data: {
            attributes: {
                url: string,
                alternativeText: string
            }
        }
    }
}
interface SingleCompoundDetailsProps {
    item: SingleCompoundProps,
    index: number,
    lastone?: boolean
}

export default function CompoundComponent({ item, index, lastone }: SingleCompoundDetailsProps) {
    return (
        <div key={index} className={`w-[calc(50%+39px)] flex ${index % 2 == 0 ? "flex-row-reverse" : "ms-auto"}`}>
            <div className='w-[80px] flex flex-col items-center'>
                <span className=' w-10 h-10 block mx-auto'>
                    <Circle />
                </span>
                {!lastone &&
                    <span className='w-[2px] h-[calc(100%-40px)] mx-auto bg-primary bg-opacity-30' />
                }

            </div>
            <div className='w-[calc(100%-80px)]'>
                <div className='w-full h-[300px] relative'>
                    <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Image.data.attributes.url}`}
                        alt={item.Image.data.attributes.alternativeText ?? item.Title}
                        fill
                    />
                </div>
                <div className=' flex flex-col gap-1 mt-6'>
                    <span className=' text-xl text-primary text-opacity-50'>{item.Years}</span>
                    <h3 className=' text-2xl font-medium text-primary'>{item.Title}</h3>
                    <p
                        className="text-sm font-medium text-primary"
                        dangerouslySetInnerHTML={{
                            __html: item.WidgetDetails.replace(/\n/g, '</br>')
                        }}
                    ></p>
                </div>

            </div>

        </div>
    )
}
