import React from "react";
import ExperienceCard from "@/components/ui/ExperienceCard";
import PageSection from "@/components/ui/PageSection";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Experience } from "@/types/experience";
import type { Dictionary } from "@/i18n/dictionaries/th";

interface MyExperiencesProps {
  experiences: readonly Experience[];
  heading: string;
  cardCopy: Pick<Dictionary["home"], "showDetails" | "hideDetails"> &
    Pick<Dictionary["common"], "opensNewTab">;
}

const MyExperiences: React.FC<MyExperiencesProps> = ({
  experiences,
  heading,
  cardCopy,
}) => {
  return (
    <PageSection
      id="experience"
      labelledBy="experience-heading"
      muted
      containerClassName="flex flex-col items-center"
    >
      <SectionHeading
        id="experience-heading"
        title={heading}
        className="mb-8 sm:mb-12"
      />
      <div className="w-full space-y-4 sm:space-y-6">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            copy={cardCopy}
          />
        ))}
      </div>
    </PageSection>
  );
};

export default MyExperiences;
