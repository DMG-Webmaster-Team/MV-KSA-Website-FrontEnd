export const runtime = "edge";

import FaqsPage from "@/app/_components/MainPages/FaqsPage";
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

  return generatePageMetadata("faqs-page", locale);
}

export default async function page(props: {
  params: Promise<Props["params"]>;
}) {
  const { locale } = await props.params;

  const [Data, Faqs] = await Promise.all([
    fetchServer("faqs-page?", locale),
    fetchServer("faqs?", locale),
  ]);

  return (
    <FaqsPage
      data={{
        MainData: Data.data.attributes,
        FaqsData: Faqs.data,
      }}
    />
  );
}
