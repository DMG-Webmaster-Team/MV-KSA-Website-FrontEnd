import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { slugEquals, ensureFilterNameFromSlug } from "../../utils/helpers";
import { Project, FilterCategory } from "./useProjectsData";
import { slugify } from "../../utils/helpers";

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
  allProjects: Project[];
  viewCategories: FilterCategory[];
  locationCategories?: FilterCategory[]; // Add location categories
}

export function useProjectsFilters({
  allProjects,
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

  // Initialize filters from URL params
  useEffect(() => {
    if (!isInitialized && viewCategories.length > 0) {
      // Initialize view filter
      const mappedName = ensureFilterNameFromSlug(viewQuery, viewCategories);
      if (mappedName) {
        setSelectedFilter(mappedName);
      } else if (viewQuery === "all" || viewQuery === "all-views") {
        setSelectedFilter("All Views");
      } else if (!viewQuery) {
        setSelectedFilter("All Views");
      } else {
        setSelectedFilter("All Views");
      }

      // Initialize location filter
      if (locationQuery && locationCategories.length > 0) {
        const mappedLocationName = ensureFilterNameFromSlug(
          locationQuery,
          locationCategories
        );
        if (mappedLocationName) {
          setSelectedFilterLocation(mappedLocationName);
        } else if (locationQuery === "all" || locationQuery === "all-locations") {
          setSelectedFilterLocation("All Locations");
        } else {
          setSelectedFilterLocation("All Locations");
        }
      } else {
        setSelectedFilterLocation("All Locations");
      }

      setIsInitialized(true);
    }
  }, [viewQuery, locationQuery, viewCategories, locationCategories, isInitialized]);

  const filteredProjects = allProjects.filter((project) => {
    if (selectedFilter && selectedFilter !== "All Views") {
      const projectViewName = project.view?.data?.attributes?.Name;
      if (!slugEquals(projectViewName, selectedFilter)) {
        return false;
      }
    }

    if (selectedFilterLocation && selectedFilterLocation !== "All Locations") {
      const projectLocationName =
        project.location?.data?.attributes?.Name;
      if (projectLocationName !== selectedFilterLocation) {
        return false;
      }
    }

    if (isOnSaleOnly && !project.Onsale) {
      return false;
    }

    return true;
  });

  const sortedProjects =
    selectedFilter === "All Views"
      ? [...filteredProjects].sort((a, b) => {
          const aDate =
            a.createdAt ||
            a.updatedAt ||
            a.publishedAt;
          const bDate =
            b.createdAt ||
            b.updatedAt ||
            b.publishedAt;

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
      if (newFilter === "All Views") {
        params.delete("view");
      } else {
        params.set("view", slugify(newFilter));
      }
    }

    // Update location param
    if (newLocation !== undefined) {
      if (newLocation === "All Locations") {
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
    const normalizedFilter = filter === "All Views" ? "All Views" : filter;
    setSelectedFilter(normalizedFilter);
    updateURL(normalizedFilter, undefined);
  };

  const handleLocationFilterClick = (filter: string) => {
    const normalizedLocation = filter === "All Locations" ? "All Locations" : filter;
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