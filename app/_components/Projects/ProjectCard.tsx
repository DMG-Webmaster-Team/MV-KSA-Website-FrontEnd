import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "../SVGS/ArrowRight";
import { Project } from "@/app/hooks/useProjectsData";
import { useLocale, useTranslations } from "next-intl";

interface ProjectCardProps {
  project: Project;
  index: number;
  variants: {
    left: any;
    right: any;
  };
  projectView?: any;
  projectLocation?: any;
}

export default function ProjectCard({ project, index, variants,projectView ,projectLocation}: ProjectCardProps) {
  const isEven = index % 2 === 0;
  const locale = useLocale();
    const t = useTranslations();
  
  return (
    <m.div
      className={`flex flex-col ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={isEven ? variants.left : variants.right}
    >
      <div className="relative md:w-1/2 aspect-[756/800]">
        {project?.attributes?.HeroSection.widgetImage?.data.attributes.url && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${project.attributes.HeroSection.widgetImage?.data.attributes.url}`}
            alt={project.attributes.HeroSection.widgetImage?.data.attributes.alternativeText ?? `${project.Title} Cover`}
            fill
            className="object-cover w-full"
          />
        )}
      </div>

      <div
        className={`text-start flex justify-start items-center md:w-1/2 ${
          index % 2 === 0
            ? "lg:px-10 md:px-2.5 px-4 py-10"
            : "lg:px-10 md:px-2.5 px-4 py-10"
        }`}
      >
        <div>
          <div className="flex justify-start items-center text-center capitalize mt-2">
            {projectView?.data?.attributes?.view && (
              <div className="bg-[#F6F6F6] rounded-full px-3 py-[6px] text-[#969696] ml-2 uppercase font-medium md:text-sm text-xs">
                {projectView.data.attributes.view }
              </div>
            )}
            {projectLocation?.data?.attributes?.name && (
              <div className="bg-[#F6F6F6] rounded-full px-3 py-[6px] text-[#969696] ml-2 uppercase font-medium md:text-sm text-xs">
                {projectLocation.data.attributes.name}
              </div>
            )}
          </div>

          <h2 className="text-primary text-balance md:w-full w-[75%] font-normal pt-2 lg:text-[75px] md:text-5xl text-[44px] ml-2 lg:leading-[96px] md:leading-[66px] leading-[52.8px]">
            {project.attributes.HeroSection.Title}
          </h2>

          <p className="text-primary/50 text-pretty font-normal py-2 ml-2 lg:text-[25px] md:text-xl text-base leading-[22px] lg:leading-[38px] md:leading-[28px]">
            {project.attributes.HeroSection.ShortDescription}
          </p>

          <Link
            prefetch={false}
            href={`${locale == "en" ? "/en/" : "/"}projects/${project.attributes.slug}`}
            className="gap-[6px] hover:gap-3 transition-all duration-300 ease-in-out ml-2 py-2 flex items-center text-primary-200"
          >
            <p className="text-primary-200 font-bold md:text-base text-sm md:leading-[24px] md:pb-0 pb-[2px] leading-5 uppercase pt-1">
            {t("data.discover-projects")} 
            </p>
            <span className="w-5 h-5">
              <ArrowRight className="rtl:rotate-180"/>
            </span>
          </Link>
        </div>
      </div>
    </m.div>
  );
}
