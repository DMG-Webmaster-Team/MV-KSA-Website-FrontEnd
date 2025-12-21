import { Metadata } from "next";

export async function fetchServer(pageURL: string, lang: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${pageURL}locale=${lang}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch Props");
    }

    const json = await res.json();
    return { data: json.data };
  } catch (error) {
    console.error("⚠️ fetchServer error:", error);
    return { data: null };
  }
}

export async function getSEOMetadata(slug: string, lang: string, single?: boolean): Promise<Metadata> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${slug}${
      single ? "&" : "?"
    }locale=${lang}&populate[Seo][populate]=*`;
    console.log(url);
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`getSEOMetadata: Failed with status ${res.status}`);
      throw new Error("Failed to fetch SEO metadata");
    }

    const json = await res.json();
    const realData = json?.data;

    if (!realData) {
      return {
        title: "Mountain View KSA",
        description: "Mountain View KSA"
      };
    }

    const seo = single ? realData[0].attributes?.Seo : realData.attributes?.Seo;

    return {
      title: seo?.MetaTitle || "Mountain View KSA",
      description: seo?.MetaDescription || "Mountain View KSA",
      keywords: seo?.Keywords || "",
      openGraph: {
        title: seo?.MetaTitle || "Mountain View KSA",
        description: seo?.MetaDescription || "Mountain View KSA",
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${seo?.Image?.url ?? ""}`
          }
        ]
      }
    };
  } catch (error) {
    console.error("getSEOMetadata error:", error);
    return {
      title: "Mountain View KSA",
      description: "The page not found"
    };
  }
}

export async function SearchBlogs(lang: string, keyword: string) {
  try {
    const SearchApi = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs?filters[Title][$containsi]=${keyword}&locale=${lang}&fields=Title,slug,publishedAt&populate[blogs_type][fields]=Name&populate[WidgetImage][fields]=url,alternativeText`
    );
    const SearchApiData = await SearchApi.json();

    return SearchApiData; // Add a return statement to return the fetched data
  } catch (error) {
    console.error("Error fetching  SearchApi:", error);
    throw error; // You can choose to throw the error or handle it differently
  }
}
export async function SearchCareers(lang: string, keyword: string) {
  try {
    const SearchApi = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/single-careers?filters[Title][$containsi]=${keyword}&locale=${lang}&fields=Title,slug`
    );
    const SearchApiData = await SearchApi.json();

    return SearchApiData; // Add a return statement to return the fetched data
  } catch (error) {
    console.error("Error fetching  SearchApi:", error);
    throw error; // You can choose to throw the error or handle it differently
  }
}

export async function SearchProjects(lang: string, keyword: string) {
  try {
    const SearchApi = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects?filters[HeroSection][Title][$containsi]=${keyword}&locale=${lang}`
    );
    const SearchApiData = await SearchApi.json();

    return SearchApiData; // Add a return statement to return the fetched data
  } catch (error) {
    console.error("Error fetching  SearchApi:", error);
    throw error; // You can choose to throw the error or handle it differently
  }
}

export async function SearchUnits(lang: string, keyword: string) {
  try {
    const SearchApi = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/units?filters[Title][$containsi]=${keyword}&locale=${lang}`
    );
    const SearchApiData = await SearchApi.json();

    return SearchApiData; // Add a return statement to return the fetched data
  } catch (error) {
    console.error("Error fetching  SearchApi:", error);
    throw error; // You can choose to throw the error or handle it differently
  }
}
