import Link from "next/link";
import React, { ReactElement } from "react";

interface ButtonProps {
  icon?: ReactElement;
  link: string;
  title: string;
  background: string;
  textColor: string;
  iconposition?: string;
  padding:string;
}
export default function Button({
  icon,
  link,
  title,
  background,
  textColor,
  iconposition,
  padding
}: ButtonProps) {
  return (
    <Link
      href={link}
      className={`${background}  ${textColor} ${padding}
      ${
        iconposition == "start" ? " gap-2" : "flex-row-reverse gap-[14px]"
      } flex items-center rounded-lg justify-center transition
      `}
    >
      {icon}
      {title}
    </Link>
  );
}
