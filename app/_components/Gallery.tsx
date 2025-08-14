"use client";
import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import GalleryPopup from "./GalleryPopup";
import ArrowLong from "./SVGS/ArrowLong";
import ImageIcon from "./SVGS/ImageIcon";
import type { Swiper as SwiperType } from "swiper";

export interface singleImage {
  id: number;
  attributes: {
    alternativeText: string;
    url: string;
  };
}

export default function Gallery({ data }: { data: { data: singleImage[] } }) {
  const images = data.data;
  const t = useTranslations();
  const [ActivePopup, setActivePopup] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null); 
  const [activeIndex, setActiveIndex] = useState(0);
  const handlePopup = () => {
    setActivePopup(!ActivePopup);
  };
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="md:my-20 my-[50px] relative ">
        <div className="max-w-[1448px] px-4 mx-auto absolute w-full flex justify-between items-center inset-0 md:top-0 top-auto z-40">
          <button className="custom-prev hover:bg-primary hover:text-Gray05 transition-all duration-500 text-primary bg-Gray05 p-3 md:flex hidden ">
            <span className="w-5 h-5 rtl:rotate-180">
              <ArrowLong />
            </span>
          </button>
          <button className="custom-next  text-primary bg-Gray05 p-3 hover:bg-primary hover:text-Gray05 transition-all duration-500 md:flex hidden ">
            <span className="w-5 h-5 ltr:rotate-180">
              <ArrowLong />
            </span>
          </button>
          <button
            onClick={handlePopup}
            className="flex bg-Gray05 rounded-sm text-primary py-3 px-4 absolute md:end-4 end-0 md:start-auto start-0 w-fit mx-auto
          md:bottom-0 -bottom-12 gap-3 font-bold hover:bg-[#DDDDDD] transition-all duration-500 text-sm md:text-base
          "
          >
            {t("Buttons.all_images")}
            <span className="w-5 h-5">
              <ImageIcon />
            </span>
          </button>
          <div className="flex justify-center gap-2 absolute md:-bottom-10 bottom-5 inset-x-0 mx-auto max-w-[600px] border-b border-primary border-opacity-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`lg:w-[100px] w-9 h-0.5 transition-all duration-300 ${
                  index === activeIndex ? "bg-primary" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
<Swiper
  modules={[Navigation]}
  navigation={{
    prevEl: ".custom-prev",
    nextEl: ".custom-next",
  }}
  loop
  slidesPerView={isDesktop ? 'auto' : 1.3}
  centeredSlides
  initialSlide={1}
  allowTouchMove={true}
  className="lg:h-[678px] md:h-[558px] sm:h-[378px] h-[300px] !lg:z-auto !z-30"
  spaceBetween={isDesktop ? 0 : 16} // spacing only on mobile
  onSwiper={(swiper) => {
    swiperRef.current = swiper;
  }}
  onSlideChange={(swiper) => {
    setActiveIndex(swiper.realIndex);
  }}
>
  {images.map((item, index) => (
    <SwiperSlide
      key={index}
      className={`h-fit my-auto !flex items-center 
        ${isDesktop ? "!w-fit" : "justify-center"}`} // center only on mobile
    >
      {({ isActive }) => (
        <div
          className={`relative aspect-[464/300] flex h-fit my-auto 
            ${isDesktop ? "md:mx-2.5 mx-1.5" : "mx-auto"} 
            2xl:w-[1024px] xl:w-[900px] lg:w-[750px] md:w-[600px] w-[320px]`}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.attributes.url}`}
            alt={item.attributes.alternativeText ?? "Image"}
            fill
            className={`${
              isActive
                ? "h-full"
                : "lg:!h-[400px] md:!h-[300px] !h-[140px]"
            } object-cover transition-all duration-500 !my-auto`}
          />
        </div>
      )}
    </SwiperSlide>
  ))}
</Swiper>


      </div>
      <AnimatePresence>
        {ActivePopup && (
          <GalleryPopup onClickHandle={handlePopup} Images={images} />
        )}
      </AnimatePresence>
    </>
  );
}
