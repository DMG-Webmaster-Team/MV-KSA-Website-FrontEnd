export const runtime = "edge";

import CalendlyPage from "@/app/_components/MainPages/CalendlyPage";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata("calendly", locale);
}

export default async function page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const Data = await fetchServer("calendly?", locale);
  return <CalendlyPage data={Data.data.attributes} />;
}
