export const runtime = "edge";

import TheStringPage from "@/app/_components/MainPages/TheStringPage";
import { Metadata } from "next";

type Props = {
  params: { locale: string };
};

export async function generateMetadata(props: {
  params: Promise<Props["params"]>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? "تحقق من أهليتك للتمويل | ماونتن فيو السعودية"
      : "Check Your Financing Eligibility | Mountain View KSA",
    description: isArabic
      ? "اكتشف ما إذا كنت مؤهلاً للحصول على تمويل لمنزلك المستقبلي في ماونتن فيو السعودية."
      : "Find out if you're eligible for financing on your future home at Mountain View KSA.",
  };
}

export default function page() {
  return <TheStringPage />;
}
