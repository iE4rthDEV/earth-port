import React from "react";
import { TECH_STACK_TAGS } from "@/data/tech-stack";
import TechBadge from "@/components/ui/TechBadge";

const TechStack: React.FC = () => {
  return (
    <section
      aria-labelledby="technology-heading"
      className="tech-stack-gradient"
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
          className="mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-1.5 font-display text-sm sm:mt-6 sm:gap-2 sm:text-base sm:font-medium"
        >
          {TECH_STACK_TAGS.map((tag, index) => (
            <TechBadge
              key={tag}
              tag={tag}
              onGradient
              aosDelay={index * 40}
              aosAnchor="#technology-heading"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
