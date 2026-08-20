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
  linkMode?: "button" | "card";
  ctaVariant?: "primary" | "soft";
  eagerImage?: boolean;
}

const GRID_VISIBLE_TAGS = 3;
const GRID_MOBILE_VISIBLE_TAGS = 2;
const EXTRA_TAG_COUNT_BADGE_CLASS =
  "badge h-auto shrink-0 cursor-default justify-center rounded-field border border-base-content/10 bg-base-100 px-2 py-0.5 font-display text-sm font-medium text-base-content";

const getCardSummary = (project: Project): string => {
  if (project.summary) return project.summary;
  return project.keyResponsibilities.join(", ");
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = "grid",
  linkMode = "button",
  ctaVariant = "primary",
  eagerImage = false,
}) => {
  const summary = getCardSummary(project);
  const detailHref = getProjectPath(project);
  const ctaClassName =
    ctaVariant === "soft" ? "btn btn-soft btn-primary" : "btn btn-primary";
  const gridTags = project.project_tag.slice(0, GRID_VISIBLE_TAGS);
  const extraMobileGridTagCount = Math.max(
    project.project_tag.length - GRID_MOBILE_VISIBLE_TAGS,
    0,
  );
  const extraDesktopGridTagCount = Math.max(
    project.project_tag.length - GRID_VISIBLE_TAGS,
    0,
  );

  if (variant === "list") {
    return (
      <article className="card card-border group relative overflow-hidden border-base-300 bg-base-100 shadow-card-brand transition-[box-shadow,border-color] duration-normal hover:border-primary/40 hover:shadow-card-brand-hover md:card-side">
        <figure className="relative aspect-video w-full shrink-0 border-b border-base-300 md:aspect-4/3 md:w-80 md:border-r md:border-b-0 xl:w-96">
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
          <h2 className="card-title text-card-title line-clamp-2 font-display font-semibold">
            {project.project_name}
          </h2>
          <div className="flex flex-wrap items-center gap-1 font-display text-sm">
            {project.project_tag.map((tag) => (
              <TechBadge key={tag} tag={tag} size="sm" compact />
            ))}
          </div>
          <p className="line-clamp-3 font-thai text-sm leading-6 text-base-content/70 sm:text-base sm:leading-7 lg:line-clamp-none">
            {summary}
          </p>
          <div className="mt-2">
            {linkMode === "card" ? (
              <span className={`${ctaClassName} pointer-events-none min-h-11 px-6`}>
                View project
              </span>
            ) : (
              <Link href={detailHref} className={`${ctaClassName} min-h-11 px-6`}>
                View project
              </Link>
            )}
          </div>
        </div>
        {linkMode === "card" && (
          <Link
            href={detailHref}
            aria-label={`View project: ${project.project_name}`}
            className="absolute inset-0 rounded-box focus-visible:outline-2 focus-visible:outline-primary"
          />
        )}
      </article>
    );
  }

  return (
    <article className="card card-border group relative h-full w-full min-w-0 overflow-hidden border-base-300 bg-base-100 shadow-card-brand transition-[translate,box-shadow,border-color] duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-brand-hover">
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
        <h2 className="card-title text-card-title line-clamp-1 font-display font-semibold capitalize">
          {project.project_name}
        </h2>
        <div className="flex min-w-0 justify-start font-display text-sm">
          <div className="flex min-w-0 max-w-full items-center gap-1">
            <div className="flex min-w-0 flex-nowrap items-center gap-1 overflow-hidden">
              {gridTags.map((tag, index) => (
                <span
                  key={tag}
                  className={
                    index >= GRID_MOBILE_VISIBLE_TAGS
                      ? "hidden shrink-0 lg:inline-flex"
                      : "shrink-0"
                  }
                >
                  <TechBadge tag={tag} size="sm" compact />
                </span>
              ))}
            </div>
            {extraMobileGridTagCount > 0 && (
              <span
                aria-label={`อีก ${extraMobileGridTagCount} เทคโนโลยี`}
                className={`${EXTRA_TAG_COUNT_BADGE_CLASS} lg:hidden`}
              >
                +{extraMobileGridTagCount}
              </span>
            )}
            {extraDesktopGridTagCount > 0 && (
              <span
                aria-label={`อีก ${extraDesktopGridTagCount} เทคโนโลยี`}
                className={`${EXTRA_TAG_COUNT_BADGE_CLASS} hidden lg:inline-flex`}
              >
                +{extraDesktopGridTagCount}
              </span>
            )}
          </div>
        </div>
        <p className="line-clamp-3 font-thai text-sm font-normal text-base-content/70">
          {summary}
        </p>
        <div className="mt-2">
          <Link href={detailHref} className={`${ctaClassName} btn-block`}>
            View project
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
