'use client'
import { cairo } from "@/app/fonts";
import { locales } from "@/navigation";
import { useLocale } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import Image from "next/image";
const { useRouter, usePathname } = createSharedPathnamesNavigation({ locales });

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const onLocaleChange = (e: "en" | "ar" | undefined) => {
    const newLocale = e;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={` text-xs text-primary cursor-pointer w-fit`}>
      {locale == "en" ? (
        <p
          className={`flex justify-between items-center gap-1 ${cairo.className}`}
          onClick={() => onLocaleChange("ar")}
        >
          <span className="w-[calc(100%-12px-4px)]">عربي</span>
          <Image
            width={12}
            height={12}
            src={"/ar.png"}
            alt="German image"
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </p>
      ) : (
        <p
          className={`flex justify-between items-center gap-1`}
          onClick={() => onLocaleChange("en")}
        >
          <span className="w-[calc(100%-12px-4px)]">English</span>
          <Image
            width={12}
            height={12}
            src={"/en.png"}
            alt="england image"
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </p>
      )}
    </div>
  );
}
