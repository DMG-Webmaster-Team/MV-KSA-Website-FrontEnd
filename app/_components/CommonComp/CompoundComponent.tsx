'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Arrow from '../SVGS/Arrow'
import Circle from '../SVGS/Circle'
import Close from '../SVGS/Close'
import { motion, AnimatePresence } from 'framer-motion';

export interface SingleCompoundProps {
    Years: string,
    Title: string,
    WidgetDetails: string,
    PopupDetails: string,
    Image: {
        data: {
            attributes: {
                url: string,
                alternativeText: string
            }
        }
    }
}
interface SingleCompoundDetailsProps {
    item: SingleCompoundProps,
    index: number,
    lastone?: boolean,
    open: boolean;
    onClose: () => void;
    onOpen: (index: number) => void;
}

export default function CompoundComponent({ item, index, lastone, open, onClose, onOpen }: SingleCompoundDetailsProps) {
    const t = useTranslations();
    return (
        <>
            <div key={index} className={`w-[calc(50%+39px)] flex ${index % 2 == 0 ? "flex-row-reverse" : "ms-auto"}`}>
                <div className='w-[80px] flex flex-col items-center'>
                    <span className=' w-10 h-10 block mx-auto'>
                        <Circle />
                    </span>
                    {!lastone &&
                        <span className='w-[2px] h-[calc(100%-40px)] mx-auto bg-primary bg-opacity-30' />
                    }
                </div>
                <div className='w-[calc(100%-80px)]'>
                    <div className='w-full h-[300px] relative'>
                        <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Image.data.attributes.url}`}
                            alt={item.Image.data.attributes.alternativeText ?? item.Title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <div className=' flex flex-col gap-1 mt-6'>
                        <span className=' text-xl text-primary text-opacity-50'>{item.Years}</span>
                        <h3 className=' text-2xl font-medium text-primary'>{item.Title}</h3>
                        <p
                            className="text-sm font-medium text-primary"
                            dangerouslySetInnerHTML={{
                                __html: item.WidgetDetails.replace(/\n/g, '</br>')
                            }}
                        ></p>
                        <button
                            onClick={() => onOpen(index)}
                            className=' text-primary flex gap-1 text-base font-bold mt-1 border-b border-primary border-opacity-20 w-fit hover:border-opacity-100 transition-all duration-500'>
                            {t("data.see_more")}
                            <span className='w-5 h-5 rotate-90 ltr:-rotate-90'><Arrow /></span>
                        </button>
                    </div>

                </div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className='fixed inset-0 w-full h-full z-50 flex'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.span
                            className='w-full h-full absolute inset-0 bg-black bg-opacity-40'
                            onClick={onClose}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                        <motion.div
                            className='md:w-[700px] w-[95%] m-auto relative h-fit z-10'
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <button
                                onClick={onClose}
                                className='md:w-12 md:h-12 w-10 h-10 bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500 rounded-full absolute top-5 end-5 flex justify-center items-center z-20'>
                                <span className='md:w-6 md:h-6 w-5 h-5'>
                                    <Close />
                                </span>
                            </button>
                            <div className='w-full h-[400px] relative'>
                                <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Image.data.attributes.url}`}
                                    alt={item.Image.data.attributes.alternativeText ?? item.Title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className='object-cover'
                                />
                            </div>
                            <div className='bg-white md:p-10 p-6 font-medium text-primary'>
                                <span className='lg:text-2xl md:text-xl text-base opacity-50'>{item.Years}</span>
                                <h3 className='lg:text-5xl md:text-3xl text-[28px] mt-1 pb-7'>{item.Title}</h3>
                                <p className='lg:text-xl md:text-lg text-sm'>{item.PopupDetails}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


        </>

    )
}
