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
    <div
      className={`flex justify-center items-center text-black space-x-2 border bg-white rounded-xl hover:scale-105 duration-300 ${
        isSmall
          ? "px-2 py-[4px]"
          : onGradient
            ? "border-white/80 px-3 py-[4px] shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] sm:px-4 sm:py-[6px]"
            : "px-3 py-[4px] sm:px-4 sm:py-[6px]"
      }`}
    >
      <Image
        height={24}
        width={24}
        src={`https://cdn.simpleicons.org/${iconSlug}`}
        alt=""
        unoptimized
        className={isSmall ? "w-4 lg:w-5" : "w-4 lg:w-6"}
      />
      <p>{tag}</p>
    </div>
  );
};

export default TechBadge;
