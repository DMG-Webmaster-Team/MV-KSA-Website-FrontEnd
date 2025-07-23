export const runtime = "edge";


import InnovationPage from "@/app/_components/MainPages/Innovation";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    return generatePageMetadata("innovation",locale);
}

export default async function page({ params: { locale } }: { params: { locale: string } }) {
    const Data = await fetchServer("innovation?",locale);
    return <InnovationPage data={Data.data.attributes} />;
}
