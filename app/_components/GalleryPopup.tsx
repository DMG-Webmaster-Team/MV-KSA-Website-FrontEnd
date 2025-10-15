"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGallerySwiper } from "../hooks/useGallerySwiper";
import { singleImage } from "./Gallery";
import ArrowLong from "./SVGS/ArrowLong";
import Close from "./SVGS/Close";

export default function GalleryPopup({
  Images,
  onClickHandle,
}: {
  Images: singleImage[];
  onClickHandle: () => void;
}) {
  const {
    mainNav,
    thumbNav,
    thumbsSwiper,
    setThumbsSwiper,
    mainSwiperRef,
    mainPrevRef,
    mainNextRef,
    thumbPrevRef,
    thumbNextRef,
    // goToPrevImage,
    // goToNextImage,
  } = useGallerySwiper(Images.length);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 h-full w-full space-y-[60px] bg-[#222222] py-[50px]"
    >
      <button
        onClick={onClickHandle}
        className="absolute start-10 top-10 z-10 flex rounded-full bg-white p-2 text-primary transition-all duration-500 hover:bg-primary hover:text-white"
      >
        <span className="h-6 w-6">
          <Close />
        </span>
      </button>
      {/* Main Swiper */}
      <div className="relative mx-auto h-[calc(87%-60px)] max-w-[1448px] px-4">
        <div className="absolute inset-0 z-10 flex w-full items-center justify-between px-4">
          <button
            ref={mainPrevRef}
            className="flex rounded-full bg-Gray05 p-3 text-primary transition-all duration-500 hover:bg-primary hover:text-Gray05"
          >
            <span className="h-5 w-5 rtl:rotate-180">
              <ArrowLong />
            </span>
          </button>
          <button
            ref={mainNextRef}
            className="flex rounded-full bg-Gray05 p-3 text-primary transition-all duration-500 hover:bg-primary hover:text-Gray05"
          >
            <span className="h-5 w-5 ltr:rotate-180">
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
            className="h-full"
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
      <div className="relative mx-auto w-fit max-w-[1448px] px-4">
        <button
          ref={thumbPrevRef}
          onClick={() => {
            const main = mainSwiperRef.current;
            if (main && main.activeIndex > 0) {
              main.slideTo(main.activeIndex - 1);
            }
          }}
          className="absolute inset-y-0 start-0 z-10 m-auto flex h-fit items-center rounded-full bg-Gray05 p-2 text-primary opacity-0 transition hover:bg-primary hover:text-Gray05"
        >
          <span className="h-4 w-4 rotate-180">
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
          className="absolute inset-y-0 end-0 z-10 m-auto flex h-fit items-center rounded-full bg-Gray05 p-2 text-primary opacity-0 transition hover:bg-primary hover:text-Gray05"
        >
          <span className="h-4 w-4">
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
                className="relative !h-20 !w-[107px] border-[4px] border-transparent transition-all duration-500 hover:border-Gold"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${image.attributes.url}`}
                  alt={image.attributes.alternativeText || "Thumbnail"}
                  fill
                  className="h-auto w-full cursor-pointer object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </motion.div>
  );
}
