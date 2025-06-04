import Image from 'next/image'
import CompoundComponent, { SingleCompoundProps } from '../CommonComp/CompoundComponent'
import HeroSection, { HeroSectionProps } from '../CommonComp/HeroSection'
import OverviewSection, { OverviewSectionProps } from '../CommonComp/OverviewSection'
import Widgets, { WidgetProps } from '../CommonComp/Widgets'

interface Props {
    data: {
        HeroSection: HeroSectionProps,
        OverviewSection: OverviewSectionProps,
        Widgets: WidgetProps[],
        OwnerMessage: {
            Title: string,
            Message: string,
            Image: {
                data: {
                    attributes: {
                        url: string,
                        alternativeText: string
                    }
                }
            }
        },
        Compounds: {
            Title: string,
            SingleCompound: SingleCompoundProps[]
        }
    }
}
export default function OurStory({ data }: Props) {
    return (
        <>
            <HeroSection data={data.HeroSection} />
            <OverviewSection data={data.OverviewSection} />
            {data?.Widgets?.map((item: WidgetProps, index: number) => (
                <Widgets data={item} key={index} reverse={index % 2 == 0} />
            ))}
            <div className='max-w-[1448px] px-4 mx-auto flex items-center justify-between bg-gray p-5 rounded-xl my-20'>
                <div className='w-[500px] relative aspect-[1067/1600] rounded overflow-hidden'>
                    <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.OwnerMessage.Image.data.attributes.url}`}
                        alt={data.OwnerMessage.Image.data.attributes.alternativeText ?? data.OwnerMessage.Title}
                        fill
                    />
                </div>
                <div className='w-[calc(100%-500px-100px)] pe-20'>
                    <h2 className=' text-5xl text-primary font-medium mb-5'>{data.OwnerMessage.Title}</h2>
                    <p
                        className="text-xl font-medium text-primary"
                        dangerouslySetInnerHTML={{
                            __html: data.OwnerMessage.Message.replace(/\n\n/g, '</br></br>')
                        }}
                    />
                </div>

            </div>
            <div className=' max-w-[880px] mx-auto py-20'>
                <h2 className=' text-primary text-[60px] font-medium text-center'>{data.Compounds.Title}</h2>
                <div className=' mt-[60px]'>
                    {data.Compounds.SingleCompound.map((item: SingleCompoundProps, index: number) => (
                        <CompoundComponent key={index} item={item} index={index} lastone={index == data.Compounds.SingleCompound.length - 1} />
                    ))}

                </div>

            </div>
        </>
    )
}
