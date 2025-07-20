import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
export interface LogoProps {
  Link: string;
  Icon: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}
export default function Rewards({
  Title,
  Logos,
}: {
  Title: string;
  Logos: LogoProps[];
}) {
  return (
    <div className="max-w-[1448px] px-4 mx-auto py-[64px] space-y-[64px]">
      <h2 className="text-primary text-5xl font-medium">{Title}</h2>
      <div className="flex gap-3">
        {Logos.map((item: LogoProps, index: number) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [isHovered, setIsHovered] = useState(false);

          return (
            <div
              key={index}
              className={`border border-gray2 rounded-xl w-[calc(100%/4)] h-[340px] flex flex-col justify-center transition-all duration-500 ${
                isHovered ? " bg-gray2" : " bg-transparent"
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="relative aspect-[429/183] h-[100px]"
                animate={{ y: isHovered ? -30 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Icon.data.attributes.url}`}
                  alt={item.Icon.data.attributes.alternativeText ?? item.Link}
                  fill
                  className="object-contain"
                />
              </motion.div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    key="text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-primary text-center text-xl font-medium">
                      {item.Link}
                    </h3>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
