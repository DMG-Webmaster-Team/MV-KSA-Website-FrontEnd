export const runtime = "edge";


import FaqsPage from "@/app/_components/MainPages/FaqsPage";
import { fetchServer } from "@/app/api/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    return generatePageMetadata("faqs-page?", locale);
}

export default async function page({ params: { locale } }: { params: { locale: string } }) {
    const [Data, Faqs] =
        await Promise.all([
            fetchServer("faqs-page?", locale),
            fetchServer("faqs?", locale),
        ]);

    return <FaqsPage
    
    data={{
        MainData: Data.data.attributes,
        FaqsData: Faqs.data,
      }}
 />;
}
