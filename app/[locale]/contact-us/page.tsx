export const runtime = "edge";

import ContactUs from "@/app/_components/MainPages/Contactus";
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

  return generatePageMetadata("contact-us", locale);
}

export default async function page(props: {
  params: Promise<Props["params"]>;
}) {
  const { locale } = await props.params;

  const Data = await fetchServer("contact-us?", locale);

  return <ContactUs data={Data.data.attributes} />;
}
