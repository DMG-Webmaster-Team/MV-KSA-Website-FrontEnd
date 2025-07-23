import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import Homepage from "../_components/MainPages/Homepage";
import { fetchServer } from "../api/general";
export const runtime = "edge";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata("homepage", locale);
}
export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [Data, Blogs] = await Promise.all([
    fetchServer("homepage?", locale),
    fetchServer(
      "blogs?fields=Title,slug,publishedAt&populate[blogs_type][fields]=Name&populate[WidgetImage][fields]=url,alternativeText&",
      locale
    ),
  ]);

  return (
    <Homepage
      data={{
        MainData: Data.data.attributes,
        Blogs: Blogs.data,
      }}
    />
  );
}
