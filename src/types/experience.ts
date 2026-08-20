export interface ExperienceLink {
  label: string;
  href?: string;
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  summary: string;
  description: string;
  links: readonly ExperienceLink[];
}
