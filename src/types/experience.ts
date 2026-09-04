export interface ExperienceLink {
  id: string;
  label: string;
  href?: string;
}

export type CanonicalExperienceLink = {
  label: string;
  id: string;
  href?: string;
};

export interface CanonicalExperience {
  id: string;
  role: string;
  organization: string;
  links: readonly CanonicalExperienceLink[];
}

export interface LocalizedExperienceCopy {
  period: string;
  location: string;
  summary: string;
  description: string;
}

export interface Experience
  extends Omit<CanonicalExperience, "links">,
    LocalizedExperienceCopy {
  links: readonly ExperienceLink[];
}
