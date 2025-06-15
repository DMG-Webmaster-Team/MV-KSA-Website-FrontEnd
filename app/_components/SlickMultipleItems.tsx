"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import ArrowLong from "./SVGS/ArrowLong";
// import Arrow from "./Svgs/Arrow";

interface SlickMultipleItemsProps {
    children: React.ReactNode;
    Aboutus?: boolean;
    homepage?: boolean
    blogs?: boolean;
}

function SlickMultipleItems({ children }: SlickMultipleItemsProps) {

    const [totalPages, setTotalPages] = useState<number>(1);
    const locale = useLocale();


    useEffect(() => {
        if (sliderRef.current) {
            const { scrollWidth, clientWidth } = sliderRef.current;
            const pages = Math.ceil(scrollWidth / clientWidth);
            setTotalPages(pages);
            // checkScrollPosition();
        }
    }, [children]);

    const sliderRef = useRef<HTMLDivElement>(null);
    const [isEndOfLeft, setIsEndOfLeft] = useState<boolean>(true);
    const [isEndOfRight, setIsEndOfRight] = useState<boolean>(false);
    let x = 0;
    let scrollAmount = 500;
    if (typeof window !== "undefined") {
        scrollAmount = window.innerWidth < 768 ? 330 : 400;
    }

    const goLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollTo({
                left: sliderRef.current.scrollLeft - scrollAmount,
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const goRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollTo({
                left: sliderRef.current.scrollLeft + scrollAmount,
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const onSlide = () => {
        if (sliderRef.current) {
            x = sliderRef.current.scrollLeft;
            const endOfLeft = x === 0;
            setIsEndOfLeft(endOfLeft);

            // Check if there are no more sliders in the right direction
            const endOfRight =
                x + sliderRef.current.clientWidth === sliderRef.current.scrollWidth;
            setIsEndOfRight(endOfRight);
        }
    };
    return (
        <div className=" md:-mt-[60px] ">
            <div className={` md:block hidden absolute top-20 w-full   `}>
                <div className="max-w-[1448px] mx-auto px-3">
                    {totalPages > 1 && (
                        <div className="flex justify-start gap-1 flex-row-reverse items-center">
                            {locale == "en" ?
                                <>
                                    <div
                                        className={`  bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500
                  ${!isEndOfLeft ? "opacity-100" : "opacity-50 pointer-events-none"
                                            } 
                  `}
                                        onClick={goLeft}
                                    >
                                        <button className="w-[56px] h-[56px] flex justify-center items-center">
                                            <span
                                                className={` block w-6 h-6  ${locale === "en" ? "rotate-180" : " "}`}
                                            >
                                                <ArrowLong />
                                            </span>
                                        </button>
                                    </div>

                                    <div
                                        className={` bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500
                   ${!isEndOfRight ? "opacity-100" : "opacity-50 pointer-events-none "
                                            }`}
                                        onClick={goRight}

                                    >
                                        <button className="w-[56px] h-[56px] flex justify-center items-center">
                                            <span
                                                className={`block w-6 h-6 `}
                                            >
                                                <ArrowLong />
                                            </span>
                                        </button>
                                    </div>
                                </>
                                :
                                <>
                                    <div
                                        className={`  bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500
                  ${!isEndOfLeft ? "opacity-100" : "opacity-50 pointer-events-none"
                                            } 
                  `}
                                        onClick={goRight}
                                    >
                                        <button className="w-[56px] h-[56px] flex justify-center items-center">
                                            <span
                                                className={`${locale === "ar" ? "" : "rotate-180"
                                                    } block w-6 h-6`}
                                            >
                                                <ArrowLong />

                                            </span>
                                        </button>
                                    </div>

                                    <div
                                        className={` bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500
                   ${!isEndOfRight ? "opacity-100" : "opacity-50 pointer-events-none "
                                            }  `}
                                        onClick={goLeft}

                                    >
                                        <button className="w-[56px] h-[56px] flex justify-center items-center">
                                            <span
                                                className={`block w-6 h-6 ${locale === "ar" ? "rotate-180" : ""
                                                    }`}
                                            >
                                                <ArrowLong />

                                            </span>
                                        </button>
                                    </div>
                                </>}

                        </div>
                    )}
                </div>

            </div>
            <div className={`multi_scroll_content md:pt-8`}>
                <div
                    ref={sliderRef}
                    className={`multi_scroll_content_gallery`}
                    // onScroll={checkScrollPosition}
                    onScroll={onSlide}
                >
                    <div className={`wrapper`}>
                        {children}
                        <div className=" shrink-0 flex-grow-0 w-1 h-5 "></div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default SlickMultipleItems;