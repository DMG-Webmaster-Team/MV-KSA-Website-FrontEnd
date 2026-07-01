export const runtime = "edge";

import SingleProject from "@/app/_components/MainPages/SingleProject";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
    const { slug, locale } = await props.params;

  return generatePageMetadata(
    `projects?filters[slug][$eq]=${slug}&`,
    locale,
    true
  );
}

export default async function page(props: {
  params: Promise<{ slug: string; locale: string }>;
}) {
    const { slug, locale } = await props.params;

  const [Data] = await Promise.all([
    fetchServer(`projects?filters[slug][$eq]=${slug}&`, locale),
  ]);

  const attributes = Data?.data?.[0]?.attributes;
  if (!attributes) notFound();

  return (
    <SingleProject
      data={{
        MainData: attributes,
      }}
    />
  );
}
