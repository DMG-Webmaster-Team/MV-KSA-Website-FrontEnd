import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ensureFilterNameFromSlug, slugEquals, slugify } from "../../utils/helpers";
import { FilterCategory, Project } from "./useProjectsData";
import { useTranslations } from "next-intl";

export interface UseProjectsFiltersReturn {
  selectedFilter: string | null;
  selectedFilterLocation: string | null;
  isOnSaleOnly: boolean;
  filteredProjects: Project[];
  handleFilterClick: (filter: string) => void;
  handleLocationFilterClick: (filter: string) => void;
  handleToggleOnSale: () => void;
}

interface UseProjectsFiltersProps {
  projects: Project[];
  viewCategories: FilterCategory[];
  locationCategories?: FilterCategory[]; // Add location categories
}

export function useProjectsFilters({
  projects,
  viewCategories,
  locationCategories = [],
}: UseProjectsFiltersProps): UseProjectsFiltersReturn {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const viewQuery = searchParams.get("view");
  const locationQuery = searchParams.get("location");

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedFilterLocation, setSelectedFilterLocation] = useState<
    string | null
  >(null);
  const [isOnSaleOnly, setIsOnSaleOnly] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const t = useTranslations();

  // Initialize filters from URL params
useEffect(() => {
  if (!isInitialized && viewCategories.length > 0) {
    // --- VIEW FILTER SETUP ---
    const mappedName = ensureFilterNameFromSlug(viewQuery, viewCategories);

    if (mappedName) {
      setSelectedFilter(mappedName);
    } else if (viewQuery === "all" || viewQuery === "all-views") {
      setSelectedFilter(t("data.all-view"));
    } else if (!viewQuery) {
      setSelectedFilter(t("data.all-view"));
    } else {
      setSelectedFilter(t("data.all-view"));
    }

    // --- LOCATION FILTER SETUP ---
    if (locationQuery && locationCategories.length > 0) {
      const mappedLocationName = ensureFilterNameFromSlug(
        locationQuery,
        locationCategories
      );

      if (mappedLocationName) {
        setSelectedFilterLocation(mappedLocationName);
      } else if (
        locationQuery === "all" ||
        locationQuery === "all-locations"
      ) {
        setSelectedFilterLocation(t("data.all-locations"));
      } else {
        setSelectedFilterLocation(t("data.all-locations"));
      }
    } else {
      setSelectedFilterLocation(t("data.all-locations"));
    }

    setIsInitialized(true);
  }
}, [
  viewQuery,
  locationQuery,
  viewCategories,
  locationCategories,
  isInitialized,
]);


const filteredProjects = projects.filter((project, index) => {
  // Filter by selected view
  if (selectedFilter && selectedFilter !== t("data.all-view")) {
    const projectViewName =
      project?.attributes.project_view?.data?.attributes?.view;

    if (!slugEquals(projectViewName, selectedFilter)) {
      return false;
    }
  }

  // Filter by location
  if (selectedFilterLocation && selectedFilterLocation !== t("data.all-locations")) {
    const projectLocationName =
      project?.attributes.project_location?.data?.attributes?.name;

    if (projectLocationName !== selectedFilterLocation) {
      return false;
    }
  }

  // Filter by on-sale status
  if (isOnSaleOnly && !project?.attributes.Onsale) {
    return false;
  }

  return true;
});


  const sortedProjects =
    selectedFilter === t("data.all-view")
      ? [...filteredProjects].sort((a, b) => {
          const aDate = a.createdAt || a.updatedAt || a.publishedAt;
          const bDate = b.createdAt || b.updatedAt || b.publishedAt;

          if (aDate && bDate) {
            return new Date(bDate).getTime() - new Date(aDate).getTime();
          }

          return 0;
        })
      : filteredProjects;

  const updateURL = (newFilter?: string, newLocation?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update view param
    if (newFilter !== undefined) {
      if (newFilter === t("data.all-view")) {
        params.delete("view");
      } else {
        params.set("view", slugify(newFilter));
      }
    }

    // Update location param
    if (newLocation !== undefined) {
      if (newLocation === t("data.all-locations")) {
        params.delete("location");
      } else {
        params.set("location", slugify(newLocation));
      }
    }

    const newURL = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    router.replace(newURL, { scroll: false });
  };

  const handleFilterClick = (filter: string) => {
    const normalizedFilter = filter === t("data.all-view") ? t("data.all-view") : filter;
    setSelectedFilter(normalizedFilter);
    updateURL(normalizedFilter, undefined);
  };

  const handleLocationFilterClick = (filter: string) => {
    const normalizedLocation =
      filter === t("data.all-locations") ? t("data.all-locations") : filter;
    setSelectedFilterLocation(normalizedLocation);
    updateURL(undefined, normalizedLocation);
  };

  const handleToggleOnSale = () => {
    setIsOnSaleOnly((prev) => !prev);
  };

  return {
    selectedFilter,
    selectedFilterLocation,
    isOnSaleOnly,
    filteredProjects: sortedProjects,
    handleFilterClick,
    handleLocationFilterClick,
    handleToggleOnSale,
  };
}
