# Earth Port

Personal portfolio website of **Niti Surakongka (Earth)**, a Junior Full Stack Developer based in Bangkok, Thailand. Built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and daisyUI 5, the website presents professional experience, featured projects, and technical skills through a responsive bilingual interface focused on readability, accessibility, and performance.

## Tech Stack

| Category | Technologies |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript, React 19 |
| Styling / UI | Tailwind CSS 4, daisyUI 5, Mantine (`@mantine/core`, `@mantine/hooks`) |
| Typography | Noto Sans Thai, Sarabun, Outfit |
| Animation | AOS (Animate On Scroll), `react-type-animation` |
| Icons | `react-icons` |
| HTTP | Axios |
| Monitoring | Vercel Speed Insights |
| Linting | ESLint (`eslint-config-next`) |

## Features

- **Hero section** — animated introduction with typewriter effect
- **Experience timeline** — work history at CHAZ Insurance Brokers and EventTech.ai
- **Curated projects grid** — featured projects pulled from typed portfolio data
- **All projects page** — full list view with tech badges and live/GitHub links
- **Project detail pages** — clean dynamic routes (`/projects/[slug]`) with an image preview modal
- **Tech stack showcase** — visual grid of tools and languages used
- **Contact page** — quick links to Facebook, Line, phone, GitHub, and LinkedIn
- **Bilingual interface** — switch between Thai and English with locale-neutral URLs
- **Locale behavior** — stores the selected language in `earthport-locale`; legacy `/th` and `/en` paths redirect to clean routes
- Fully responsive interface with AOS scroll animations and optimized Thai/English typography using Noto Sans Thai, Sarabun, and Outfit

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/locale/          # Locale preference endpoint
│   ├── contact/             # Contact page
│   ├── projects/            # Projects list + [slug] detail pages
│   ├── sitemap.ts           # Sitemap metadata route
│   ├── layout.tsx          # Root layout (fonts, providers, navbar/footer)
│   └── page.tsx            # Home page
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── providers/            # AOS provider
│   ├── sections/              # Hero, MyExperiences, ProjectsGrid, TechStack
│   └── ui/                    # Reusable UI: Button, ProjectCard, TechBadge, etc.
├── data/                   # Canonical portfolio data and localized content
├── i18n/                   # Locale config, dictionaries, and metadata helpers
├── lib/                    # Data accessors, tech icons, and theme utilities
├── proxy.ts                # Locale resolution and legacy route redirects
└── types/                  # Shared TypeScript types (Project, etc.)
```

## Content

Canonical project and experience data live in [`src/data/projects.ts`](src/data/projects.ts) and [`src/data/experiences.ts`](src/data/experiences.ts). Localized project and experience copy lives in [`src/data/project-copy.ts`](src/data/project-copy.ts) and [`src/data/experience-copy.ts`](src/data/experience-copy.ts). Translation dictionaries live in [`src/i18n/dictionaries`](src/i18n/dictionaries).

## Environment

Copy `.env.example` to `.env.local` for local overrides. Set `SITE_URL` to the public origin when deploying outside Vercel so canonical URLs and the sitemap never point to localhost. Vercel deployments use `VERCEL_PROJECT_PRODUCTION_URL` automatically.

## Contact

- GitHub: [@iE4rthDEV](https://github.com/iE4rthDEV)
- LinkedIn: [Niti Surakongka](https://www.linkedin.com/in/nitisurakongka/)

## License

This project is personal portfolio source code. Feel free to explore the code for reference, but please don't reuse the personal content/branding as your own.
