import { m } from "framer-motion";
import { FilterCategory } from "@/app/hooks/useProjectsData";
import ProjectsFilter from "./ProjectsFilter";

interface FilterControlsProps {
  viewCategories: FilterCategory[];
  locationCategories: FilterCategory[];
  selectedFilter: string | null;
  selectedFilterLocation: string | null;
  isOnSaleOnly: boolean;
  onFilterClick: (filter: string) => void;
  onLocationFilterClick: (filter: string) => void;
  onToggleOnSale: () => void;
  onOpenFilterModal: () => void;
}

export default function FilterControls({
  viewCategories,
  locationCategories,
  selectedFilter,
  selectedFilterLocation,
  isOnSaleOnly,
  onFilterClick,
  onLocationFilterClick,
  onToggleOnSale,
  onOpenFilterModal,
}: FilterControlsProps) {
  return (
    <div className="flex flex-row justify-between items-center gap-5 md:py-10 py-5 lg:mx-10 md:mx-5 mx-4">
      <div className="flex flex-row items-center md:gap-5 gap-2">
        <div className="hidden md:flex flex-row gap-5">
          <div className="flex flex-row items-center md:gap-5 gap-2">
            <div className="flex flex-col md:flex-row items-baseline">
              <h3 className="lg:text-[30px] md:text-base text-sm font-normal lg:leading-[38px] md:leading-7 pr-3 text-[#AAAAAA]">
                View
              </h3>
              <ProjectsFilter
                List={viewCategories}
                setSelectedFilter={onFilterClick}
                selectedFilter={selectedFilter || ""}
                allName="All Views"
              />
            </div>

            <div className="flex md:flex-row flex-col items-baseline">
              <h3 className="lg:text-[30px] md:text-base text-sm font-normal lg:leading-[38px] md:leading-7 pr-3 text-[#AAAAAA]">
                communities in
              </h3>
              <ProjectsFilter
                List={locationCategories}
                setSelectedFilter={onLocationFilterClick}
                selectedFilter={selectedFilterLocation || ""}
                allName="All Locations"
              />
            </div>
          </div>
        </div>

        <div className="md:hidden flex">
          <h3
            className="text-[#003DA6] cursor-pointer"
            onClick={onOpenFilterModal}
          >
            Filter
          </h3>
        </div>
      </div>

      <m.div
        className="flex text-center md:gap-6 gap-2"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, staggerChildren: 0.2 }}
        viewport={{ once: true }}
      >
        <p className="text-[#AAAAAA] md:text-sm text-xs leading-4 mt-1 md:font-medium font-light uppercase">
          Available for Sale
        </p>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isOnSaleOnly}
            onChange={onToggleOnSale}
          />
          <div className="w-11 h-6 bg-[#AAAAAA] rounded-full peer peer-checked:bg-primary relative transition-colors duration-200 ease-in-out">
            <span
              className={`w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform duration-200 ease-in-out ${
                isOnSaleOnly ? "transform translate-x-5" : ""
              }`}
            ></span>
          </div>
        </label>
      </m.div>
    </div>
  );
}
