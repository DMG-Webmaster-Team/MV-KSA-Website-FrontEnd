import HeroSection, { HeroSectionProps } from "../CommonComp/HeroSection";
import OverviewSection, {
  OverviewSectionProps,
} from "../CommonComp/OverviewSection";
import WidgetWithLogo, { WidgetProps } from "../CommonComp/WidgetWithlogo";

interface Props {
  data: {
    HeroSection: HeroSectionProps;
    Overview: OverviewSectionProps;
    Widgets: WidgetProps[];
  };
}
export default function LifeatmvPage({ data }: Props) {
  return (
    <>
      <HeroSection data={data.HeroSection} />
      <OverviewSection data={data.Overview} vision />
      <div className="flex gap-[2px] lg:flex-row flex-col-reverse">
        {data.Widgets.map((item: WidgetProps, index: number) => (
          <WidgetWithLogo data={item} key={index} />
        ))}
      </div>
    </>
  );
}
