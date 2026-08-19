import React from "react";

type SectionSpacing = "compact" | "default";

interface PageSectionProps {
  children: React.ReactNode;
  muted?: boolean;
  spacing?: SectionSpacing;
  className?: string;
  containerClassName?: string;
  id?: string;
  labelledBy?: string;
}

const spacingClasses: Record<SectionSpacing, string> = {
  compact: "py-10 sm:py-12 lg:py-16",
  default: "py-12 sm:py-16 lg:py-24",
};

const containerClasses =
  "mx-auto w-full max-w-(--container-page) px-4 sm:px-6 lg:px-8";

const PageSection: React.FC<PageSectionProps> = ({
  children,
  muted = false,
  spacing = "default",
  className = "",
  containerClassName = "",
  id,
  labelledBy,
}) => {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${muted ? "bg-base-200" : ""} ${spacingClasses[spacing]} ${className}`.trim()}
    >
      <div
        className={`${containerClasses} ${containerClassName}`.trim()}
      >
        {children}
      </div>
    </section>
  );
};

export default PageSection;
