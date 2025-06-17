import { locales } from '@/navigation';
import { useLocale } from 'next-intl';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import Arrow from '../SVGS/Arrow';
import { useEffect, useState } from 'react';
const { useRouter, usePathname } = createSharedPathnamesNavigation({ locales });
export default function LangSwitcher({ DesktopHeader }: { DesktopHeader?: boolean }) {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, toggleOpen] = useState(false);
    const onLocaleChange = (e: "en" | "ar" | undefined) => {
        const newLocale = e;
        router.replace(pathname, { locale: newLocale });
    };
    const setisOpenlang = () => {
        toggleOpen(!isOpen);
    };
    useEffect(() => {
        toggleOpen(false);
    }, [pathname]);
    return (
        <div className=" relative">
            <button className={`${DesktopHeader ? "lg:text-primary" : "lg:text-white"} text-white flex gap-1 border-b hover:text-opacity-50 duration-500 transition-all`}
                onClick={setisOpenlang}
            >
                {locale == "en" ? "EN" : "AR"}
                <span className=" w-5 h-5"><Arrow /></span></button>
            {isOpen &&
                <div className=" absolute w-[200px] p-2 bg-white rounded-lg top-12 flex flex-col gap-1"
                style={{boxShadow:"0px 4px 12px 0px #0000001A"}}
                >
                    <p
                        onClick={() => onLocaleChange("ar")}
                        className={`text-xl font-medium ${locale == "ar" ? " bg-gray pointer-events-none" : " cursor-pointer"} text-primary p-3 rounded-lg hover:bg-gray transition-all duration-500 `}>العربية</p>
                    <p
                        onClick={() => onLocaleChange("en")}
                        className={`text-xl font-medium ${locale == "en" ? " bg-gray pointer-events-none" : " cursor-pointer"} text-primary p-3 rounded-lg hover:bg-gray transition-all duration-500 `}>English</p>
                </div>
            }

        </div>
    )
}
