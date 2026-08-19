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

  return (
    <Link
      href={detailHref}
      className="card card-border block w-full min-w-0 overflow-hidden rounded-box border-gray-200 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
    >
      <figure className="relative border-b border-gray-200">
        <Image
          width={450}
          height={450}
          src={project.project_image}
          alt={project.project_name}
          className="w-full h-96 object-cover object-top"
          loading="lazy"
        />
        {project.starred && (
          <FaStar className="absolute top-3 right-3 h-7 w-7 text-warning drop-shadow" />
        )}
      </figure>
      <div className="card-body p-5 lg:py-6">
        <h2 className="card-title line-clamp-1 font-display text-base font-semibold capitalize transition duration-300 hover:text-primary sm:text-xl">
          {project.project_name}
        </h2>
        <p className="line-clamp-2 font-thai text-sm font-normal text-base-content/70">
          {summary}
        </p>
        <div className="mt-2">
          <span className="btn btn-soft btn-primary btn-block">View more</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
