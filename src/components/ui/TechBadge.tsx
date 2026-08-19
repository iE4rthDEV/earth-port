import Image from "next/image";
import React from "react";
import { getTechIconSlug } from "@/lib/tech-icons";

interface TechBadgeProps {
  tag: string;
  size?: "sm" | "md";
  onGradient?: boolean;
}

const TechBadge: React.FC<TechBadgeProps> = ({
  tag,
  size = "md",
  onGradient = false,
}) => {
  const iconSlug = getTechIconSlug(tag);
  const isSmall = size === "sm";

  return (
    <span
      className={`badge h-auto cursor-default justify-center gap-1.5 rounded-field border ${
        isSmall
          ? "border-base-300 bg-base-100 px-2.5 py-1 text-base-content"
          : onGradient
            ? "border-primary-content/40 bg-primary-content/95 px-3 py-1 text-primary shadow-sm sm:px-4"
            : "border-base-300 bg-base-100 px-3 py-1 text-base-content sm:px-4 sm:py-1.5"
      }`}
    >
      <Image
        height={24}
        width={24}
        src={`https://cdn.simpleicons.org/${iconSlug}`}
        alt=""
        unoptimized
        className="size-4 shrink-0"
      />
      <span className="whitespace-nowrap">{tag}</span>
    </span>
  );
};

export default TechBadge;
