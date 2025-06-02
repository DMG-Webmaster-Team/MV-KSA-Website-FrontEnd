import React from 'react'

export interface OverviewSectionProps {
    Label: string,
    Title: string,
    Description: string
}

export default function OverviewSection({ data, FullWidth }: { data: OverviewSectionProps, FullWidth?: boolean }) {
    return (
        <section className={`${FullWidth ? "w-full text-start" : "max-w-[1112px] mx-auto text-center py-20"}   flex flex-col gap-6 justify-center`}>
            {data?.Label && <span className='  text-2xl text-opacity-50 text-primary'>{data.Label}</span>}
            <h2 className=' text-balance text-primary text-[52px] leading-[65px]'>{data?.Title}</h2>
            {data?.Description &&
                <p className='text-xl font-medium text-primary text-opacity-50 '>{data.Description}</p>}
        </section>
    )
}
