import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import { getProjectPath } from "@/lib/projects";
import type { Project } from "@/types/project";
import TechBadge from "./TechBadge";

interface ProjectCardProps {
  project: Project;
  variant?: "grid" | "list";
  eagerImage?: boolean;
}

const getCardSummary = (project: Project): string => {
  if (project.summary) return project.summary;
  return project.keyResponsibilities.join(", ");
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = "grid",
  eagerImage = false,
}) => {
  const summary = getCardSummary(project);
  const detailHref = getProjectPath(project);

  if (variant === "list") {
    return (
      <article className="card card-border group relative overflow-hidden border-base-300 bg-base-100 shadow-card transition-[box-shadow,border-color] duration-normal hover:border-primary/40 hover:shadow-card-hover md:card-side">
        <figure className="relative aspect-video w-full shrink-0 border-b border-base-300 md:aspect-[4/3] md:w-80 md:border-r md:border-b-0 xl:w-96">
          <Image
            src={project.project_image}
            alt={project.project_name}
            width={450}
            height={450}
            loading={eagerImage ? "eager" : "lazy"}
            sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) 20rem, 24rem"
            className="h-full w-full object-cover object-top"
          />
          {project.starred && (
            <FaStar className="absolute top-3 right-3 size-7 text-warning drop-shadow" />
          )}
        </figure>
        <div className="card-body min-w-0 p-5 sm:p-6">
          <Link
            href={detailHref}
            aria-label={`View project details: ${project.project_name}`}
            className="after:absolute after:inset-0 focus-visible:rounded-box"
          >
            <h2 className="card-title text-card-title line-clamp-2 font-display font-semibold transition-colors duration-fast group-hover:text-primary">
              {project.project_name}
            </h2>
          </Link>
          <div className="flex flex-wrap items-center gap-1 font-display text-sm sm:gap-2">
            {project.project_tag.map((tag) => (
              <TechBadge key={tag} tag={tag} size="sm" />
            ))}
          </div>
          <p className="line-clamp-3 font-thai text-sm leading-6 text-base-content/70 sm:text-base sm:leading-7 lg:line-clamp-none">
            {summary}
          </p>
          <div className="mt-2">
            <span className="btn btn-soft pointer-events-none min-h-11 px-6">
              View project details
            </span>
          </div>
        </div>
      </article>
    );
  }

  const headingId = `project-${project.project_id}-title`;

  return (
    <article className="card card-border group relative h-full w-full min-w-0 overflow-hidden border-base-300 bg-base-100 shadow-card transition-[transform,box-shadow,border-color] duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover">
      <figure className="relative aspect-video border-b border-base-300">
        <Image
          width={450}
          height={450}
          src={project.project_image}
          alt={project.project_name}
          className="h-full w-full object-cover object-top"
          loading={eagerImage ? "eager" : "lazy"}
          sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 2.25rem), 25rem"
        />
        {project.starred && (
          <FaStar className="absolute top-3 right-3 h-7 w-7 text-warning drop-shadow" />
        )}
      </figure>
      <div className="card-body p-5 lg:py-6">
        <h2
          id={headingId}
          className="card-title text-card-title line-clamp-2 font-display font-semibold capitalize transition-colors duration-fast group-hover:text-primary"
        >
          {project.project_name}
        </h2>
        <p className="line-clamp-2 font-thai text-sm font-normal text-base-content/70">
          {summary}
        </p>
        <div className="mt-2">
          <span className="btn btn-soft btn-primary btn-block">View more</span>
        </div>
      </div>
      <Link
        href={detailHref}
        aria-labelledby={headingId}
        className="absolute inset-0 rounded-box"
      />
    </article>
  );
};

export default ProjectCard;
