import { EXPERIENCE_COPY } from "@/data/experience-copy";
import { EXPERIENCES } from "@/data/experiences";
import type { Locale } from "@/i18n/config";
import type { Experience } from "@/types/experience";

export const getExperiences = (locale: Locale): readonly Experience[] =>
  EXPERIENCES.map((experience) => ({
    ...experience,
    ...EXPERIENCE_COPY[locale][experience.id],
    links: experience.links.map((link) => ({
      id: link.id,
      label: link.label,
      ...("href" in link ? { href: link.href } : {}),
    })),
  }));
