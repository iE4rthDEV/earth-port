import type { Metadata } from "next";
import PageSection from "@/components/ui/PageSection";
import ProjectsView from "@/components/sections/ProjectsView";
import { getDictionary } from "@/i18n/dictionaries";
import { createCanonicalAlternates } from "@/i18n/metadata";
import { getRequestLocale } from "@/i18n/server";
import { getProjects } from "@/lib/projects";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.metadata.projectsTitle,
    description: dictionary.metadata.projectsDescription,
    alternates: createCanonicalAlternates("projects"),
  };
};

const ProjectsPage = async () => {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);
  const projects = getProjects(locale);

  return (
    <PageSection
      spacing="compact"
      className="pt-6 pb-14 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20"
      labelledBy="projects-heading"
    >
      <ProjectsView projects={projects} copy={dictionary.projects} />
    </PageSection>
  );
};

export default ProjectsPage;
