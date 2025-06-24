export const runtime = "edge";


import VisionPage from "@/app/_components/MainPages/Vision";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    return generatePageMetadata("vision?",locale);
}

export default async function page({ params: { locale } }: { params: { locale: string } }) {
    const Data = await fetchServer("vision?",locale);
    return <VisionPage data={Data.data.attributes} />;
}
