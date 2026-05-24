import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  as?: "span" | "h1" | "h2" | "p";
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  as: Component = "span",
  className = "",
}) => {
  return (
    <Component className={`text-gradient ${className}`.trim()}>
      {children}
    </Component>
  );
};

export default GradientText;
