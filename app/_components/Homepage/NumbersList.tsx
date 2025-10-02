import React from "react";

export default function NumbersList({
  NumbersList,
}: {
  NumbersList: {
    Title: string;
    Description: string;
  }[];
}) {
  return (
    <>
      <div className=" my-10 max-w-[1200px] mx-auto md:flex-row flex-col flex rtl:divide-x-reverse divide-x-2 divide-primary gap-y-10 flex-wrap divide-opacity-10">
        {NumbersList.slice(0, 3).map(
          (item: { Title: string; Description: string }, index: number) => (
            <div
              key={index}
              className="md:w-[calc(100%/3)] w-full text-center space-y-3"
            >
              <h3
                className=" xl:text-7xl text-5xl text-medium font-Poppins text-primary"
                style={{ direction: "ltr" }}
              >
                {item.Title}
              </h3>
              <p className="text-primary xl:text-xl md:text-lg text-sm font-medium opacity-50">
                {item.Description}
              </p>
            </div>
          )
        )}
      </div>
      <div className=" my-10 max-w-[1200px] mx-auto md:flex-row flex-col flex rtl:divide-x-reverse divide-x-2 divide-primary gap-y-10 flex-wrap divide-opacity-10 mb-20">
        {NumbersList.slice(3, 6).map(
          (item: { Title: string; Description: string }, index: number) => (
            <div
              key={index}
              className="md:w-[calc(100%/3)] w-full text-center space-y-3"
            >
              <h3
                className=" xl:text-7xl text-5xl text-medium font-Poppins text-primary"
                style={{ direction: "ltr" }}
              >
                {item.Title}
              </h3>
              <p className="text-primary xl:text-xl md:text-lg text-sm font-medium opacity-50">
                {item.Description}
              </p>
            </div>
          )
        )}
      </div>
    </>
  );
}
