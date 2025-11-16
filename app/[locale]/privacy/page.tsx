export const runtime = "edge";

import PrivacyPage from "@/app/_components/MainPages/PrivacyPage";
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

  return generatePageMetadata("privacy-page", locale);
}

export default async function page(props: {
  params: Promise<Props["params"]>;
}) {
  const { locale } = await props.params;

  const Data = await fetchServer("privacy-page?", locale);
  console.log(Data)
  return <PrivacyPage data={Data.data.attributes} />;
}
