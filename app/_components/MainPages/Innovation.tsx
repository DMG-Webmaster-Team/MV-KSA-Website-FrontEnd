import React from "react";
import HeroSection from "../CommonComp/HeroSection";
import OverviewSection, {
  OverviewSectionProps,
} from "../CommonComp/OverviewSection";
import Widgets, { WidgetProps } from "../CommonComp/Widgets";
import { HeroSectionProps } from "../_types/Common";

interface Props {
  data: {
    HeroSection: HeroSectionProps;
    OverviewSection: OverviewSectionProps;
    Widgets: WidgetProps[];
  };
}
export default function InnovationPage({ data }: Props) {
  return (
    <>
      <HeroSection data={data.HeroSection} />
      <OverviewSection data={data.OverviewSection} />
      {data?.Widgets?.map((item: WidgetProps, index: number) => (
        <Widgets data={item} key={index} reverse={index % 2 == 0} />
      ))}
    </>
  );
}
