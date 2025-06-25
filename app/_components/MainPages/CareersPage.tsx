"use client";

import Image from "next/image";
import { CareerWidget } from "../_types/Common";
import CareerWidgetComp from "../SmallWidgets/CareerWidgetComp";
import { useState } from "react";
import { useTranslations } from "next-intl";
import FilterSelect from "../Forms/SelectTag";

interface Props {
  data: {
    MainData: {
      Title: string;
      Description: string;
      ListTitle: string;
      HeroImage: {
        data: {
          attributes: {
            url: string;
            alternativeText: string;
          };
        };
      };
      OverviewSection: {
        Title: string;
        Description: string;
      };
    };
    AllCareersData: CareerWidget[];
  };
}

export default function CareersPage({ data }: Props) {
  const t = useTranslations();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRoleType, setSelectedRoleType] = useState("");
  const departments = Array.from(
    new Set(
      data.AllCareersData.map((item) =>
        item.attributes.department.data.attributes.Name.trim()
      )
    )
  );

  const roleTypes = Array.from(
    new Set(
      data.AllCareersData.map((item) =>
        item.attributes.role_type.data.attributes.Name.trim()
      )
    )
  );

  const filteredRoles = data.AllCareersData.filter((item) => {
    const departmentName =
      item.attributes.department.data.attributes.Name.trim();
    const roleTypeName = item.attributes.role_type.data.attributes.Name.trim();

    return (
      (selectedDepartment === "" || departmentName === selectedDepartment) &&
      (selectedRoleType === "" || roleTypeName === selectedRoleType)
    );
  });
console.log(roleTypes.length > 0,"roleTypes.length > 0")
  return (
    <div>
      <div className="py-20  text-center md:space-y-6  mx-auto max-w-[840px]">
        <h1 className="text-primary lg:text-[100px] font-medium lg:leading-[100px] md:text-5xl text-[44px] text-balance">
          {data.MainData.Title}
        </h1>
        <p className=" text-primary md:text-xl text-lg font-medium">
          {data.MainData.Description}
        </p>
      </div>
      <div className="relative aspect-[3840/2560] md:h-[600px] h-[300px] w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.MainData.HeroImage.data.attributes.url}`}
          alt={
            data.MainData.HeroImage.data.attributes.alternativeText ??
            "Careers Image"
          }
          fill
          className=" object-cover"
        />
      </div>
      <div className="max-w-[1112px] mx-auto py-20 xl:px-0 px-4 md:space-y-6 space-y-5 text-center">
        <h2 className=" text-primary md:text-5xl text-[32px] font-medium ">
          {data.MainData.OverviewSection.Title}
        </h2>
        <p className=" text-primary md:text-xl text-sm  font-medium">
          {data.MainData.OverviewSection.Description}
        </p>
      </div>
      <div className="py-6 max-w-[1448px] px-4 mx-auto flex justify-between md:items-center  md:flex-row flex-col gap-y-6">
        <h2 className=" md:text-5xl text-[32px] font-medium text-primary">
          {data.MainData.ListTitle}
        </h2>
        {(roleTypes.length > 0 || departments.length > 0) && (
          <div className="flex gap-5 md:flex-row flex-col md:w-fit w-full">
            {roleTypes.length > 1 && (
              <FilterSelect
                label={t("data.all_role_types")}
                options={roleTypes}
                value={selectedRoleType}
                onChange={setSelectedRoleType}
                title={t("data.role_type")}
              />
            )}
            {departments.length > 1 && (
              <FilterSelect
                label={t("data.all_departments")}
                options={departments}
                value={selectedDepartment}
                onChange={setSelectedDepartment}
                title={t("data.department")}
              />
            )}
          </div>
        )}
      </div>
      <div>
        {filteredRoles.length != 0 ? (
          filteredRoles.map((item: CareerWidget, index: number) => (
            <CareerWidgetComp
              item={item}
              key={index}
              end={index == filteredRoles.length - 1}
            />
          ))
        ) : (
          <div className=" py-20 text-center">
            <p className=" text-lg text-DarkGray">
              {t("data.no_results_found")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
