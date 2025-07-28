"use client";

import { useState } from "react";
import Close from "../SVGS/Close";
import Search from "../SVGS/Search";

import { AnimatePresence, motion } from "framer-motion";
import SearchInput from "./SearchInput";

export default function SearchComponent({
  StableHeader,
}: {
  StableHeader: boolean;
}) {

  const [showSearch, setShowSearch] = useState(false);


  return (
    <>
      <button
        onClick={() => setShowSearch(true)}
        className={` ${StableHeader
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

              <SearchInput setShow={() => setShowSearch(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
