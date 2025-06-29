export const runtime = "edge";

import MediaCenter from "@/app/_components/MainPages/MediaCenter";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata("media-center?", locale);
}

export default async function page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [Data, Blogs] = await Promise.all([
    fetchServer("media-center?", locale),
    fetchServer("blogs?fields=Title,slug,publishedAt&populate[blogs_type][fields]=Name&populate[WidgetImage][fields]=url,alternativeText&", locale),
  ]);

  return (
    <MediaCenter
      data={{
        MainData: Data.data.attributes,
        Blogs: Blogs.data,
      }}
    />
  );
}
