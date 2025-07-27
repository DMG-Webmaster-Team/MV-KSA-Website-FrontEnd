"use client";

import React, { useState } from "react";
import Search from "../SVGS/Search";
import Close from "../SVGS/Close";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation"; // client-side routing
import { motion, AnimatePresence } from "framer-motion";

export default function SearchComponent({
  StableHeader,
}: {
  StableHeader: boolean;
}) {
  const t = useTranslations();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = () => {
    if (!searchText.trim()) return;
    router.push(`/search?query=${encodeURIComponent(searchText)}`);
  };

  return (
    <>
      <button
        onClick={() => setShowSearch(true)}
        className={` ${
          StableHeader
            ? " text-primary hover:bg-primary hover:text-white"
            : "text-white hover:bg-primary"
        } xl:p-2.5 p-1.5  transition-all duration-500 content-center`}
      >
        <span className=" xl:w-6 xl:h-6 w-5 h-5 block">
          <Search />
        </span>
      </button>
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white w-full fixed top-0 inset-x-0 z-50"
          >
            <div className="relative max-w-[1448px] px-4 mx-auto py-20">
              <button
                onClick={() => setShowSearch(false)}
                className=" text-primary p-4 rounded-full absolute end-0 top-6 bg-Gray05 hover:bg-primary hover:text-white transition-all duration-500"
              >
                <span className="w-6 h-6 block">
                  <Close />
                </span>
              </button>

              <div className="max-w-[720px] mx-auto flex gap-10 items-center">
                <div className="w-[600px] flex items-center border-b border-primary py-2.5 justify-between">
                  <span className=" w-6 h-6 text-primary">
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
                  className="w-[calc(100%-600px-40px)] bg-primary text-white hover:bg-darkblue transition-all duration-500 rounded-sm text-base pt-1.5 pb-1 text-center font-bold"
                  onClick={handleSearch}
                >
                  {t("Buttons.search")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
