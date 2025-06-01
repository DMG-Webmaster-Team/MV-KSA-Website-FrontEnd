import { Suspense } from "react";
import HomepageLoading from "../_components/LoadingPages/HomepageLoading";
export const runtime = "edge";

// export async function generateMetadata({
//   params: { locale },
// }: {
//   params: { locale: string };
// }): Promise<Metadata> {

//   try {
//     const seo = await GetSEO(locale, 'home');
//     const realData = seo.props.data.data;
//     if (!realData) {
//       return {
//         title: "not found",
//         description: "not found",
//       };
//     }

//     return {
//       title: realData.seo_title,
//       description: realData.seo_description,
//       keywords: realData.seo_keyword,
//       openGraph: {
//         title: realData.seo_title,
//         description: realData.seo_description,
//         images: [
//           {
//             url: `${ImageLink}${realData.og_image}`,
//           },
//         ],
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching SEO data:", error);
//     return {
//       title: "Not Found",
//       description: "The page not found",
//     };
//   }
// }

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  console.log(locale);
  return (
    <Suspense fallback={<HomepageLoading />}>
      Homepage    </Suspense>
  )
}
