import HeroSection from "../CommonComp/HeroSection";
import LighthouseWidget from "../SmallWidgets/LighthouseWidget";
import OverviewSection, {
} from "../CommonComp/OverviewSection";
import TextComp, { Repeater } from "../CommonComp/TextComp";
import SlickMultipleItems from "../SlickMultipleItems";
import { LighthousePageProps } from "@/app/types/Pages";
import { LighthouseWidgetProps } from "@/app/types/LighthouseWidget";


export default function LighthousePage({ data }: LighthousePageProps) {
  return (
    <>
      <HeroSection data={data.HeroSection} srOnly />
      <div className="mx-auto flex max-w-[1448px] flex-col items-start gap-10 px-4 py-10 md:gap-[50px] md:py-20 lg:flex-row xl:gap-[100px]">
        <div className="w-full md2:w-[calc(50%-25px)] xl:w-[calc(50%-50px)]">
          <OverviewSection data={data.OverviewSection} FullWidth />
        </div>
        <div className="flex w-full flex-col gap-2 md:gap-5 lg:w-[calc(50%-25px)] xl:w-[calc(50%-50px)]">
          {data.Repeater.map((item: Repeater, index: number) => (
            <TextComp data={item} key={index} />
          ))}
        </div>
      </div>
      <div className="relative bg-gray py-10 md:py-20">
        <div className="mx-auto mb-12 max-w-[1448px] px-4">
          <h2 className="text-4xl font-medium text-primary md:text-[60px]">
            {data.Whatweserve.Title}
          </h2>
        </div>
        <SlickMultipleItems>
          {data.Whatweserve.Widgets.map(
            (item: LighthouseWidgetProps, index: number) => (
              <div key={index} className="flex-mobile md:w-[440px]">
                <LighthouseWidget data={item} />
              </div>
            )
          )}
        </SlickMultipleItems>
      </div>
    </>
  );
}
