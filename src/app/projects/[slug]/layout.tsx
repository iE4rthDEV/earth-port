import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createCanonicalAlternates } from "@/i18n/metadata";
import { getRequestLocale } from "@/i18n/server";
import { getProjectById, getProjectBySlug } from "@/lib/projects";

interface ProjectDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: ProjectDetailLayoutProps): Promise<Metadata> => {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);
  const project =
    getProjectBySlug(slug, locale) ?? getProjectById(slug, locale);

  if (!project) {
    return {
      title: dictionary.metadata.projectNotFoundTitle,
      description: dictionary.errors.projectNotFoundDescription,
    };
  }

  return {
    title: `${project.projectName} | Niti Surakongka`,
    description: project.projectDescription,
    alternates: createCanonicalAlternates(`projects/${project.slug}`),
  };
};

const ProjectDetailLayout = ({ children }: ProjectDetailLayoutProps) => children;

export default ProjectDetailLayout;
