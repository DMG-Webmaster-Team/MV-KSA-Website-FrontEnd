"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import ArrowRight from "../SVGS/ArrowRight";
import Arrow from "../SVGS/Arrow";

export default function ProjectsFilter({
  List,
  setSelectedFilter,
  selectedFilter,
  allName,
}: any) {
  const [openMenuIndex, setOpenMenuIndex] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = () => {
    setOpenMenuIndex(!openMenuIndex);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenMenuIndex(false);
    }
  };

  useEffect(() => {
    if (openMenuIndex) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuIndex]);

  const handleOptionClick = (item: any) => {
    if (setSelectedFilter) {
      setSelectedFilter(item === null ? allName : item);
    }
    setOpenMenuIndex(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <p
        className="flex items-center justify-center relative appearance-none bg-white border-b-2 border-[#001A70] text-primary py-2 gap-x-2 focus:outline-none lg:text-[30px] md:text-base text-sm font-normal lg:leading-[38px] md:leading-7 cursor-pointer"
        onClick={handleMenuClick}
      >
        {selectedFilter || allName}
        <span className="w-5 h-5">
          <Arrow />
        </span>
      </p>

      {openMenuIndex && (
        <div className="absolute shadow-2xl z-10">
          <ul className="block w-[250px] appearance-none bg-white text-primary py-2 p-2 focus:outline-none lg:text-[25px] md:text-base text-sm font-normal lg:leading-[33px] md:leading-7 cursor-pointer">
            <li onClick={() => handleOptionClick(null)}>{allName}</li>
            {List.map((item: any, index: number) => (
              <li key={index} onClick={() => handleOptionClick(item.name)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
