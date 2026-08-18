import React from "react";

interface PageSectionProps {
  children: React.ReactNode;
  muted?: boolean;
  className?: string;
  containerClassName?: string;
  id?: string;
}

const PageSection: React.FC<PageSectionProps> = ({
  children,
  muted = false,
  className = "",
  containerClassName = "",
  id,
}) => {
  return (
    <section
      id={id}
      className={`${muted ? "bg-base-200" : ""} ${className}`.trim()}
    >
      <div
        className={`container mx-auto px-4 sm:px-6 ${containerClassName}`.trim()}
      >
        {children}
      </div>
    </section>
  );
};

export default PageSection;
