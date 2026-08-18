import React from "react";
import Button from "@/components/ui/Button";

const ProjectNotFound = () => {
  return (
    <div className="container mx-auto space-y-4 px-4 py-20 text-center">
      <p className="font-display text-2xl font-bold text-error">
        Project not found
      </p>
      <p className="font-thai font-normal leading-7 text-base-content/70">
        ไม่พบโปรเจกต์ที่คุณต้องการ
      </p>
      <Button href="/projects" variant="primary" className="leading-6">
        กลับไปหน้า Projects
      </Button>
    </div>
  );
};

export default ProjectNotFound;
