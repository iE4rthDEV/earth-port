import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { metadataBase } from "@/i18n/metadata";

const toAbsoluteUrl = (pathname: string): string =>
  new URL(pathname, metadataBase).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/projects", "/contact"];
  const projectRoutes = PROJECTS.map(
    (project) => `/projects/${project.slug}`,
  );

  return [...staticRoutes, ...projectRoutes].map((pathname) => ({
    url: toAbsoluteUrl(pathname),
  }));
}
