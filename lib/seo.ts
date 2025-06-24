
import { getSEOMetadata } from "@/app/api/general";
import { Metadata } from "next";

// FIXME: move the api calling to the apis/general.ts file, handle the error with try-catch when in the calling HTTP request

export async function generatePageMetadata(
  slug: string,
  lang: string,
  single?:boolean
): Promise<Metadata> {
  return await getSEOMetadata(slug,lang,single);
}
