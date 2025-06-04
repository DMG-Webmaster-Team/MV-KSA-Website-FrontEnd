import HeroSection, { HeroSectionProps } from '../CommonComp/HeroSection'
import LighthouseWidget, { LighthouseWidgetProps } from '../CommonComp/LighthouseWidget'
import OverviewSection, { OverviewSectionProps } from '../CommonComp/OverviewSection'
import TextComp, { Repeater } from '../CommonComp/TextComp'
import SlickMultipleItems from '../SlickMultipleItems'




interface Props {
    data: {
        HeroSection: HeroSectionProps,
        OverviewSection: OverviewSectionProps,
        Repeater: Repeater[],
        Whatweserve: {
            Title: string,
            Widgets: LighthouseWidgetProps[]
        }
    }
}
export default function LighthousePage({ data }: Props) {
    return (
        <>
            <HeroSection data={data.HeroSection} />
            <div className='flex max-w-[1448px] px-4 mx-auto items-start py-20 gap-[100px]'>
                <div className='w-[calc(50%-50px)]'>
                    <OverviewSection data={data.OverviewSection} FullWidth />
                </div>
                <div className='w-[calc(50%-50px)] flex flex-col gap-5'>
                    {data.Repeater.map((item: Repeater, index: number) => (
                        <TextComp data={item} key={index} />
                    ))}
                </div>
            </div>
            <div className=' bg-gray py-20 relative'>
                <div className='max-w-[1448px] px-4 mx-auto mb-10'>
                    <h2 className=' text-primary text-[60px] font-medium'>{data.Whatweserve.Title}</h2>
                </div>
                <SlickMultipleItems>
                    {data.Whatweserve.Widgets.map((item: LighthouseWidgetProps, index: number) => (
                        <div key={index} className='w-[440px]'>
                            <LighthouseWidget data={item} />
                        </div>

                    ))}
                </SlickMultipleItems>
            </div>
        </>
    )
}
