// app/search/page.tsx or pages/search.tsx (based on your routing style)
"use client";

import { SearchBlogs, SearchCareers, SearchProjects, SearchUnits } from "@/app/api/general";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BreadCrumbs from "../CommonComp/BreadCrumbs";
import SearchInput from "../Header/SearchInput";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const t = useTranslations();
  const keyword = searchParams.get('keyword') || '';
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const locale = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await SearchBlogs(locale, keyword);
        const response2 = await SearchCareers(locale, keyword);
        const response3 = await SearchProjects(locale, keyword);
        const response4 = await SearchUnits(locale, keyword);



        const combinedResults = [...response1.data,
        ...response2.data,
        ...response3.data, ...response4.data
        ];
        setSearchResults(combinedResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (keyword) {
      fetchData();
    }
  }, [keyword, locale]);
  const List = [
    { Name: t("Menu.home"), Link: locale == "en" ? "/en" : "/" },
    { Name: t("Buttons.search") },
  ];
  console.log(searchResults)
  return (
    <div className="max-w-[1000px] mx-auto px-4 md:py-10 py-5">
      <div className="text-center flex flex-col justify-center items-center md:py-20 py-7 gap-6">
        <BreadCrumbs ListProps={List} />
        <h1 className="md:text-[100px] text-6xl font-medium text-primary">{t("Buttons.search")}</h1>
      </div>
      <div className=" md:mt-[60px] mt-10 space-y-5">
        <SearchInput />
        {searchResults.length === 0 ? (
          <p className=" py-10 text-primary text-center">{t("data.no_result")}</p>
        ) : (
          <ul className="space-y-5">
            {searchResults.map((item: any) => (
              <Link
                href={`${locale == "en" ? "/en" : "/"}${item.attributes?.blogs_type?.data ? "media-center" : "careers"}/${item.attributes.slug}`}
                key={item.id} className="bg-beige p-6 md:space-y-[90px] space-y-10 block">
                <p className="bg-white w-fit py-[3px] px-1.5 rounded-[1px]">
                  <span className=" text-black opacity-50">
                    {item.attributes?.blogs_type?.data ? t("data.news") : t("data.work")}
                  </span>
                </p>
                <div>
                  <h2 className="text-darkblue md:text-5xl text-3xl font-medium">{item.attributes.Title}</h2>
                </div>
              </Link>
            ))}
          </ul>
        )}
      </div>

    </div>
  );

}
