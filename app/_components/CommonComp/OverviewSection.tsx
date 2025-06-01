import React from 'react'

export interface OverviewSectionProps {
    Label: string,
    Title: string,
    Description: string
}

export default function OverviewSection({ data }: { data: OverviewSectionProps }) {
    return (
        <section className=' py-20 max-w-[1448px] mx-auto flex flex-col gap-6 justify-center'>
            {data.Label && <span className=' text-center text-2xl text-opacity-50 text-primary'>{data.Label}</span>}
            <h2 className='text-center text-primary text-[52px] leading-[65px]'>{data.Title}</h2>
            {data.Description && <p>{data.Description}</p>}
        </section>
    )
}
