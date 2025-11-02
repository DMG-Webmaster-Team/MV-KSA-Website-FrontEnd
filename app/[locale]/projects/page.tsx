export const runtime = "edge";

import ProjectsPage from "@/app/_components/MainPages/ProjectsPage";
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

  return generatePageMetadata("projects", locale);
}

export default async function page(props: {
  params: Promise<Props["params"]>;
}) {
  const { locale } = await props.params;

  const Data = await fetchServer("projects?", locale);
  return <ProjectsPage data={Data.data[0].attributes} List={Data.data[0].attributes.List} Locations={Data.data[0].attributes.Locations}/>;
}
