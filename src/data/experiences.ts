import type { CanonicalExperience } from "@/types/experience";

export const EXPERIENCES = [
  {
    id: "software-developer",
    role: "Software Developer",
    organization: "CHAZ Insurance Brokers Ltd.",
    links: [
      {
        id: "chaz-website",
        label: "CHAZ Insurance Brokers Ltd.",
        href: "https://chazinsurance.com",
      },
      {
        id: "chaz-clients",
        label: "Clients Chazinsurance",
        href: "https://clients.chazinsurance.com/",
      },
      { id: "cibs-employee-web", label: "CIBS employee web portal" },
    ],
  },
  {
    id: "frontend-developer-intern",
    role: "Frontend Developer Intern",
    organization: "EventTech.ai",
    links: [
      { id: "koh-mak", label: "Koh Mak" },
      { id: "bepeerapat-20th", label: "bepeerapat 20th" },
      {
        id: "whiteroom-seo",
        label: "SEO for Whiteroom.ai",
        href: "https://whiteroom.ai/",
      },
      {
        id: "eventtech-contact",
        label: "EventTech contact form",
        href: "https://inquiry.eventtech.ai/",
      },
      {
        id: "ticket-protect",
        label: "Ticket Protect",
        href: "https://ticketprotect.eventtech.ai/",
      },
      {
        id: "shop-eventtech",
        label: "Shop EventTech",
        href: "https://shop.eventtech.ai/",
      },
      {
        id: "touchpoint-groups",
        label: "Touchpoint Groups",
        href: "https://touchpointgroups.com/",
      },
    ],
  },
  {
    id: "undergraduate-student",
    role: "Undergraduate Student",
    organization: "Nakhon Pathom Rajabhat University",
    links: [
      {
        id: "tech-vibe",
        label: "TechVibe: An Academic Weblog Platform",
        href: "https://github.com/msssrp/tech-vibe.git",
      },
      {
        id: "music-equipment",
        label: "Web Application for Purchasing Music Equipment",
        href: "https://github.com/entsrkk/Mini-Project.git",
      },
      {
        id: "mern-ecommerce",
        label: "MERN E-commerce",
        href: "https://github.com/entsrkk/MERN_SeShop.git",
      },
      {
        id: "mern-blog",
        label: "MERN Blog",
        href: "https://github.com/entsrkk/MERNBlog.git",
      },
      {
        id: "mern-chat",
        label: "MERN Chat",
        href: "https://github.com/entsrkk/MERN_Chat.git",
      },
      {
        id: "blockchain-pokemon",
        label: "Blockchain for Buying Pokémon",
        href: "https://blockchain-beige.vercel.app/",
      },
    ],
  },
] as const satisfies readonly CanonicalExperience[];

export type ExperienceId = (typeof EXPERIENCES)[number]["id"];
