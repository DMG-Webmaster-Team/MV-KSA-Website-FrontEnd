export const runtime = "edge";

import SingleProject from "@/app/_components/MainPages/SingleProject";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  return generatePageMetadata(
    `projects?filters[slug][$eq]=${slug}&`,
    locale,
    true
  );
}

export default async function page({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const [Data] = await Promise.all([
    fetchServer(`projects?filters[slug][$eq]=${slug}&`, locale),
  ]);
  return (
    <SingleProject
      data={{
        MainData: Data.data[0]?.attributes,
      }}
    />
  );
}
