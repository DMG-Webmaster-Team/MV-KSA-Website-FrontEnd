"use client";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "../SVGS/ArrowRight";
import { useLocale, useTranslations } from "next-intl";



const variants = {
  left: {
    hidden: { x: -100, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, staggerChildren: 0.2 },
    },
  },
  right: {
    hidden: { x: 100, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, staggerChildren: 0.2 },
    },
  },
};

export default function CommunitiesPage({
//   views,
  data,
  Views
}: any) {
  interface Data {
    data: any;
    events: any;
    meta: any;
  }
  const locale = useLocale();
  const t = useTranslations();

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative mx-auto h-[80vh] custom:h-[100vh] md:h-[90vh] min-h-[620px]">
        <div className="relative w-full h-full">
          {data?.HeroSection?.Media && (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.HeroSection.Media.data.attributes.url}`}
              alt={`${data.HeroSection.Media.data.attributes.alternativeText}`}
              fill
              className="object-cover"
              overrideSrc={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.HeroSection.Media.data.attributes.url}`}
            />
          )}
        </div>
        <m.div
          className="bottom-0 left-0 z-9 absolute w-full text-white"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-10 mb-36 custom:mb-0 pb-5 md:pb-20">
            <h1 className="pb-5 md:pb-20 font-normal text-[42px] md:text-[80px] lg:text-[120px] leading-[52.8px] md:leading-[120px]">
              {data.HeroSection?.Title}
            </h1>
          </div>
          <div className="hidden custom:block pt-16 text-center">
            <p
              className="pb-2 md:pb-5 font-semibold text-sm uppercase leading-4 tracking-[4px] cursor-pointer"
              onClick={() =>
                document
                  .getElementById("projects-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {data?.scroll}
            </p>
            <div className="flex justify-center items-center">
              <div className="bg-white w-[2px] h-[50px] md:h-[112px] animate-line"></div>
            </div>
          </div>
        </m.div>
      </section>

      <div className="bg-[#F6F6F6]">
        <section
          id="projects-section"
          className="mx-auto px-4 lg:px-7 py-10 md:py-20 max-w-[1512px]"
        >
          <div className="flex md:flex-row flex-col gap-5 lg:gap-[80px] w-full text-pretty">
            <m.div
              className="flex flex-col gap-5 w-full lg:max-w-[calc(100%-688px)]"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, staggerChildren: 0.2 }}
              viewport={{ once: true }}
            >
              {data?.subtitle ? (
                <h2 className="text-[44px] text-primary lg:text-[50px] xl:text-[80px] text-pretty leading-[52.8px] md:leading-[76px] lg:leading-[86px] xl:leading-[96px]">
                  {data?.subtitle}
                </h2>
              ) : (
                ""
              )}
              <button
                className={`md:py-4 py-3 md:mt-8 mb-2 mt-3.5 text-[#003DA6] rounded-[2px] md:px-5 px-4 flex justify-center bg-white hover:bg-[#E3E3E3] border-[1px] transition duration-300 ease-in-out border-[#E3E3E3] gap-3 md:w-fit w-full`}
              >
                <Link
                  prefetch={false}
                  href={`${locale == "en" ? "/en/" : "/"}projects`}

                  className="text-center"
                >
                  <div className="flex items-center gap-x-1 gap-y-2.5">
                    <span className="font-bold text-base uppercase leading-[24px]">
                     {t("data.discover-projects")}   
                    </span>
                    <span className="w-5 h-5">
                      <ArrowRight className="rtl:rotate-180"/>
                    </span>
                  </div>
                </Link>
              </button>
            </m.div>
            {data?.Description ? (
              <m.p
                className="md:max-w-[450px] lg:max-w-[550px] xl:max-w-[688px] text-[#666666] #003DA6 text-sm md:text-base lg:text-lg xl:text-xl [&_a:hover]:underline"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, staggerChildren: 0.2 }}
                viewport={{ once: true }}
                dangerouslySetInnerHTML={{
                  __html: data?.Description || "",
                }}
              />
            ) : (
              ""
            )}
          </div>

          {/* Numbers Section */}
          {data?.singleNumber ? (
            <div className="flex flex-wrap justify-center bg-white mx-auto mt-6 md:mt-10 lg:mt-20 p-5 rounded-[28px] w-full">
              {data?.singleNumber?.map(
                (item: any, index: number) => (
                  <m.div
                    key={index}
                    className="py-5 w-[calc(100%/2)] sm:w-[calc(100%/3)] lg:w-[calc(100%/4)] text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="font-Poppins md:font-light font-normal text-[44px] text-primary xl:text-[100px] md:text-7xl leading-[52.8px]">
                      {item.number}
                    </h4>
                    <p className="pt-5 font-medium text-[#AAAAAA] text-sm md:text-xl">
                      {item.title}
                    </p>
                  </m.div>
                )
              )}
            </div>
          ) : (
            ""
          )}
        </section>
      </div>

      {/* Projects Section */}
      <section className="mx-auto max-w-[1512px] overflow-hidden">
        <div className="bg-white rounded-[28px] w-full">
          {Views.data.map((item: any, index: number) => {
            const animationDirection =
              index % 2 === 0 ? variants.left : variants.right;
            return (
              <div
                key={item.id}
                className={`flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col-reverse`}
              >
                <m.div
                  className="md:w-1/2"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={animationDirection}
                >
                  <div className="flex justify-start items-center h-full">
                    <div className="md:p-10 px-4 py-6 md:py-0">
                      <Link
                        prefetch={false}
                        href={`${locale == "en" ? "/en/" : "/"}projects?view=${item.attributes.name.toLowerCase().replace(
                          /\s+/g,
                          "-"
                        )}`}
                      >
                        <h3 className="pt-2 pb-2 md:pb-5 font-normal text-[44px] text-primary lg:text-[75px] md:text-4xl leading-[52.8px] md:leading-[66px] lg:leading-[96px]">
                          {item.attributes.name}
                        </h3>
                      </Link>
                      {item.attributes.projects.data.length != 0 ? (
                        <h4 className="pb-3 md:pb-5 font-normal text-primary md:text-[20px] lg:text-[28px] text-sm leading-[18px] md:leading-[33.6px]">
                          <span className="font-Poppins">
                            {item.attributes.projects.data.length}
                          </span>
                          {item.attributes.projects.data.length === 1
                            ? " Project"
                            : " Projects"}{" "}
                        </h4>
                      ) : (
                        ""
                      )}

                      <p
                        className="mb-3 md:pb-8 font-medium text-[#969696] [&_a]:text-primary-200/80 md:text-[15px] text-sm lg:text-lg xl:text-xl [&_a:hover]:underline"
                        dangerouslySetInnerHTML={{
                          __html: item.attributes.smallDescription || "",
                        }}
                      />
                      {item.attributes.projects.data.length != 0 ? (
                        <button
                        className={`md:py-4 py-3 md:mt-8 mb-2 mt-3.5  rounded-[2px] md:px-5 px-4 flex justify-center md:bg-white md:hover:bg-[#E3E3E3] bg-[#003DA6] text-primary md:text-primary-200 hover:bg-[#001A70] border-[1px] transition duration-300 ease-in-out md:border-[#E3E3E3]"
                          gap-3`}
                        >
                          <Link
                            prefetch={false}
                            href={`${locale == "en" ? "/en/" : "/"}projects?view=${item.attributes.name.toLowerCase().replace(
                              /\s+/g,
                              "-"
                            )}`}
                            className="text-center"
                          >
                            <div className="flex items-center gap-x-1 gap-y-2.5">
                              <span className="font-bold text-base uppercase leading-[24px]">
                                {item.attributes.ButtonTitle
                                  ? item.attributes.ButtonTitle
                                  : t("data.discover-projects") }
                              </span>
                              <span className="w-5 h-5">
                                <ArrowRight className="rtl:rotate-180"/>
                              </span>
                            </div>
                          </Link>
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </m.div>

                <m.div
                  className="relative flex md:flex-row flex-col w-full md:w-1/2 aspect-[756/800]"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={animationDirection}
                >
                  <Link
                    prefetch={false}
                    href={`${locale == "en" ? "/en/" : "/"}projects/${item.attributes.name.toLowerCase().replace(
                      /\s+/g,
                      "-"
                    )}`}
                  >
                    {item.attributes.Image.data?.attributes.url ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.attributes.Image.data?.attributes.url}`}
                        alt={`${item.attributes.Image.data?.attributes
                          .alternativeText ?? `${item.attributes.Name} Cover`
                          }`}
                        fill
                        className="object-cover"
                        // overrideSrc={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.attributes.Image.data?.attributes.formats.small.url}`}
                      />
                    ) : (
                      <Image
                        src={"https://placehold.co/756x800/png"}
                        alt="placeholder image"
                        fill
                      />
                    )}
                  </Link>
                </m.div>
              </div>
            );
          })}
        </div>
      </section>
    </LazyMotion>
  );
}
