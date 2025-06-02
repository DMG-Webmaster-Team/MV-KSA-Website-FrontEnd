import HeroSection, { HeroSectionProps } from '../CommonComp/HeroSection'
import OverviewSection, { OverviewSectionProps } from '../CommonComp/OverviewSection'
import TextComp, { Repeater } from '../CommonComp/TextComp'




interface Props {
    data: {
        HeroSection: HeroSectionProps,
        OverviewSection: OverviewSectionProps,
        Repeater: Repeater[],
        Whatweserve: {
            Title: string,
            Widgets: {
                Title: string,
                Image: {
                    data: {
                        attributes: {
                            url: string,
                            alternativeText: string,
                        }
                    }
                }
            }[]
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
            <div className=' bg-gray'>

            </div>
        </>
    )
}
