const TAG_ICON_SLUG: Record<string, string> = {
  HTML: "html5",
  CSS: "css",
  JavaScript: "javascript",
  ".NET": "dotnet",
  "Next.js": "nextdotjs",
  Bootstrap: "bootstrap",
  "Tailwind CSS": "tailwindcss",
  daisyUI: "daisyui",
  "Material UI": "mui",
  TypeScript: "typescript",
  Mantine: "mantine",
  MongoDB: "mongodb",
  WordPress: "wordpress",
  Supabase: "supabase",
  Web3: "web3dotjs",
  React: "react",
  Vite: "vite",
  Redux: "redux",
  "React Hook Form": "reacthookform",
  Lodash: "lodash",
  Axios: "axios",
  Firebase: "firebase",
  "Node.js": "nodedotjs",
  "Express.js": "express",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  Swagger: "swagger",
  Postman: "postman",
  Git: "git",
  GitHub: "github",
  GitLab: "gitlab",
  Vercel: "vercel",
  Netlify: "netlify",
};

export const getTechIconSlug = (tag: string): string => {
  const slug = TAG_ICON_SLUG[tag];
  if (slug) return slug;
  return tag.toLowerCase().replace(/\s+/g, "").replace(/\./g, "dot");
};
