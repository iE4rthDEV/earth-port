import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getProjectPath } from "@/lib/projects";
import type { Project } from "@/types/project";
import TechBadge from "./TechBadge";
import ProjectLinks from "./ProjectLinks";

interface ProjectCardProps {
  project: Project;
  variant?: "grid" | "list";
}

const getCardSummary = (project: Project): string => {
  if (project.summary) return project.summary;
  return project.keyResponsibilities.join(", ");
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = "grid",
}) => {
  const summary = getCardSummary(project);
  const detailHref = getProjectPath(project);

  if (variant === "list") {
    return (
      <div className="card md:card-side card-surface overflow-hidden hover:bg-base-200/50">
        <Link href={detailHref} className="shrink-0">
          <Image
            src={project.project_image}
            alt={project.project_name}
            width={450}
            height={450}
            loading="lazy"
            className="h-auto sm:w-72 md:w-80 xl:w-[28rem] aspect-[16/9] object-cover object-top border border-stone-100 rounded-t-xl sm:rounded-s-xl sm:rounded-e-none"
          />
        </Link>
        <div className="card-body p-4 md:p-6">
          <Link href={detailHref}>
            <h2 className="card-title font-Outfit text-xl transition duration-300 hover:text-primary">
              {project.project_name}
            </h2>
          </Link>
          <div className="tech-stack-2">
            {project.project_tag.map((tag) => (
              <TechBadge key={tag} tag={tag} size="sm" />
            ))}
          </div>
          <p className="description">{summary}</p>
          <ProjectLinks
            liveUrl={project.live_url}
            githubUrl={project.github_url}
          />
        </div>
      </div>
    );
  }

  return (
    <Link
      href={detailHref}
      className="card card-surface w-72 sm:w-80 lg:w-96 overflow-hidden block hover:-translate-y-1"
    >
      <figure className="relative">
        <Image
          width={450}
          height={450}
          src={project.project_image}
          alt={project.project_name}
          className="w-full h-96 object-cover object-top"
          loading="lazy"
        />
      </figure>
      <div className="card-body p-5 lg:py-6">
        <h2 className="card-title font-Outfit text-base sm:text-xl font-medium capitalize line-clamp-1 transition duration-300 hover:text-primary">
          {project.project_name}
        </h2>
        <p className="font-Kanit text-sm text-text-muted line-clamp-2">
          {summary}
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
