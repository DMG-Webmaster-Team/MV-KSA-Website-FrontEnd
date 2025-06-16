import HeroSection, { HeroSectionProps } from '../CommonComp/HeroSection'
import { OverviewSectionProps } from '../CommonComp/OverviewSection'
import OverviewSectionRepeater from '../CommonComp/OverviewSectionRepeater'
import { Repeater } from '../CommonComp/TextComp'
import Widgets, { WidgetProps } from '../CommonComp/Widgets'




interface Props {
    data: {
        HeroSection: HeroSectionProps,
        Widgets: WidgetProps[],
        OverviewSection: OverviewSectionProps,
        Repeater: Repeater[],

    }
}
export default function VisionPage({ data }: Props) {
    return (
        <>
            <HeroSection data={data.HeroSection} />
            {/* <div className='flex max-w-[1448px] px-4 mx-auto items-start py-20 gap-[100px]'>
                <div className='w-[calc(50%-50px)]'>
                    <OverviewSection data={data.OverviewSection} FullWidth vision />
                </div>
                <div className='w-[calc(50%-50px)] flex flex-col gap-5'>
                    {data.Repeater.map((item: Repeater, index: number) => (
                        <TextComp data={item} key={index} />
                    ))}
                </div>
            </div> */}
            <OverviewSectionRepeater vision OverviewSectionData={data.OverviewSection} Repeater={data.Repeater} />

            {data?.Widgets?.map((item: WidgetProps, index: number) => (
                <Widgets data={item} key={index} reverse={index % 2 == 0} />
            ))}
        </>
    )
}
