import { useState } from "react";
interface ImageData {
  data: {
    attributes: {
      url: string;
      alternativeText: string;
    };
  };
}

interface CategoryData {
  data: {
    attributes: {
      view: string;
    };
  };
}
interface LocationData {
  data: {
    attributes: {
      name: string;
    };
  };
}
interface HeroSection {
  Title: string;
  ShortDescription: string;
  Media: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}
interface ProjectAttributes {
  Title: string;
  Description: string;
  slug?: string;
  Onsale?: boolean;
  Heroimage?: ImageData;
  view?: CategoryData;
  location?: CategoryData;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  HeroSection: HeroSection;
  project_view?: CategoryData;
  project_location?: LocationData;
}

export interface Project {
  Title: string;
  Description: string;
  slug?: string;
  Onsale?: boolean;
  Image?: ImageData;
  view?: CategoryData;
  location?: CategoryData;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  project_view?: CategoryData;
  project_location?: LocationData;
  attributes: ProjectAttributes;
}

export interface JirianProject {
  attributes: ProjectAttributes;
}

export interface ProjectPageData {
  data: {
    attributes: {
      title: string;
      scroll: string;
      HeroImage?: ImageData;
    };
  };
}

export interface FilterCategory {
  name: string;
}

export interface UseProjectsDataReturn {
  projectPageData: any;
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  viewCategories: FilterCategory[];
  locationCategories: FilterCategory[];
}

export function useProjectsData(projects: Project[]) {
  const [projectPageData, setProjectPageData] =
    useState<ProjectPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         setIsLoading(true);
  //         setError(null);

  //         const [projectPageResponse, allProjectsResponse, jirianResponse] =
  //           await Promise.all([
  //             fetchAllProjects(),
  //             fetchLandingPage(isArabic ? "ar" : "en"),
  //           ]);
  //         setProjectPageData(projectPageResponse);
  //         setRegularProjects(allProjectsResponse?.data || []);
  //         setJirianProject(jirianResponse?.data || null);
  //       } catch (err) {
  //         console.error("Error fetching projects data:", err);
  //         setError("Failed to fetch projects data");
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, [isArabic]);

  // Combine all projects - Jirian is fetched separately and will be handled in the filter logic
  // const projects: Project[] = [
  //   ...regularProjects,
  // ];

  const viewCategories: FilterCategory[] = Array.from(
    new Set(
      projects
        .map(
          (project) => project.attributes.project_view?.data?.attributes?.view
        )
        .filter(Boolean)
    )
  ).map((name) => ({ name: name! }));
  const locationCategories: FilterCategory[] = Array.from(
    new Set(
      projects
        .map(
          (project) =>
            project.attributes.project_location?.data?.attributes?.name
        )
        .filter(Boolean)
    )
  ).map((name) => ({ name: name! }));

  return {
    projectPageData,
    projects,
    isLoading,
    error,
    viewCategories,
    locationCategories,
  };
}
