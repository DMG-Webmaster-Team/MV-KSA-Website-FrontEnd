"use client";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import { singleImage } from "./Gallery";
import ArrowLong from "./SVGS/ArrowLong";
import Close from "./SVGS/Close";
import { motion } from "framer-motion";

export default function GalleryPopup({
  Images,
  onClickHandle,
}: {
  Images: singleImage[];
  onClickHandle: () => void;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainNav, setMainNav] = useState<{
    prevEl: HTMLElement | null;
    nextEl: HTMLElement | null;
  }>({ prevEl: null, nextEl: null });
  const [thumbNav, setThumbNav] = useState<{
    prevEl: HTMLElement | null;
    nextEl: HTMLElement | null;
  }>({ prevEl: null, nextEl: null });
  const mainSwiperRef = useRef<SwiperType | null>(null);

  // Refs for navigation buttons
  const mainPrevRef = useRef<HTMLButtonElement | null>(null);
  const mainNextRef = useRef<HTMLButtonElement | null>(null);
  const thumbPrevRef = useRef<HTMLButtonElement | null>(null);
  const thumbNextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMainNav({
      prevEl: mainPrevRef.current,
      nextEl: mainNextRef.current,
    });
    setThumbNav({
      prevEl: thumbPrevRef.current,
      nextEl: thumbNextRef.current,
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#222222] fixed inset-0 w-full z-40 py-[50px] space-y-[60px] h-full"
    >
      <button
        onClick={onClickHandle}
        className="p-4 bg-white text-primary rounded-full absolute top-10 start-10 flex hover:bg-primary hover:text-white transition-all duration-500"
      >
        <span className="w-6 h-6">
          <Close />
        </span>
      </button>
      {/* Main Swiper */}
      <div className="max-w-[1448px] px-4 mx-auto h-[calc(87%-60px)] relative">
        <div className="flex justify-between items-center absolute w-full inset-0 px-4 z-10">
          <button
            ref={mainPrevRef}
            className="hover:bg-primary hover:text-Gray05 rounded-full transition-all duration-500 text-primary flex bg-Gray05 p-3"
          >
            <span className="w-5 h-5 rotate-180">
              <ArrowLong />
            </span>
          </button>
          <button
            ref={mainNextRef}
            className="text-primary flex bg-Gray05 p-3 hover:bg-primary hover:text-Gray05 rounded-full transition-all duration-500"
          >
            <span className="w-5 h-5">
              <ArrowLong />
            </span>
          </button>
        </div>

        {mainNav.prevEl && mainNav.nextEl && (
          <Swiper
            onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
            modules={[Navigation, Thumbs]}
            navigation={mainNav}
            thumbs={{ swiper: thumbsSwiper }}
            className="!w-[66%] h-full"
            slidesPerView={1}
          >
            {Images?.map((image) => (
              <SwiperSlide key={image.id} className="relative aspect-[464/300]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${image.attributes.url}`}
                  alt={image.attributes.alternativeText || "Gallery Image"}
                  fill
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Thumbs Swiper */}
      <div className="max-w-[1448px] px-4 mx-auto relative w-fit">
        <button
          ref={thumbPrevRef}
          onClick={() => {
            const main = mainSwiperRef.current;
            if (main && main.activeIndex > 0) {
              main.slideTo(main.activeIndex - 1);
            }
          }}
          className="bg-Gray05 text-primary absolute inset-y-0 start-0 hover:bg-primary hover:text-Gray05 p-2 rounded-full transition flex items-center h-fit m-auto z-10"
        >
          <span className="w-4 h-4 rotate-180">
            <ArrowLong />
          </span>
        </button>

        <button
          ref={thumbNextRef}
          onClick={() => {
            const main = mainSwiperRef.current;
            if (main && main.activeIndex < Images.length - 1) {
              main.slideTo(main.activeIndex + 1);
            }
          }}
          className="bg-Gray05 text-primary absolute inset-y-0 end-0 hover:bg-primary hover:text-Gray05 p-2 rounded-full transition flex items-center h-fit m-auto z-10"
        >
          <span className="w-4 h-4">
            <ArrowLong />
          </span>
        </button>

        {thumbNav.prevEl && thumbNav.nextEl && (
          <Swiper
            onSwiper={setThumbsSwiper}
            watchSlidesProgress
            slidesPerView={10}
            slideToClickedSlide
            spaceBetween={10}
            initialSlide={4}
            centeredSlides
            className="h-[13%]"
          >
            {Images?.map((image) => (
              <SwiperSlide
                key={image.id}
                className="relative !w-[107px] !h-20 border-[4px] transition-all duration-500 border-transparent hover:border-Gold"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${image.attributes.url}`}
                  alt={image.attributes.alternativeText || "Thumbnail"}
                  fill
                  className="w-full h-auto object-cover cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </motion.div>
  );
}
