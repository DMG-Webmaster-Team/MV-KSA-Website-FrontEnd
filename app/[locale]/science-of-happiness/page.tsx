export const runtime = "edge";


import ScienceOfHappinessPage from "@/app/_components/MainPages/ScienceOfHappiness";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    return generatePageMetadata("science-of-happiness", locale);
}

export default async function page({ params: { locale } }: { params: { locale: string } }) {
    const Data = await fetchServer("science-of-happiness", locale);
    return <ScienceOfHappinessPage data={Data.data.attributes} />;
}
