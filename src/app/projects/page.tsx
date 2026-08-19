import { getProjects } from "@/lib/projects";
import PageSection from "@/components/ui/PageSection";
import ProjectsView from "@/components/sections/ProjectsView";

const ProjectsPage = () => {
  const projects = getProjects();

  return (
    <PageSection
      spacing="compact"
      className="pt-6 pb-14 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20"
      labelledBy="projects-heading"
    >
      <ProjectsView projects={projects} />
    </PageSection>
  );
};

export default ProjectsPage;
