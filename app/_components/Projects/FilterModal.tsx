import { FilterCategory } from "@/app/hooks/useProjectsData";
import { useEffect } from "react";
import Close from "../SVGS/Close";
import { useTranslations } from "next-intl";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  viewCategories: FilterCategory[];
  locationCategories: FilterCategory[];
  selectedFilter: string | null;
  selectedFilterLocation: string | null;
  onFilterClick: (filter: string) => void;
  onLocationFilterClick: (filter: string) => void;
}

export default function FilterModal({
  isOpen,
  onClose,
  viewCategories,
  locationCategories,
  selectedFilter,
  selectedFilterLocation,
  onFilterClick,
  onLocationFilterClick,
}: FilterModalProps) {
      const t = useTranslations();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const CheckIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.143 6.42676L9.557 16.9698L4.2 11.5698L3 12.7698L8.957 18.7698C9.03501 18.8502 9.12822 18.9143 9.23122 18.9585C9.33422 19.0026 9.44495 19.0258 9.557 19.0268C9.66905 19.0258 9.77978 19.0026 9.88278 18.9585C9.98578 18.9143 10.079 18.8502 10.157 18.7698L21.343 7.62676L20.143 6.42676Z"
        fill="#003DA6"
      />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-[12] bg-black bg-opacity-50 flex justify-end">
      <div className="bg-white w-full h-[90%] bottom-[-10%] rounded-t-xl p-5 relative overflow-scroll">
        <button
          className="absolute top-3 rtl:left-3 ltr:right-3 bg-[#F6F6F6] p-3 rounded-full text-primary-200"
          onClick={onClose}
        >
          <Close />
        </button>
        
        <h2 className="text-2xl font-medium text-primary-200">{t("data.filter")}</h2>

        <div className="my-5">
          <h3 className="lg:text-[30px] md:text-base text-sm font-medium lg:leading-[38px] md:leading-7 pr-3 text-[#AAAAAA] uppercase">
            {t("data.project-type")}
          </h3>
          <div className="flex flex-col gap-2">
            {[t("data.all-view"), ...viewCategories.map((category) => category.name)].map(
              (view, index) => (
                <button
                  key={index}
                  onClick={() => onFilterClick(view)}
                  className={`py-2 border-b-[1px] border-[#F2F2F2] rounded flex font-medium items-center justify-between ${
                    selectedFilter === view
                      ? "text-primary-100"
                      : "text-[#222222]"
                  }`}
                >
                  {view}
                  {selectedFilter === view && <CheckIcon />}
                </button>
              )
            )}
          </div>
        </div>

        <div className="my-5">
          <h3 className="lg:text-[30px] md:text-base text-sm font-medium lg:leading-[38px] md:leading-7 pr-3 text-[#AAAAAA] uppercase">
             {t("data.select-location")}
          </h3>
          <div className="flex flex-col gap-2">
            {[t("data.all-locations"), ...locationCategories.map((location) => location.name)].map(
              (location, index) => (
                <button
                  key={index}
                  onClick={() => onLocationFilterClick(location)}
                  className={`py-2 border-b-[1px] border-[#F2F2F2] rounded flex items-center font-medium justify-between ${
                    selectedFilterLocation === location
                      ? "text-primary-100"
                      : "text-[#222222]"
                  }`}
                >
                  {location}
                  {selectedFilterLocation === location && <CheckIcon />}
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex items-end">
          <button
            className="bg-primary-200 text-white py-2 px-6 rounded-[2px] w-full mt-4"
            onClick={onClose}
          >
            Save and continue
          </button>
        </div>
      </div>
    </div>
  );
}
