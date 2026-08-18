import React from "react";
import { TECH_STACK_TAGS } from "@/data/tech-stack";
import TechBadge from "@/components/ui/TechBadge";

const TechStack: React.FC = () => {
  return (
    <section className="bg-linear-to-r from-primary to-secondary">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
        <h2
          data-aos="zoom-out-up"
          data-aos-duration="1000"
          data-aos-easing="ease-out"
          className="text-center font-display text-3xl font-semibold text-primary-content sm:text-4xl"
        >
          Technologies I use
        </h2>
        <div
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          data-aos-easing="ease-out"
          data-aos-anchor-placement="top-bottom"
          className="mt-4 flex max-w-5xl flex-wrap items-center justify-center gap-2 px-2 font-display text-sm sm:text-base sm:font-medium md:mt-6"
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
