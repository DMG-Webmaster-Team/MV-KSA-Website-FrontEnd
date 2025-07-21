"use client";
import HeroSection, { HeroSectionProps } from "../CommonComp/HeroSection";
import BlogsSection from "../Homepage/BlogsSection";
import Boxes, { BoxProps } from "../Homepage/Boxes";
import LaunchingSection, { LaunchingProps } from "../Homepage/LaunchingSection";
import NumbersList from "../Homepage/NumbersList";
import Rewards, { LogoProps } from "../Homepage/Rewards";
import WidgetSection, { WidgetProps } from "../Homepage/Widget";
import { BlogWidget } from "./MediaCenter";

interface MainDataProps {
  HeroSection: HeroSectionProps;
  OverviewSection: string;
  NumbersList: {
    Title: string;
    Description: string;
  }[];
  BoxOne: BoxProps[];
  LaunchingSection: LaunchingProps;
  Widget: WidgetProps;
  Rewards: {
    Title: string;
    Logos: LogoProps[];
  };
}
interface Props {
  data: {
    MainData: MainDataProps;
    Blogs: BlogWidget[];
  };
}

export default function Homepage({ data }: Props) {
  return (
    <div>
      <HeroSection data={data.MainData.HeroSection} home />
      <div className="max-w-[1144px] mx-auto px-4 pt-20" id="Overview">
        <p className=" text-2xl text-primary text-center">
          {data.MainData.OverviewSection}
        </p>
      </div>

      <NumbersList NumbersList={data.MainData.NumbersList} />
      <LaunchingSection LaunchingSection={data.MainData.LaunchingSection} />
      <Boxes BoxOne={data.MainData.BoxOne} />
      <WidgetSection Widget={data.MainData.Widget} />
      <Rewards
        Title={data.MainData.Rewards.Title}
        Logos={data.MainData.Rewards.Logos}
      />
      <BlogsSection Blogs={data.Blogs} />
    </div>
  );
}
