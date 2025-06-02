import HeroSection, { HeroSectionProps } from '../CommonComp/HeroSection'
import Widgets, { WidgetProps } from '../CommonComp/Widgets'




interface Props {
    data: {
        HeroSection: HeroSectionProps,
        Widgets: WidgetProps[]
        
    }
}
export default function VisionPage({ data }: Props) {
    return (
        <>
            <HeroSection data={data.HeroSection} />
            {data?.Widgets?.map((item: WidgetProps, index: number) => (
                <Widgets data={item} key={index} reverse={index % 2 == 0} />
            ))}
        </>
    )
}
