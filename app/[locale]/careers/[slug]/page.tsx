export const runtime = "edge";

import SingleCareerPage from "@/app/_components/MainPages/SingleCareerPage";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  return generatePageMetadata(
    `single-careers?filters[slug][$eq]=${slug}`,
    locale,
    true
  );
}

export default async function page({
  params: { locale , slug},
}: {
  params: { locale: string , slug:string };
}) {
  const [Data] = await Promise.all([
    fetchServer(`single-careers?filters[slug][$eq]=${slug}&`, locale),
  ]);
  return (
    <SingleCareerPage
      data={{
        MainData: Data.data[0]?.attributes,
      }}
    />
  );
}
