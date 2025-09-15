"use client";
import { useLocale } from "next-intl";
import ArrowLong from "./SVGS/ArrowLong";
import { useSlickSlider } from "../hooks/useSlickSlider";

interface SlickMultipleItemsProps {
  children: React.ReactNode;
  Aboutus?: boolean;
  homepage?: boolean;
  blogs?: boolean;
  noMargin?: boolean;
  customArrow?: boolean;
}

function SlickMultipleItems({
  children,
  noMargin,
  customArrow,
}: SlickMultipleItemsProps) {
  const locale = useLocale();
  const {
    sliderRef,
    totalPages,
    isEndOfLeft,
    isEndOfRight,
    hasSingleItem,
    goLeft,
    goRight,
    onSlide,
  } = useSlickSlider(children);

  return (
    <div
      className={`${noMargin ? "" : " md:-mt-[30px]"} ${
        customArrow ? "relative" : ""
      }`}
    >
      <div
        className={` md:block  absolute  ${
          customArrow
            ? "top-0 bottom-0 m-auto h-fit z-20 max-w-[1392px] px-7 w-full inset-x-0"
            : "top-[75px] md:top-[65px] w-full"
        }  `}
      >
        <div className="max-w-[1448px] mx-auto px-3 mt-4">
          {totalPages > 1 && (
            <div
              className={`flex ${
                customArrow ? " relative" : "justify-start"
              }  gap-1 flex-row-reverse items-center`}
            >
              {locale == "en" ? (
                <>
                  <div
                    className={`  bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500
                  ${
                    !isEndOfLeft
                      ? "opacity-100"
                      : "opacity-50 pointer-events-none"
                  }  
                
                  ${customArrow ? " absolute start-0" : ""}
                  `}
                    onClick={goLeft}
                  >
                    <button
                      className={`${
                        customArrow ? "w-6 md:w-12 h-6 md:h-12" : "w-[25px] h-[25px] md:w-[56px] md:h-[56px]"
                      }  flex justify-center items-center`}
                    >
                      <span
                        className={` block w-3 md:w-6 h-3 md:h-6  ${
                          locale === "en" ? "" : "rotate-180 "
                        }`}
                      >
                        <ArrowLong />
                      </span>
                    </button>
                  </div>

                  <div
                    className={` bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500
                   ${
                     !isEndOfRight
                       ? "opacity-100"
                       : "opacity-50 pointer-events-none "
                   } ${customArrow ? " absolute end-0" : ""}
               
                   `}
                    onClick={goRight}
                  >
                    <button
                      className={`${
                        customArrow ? "w-12 h-12" : "w-[56px] h-[56px]"
                      } flex justify-center items-center`}
                    >
                      <span className={`block w-6 h-6 ${
                          locale === "en" ? "rotate-180 " : ""
                        }`}>
                        <ArrowLong />
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`  bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500
                  ${
                    !isEndOfLeft
                      ? "opacity-100"
                      : "opacity-50 pointer-events-none"
                  } 
                  
                  ${customArrow ? " absolute end-0" : ""}
                  `}
                    onClick={goRight}
                  >
                    <button
                      className={`${
                        customArrow ? "w-6 md:w-12 h-6 md:h-12" : "w-[25px] h-[25px] md:w-[56px] md:h-[56px]"
                      } flex justify-center items-center`}
                    >
                      <span
                        className={`${
                          locale === "ar" ? "" : "rotate-180"
                        } block w-3 md:w-6 h-3 md:h-6`}
                      >
                        <ArrowLong />
                      </span>
                    </button>
                  </div>

                  <div
                    className={` bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500
                   ${
                     !isEndOfRight
                       ? "opacity-100"
                       : "opacity-50 pointer-events-none "
                   } ${customArrow ? " absolute start-0" : ""}
                   `}
                    onClick={goLeft}
                  >
                    <button
                      className={`${
                        customArrow ? "w-6 md:w-12 h-6 md:h-12" : "w-[25px] h-[25px] md:w-[56px] md:h-[56px]"
                      } flex justify-center items-center`}
                    >
                      <span
                        className={`block w-3 md:w-6 h-3 md:h-6 ${
                          locale === "ar" ? "rotate-180" : ""
                        }`}
                      >
                        <ArrowLong />
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={`multi_scroll_content md:pt-8`}>
        <div
          ref={sliderRef}
          className={`multi_scroll_content_gallery`}
             style={{
            // Disable touch scrolling when there's only one item
            touchAction: hasSingleItem ? 'none' : 'pan-y',
            overflowX: hasSingleItem ? 'hidden' : 'auto'
          }}
          // onScroll={checkScrollPosition}
          onScroll={onSlide}
        >
          <div className={`wrapper`}>
            {children}
            {/* <div className=" shrink-0 flex-grow-0 w-1 h-5 "></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlickMultipleItems;
