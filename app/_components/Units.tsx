import SlickMultipleItems from "./SlickMultipleItems";
import UnitWidget, { SingleUnitProps } from "./UnitWidget";




export interface UnitsProps {
  Title: string;
  Description: string;
  units: {
    data: SingleUnitProps[];
  };
}

export default function Units({ data, ProjectSlug }: { data: UnitsProps, ProjectSlug: string }) {
  return (
    <div className="bg-gray py-[60px] ">
      <div className=" space-y-[28px] relative">
        <div className="max-w-[1448px] px-4 mx-auto space-y-3 ">
          <h2 className=" md:text-[60px] md:leading-[75px] text-4xl text-primary font-medium">
            {data.Title}
          </h2>
          <p className={`${data.Description ? "opacity-50" : " opacity-0 md:block hidden"} text-primary  font-medium text-xl`}>
            {data.Description ?? "here"}
          </p>
        </div>
        <div className="md:block hidden">
          <SlickMultipleItems>
            {data.units.data.map((item: SingleUnitProps, index: number) => (
              <UnitWidget data={item} key={index} ProjectSlug={ProjectSlug} />
            ))}
          </SlickMultipleItems>
        </div>
        <div className="md:hidden">
          {data.units.data.map((item: SingleUnitProps, index: number) => (
            <UnitWidget data={item} key={index} ProjectSlug={ProjectSlug} />
          ))}
        </div>
      </div>

    </div>
  );
}
