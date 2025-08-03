
import { getSEOMetadata } from "@/app/api/general";
import { Metadata } from "next";

export async function generatePageMetadata(
  slug: string,
  lang: string,
  single?: boolean
): Promise<Metadata> {
  return await getSEOMetadata(slug, lang, single);
}
