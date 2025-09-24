"use client";
import { LogoProps } from "@/app/types/HomePage";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Rewards({
  Title,
  Logos,
}: {
  Title: string;
  Logos: LogoProps[];
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="max-w-[1448px] px-4 mx-auto md:py-[64px] py-10 md:space-y-[64px] space-y-10">
      <h2 className="text-primary md:text-5xl text-[28px] font-medium">
        {Title}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-6  gap-3 md:flex-nowrap flex-wrap">
        {Logos.map((item: LogoProps, index: number) => {
          const isHovered = hoveredIndex === index || !isDesktop;
          return (
            <div
              key={index}
              className={`border border-gray2 rounded-xl md:w-full w-full md:gap-y-0 gap-y-4 lg:h-[340px] md:h-[290px] h-[250px] flex flex-col justify-center transition-all duration-500 ${
                isHovered && isDesktop ? " bg-gray2" : " bg-transparent"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="relative mx-4 aspect-[429/120] md:aspect-[429/183] max-w-[80%] lg:h-[100px] min-h-20"
                animate={{ y: isHovered && isDesktop ? -30 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Icon.data.attributes.url}`}
                  alt={item.Icon.data.attributes.alternativeText ?? item.Link}
                  fill
                  className="object-contain mix-blend-multiply"
                />
              </motion.div>

              <AnimatePresence>
                {isHovered && (
                  // <motion.div
                  //   key="text"
                  //   initial={{ opacity: 0, y: 20 }}
                  //   animate={{ opacity: 1, y: 0 }}
                  //   exit={{ opacity: 0, y: 20 }}
                  //   transition={{ duration: 0.4 }}
                  // >
                    <h3 className="text-primary text-center md:text-xl text-base font-medium">
                      {item.Link}
                    </h3>
                  // </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
