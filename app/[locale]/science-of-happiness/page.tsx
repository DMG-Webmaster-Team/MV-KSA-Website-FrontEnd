export const runtime = "edge";

import ScienceOfHappinessPage from "@/app/_components/MainPages/ScienceOfHappiness";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
type Props = {
  params: { locale: string };
};

export async function generateMetadata(props: { params: Promise<Props["params"]> }): Promise<Metadata> {
    const { locale } = await props.params;

  return generatePageMetadata("science-of-happiness", locale);
}

export default async function page(props: { params: Promise<Props["params"]> }) {
    const { locale } = await props.params;

  const Data = await fetchServer("science-of-happiness?", locale);
  return <ScienceOfHappinessPage data={Data.data.attributes} />;
}
