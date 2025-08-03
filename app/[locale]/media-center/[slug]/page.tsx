export const runtime = "edge";

import SingleBlog from "@/app/_components/MainPages/SingleBlog";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
    const { slug, locale } = await props.params;

  return generatePageMetadata(
    `blogs?filters[slug][$eq]=${slug}&`,
    locale,
    true
  );
}

export default async function page(props: {
  params: Promise<{ slug: string; locale: string }>;
}) {
    const { slug, locale } = await props.params;

  const [Data] = await Promise.all([
    fetchServer(`blogs?filters[slug][$eq]=${slug}&`, locale),
  ]);
  return (
    <SingleBlog
      data={{
        MainData: Data.data[0]?.attributes,
      }}
    />
  );
}
