// lib/seo.ts
import { fetchSEO } from "@/app/api/general";
import { Metadata } from "next";

export async function generatePageMetadata(slug: string,locale:string): Promise<Metadata> {
  try {
    const seo = await fetchSEO(slug,locale);
    const realData = seo?.data?.attributes?.Seo;

    if (!realData) {
      return {
        title: "Not Found",
        description: "Not Found",
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
            url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${realData.Image?.data.attributes.url ?? ""}`,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Not Found",
      description: "The page not found",
    };
  }
}
