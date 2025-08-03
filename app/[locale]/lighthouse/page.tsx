export const runtime = "edge";

import LighthousePage from "@/app/_components/MainPages/Lighthouse";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata("light-house", locale);
}

export default async function page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const Data = await fetchServer("light-house?", locale);
  return <LighthousePage data={Data.data.attributes} />;
}
