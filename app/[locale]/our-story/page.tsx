export const runtime = "edge";


import OurStory from "@/app/_components/MainPages/OurStory";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    return generatePageMetadata("our-story",locale);
}

export default async function page({ params: { locale } }: { params: { locale: string } }) {
    const Data = await fetchServer("our-story",locale);
    return <OurStory data={Data.data.attributes} />;
}
