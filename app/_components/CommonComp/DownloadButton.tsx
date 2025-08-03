import React from "react";
import PDF from "../SVGS/PDF";
import { saveAs } from "file-saver";

export default function DownloadButton({
  title,
  PDFurl,
  PDFName,
  light,
}: {
  title: string;
  PDFurl: string;
  PDFName: string;
  light?: boolean;
}) {
  const DownloadPdf = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${PDFurl}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );

      if (!res.ok) throw new Error("File not found");

      const blobObj = await res.blob();
      saveAs(blobObj, PDFName);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <button
      onClick={DownloadPdf}
      className={`${
        light
          ? " text-primary bg-Gray05 hover:text-Gray05 hover:bg-primary"
          : "bg-primary hover:bg-darkblue text-white mx-auto"
      } flex items-center  transition-all duration-500  py-3 px-4 rounded-sm w-fit  gap-3`}
    >
      <span className="text-base font-bold -mb-1">{title}</span>
      <span className="w-5 h-5 flex items-center justify-center">
        <svg
          className="w-full h-full"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <PDF />
        </svg>
      </span>
    </button>
  );
}
