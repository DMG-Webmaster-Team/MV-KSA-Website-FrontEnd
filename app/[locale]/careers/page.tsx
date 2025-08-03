export const runtime = "edge";

import CareersPage from "@/app/_components/MainPages/CareersPage";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
type Props = {
  params: { locale: string };
};
export async function generateMetadata(props: {
  params: Promise<Props["params"]>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  return generatePageMetadata("career", locale);
}

export default async function page(props: {
  params: Promise<Props["params"]>;
}) {
  const { locale } = await props.params;

  const [Data, AllCareers] = await Promise.all([
    fetchServer("career?", locale),
    fetchServer(
      "single-careers?fields=Title,slug&populate[department][fields]=Name&populate[role_type][fields]=Name&",
      locale
    ),
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
