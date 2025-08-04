import { HeroSectionProps } from "../_types/Common";
import HeroSection from "../CommonComp/HeroSection";
import { OverviewSectionProps } from "../CommonComp/OverviewSection";
import OverviewSectionRepeater from "../CommonComp/OverviewSectionRepeater";
import { Repeater } from "../CommonComp/TextComp";
import Widgets, { WidgetProps } from "../CommonComp/Widgets";

interface Props {
  data: {
    HeroSection: HeroSectionProps;
    Widgets: WidgetProps[];
    OverviewSection: OverviewSectionProps;
    Repeater: Repeater[];
  };
}
export default function VisionPage({ data }: Props) {
  return (
    <>
      <HeroSection data={data.HeroSection} />
      <OverviewSectionRepeater
        vision
        OverviewSectionData={data.OverviewSection}
        Repeater={data.Repeater}
      />

      {data?.Widgets?.map((item: WidgetProps, index: number) => (
        <Widgets data={item} key={index} reverse={index % 2 == 0} />
      ))}
    </>
  );
}
