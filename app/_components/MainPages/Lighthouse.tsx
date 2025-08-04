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
      <HeroSection data={data.HeroSection} />
      <div className="flex max-w-[1448px] px-4 mx-auto items-start md:py-20 py-10  xl:gap-[100px] md:gap-[50px] gap-10 lg:flex-row flex-col">
        <div className="xl:w-[calc(50%-50px)] md2:w-[calc(50%-25px)] w-full">
          <OverviewSection data={data.OverviewSection} FullWidth />
        </div>
        <div className="xl:w-[calc(50%-50px)] lg:w-[calc(50%-25px)] w-full flex flex-col md:gap-5 gap-2">
          {data.Repeater.map((item: Repeater, index: number) => (
            <TextComp data={item} key={index} />
          ))}
        </div>
      </div>
      <div className=" bg-gray md:py-20 py-10 relative">
        <div className="max-w-[1448px] px-4 mx-auto mb-10">
          <h2 className=" text-primary md:text-[60px] text-4xl font-medium">
            {data.Whatweserve.Title}
          </h2>
        </div>
        <SlickMultipleItems>
          {data.Whatweserve.Widgets.map(
            (item: LighthouseWidgetProps, index: number) => (
              <div key={index} className="md:w-[440px] flex-mobile">
                <LighthouseWidget data={item} />
              </div>
            )
          )}
        </SlickMultipleItems>
      </div>
    </>
  );
}
