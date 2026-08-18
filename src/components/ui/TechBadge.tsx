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
      className={`badge badge-outline h-auto justify-center gap-1.5 rounded-xl border-gray-300 bg-base-100 text-base-content cursor-default ${
        isSmall
          ? "px-2.5 py-1"
          : onGradient
            ? "border-primary-content/80 px-3 py-1 shadow-[0_0_15px_rgba(255,255,255,0.25)] sm:px-4 sm:py-1"
            : "px-3 py-1 sm:px-4 sm:py-1.5"
      }`}
    >
      <Image
        height={24}
        width={24}
        src={`https://cdn.simpleicons.org/${iconSlug}`}
        alt=""
        unoptimized
        className="w-4"
      />
      <span>{tag}</span>
    </span>
  );
};

export default TechBadge;
