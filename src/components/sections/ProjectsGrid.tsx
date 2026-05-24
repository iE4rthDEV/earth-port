import React from "react";
import { getFeaturedProjects } from "@/lib/projects";
import PageSection from "@/components/ui/PageSection";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";

const ProjectsGrid = () => {
  const projects = getFeaturedProjects();

  return (
    <PageSection containerClassName="py-10 sm:py-20">
      <div className="mb-8 sm:mb-10">
        <SectionHeading
          title="Curated"
          highlight="Works"
          aosProps={{
            "data-aos": "fade-down",
            "data-aos-delay": "100",
            "data-aos-easing": "ease-out",
            "data-aos-duration": "800",
          }}
        />
      </div>
      <div
        data-aos="fade-up"
        data-aos-easing="ease-out"
        data-aos-duration="800"
        className="flex justify-center"
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.project_id} project={project} variant="grid" />
          ))}
        </div>
      </div>
    </PageSection>
  );
};

export default ProjectsGrid;
