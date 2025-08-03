export const runtime = "edge";

import LifeatmvPage from "@/app/_components/MainPages/Lifeatmv";
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

  return generatePageMetadata("life-at-mv", locale);
}

export default async function page(props: {
  params: Promise<Props["params"]>;
}) {
  const { locale } = await props.params;

  const Data = await fetchServer("life-at-mv?", locale);
  return <LifeatmvPage data={Data.data.attributes} />;
}
