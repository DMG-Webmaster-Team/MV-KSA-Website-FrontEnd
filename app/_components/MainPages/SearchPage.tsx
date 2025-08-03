"use client";

import {
  SearchBlogs,
  SearchCareers,
  SearchProjects,
  SearchUnits,
} from "@/app/api/general";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BreadCrumbs from "../CommonComp/BreadCrumbs";
import SearchInput from "../Header/SearchInput";

// Define TypeScript interfaces for better type safety
interface SearchResult {
  id: number;
  attributes: {
    Title: string;
    slug: string;
  };
  __source: "blog" | "career" | "project" | "unit";
}

interface PathConfig {
  basePath: string;
  badgeText: string;
}

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const t = useTranslations();
  const locale = useLocale();
  const keyword = searchParams.get("keyword") || "";
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel for better performance
        const [blogsRes, careersRes, projectsRes, unitsRes] = await Promise.all(
          [
            SearchBlogs(locale, keyword),
            SearchCareers(locale, keyword),
            SearchProjects(locale, keyword),
            SearchUnits(locale, keyword),
          ]
        );

        // Helper function to map and tag results
        const tagResults = (
          data: SearchResult[],
          source: SearchResult["__source"]
        ) => data.map((item) => ({ ...item, __source: source }));

        const combinedResults = [
          ...tagResults(blogsRes.data, "blog"),
          ...tagResults(careersRes.data, "career"),
          ...tagResults(projectsRes.data, "project"),
          ...tagResults(unitsRes.data, "unit"),
        ];

        setSearchResults(combinedResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (keyword) {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [keyword, locale]);

  const breadcrumbsList = [
    { Name: t("Menu.home"), Link: locale === "en" ? "/en" : "/" },
    { Name: t("Buttons.search") },
  ];

  // Path configuration map for cleaner code
  const pathConfigs: Record<SearchResult["__source"], PathConfig> = {
    blog: { basePath: "media-center", badgeText: t("data.news") },
    career: { basePath: "careers", badgeText: t("data.work") },
    project: { basePath: "projects", badgeText: t("data.project") },
    unit: {
      basePath: "projects/one-mountain-view/units",
      badgeText: t("data.unit"),
    },
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 md:py-10 py-5">
      <div className="text-center flex flex-col justify-center items-center md:py-20 py-7 gap-6">
        <BreadCrumbs ListProps={breadcrumbsList} />
        <h1 className="md:text-[100px] text-6xl font-medium text-primary">
          {t("Buttons.search")}
        </h1>
      </div>
      <div className="md:mt-[60px] mt-10 space-y-5">
        <SearchInput />
        {searchResults.length === 0 ? (
          <p className="py-10 text-primary text-center">
            {t("data.no_result")}
          </p>
        ) : (
          <ul className="space-y-5">
            {searchResults.map((item) => {
              const { Title, slug } = item.attributes;
              const { basePath, badgeText } = pathConfigs[item.__source];
              const baseUrl = locale === "en" ? "/en" : "/";

              return (
                <Link
                  href={`${baseUrl}${basePath}/${slug}`}
                  key={`${item.__source}-${item.id}`}
                  className="bg-beige p-6 md:space-y-[90px] space-y-10 block hover:bg-beige/90 transition-colors"
                >
                  <p className="bg-white w-fit py-[3px] px-1.5 rounded-[1px]">
                    <span className="text-black opacity-50">{badgeText}</span>
                  </p>
                  <div>
                    <h2 className="text-darkblue md:text-5xl text-3xl font-medium">
                      {Title}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
