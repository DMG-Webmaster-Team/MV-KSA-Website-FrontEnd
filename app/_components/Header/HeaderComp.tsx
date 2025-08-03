import { fetchServer } from "@/app/api/general";
import React from "react";
import MainHeader from "./MainHeader";

export default async function HeaderComp({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const Header = await fetchServer("general-page?", locale);
  return <MainHeader data={Header.data.attributes.Header} />;
}
