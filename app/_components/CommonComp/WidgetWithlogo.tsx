import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import ArrowLong from '../SVGS/ArrowLong'

export interface WidgetProps {
    Title: string,
    ShortDescription: string,
    Link: string,
    Image: {
        data: {
            attributes: {
                url: string,
                alternativeText: string,
            }
        }
    },
    Logo: {
        data: {
            attributes: {
                url: string,
                alternativeText: string,
            }
        }
    }
}

export default function WidgetWithlogo({ data }: { data: WidgetProps }) {
    const t = useTranslations();
    const locale = useLocale();
    return (
        <div className='relative w-[50%] aspect-[1000/625] group overflow-hidden'>
            <a
            className=' absolute w-full h-full inset-0 z-20'
            href={`${locale === "en" ? "/" : "/ar/"}${data.Link}`} />
            <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Image.data.attributes.url}`}
                alt={`${data.Image.data.attributes.alternativeText ?? data.Title}`}
                className=' group-hover:scale-110 transition-all duration-500'
                fill
            />
            <div className=' relative flex flex-col justify-between z-10 h-full'>
                <div className='relative w-[260px] h-[120px] m-10 ms-auto'>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Logo.data.attributes.url}`}
                        alt={`${data.Logo.data.attributes.alternativeText ?? data.Title}`}
                        fill
                        className={` object-contain`}
                    />
                </div>
                <div
                    className='p-8'
                    style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)" }}>
                    <h2 className=' text-white font-medium text-[52px]'>{data.Title}</h2>
                    <p className=' text-white text-opacity-80 text-4xl'>{data.ShortDescription}</p>

                    <p className='group-hover:bg-primary group-hover:text-white transition-all duration-500 bg-white w-fit mt-10 rounded-[2px] py-5 px-4 text-base font-bold flex text-primary gap-3 items-center'>
                        <span className=' leading-[10px]'>
                            {t("data.discover_more")}
                        </span>

                        <span className='w-5 h-5'>
                            <ArrowLong />
                        </span>

                    </p>
                </div>

            </div>
        </div>
    )
}
