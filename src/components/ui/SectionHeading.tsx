import React from "react";
import GradientText from "./GradientText";

interface SectionHeadingProps {
  title: string;
  highlight?: string;
  className?: string;
  aosProps?: {
    "data-aos"?: string;
    "data-aos-delay"?: string;
    "data-aos-duration"?: string;
    "data-aos-easing"?: string;
    "data-aos-offset"?: string;
    "data-aos-anchor"?: string;
  };
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  highlight,
  className = "",
  aosProps,
}) => {
  if (highlight) {
    return (
      <h2
        {...aosProps}
        className={`text-center font-display text-4xl font-bold ${className}`}
      >
        {title}{" "}
        <GradientText as="span" className="font-extrabold">
          {highlight}
        </GradientText>
      </h2>
    );
  }

  return (
    <h2
      {...aosProps}
      className={`text-center font-display text-3xl font-bold sm:text-5xl ${className}`}
    >
      {title}
    </h2>
  );
};

export default SectionHeading;
