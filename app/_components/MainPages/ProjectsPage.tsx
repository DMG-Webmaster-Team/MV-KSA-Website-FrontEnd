"use client";
import { Project, ProjectPageData, useProjectsData } from "@/app/hooks/useProjectsData";
import { useProjectsFilters } from "@/app/hooks/useProjectsFilters";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import EmptyState from "../Projects/EmptyState";
import FilterControls from "../Projects/FilterControls";
import FilterModal from "../Projects/FilterModal";
import ProjectCard from "../Projects/ProjectCard";

const variants = {
  left: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
  right: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
};

export default function ProjectsPage({
  data,
  List,
  Locations,
  projects,
  page
}: any) {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const {
    // allProjects,
    error,
    viewCategories,
    locationCategories,
  } = useProjectsData(projects);

  const {
    selectedFilter,
    selectedFilterLocation,
    isOnSaleOnly,
    filteredProjects,
    handleFilterClick,
    handleLocationFilterClick,
    handleToggleOnSale,
  } = useProjectsFilters({
    projects,
    viewCategories,
    locationCategories,
  });

  const handleOpenFilterModal = () => setShowFilterModal(true);
  const handleCloseFilterModal = () => setShowFilterModal(false);

  // if (isLoading) {
  //   return <Loading white />;
  // }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error loading projects: {error}</p>
      </div>
    );
  }


  return (
    <>
      <LazyMotion features={domAnimation}>
        <section className="relative mx-auto h-[80vh] custom:h-[100vh] md:h-[90vh] min-h-[620px]">
          <div className="relative w-full h-full">
            {page?.image && (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${page?.image.data.attributes.url}`}
                alt={`${page?.image.data.attributes.alternativeText}`}
                fill
                className="object-cover"
                overrideSrc={`${process.env.NEXT_PUBLIC_API_BASE_URL}${page?.image.data.attributes.url}`}
              />
            )}
            {/* Top gradient to ensure header content stays readable */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />
          </div>
          <m.div
            className="bottom-0 left-0 z-9 absolute w-full text-white"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center items-center gap-10 mb-36 custom:mb-0 pb-5 md:pb-20">
              <h1 className="pb-5 md:pb-20 font-normal text-[42px] md:text-[80px] lg:text-[120px] leading-[52.8px] md:leading-[120px]">
                {page?.title}
              </h1>
            </div>
          
          </m.div>
        </section>
        <section id="projects-section" className="max-w-[1512px] mx-auto">
          <FilterControls
            viewCategories={List}
            locationCategories={Locations}
            selectedFilter={selectedFilter}
            selectedFilterLocation={selectedFilterLocation}
            isOnSaleOnly={isOnSaleOnly}
            onFilterClick={handleFilterClick}
            onLocationFilterClick={handleLocationFilterClick}
            onToggleOnSale={handleToggleOnSale}
            onOpenFilterModal={handleOpenFilterModal}
          />

          <FilterModal
            isOpen={showFilterModal}
            onClose={handleCloseFilterModal}
            viewCategories={viewCategories}
            locationCategories={locationCategories}
            selectedFilter={selectedFilter}
            selectedFilterLocation={selectedFilterLocation}
            onFilterClick={handleFilterClick}
            onLocationFilterClick={handleLocationFilterClick}
          />

       
             {/* {data?.Widgets?.length > 0 ? (
            data.Widgets.map((project:Project, index:any) => ( */}
            {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard
                // key={`${project.attributes.slug}-${index}`}
                key={`${index}`}

                project={project}
                index={index}
                variants={variants}
                projectView={data.project_view}
                projectLocation={data.project_location}


              />
            ))
          ) : (
            <EmptyState />
          )}
        </section>
      </LazyMotion>
    </>
  );
}
