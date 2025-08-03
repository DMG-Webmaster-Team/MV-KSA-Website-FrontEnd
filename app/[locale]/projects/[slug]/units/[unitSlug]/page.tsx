export const runtime = "edge";

import UnitPage from "@/app/_components/MainPages/UnitPage";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
export async function generateMetadata({
  params: { locale, unitSlug },
}: {
  params: { locale: string; unitSlug: string };
}): Promise<Metadata> {
  return generatePageMetadata(
    `units?filters[slug][$eq]=${unitSlug}&`,
    locale,
    true
  );
}

export default async function page({
  params: { locale, unitSlug },
}: {
  params: { locale: string; unitSlug: string };
}) {
  const [Data] = await Promise.all([
    fetchServer(`units?filters[slug][$eq]=${unitSlug}&`, locale),
  ]);
  return <UnitPage data={Data.data[0].attributes} />;
}
