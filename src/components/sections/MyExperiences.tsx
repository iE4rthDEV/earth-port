import React from "react";
import ExperienceCard from "@/components/ui/ExperienceCard";
import PageSection from "@/components/ui/PageSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { EXPERIENCES } from "@/data/experiences";

const MyExperiences: React.FC = () => {
  return (
    <PageSection
      id="experience"
      labelledBy="experience-heading"
      muted
      containerClassName="flex flex-col items-center"
    >
      <SectionHeading
        id="experience-heading"
        title="My Experiences"
        className="mb-8 sm:mb-12"
      />
      <div className="w-full space-y-4 sm:space-y-6">
        {EXPERIENCES.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </PageSection>
  );
};

export default MyExperiences;
