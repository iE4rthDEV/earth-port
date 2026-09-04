import { PROJECT_COPY } from "@/data/project-copy";
import { PROJECTS } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Project } from "@/types/project";

export const getProjects = (locale: Locale): readonly Project[] =>
  PROJECTS.map((project) => ({
    ...project,
    ...PROJECT_COPY[locale][project.projectId],
  }));

export const getProjectById = (
  id: string,
  locale: Locale,
): Project | undefined =>
  getProjects(locale).find((project) => project.projectId === id);

export const getProjectBySlug = (
  slug: string,
  locale: Locale,
): Project | undefined =>
  getProjects(locale).find((project) => project.slug === slug);

export const getProjectPath = (project: Project): string =>
  `/projects/${project.slug}`;

export const getFeaturedProjects = (locale: Locale): readonly Project[] =>
  getProjects(locale).filter((project) => project.featured === true);
