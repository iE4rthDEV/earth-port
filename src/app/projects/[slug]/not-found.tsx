import React from "react";
import Button from "@/components/ui/Button";
import PageSection from "@/components/ui/PageSection";

const ProjectNotFound = () => {
  return (
    <PageSection
      spacing="default"
      containerClassName="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center"
    >
      <h1 className="text-page-title font-display font-semibold text-error">
        Project not found
      </h1>
      <p className="font-thai font-normal leading-7 text-base-content/70">
        ไม่พบโปรเจกต์ที่คุณต้องการ
      </p>
      <Button href="/projects" variant="primary">
        Back to Projects
      </Button>
    </PageSection>
  );
};

export default ProjectNotFound;
