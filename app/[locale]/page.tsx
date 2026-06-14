import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import Homepage from "../_components/MainPages/Homepage";
import { fetchServer } from "../api/general";
export const runtime = "edge";
type Props = {
  params: { locale: string };
};
export async function generateMetadata(props: { params: Promise<Props["params"]> }): Promise<Metadata> {
   const { locale } = await props.params;

 return generatePageMetadata("homepage", locale);
}
export default async function Page(props: { params: Promise<Props["params"]> }) {
    const { locale } = await props.params;

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
        MainData: Data.data?.attributes,
        Blogs: Blogs.data,
      }}
    />
  );
}
