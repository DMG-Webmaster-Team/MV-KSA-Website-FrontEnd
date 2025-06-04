import HeroSection, { HeroSectionProps } from '../CommonComp/HeroSection'
import OverviewSection, { OverviewSectionProps } from '../CommonComp/OverviewSection'
import WidgetWithlogo, { WidgetProps } from '../CommonComp/WidgetWithlogo'




interface Props {
    data: {
        HeroSection: HeroSectionProps,
        Overview: OverviewSectionProps,
        Widgets:WidgetProps[]
    }
}
export default function LifeatmvPage({ data }: Props) {
    return (
        <>
            <HeroSection data={data.HeroSection} />
            <OverviewSection data={data.Overview} />
            <div className='flex gap-[2px]'>
                {data.Widgets.map((item:WidgetProps,index:number)=>(
                    <WidgetWithlogo data={item} key={index} />
                ))}
            </div>
        </>
    )
}
