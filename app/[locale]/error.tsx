"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-5xl font-medium text-primary md:text-7xl">
          نعمل على صيانة الموقع
        </h1>
        <p className="text-xl font-medium text-primary opacity-50 md:text-2xl">
          We&apos;re currently under maintenance
        </p>
        <p className="text-base font-medium text-primary opacity-40">
          سنعود قريباً — We&apos;ll be back shortly
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-sm bg-primary px-6 py-3 text-sm font-bold text-white transition-all duration-500 hover:bg-darkblue"
        >
          حاول مجدداً — Try again
        </button>
        <Link
          href="/"
          className="rounded-sm bg-gray-100 px-6 py-3 text-sm font-bold text-primary transition-all duration-500 hover:bg-gray-200"
        >
          الصفحة الرئيسية — Home
        </Link>
      </div>
    </div>
  );
}
