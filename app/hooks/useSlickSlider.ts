import { useEffect, useRef, useState } from "react";

export function useSlickSlider(children: React.ReactNode) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isEndOfLeft, setIsEndOfLeft] = useState<boolean>(true);
  const [isEndOfRight, setIsEndOfRight] = useState<boolean>(false);

  let scrollAmount = 500;
  if (typeof window !== "undefined") {
    scrollAmount = window.innerWidth < 768 ? 330 : 440;
  }

  useEffect(() => {
    if (sliderRef.current) {
      const { scrollWidth, clientWidth } = sliderRef.current;
      const pages = Math.ceil(scrollWidth / clientWidth);
      setTotalPages(pages);
    }
  }, [children]);

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
      const x = sliderRef.current.scrollLeft;
      setIsEndOfLeft(x === 0);
      setIsEndOfRight(
        x + sliderRef.current.clientWidth === sliderRef.current.scrollWidth
      );
    }
  };

  return {
    sliderRef,
    totalPages,
    isEndOfLeft,
    isEndOfRight,
    goLeft,
    goRight,
    onSlide,
  };
}
