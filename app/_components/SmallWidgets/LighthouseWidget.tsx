import { LighthouseWidgetProps } from "@/app/types/LighthouseWidget";
import Image from "next/image";
import React from "react";

export default function LighthouseWidget({
  data,
}: {
  data: LighthouseWidgetProps;
}) {
  return (
    <div>
      {data?.Image.data && (
        <div className=" relative w-full aspect-[1500/888]">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Image.data?.attributes?.url}`}
            alt={data.Image.data?.attributes?.alternativeText ?? data.Title}
            fill
            className=" object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <h3 className=" text-primary md:text-2xl text-base font-medium mt-4">
        {data.Title}
      </h3>
    </div>
  );
}
