"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { Experience } from "@/types/experience";

interface ExperienceCardProps {
  experience: Experience;
  copy: {
    showDetails: string;
    hideDetails: string;
    opensNewTab: string;
  };
}

const ExperienceCard = ({ experience, copy }: ExperienceCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <article className="card card-border border-base-300 bg-base-100 shadow-card">
      <div className="card-body gap-4 p-6 sm:p-8 lg:grid lg:grid-cols-[24rem_minmax(0,1fr)] lg:gap-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wide text-base-content/60 uppercase">
            {experience.period}
          </p>
          <h3 className="text-card-title font-display font-semibold">
            {experience.role}
          </h3>
          <p className="text-sm text-base-content/70">
            {experience.organization}, {experience.location}
          </p>
          <p className="font-thai text-sm leading-6 text-base-content/80 md:hidden">
            {experience.summary}
          </p>
        </div>

        <div
          id={contentId}
          className={expanded ? "space-y-4" : "hidden space-y-4 md:block"}
        >
          <p className="font-thai text-base leading-7 text-base-content/80">
            {experience.description}
          </p>
          <ul className="list-inside list-disc sm:pl-3 font-thai text-base leading-7 text-base-content/80">
            {experience.links.map((link) => (
              <li key={link.id}>
                {link.href ? (
                  <Link
                    className="link link-primary no-underline hover:no-underline"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <span className="sr-only"> ({copy.opensNewTab})</span>
                  </Link>
                ) : (
                  link.label
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="btn btn-soft btn-primary btn-block min-h-11 md:hidden"
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? copy.hideDetails : copy.showDetails}
        </button>
      </div>
    </article>
  );
};

export default ExperienceCard;
