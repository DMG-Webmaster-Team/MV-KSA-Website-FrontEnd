import React from 'react'

export interface UnitsProps {
    Title: string,
    Description: string
}

export default function Units({ data }: { data: UnitsProps }) {
    return (
        <div className='bg-gray py-[60px]'>
            <div className='max-w-[1448px] px-4 mx-auto space-y-3 '>
                <h2 className=' text-[60px] leading-[75px] text-primary font-medium'>{data.Title}</h2>
                <p className=' text-primary opacity-50 font-medium text-xl'>{data.Description}</p>

            </div>

        </div>
    )
}
