export interface CanonicalProject {
  projectId: string;
  slug: string;
  projectName: string;
  projectImage: string;
  projectTags: readonly string[];
  projectRoles: readonly string[];
  technologiesUsed: readonly string[];
  githubUrl: string | null;
  liveUrl: string | null;
  featured?: boolean;
  starred?: boolean;
}

export interface LocalizedProjectCopy {
  projectDescription: string;
  summary: string;
  keyResponsibilities: readonly string[];
}

export interface Project extends CanonicalProject, LocalizedProjectCopy {}

export const formatResponsibilities = (
  responsibilities: readonly string[],
): string => responsibilities.join(", ");

export const hasLiveUrl = (url: string | null | undefined): boolean =>
  Boolean(url && url.trim().length > 0);
