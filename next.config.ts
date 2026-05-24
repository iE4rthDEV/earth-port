import type { NextConfig } from "next";

const idToSlugRedirects = [
  { id: "1", slug: "addkaithai-crs" },
  { id: "2", slug: "chaz-insurance" },
  { id: "3", slug: "tech-vibe" },
  { id: "4", slug: "blockchain-pokemon" },
  { id: "5", slug: "ticket-protect" },
  { id: "6", slug: "shop-eventtech" },
  { id: "7", slug: "shopping-cart-redux" },
  { id: "8", slug: "mern-chat" },
  { id: "9", slug: "mern-e-commerce" },
] as const;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
  async redirects() {
    const legacyProjectRedirects = idToSlugRedirects.flatMap(({ id, slug }) => [
      {
        source: `/projects/${id}`,
        destination: `/projects/${slug}`,
        permanent: true,
      },
      {
        source: "/project",
        has: [
          {
            type: "query" as const,
            key: "project_id",
            value: id,
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
