import projectsData from "@/data/project.json";
import type { Project } from "@/types/project";

const projects = projectsData as Project[];

export const getProjects = (): Project[] => projects;

export const getProjectById = (id: string): Project | undefined =>
  projects.find((p) => p.project_id === id);

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getProjectPath = (project: Project): string =>
  `/projects/${project.slug}`;

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured === true);
