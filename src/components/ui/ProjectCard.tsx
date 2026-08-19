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
      <div className="card card-border overflow-hidden rounded-box border-gray-100 bg-base-100 shadow-sm transition duration-300 hover:border-primary/40 hover:bg-base-200/50 hover:shadow-md md:card-side">
        <Link href={detailHref} className="relative shrink-0">
          <Image
            src={project.project_image}
            alt={project.project_name}
            width={450}
            height={450}
            loading="lazy"
            className="aspect-video h-auto rounded-t-xl border-b border-gray-200 object-cover object-top sm:w-72 sm:rounded-s-xl sm:rounded-e-none sm:border-b-0 sm:border-r md:w-80 md:h-full xl:w-md"
          />
        </Link>
        <div className="card-body p-4 md:p-6">
          <Link href={detailHref}>
            <h2 className="card-title font-display text-2xl font-semibold transition duration-300 hover:text-primary">
              {project.project_name}
            </h2>
          </Link>
          <div className="flex cursor-pointer flex-wrap items-center gap-1 font-display text-sm sm:gap-2">
            {project.project_tag.map((tag) => (
              <TechBadge key={tag} tag={tag} size="sm" />
            ))}
          </div>
          <p className="font-thai text-sm font-normal leading-7 text-base-content/70 line-clamp-2 sm:text-[17px] sm:leading-7.5 md:line-clamp-3 lg:line-clamp-none">
            {summary}
          </p>
          <div className="mt-2">
            <Link href={detailHref} className="btn btn-primary px-8">
              View more
            </Link>
          </div>
        </div>
        {project.starred && (
          <FaStar className="absolute top-3 right-3 h-7 w-7 text-warning drop-shadow" />
        )}
      </div>
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
