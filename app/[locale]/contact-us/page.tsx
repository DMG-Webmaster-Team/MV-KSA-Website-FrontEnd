export const runtime = "edge";

import ContactUs from "@/app/_components/MainPages/Contactus";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata("contact-us", locale);
}

export default async function page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const Data = await fetchServer("contact-us?", locale);

  return <ContactUs data={Data.data.attributes} />;
}
