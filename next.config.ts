import type { NextConfig } from "next";
import { PROJECTS } from "./src/data/projects";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
  async redirects() {
    const legacyProjectRedirects = PROJECTS.flatMap(({ projectId, slug }) => [
      {
        source: `/projects/${projectId}`,
        destination: `/projects/${slug}`,
        permanent: true,
      },
      {
        source: "/project",
        has: [
          {
            type: "query" as const,
            key: "project_id",
            value: projectId,
          },
        ],
        destination: `/projects/${slug}`,
        permanent: true,
      },
    ]);

    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      ...legacyProjectRedirects,
    ];
  },
};

export default nextConfig;
