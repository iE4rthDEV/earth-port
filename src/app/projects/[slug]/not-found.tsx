import React from "react";
import Button from "@/components/ui/Button";

const ProjectNotFound = () => {
  return (
    <div className="container mx-auto space-y-4 px-4 py-20 text-center">
      <p className="font-Outfit text-2xl font-medium text-red-500">
        Project not found
      </p>
      <p className="font-Kanit font-light text-text-muted">
        ไม่พบโปรเจกต์ที่คุณต้องการ
      </p>
      <Button href="/projects" variant="primary">
        กลับไปหน้า Projects
      </Button>
    </div>
  );
};

export default ProjectNotFound;
