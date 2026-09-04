import type { Metadata } from "next";

interface SiteUrlEnvironment {
  SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
  NODE_ENV?: string;
}

export const resolveSiteUrl = (environment: SiteUrlEnvironment): URL => {
  const configuredUrl = environment.SITE_URL;
  const vercelUrl = environment.VERCEL_PROJECT_PRODUCTION_URL;
  const rawUrl = configuredUrl ?? (vercelUrl ? `https://${vercelUrl}` : undefined);

  if (!rawUrl && environment.NODE_ENV === "production") {
    throw new Error(
      "SITE_URL is required for production deployments outside Vercel.",
    );
  }

  return new URL(rawUrl ?? "http://localhost:3000");
};

export const metadataBase = resolveSiteUrl(process.env);

export const createCanonicalAlternates = (
  pathname = "",
): NonNullable<Metadata["alternates"]> => ({
  canonical: pathname ? `/${pathname.replace(/^\/+/, "")}` : "/",
});
