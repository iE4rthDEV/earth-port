import { getProjects } from "@/lib/projects";
import PageSection from "@/components/ui/PageSection";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import React from "react";

const ProjectsPage = () => {
  const projects = getProjects();

  return (
    <PageSection containerClassName="py-10">
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-offset="100"
        className="mb-8 sm:mb-10"
      >
        <SectionHeading title="All Projects" />
      </div>
      <div className="flex flex-col gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <div
            key={project.project_id}
            data-aos="zoom-in-up"
            data-aos-duration="500"
            data-aos-easing="ease-out"
            data-aos-delay={index * 2}
          >
            <ProjectCard project={project} variant="list" />
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default ProjectsPage;
