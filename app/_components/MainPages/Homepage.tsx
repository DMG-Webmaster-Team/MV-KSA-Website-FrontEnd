"use client";
import { HomepageProps } from "@/app/types/Pages";
import HeroSection from "../CommonComp/HeroSection";
import BlogsSection from "../Homepage/BlogsSection";
import Boxes from "../Homepage/Boxes";
import LaunchingSection from "../Homepage/LaunchingSection";
import NumbersList from "../Homepage/NumbersList";
import Rewards from "../Homepage/Rewards";
import WidgetSection from "../Homepage/Widget";

export default function Homepage({ data }: HomepageProps) {
  return (
    <div>
      <HeroSection data={data.MainData.HeroSection} home />
      <div className="mx-auto max-w-[1144px] px-4 pt-10 md:pt-20" id="Overview">
        <p className="text-center text-base text-primary md:text-2xl">
          {data.MainData.OverviewSection}
        </p>
      </div>

      <NumbersList NumbersList={data.MainData.NumbersList} />
      <LaunchingSection LaunchingSection={data.MainData.LaunchingSection} />
      {data.MainData.LaunchingSection2 && (
        <LaunchingSection LaunchingSection={data.MainData.LaunchingSection2} second />
      )}
      <Boxes BoxOne={data.MainData.BoxOne} />
      {data.MainData.Widget && <WidgetSection Widget={data.MainData.Widget} />}

      {data.MainData?.Rewards?.Logos.length > 0 && (
        <Rewards
          Title={data?.MainData.Rewards?.Title}
          Logos={data.MainData.Rewards.Logos}
        />
      )}

      <BlogsSection Blogs={data.Blogs} />
    </div>
  );
}
