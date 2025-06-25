import React from 'react'
import TextComp, { Repeater } from './TextComp'
import OverviewSection, { OverviewSectionProps } from './OverviewSection'

export default function OverviewSectionRepeater({ OverviewSectionData, Repeater, vision }: { OverviewSectionData: OverviewSectionProps, Repeater: Repeater[], vision?: boolean }) {
    return (
        <div id="Overview" className='flex max-w-[1448px] px-4 mx-auto items-start md:py-20 py-10  xl:gap-[100px] md:gap-[50px] gap-10 lg:flex-row flex-col'>
            <div className='xl:w-[calc(50%-50px)] md2:w-[calc(50%-25px)] w-full'>
                <OverviewSection data={OverviewSectionData} FullWidth vision={vision} />
            </div>
            <div className='xl:w-[calc(50%-50px)] lg:w-[calc(50%-25px)] w-full flex flex-col md:gap-5 gap-2'>
                {Repeater.map((item: Repeater, index: number) => (
                    <TextComp data={item} key={index} />
                ))}
            </div>
        </div>
    )
}
