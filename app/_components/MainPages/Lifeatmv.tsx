import { HeroSectionProps } from "../_types/Common";
import HeroSection from "../CommonComp/HeroSection";
import OverviewSection, {
  OverviewSectionProps,
} from "../CommonComp/OverviewSection";
import WidgetWithLogo, { WidgetProps } from "../CommonComp/WidgetWithLogo";

interface Props {
  data: {
    HeroSection: HeroSectionProps;
    Overview: OverviewSectionProps;
    Widgets: WidgetProps[];
  };
}
export  function LifeAtMVPage({ data }: Props) {
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
