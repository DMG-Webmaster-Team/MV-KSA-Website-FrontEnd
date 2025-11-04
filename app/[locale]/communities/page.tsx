export const runtime = "edge";

import CommunitiesPage from "@/app/_components/MainPages/CommunitiesPage";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

type Props = {
  params: { locale: string };
};

export async function generateMetadata(props: {
  params: Promise<Props["params"]>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  return generatePageMetadata("community", locale);
}

export default async function page(props: {
  params: Promise<Props["params"]>;
}) {
  const { locale } = await props.params;

  const [Data, Views] = await Promise.all([
    fetchServer("community?", locale),
    fetchServer("project-views?", locale),
  ]);
  return <CommunitiesPage data={Data.data.attributes} Views={Views} />;
}
