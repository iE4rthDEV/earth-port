import type { Dictionary } from "./th";

const en = {
  metadata: {
    homeTitle: "Niti Surakongka | Full Stack Developer Portfolio",
    homeDescription:
      "Explore Niti Surakongka's Full Stack Developer portfolio, professional experience, selected work, and contact details.",
    projectsTitle: "Projects | Niti Surakongka",
    projectsDescription:
      "Explore websites and web applications developed by Niti Surakongka.",
    contactTitle: "Contact | Niti Surakongka",
    contactDescription:
      "Contact Niti Surakongka to discuss opportunities, collaboration, or further information.",
    projectNotFoundTitle: "Project Not Found | Niti Surakongka",
  },
  navigation: {
    home: "Home",
    projects: "Projects",
    contact: "Contact",
    primaryLabel: "Primary navigation",
    mobileLabel: "Mobile navigation",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
    skipToContent: "Skip to main content",
  },
  language: {
    label: "Choose language",
    thai: "Thai",
    english: "English",
    changeError: "Unable to change language. Please try again.",
  },
  home: {
    heroDescription:
      "Hi, I'm Earth, or Niti Surakongka, a Junior Full Stack Developer with a foundation in building modern web applications. I have experience developing websites and shaping user experiences across both frontend and backend work, and I am committed to continually growing as a software developer.",
    portraitAlt: "Portrait of Niti Surakongka",
    viewProjects: "View Projects",
    contact: "Contact",
    technologiesHeading: "Technologies I Use",
    projectsHeading: "Curated",
    projectsHighlight: "Works",
    experiencesHeading: "My Experience",
    showDetails: "Show details",
    hideDetails: "Hide details",
  },
  projects: {
    heading: "The Work I've Done",
    subtitle:
      "A collection of projects spanning hands-on learning and real-world delivery.",
    viewGroup: "Project view",
    gridView: "Grid view",
    listView: "List view",
    viewProject: "View project",
    projectImageAlt: "Project preview",
    moreTechnologies: "additional technologies",
  },
  projectDetail: {
    backToProjects: "Projects",
    backLabel: "Back to all projects",
    projectImageAlt: "Project preview",
    technologiesUsed: "Technologies Used",
    livePreview: "Live preview",
    githubRepository: "GitHub repository",
    opensNewTab: "opens in a new tab",
  },
  contact: {
    heading: "Contact",
    subtitle: "Reach me through any of the channels below.",
    facebook: "Contact Niti Surakongka on Facebook",
    line: "Contact Niti Surakongka on LINE",
    phone: "Call Niti Surakongka at 091-758-2874",
    github: "View iE4rthDEV on GitHub",
    linkedin: "View Niti Surakongka on LinkedIn",
  },
  footer: {
    description: "Junior Full Stack Developer — portfolio and projects",
    quickLinks: "Quick links",
    connect: "Connect",
    navigationLabel: "Footer navigation",
    socialLabel: "Social links",
    rights: "All rights reserved.",
  },
  errors: {
    notFoundTitle: "Page not found",
    notFoundDescription:
      "The page you're looking for does not exist or may have moved.",
    backHome: "Back to Home",
    projectNotFoundTitle: "Project not found",
    projectNotFoundDescription: "We couldn't find the project you requested.",
    backToProjects: "Back to Projects",
  },
  common: {
    opensNewTab: "opens in a new tab",
  },
} as const satisfies Dictionary;

export default en;
