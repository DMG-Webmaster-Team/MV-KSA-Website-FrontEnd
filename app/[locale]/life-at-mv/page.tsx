export const runtime = "edge";


import LifeatmvPage from "@/app/_components/MainPages/Lifeatmv";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    return generatePageMetadata("life-at-mv",locale);
}

export default async function page({ params: { locale } }: { params: { locale: string } }) {
    const Data = await fetchServer("life-at-mv",locale);
    return <LifeatmvPage data={Data.data.attributes} />;
}
