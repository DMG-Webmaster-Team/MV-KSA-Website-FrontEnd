
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
      Name: string;
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
  publishedAt?: string;}

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
  allProjects: Project[];
  isLoading: boolean;
  error: string | null;
  viewCategories: FilterCategory[];
  locationCategories: FilterCategory[];
}

export function useProjectsData(): UseProjectsDataReturn {
  const [projectPageData, setProjectPageData] =
    useState<ProjectPageData | null>(null);
  const [regularProjects, setRegularProjects] = useState<Project[]>([]);
  const [jirianProject, setJirianProject] = useState<JirianProject | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const isArabic = pathname.includes("/ar");
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
  const allProjects: Project[] = [
    ...regularProjects,
  ];

  const viewCategories: FilterCategory[] = Array.from(
    new Set(
      allProjects
        .map((project) => project.view?.data?.attributes?.Name)
        .filter(Boolean)
    )
  ).map((name) => ({ name: name! }));

  const locationCategories: FilterCategory[] = Array.from(
    new Set(
      allProjects
        .map((project) => project.location?.data?.attributes?.Name)
        .filter(Boolean)
    )
  ).map((name) => ({ name: name! }));

  return {
    projectPageData,
    allProjects,
    isLoading,
    error,
    viewCategories,
    locationCategories,
  };
}
