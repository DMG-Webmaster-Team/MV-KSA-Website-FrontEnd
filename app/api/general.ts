import { Metadata } from "next";

export async function fetchServer(pageURL: string, lang: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${pageURL}locale=${lang}`;
    // console.log("💬 fetchServer URL:", url); // ⬅️ Log this
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`❌ fetchServer failed with status ${res.status} for ${pageURL}`);
      throw new Error("Failed to fetch Props");
    }

    const json = await res.json();
    return { data: json.data };
  } catch (error) {
    console.error("⚠️ fetchServer error:", error);
    return { data: null };
  }
}


  export async function getSEOMetadata(
    slug: string,
    lang: string,
  ): Promise<Metadata> {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${slug}?locale=${lang}&populate[Seo][populate]=*`;
  
      const res = await fetch(url);
  
      if (!res.ok) {
        console.error(`getSEOMetadata: Failed with status ${res.status}`);
        throw new Error("Failed to fetch SEO metadata");
      }
  
      const json = await res.json();
      const realData = json?.data?.attributes?.Seo;
  
      if (!realData) {
        return {
          title: "Mountain View KSA",
          description: "Mountain View KSA",
        };
      }
  
      return {
        title: realData.MetaTitle,
        description: realData.MetaDescription,
        keywords: realData.Keywords,
        openGraph: {
          title: realData.MetaTitle,
          description: realData.MetaDescription,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${realData.Image?.url ?? ""}`,
            },
          ],
        },
      };
    } catch (error) {
      console.error("getSEOMetadata error:", error);
      return {
        title: "Mountain View KSA",
        description: "The page not found",
      };
    }
  }