import HeroSection, { HeroSectionProps } from '../CommonComp/HeroSection'
import OverviewSection, { OverviewSectionProps } from '../CommonComp/OverviewSection'




interface Props {
    data: {
        HeroSection: HeroSectionProps,
        Overview: OverviewSectionProps,
    }
}
export default function LifeatmvPage({ data }: Props) {
    return (
        <>
            <HeroSection data={data.HeroSection} />
            <OverviewSection data={data.Overview} FullWidth />
        </>
    )
}
