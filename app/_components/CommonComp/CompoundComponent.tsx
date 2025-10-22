"use client";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react"; // Import useRef
import Circle from "../SVGS/Circle"; // We will use your Circle component again
import Close from "../SVGS/Close";

export interface SingleCompoundProps {
  Years: string;
  Title: string;
  WidgetDetails: string;
  PopupDetails: string;
  Image: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}
interface SingleCompoundDetailsProps {
  item: SingleCompoundProps;
  index: number;
  lastone?: boolean;
  open: boolean;
  onClose: () => void;
  onOpen?: (index: number) => void;
}

export default function CompoundComponent({
  item,
  index,
  lastone,
  open,
  onClose,
}: // onOpen,
SingleCompoundDetailsProps) {
  // const t = useTranslations();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Animate as the component scrolls through the viewport
  });

  // Map scroll progress to a 0-1 value. Adjust [0.2, 0.8] to change start/end timing.
  const progress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  // Use progress to control the line's height
  const lineHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  // Use progress to control the circle's vertical position
  const circleTop = useTransform(progress, [0, 1], ["0%", "100%"]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {isMobile ? (
        <>
          <div
            key={index}
            className={`w-full md:w-[calc(50%+57px)] flex px-4 ${
              index % 2 == 0
                ? "flex-col md:flex-row-reverse"
                : "flex-col md:flex-row md:ms-auto"
            } `}
          >
            <div className=" w-full md:w-[80px] flex flew-row md:flex-col items-center">
              <span className="pb-3 md:pb-0 w-10 h-10 block mx-auto">
                <Circle />
              </span>
              {!lastone && (
                <span className="hidden md:flex w-full md:w-[2px] h-[2px] md:h-[calc(100%-40px)] mx-auto bg-primary bg-opacity-30" />
              )}
              <span className="md:hidden flex w-full md:w-[2px] h-[2px] md:h-[calc(100%-40px)] mx-auto bg-primary bg-opacity-30" />
            </div>
            <div className="w-full md:w-[calc(100%-80px)]">
              <div className="w-full h-[300px] relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Image.data.attributes.url}`}
                  alt={item.Image.data.attributes.alternativeText ?? item.Title}
                  fill
                  sizes="w-full md:(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className=" flex flex-col gap-1 mt-6">
                <span className=" text-xl text-primary opacity-50">
                  {item.Years}
                </span>
                <h3 className=" text-2xl font-medium text-primary">
                  {item.Title}
                </h3>
                <p
                  className="text-lg font-medium text-primary"
                  dangerouslySetInnerHTML={{
                    __html: item?.WidgetDetails?.replace(/\n/g, "</br>"),
                  }}
                ></p>
                <p className="md:text-base text-sm text-primary">
                  {item.PopupDetails}
                </p>
                {/* <button
              onClick={() => onOpen(index)}
              className=" text-primary flex gap-1 text-base font-bold mt-1 border-b border-primary border-opacity-20 w-fit hover:border-opacity-100 transition-all duration-500"
            >
              {t("data.see_more")}
              <span className="w-5 h-5 rotate-90 ltr:-rotate-90">
                <Arrow />
              </span>
            </button> */}
              </div>
            </div>
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 w-full h-full z-50 flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.span
                  className="w-full h-full absolute inset-0 bg-black bg-opacity-40"
                  onClick={onClose}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  className="md:w-[700px] w-[95%] m-auto relative h-fit z-10"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={onClose}
                    className="md:w-12 md:h-12 w-10 h-10 bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500 rounded-full absolute top-5 end-5 flex justify-center items-center z-20"
                  >
                    <span className="md:w-6 md:h-6 w-5 h-5">
                      <Close />
                    </span>
                  </button>
                  <div className="w-full h-[400px] relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Image.data.attributes.url}`}
                      alt={
                        item.Image.data.attributes.alternativeText ?? item.Title
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-white md:p-10 p-6 font-medium text-primary">
                    <span className="lg:text-2xl md:text-xl text-base opacity-50">
                      {item.Years}
                    </span>
                    <h3 className="lg:text-5xl md:text-3xl text-[28px] mt-1 pb-7">
                      {item.Title}
                    </h3>
                    <p className="lg:text-xl md:text-lg text-sm">
                      {item.PopupDetails}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          {" "}
          {/* Add the ref to the main container div */}
          <div
            ref={ref}
            key={index}
            className={`w-full md:w-[calc(50%+56px)] flex px-4 ${
              index % 2 == 0
                ? "flex-col md:flex-row-reverse"
                : "flex-col md:flex-row md:ms-auto"
            } `}
          >
            {/* --- ANIMATION CONTAINER --- */}
            <div className="w-full md:w-[80px] flex flew-row md:flex-col items-center">
              {/* This container is for the DESKTOP timeline animation */}
              <div className="relative hidden h-full w-10 md:flex justify-center">
                {/* 1. The static background line (the track) */}
                {/* {lastone && ( */}
                <div className="absolute top-0  h-full w-[2px] bg-primary bg-opacity-30" />
                {/* )} */}

                {/* 2. The animated line that grows on top of the track */}
                {!lastone && (
                  <motion.div
                    className="absolute top-0  w-[2px] bg-primary"
                    style={{ height: lineHeight }}
                  />
                )}

                {/* 3. The moving circle, absolutely positioned to move along the track */}
                <motion.div
                  className="absolute w-10 h-10 left-1/2 -translate-x-1/2"
                  style={{ top: circleTop, marginTop: "-20px" }} // Animate 'top' and add margin to center the circle on the line
                >
                  <Circle />
                </motion.div>
              </div>

              {/* This is the original horizontal line for MOBILE view */}
              <span className="md:hidden flex w-full h-[2px] mx-auto bg-primary bg-opacity-30" />
            </div>

            {/* --- CONTENT SECTION (No changes) --- */}
            <div className="w-full md:w-[calc(100%-80px)]">
              <div className="w-full h-[300px] relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Image.data.attributes.url}`}
                  alt={item.Image.data.attributes.alternativeText ?? item.Title}
                  fill
                  sizes="w-full md:(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className=" flex flex-col gap-1 mt-6">
                <span className=" text-xl text-primary opacity-50">
                  {item.Years}
                </span>
                <h3 className="text-3xl font-medium text-primary">
                  {item.Title}
                </h3>
                {item.WidgetDetails && (
                  <div
                    className="rtl:text-lg ltr:text-xl font-medium text-primary"
                    dangerouslySetInnerHTML={{
                      __html:
                        item?.WidgetDetails?.replace(
                          /^#### (.+)$/gm,
                          "</p></div><h4 class='text-lg rtl:font-semibold ltr:font-bold mb-2'>$1</h4><div><p>"
                        )
                          .replace(/\n/g, "</p><p>")
                          .replace(/<p><\/p>/g, "") // remove empty <p></p> pairs
                          .replace(/<p>$/, "") + "</p>", // remove trailing opening <p>
                    }}
                  />
                )}
                <p className="md:text-base text-sm text-primary mt-2">
                  {item.PopupDetails}
                </p>
              </div>
            </div>
          </div>
          {/* --- POPUP MODAL (No changes needed here) --- */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 w-full h-full z-50 flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.span
                  className="w-full h-full absolute inset-0 bg-black bg-opacity-40"
                  onClick={onClose}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  className="md:w-[700px] w-[95%] m-auto relative h-fit z-10"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={onClose}
                    className="md:w-12 md:h-12 w-10 h-10 bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500 rounded-full absolute top-5 end-5 flex justify-center items-center z-20"
                  >
                    <span className="md:w-6 md:h-6 w-5 h-5">
                      <Close />
                    </span>
                  </button>
                  <div className="w-full h-[400px] relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Image.data.attributes.url}`}
                      alt={
                        item.Image.data.attributes.alternativeText ?? item.Title
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-white md:p-10 p-6 font-medium text-primary">
                    <span className="lg:text-2xl md:text-xl text-base opacity-50">
                      {item.Years}
                    </span>
                    <h3 className="lg:text-5xl md:text-3xl text-[28px] mt-1 pb-7">
                      {item.Title}
                    </h3>
                    <p className="lg:text-xl md:text-lg text-sm">
                      {item.PopupDetails}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}
