export const runtime = "edge";

import InnovationPage from "@/app/_components/MainPages/Innovation";
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

  return generatePageMetadata("innovation", locale);
}

export default async function page(props: {
  params: Promise<Props["params"]>;
}) {
  const { locale } = await props.params;

  const Data = await fetchServer("innovation?", locale);
  return <InnovationPage data={Data.data.attributes} />;
}
