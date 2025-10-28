import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PartnerShipProps } from "../types/PartnerShip";

export default function PartnerShipSection({
  data,
}: {
  data: PartnerShipProps;
}) {
  return (
    <div className="max-w-[1448px] px-4 mx-auto md:py-20 py-[50px] md:space-y-10 space-y-5">
      <h2 className=" text-primary text-center md:text-[52px] md:leading-[65px] text-[28px] font-medium">
        {data.Title}
      </h2>
      {data.Logo?.data?.map((logoItem: any) => (
        <Link
          key={logoItem.id}
          href={data.Link}
          target="_blank"
          className="md:w-[207px] w-[150px] relative mx-auto aspect-[208/300] block"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${logoItem.attributes.url}`}
            alt={logoItem.attributes.alternativeText ?? "partner logo"}
            fill
            className="object-contain"
          />
        </Link>
      ))}
    </div>
  );
}
