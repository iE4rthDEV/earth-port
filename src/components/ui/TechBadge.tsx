import Image from "next/image";
import React from "react";
import { getTechIconSlug } from "@/lib/tech-icons";

interface TechBadgeProps {
  tag: string;
  size?: "sm" | "md";
  compact?: boolean;
  onGradient?: boolean;
  aosDelay?: number;
  aosAnchor?: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({
  tag,
  size = "md",
  compact = false,
  onGradient = false,
  aosDelay,
  aosAnchor,
}) => {
  const iconSlug = getTechIconSlug(tag);
  const isSmall = size === "sm";
  const isCompact = compact && isSmall;
  const isAnimated = aosDelay !== undefined;

  return (
    <span
      data-aos={isAnimated ? "zoom-in-up" : undefined}
      data-aos-anchor={isAnimated ? aosAnchor : undefined}
      data-aos-anchor-placement={isAnimated ? "top-bottom" : undefined}
      data-aos-delay={isAnimated ? aosDelay : undefined}
      data-aos-duration={isAnimated ? 700 : undefined}
      data-aos-easing={isAnimated ? "ease-out" : undefined}
      className={`badge h-auto cursor-default justify-center rounded-field border ${
        isSmall
          ? isCompact
            ? "gap-1 border-base-content/10 bg-base-100 px-2 py-0.5 text-sm text-base-content"
            : "gap-1.5 border-base-content/10 bg-base-100 px-2.5 py-1 text-base-content"
          : onGradient
            ? "gap-1.5 border-primary-content/40 bg-primary-content/95 px-3 py-1 text-base-content shadow-sm sm:px-4"
            : "gap-1.5 border-base-content/10 bg-base-100 px-3 py-1 text-base-content sm:px-4 sm:py-1.5"
      }`}
    >
      <Image
        height={24}
        width={24}
        src={`https://cdn.simpleicons.org/${iconSlug}`}
        alt=""
        unoptimized
        className={`${isCompact ? "size-3.5" : "size-4"} shrink-0`}
      />
      <span className="whitespace-nowrap">{tag}</span>
    </span>
  );
};

export default TechBadge;
