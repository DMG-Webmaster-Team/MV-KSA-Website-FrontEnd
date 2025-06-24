import React from "react";
import Arrow from "../SVGS/Arrow";

interface FilterSelectProps {
  label: string;
  title: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function FilterSelect({
  label,
  options,
  value,
  onChange,
  title,
}: FilterSelectProps) {
  return (
    <div className="lg:w-[300px] md:w-[200px] w-full border-[1.5px] px-5 py-3 border-Gray04 flex flex-col relative">
      <label className=" text-end text-base text-Gray03 md:block hidden">
        {title}
      </label>
      <select
        className=" appearance-none outline-none text-end text-xl"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{label}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className=" md:w-6 md:h-6 w-4 h-4 text-black absolute inset-y-0 start-5 m-auto ">
        <Arrow />
      </span>
    </div>
  );
}
