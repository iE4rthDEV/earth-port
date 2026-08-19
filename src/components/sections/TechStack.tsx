import React from "react";
import { TECH_STACK_TAGS } from "@/data/tech-stack";
import TechBadge from "@/components/ui/TechBadge";

const TechStack: React.FC = () => {
  return (
    <section
      aria-labelledby="technology-heading"
      className="bg-linear-to-r from-primary to-secondary"
    >
      <div className="mx-auto flex w-full max-w-(--container-page) flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <h2
          id="technology-heading"
          data-aos="zoom-out-up"
          data-aos-duration="1000"
          data-aos-easing="ease-out"
          className="text-section-title text-balance text-center font-display font-semibold text-primary-content"
        >
          Technologies I use
        </h2>
        <div
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          data-aos-easing="ease-out"
          data-aos-anchor-placement="top-bottom"
          className="mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-2 font-display text-sm sm:mt-6 sm:gap-3 sm:text-base sm:font-medium"
        >
          {TECH_STACK_TAGS.map((tag) => (
            <TechBadge key={tag} tag={tag} onGradient />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
