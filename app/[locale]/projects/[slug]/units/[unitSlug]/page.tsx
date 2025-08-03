export const runtime = "edge";

import UnitPage from "@/app/_components/MainPages/UnitPage";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
export async function generateMetadata(props: {
  params: Promise<{ unitSlug: string; locale: string }>;
}): Promise<Metadata> {
    const { unitSlug, locale } = await props.params;

  return generatePageMetadata(
    `units?filters[slug][$eq]=${unitSlug}&`,
    locale,
    true
  );
}

export default async function page(props: {
  params: Promise<{ unitSlug: string; locale: string }>;
}) {
    const { unitSlug, locale } = await props.params;

  const [Data] = await Promise.all([
    fetchServer(`units?filters[slug][$eq]=${unitSlug}&`, locale),
  ]);
  return <UnitPage data={Data.data[0].attributes} />;
}
