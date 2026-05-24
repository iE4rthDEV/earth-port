export interface Project {
  project_id: string;
  slug: string;
  project_name: string;
  project_image: string;
  project_description: string;
  project_tag: string[];
  project_responsibilities: string | string[];
  keyResponsibilities: string[];
  technologies_used: string[];
  github_url: string | null;
  live_url: string | null;
  featured?: boolean;
  summary?: string;
}

export const formatResponsibilities = (
  responsibilities: string | string[]
): string => {
  if (Array.isArray(responsibilities)) {
    return responsibilities.join(", ");
  }
  return responsibilities;
};

export const hasLiveUrl = (url: string | null | undefined): boolean =>
  Boolean(url && url.trim().length > 0);
