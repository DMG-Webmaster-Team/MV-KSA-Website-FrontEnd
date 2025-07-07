'use client';
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ArrowLong from './SVGS/ArrowLong';
import GalleryPopup from './GalleryPopup';

export interface singleImage {
    id: number;
    attributes: {
        alternativeText: string;
        url: string;
    };
}

export default function Gallery({ data }: { data: { data: singleImage[] } }) {
    const images = data.data;

    return (
        <>
            <div className="my-20 relative">
                <div className='max-w-[1448px] px-4 mx-auto absolute w-full flex justify-between items-center inset-y-0 z-20'>
                    <button className="custom-prev hover:bg-primary hover:text-Gray05 transition-all duration-500 text-primary flex bg-Gray05 p-3">
                        <span className='w-5 h-5 rotate-180'>
                            <ArrowLong />
                        </span>
                    </button>
                    <button className="custom-next  text-primary flex bg-Gray05 p-3 hover:bg-primary hover:text-Gray05 transition-all duration-500">
                        <span className='w-5 h-5'>
                            <ArrowLong />
                        </span>
                    </button>
                </div>
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: '.custom-prev',
                        nextEl: '.custom-next',
                    }}
                    loop
                    slidesPerView="auto"
                    centeredSlides
                    initialSlide={1}
                    allowTouchMove={false}
                    className="h-[678px]"
                    spaceBetween={0}
                >
                    {images.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className="!w-fit h-fit my-auto items-center !flex"
                        >
                            {({ isActive }) => (
                                <div
                                    className={`relative aspect-[464/300] flex h-fit my-auto mx-2.5 md:w-[900px] 
                                `}
                                >
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.attributes.url}`}
                                        alt={item.attributes.alternativeText ?? 'Image'}
                                        fill
                                        className={`${isActive ? "h-full" : "!h-[400px]"} object-cover transition-all duration-500 !my-auto`}
                                    />
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <GalleryPopup
                Images={images}
            />
        </>

    );
}
