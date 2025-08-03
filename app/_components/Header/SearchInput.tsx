"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import Search from "../SVGS/Search";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/navigation";

export default function SearchInput({ setShow }: { setShow?: () => void }) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword) {
      setSearchText(keyword);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (!searchText.trim()) return;
    router.push(`/search?keyword=${encodeURIComponent(searchText)}`);
    if (setShow) setShow(); // optional callback
  };

  return (
    <div className="max-w-[720px] mx-auto flex md:gap-10 gap-2.5 items-center">
      <div className="md:w-[600px] w-[80%] flex items-center border-b border-primary py-2.5 justify-between">
        <span className="w-6 h-6 text-primary">
          <Search />
        </span>
        <input
          type="text"
          placeholder={t("data.search_2")}
          className="w-[calc(100%-40px)] outline-none text-2xl placeholder:text-primary placeholder:opacity-70"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <button
        className="md:w-[calc(100%-600px-40px)] w-[calc(20%-10px)] bg-primary text-white hover:bg-darkblue transition-all duration-500 rounded-sm text-base pt-1.5 pb-1 text-center font-bold"
        onClick={handleSearch}
      >
        {t("Buttons.search")}
      </button>
    </div>
  );
}
