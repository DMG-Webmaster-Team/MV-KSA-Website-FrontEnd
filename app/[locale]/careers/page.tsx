export const runtime = "edge";

import CareersPage from "@/app/_components/MainPages/CareersPage";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata("career", locale);
}

export default async function page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // console.log("Fetching with locale:", locale);
  const [Data, AllCareers] = await Promise.all([
    fetchServer("career?", locale),
    fetchServer("single-careers?fields=Title,slug&populate[department][fields]=Name&populate[role_type][fields]=Name&", locale),
  ]);

  return (
    <CareersPage
      data={{
        MainData: Data.data.attributes,
        AllCareersData: AllCareers.data,
      }}
    />
  );
}
