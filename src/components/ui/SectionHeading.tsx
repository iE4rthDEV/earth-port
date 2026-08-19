import React from "react";
import GradientText from "./GradientText";

interface AosProps {
  "data-aos"?: string;
  "data-aos-delay"?: string;
  "data-aos-duration"?: string;
  "data-aos-easing"?: string;
  "data-aos-offset"?: string;
  "data-aos-anchor"?: string;
}

interface SectionHeadingProps {
  title: string;
  highlight?: string;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  aosProps?: AosProps;
}

const headingClasses =
  "text-balance text-center font-display text-section-title font-semibold leading-tight";

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  highlight,
  as = "h2",
  id,
  className = "",
  aosProps,
}) => {
  const Heading = as;

  if (highlight) {
    return (
      <Heading
        {...aosProps}
        id={id}
        className={`${headingClasses} ${className}`.trim()}
      >
        {title}{" "}
        <GradientText as="span" className="font-bold">
          {highlight}
        </GradientText>
      </Heading>
    );
  }

  return (
    <Heading
      {...aosProps}
      id={id}
      className={`${headingClasses} ${className}`.trim()}
    >
      {title}
    </Heading>
  );
};

export default SectionHeading;
