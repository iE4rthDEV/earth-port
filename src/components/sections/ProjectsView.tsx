"use client";

import AOS from "aos";
import React, { useEffect, useState } from "react";
import { FiGrid, FiList } from "react-icons/fi";
import type { Project } from "@/types/project";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { projectsPageSubtitle } from "@/data/site-copy";

interface ProjectsViewProps {
  projects: Project[];
}

type ProjectsViewMode = "grid" | "list";

const ProjectsView: React.FC<ProjectsViewProps> = ({ projects }) => {
  const [viewMode, setViewMode] = useState<ProjectsViewMode>("grid");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      AOS.refreshHard();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [viewMode]);

  const isGrid = viewMode === "grid";

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4 sm:mb-10">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-offset="100"
          className="min-w-0 flex-1"
        >
          <SectionHeading
            id="projects-heading"
            as="h1"
            title="The Work I’ve Done"
            className="lg:text-left"
          />
          <p className="mt-2 text-balance text-center font-thai text-sm leading-6 text-base-content/65 sm:text-base lg:text-left">
            {projectsPageSubtitle}
          </p>
        </div>
        <div
          role="group"
          aria-label="Project view"
          className="hidden shrink-0 items-center gap-1 rounded-field bg-base-200 border border-gray-100 py-1 px-2 lg:flex"
        >
          <button
            type="button"
            aria-label="Grid view"
            aria-pressed={isGrid}
            title="Grid view"
            className={`btn btn-sm size-9 p-0 ${isGrid ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setViewMode("grid")}
          >
            <FiGrid aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            aria-label="List view"
            aria-pressed={!isGrid}
            title="List view"
            className={`btn btn-sm size-9 p-0 ${isGrid ? "btn-ghost" : "btn-primary"}`}
            onClick={() => setViewMode("list")}
          >
            <FiList aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      <div
        key={viewMode}
        className={
          isGrid
            ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            : "flex flex-col gap-6 sm:gap-8"
        }
      >
        {projects.map((project, index) => (
          <div
            key={project.project_id}
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-easing="ease-out"
            data-aos-delay={isGrid ? index * 60 : 0}
            data-aos-offset="80"
          >
            <ProjectCard
              project={project}
              variant={viewMode}
              linkMode={isGrid ? "button" : "card"}
              ctaVariant="soft"
              eagerImage={index === 0}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectsView;
