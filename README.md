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
- **Curated projects grid** — featured projects pulled from a structured JSON dataset
- **All projects page** — full list view with tech badges and live/GitHub links
- **Project detail pages** — dynamic routes (`/projects/[slug]`) with an image preview modal
- **Tech stack showcase** — visual grid of tools and languages used
- **Contact page** — quick links to Facebook, Line, phone, GitHub, and LinkedIn
- Fully responsive interface with AOS scroll animations and optimized Thai/English typography using Noto Sans Thai, Sarabun, and Outfit

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── contact/            # Contact page
│   ├── projects/           # Projects list + [slug] detail pages
│   ├── layout.tsx          # Root layout (fonts, providers, navbar/footer)
│   └── page.tsx            # Home page
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── providers/            # AOS provider
│   ├── sections/              # Hero, MyExperiences, ProjectsGrid, TechStack
│   └── ui/                    # Reusable UI: Button, ProjectCard, TechBadge, etc.
├── data/                   # project.json, tech-stack.ts (content source of truth)
├── lib/                    # projects.ts, tech-icons.ts, mantine-theme.ts
└── types/                  # Shared TypeScript types (Project, etc.)
```

## Content

Project data and bilingual copy live in [`src/data/projects.ts`](src/data/projects.ts) and [`src/data/project-copy.ts`](src/data/project-copy.ts). Technology data lives in [`src/data/tech-stack.ts`](src/data/tech-stack.ts).

## Environment

Copy `.env.example` to `.env.local` for local overrides. Set `SITE_URL` to the public origin when deploying outside Vercel so canonical URLs and the sitemap never point to localhost. Vercel deployments use `VERCEL_PROJECT_PRODUCTION_URL` automatically.

## Contact

- GitHub: [@iE4rthDEV](https://github.com/iE4rthDEV)
- LinkedIn: [Niti Surakongka](https://www.linkedin.com/in/nitisurakongka/)

## License

This project is personal portfolio source code. Feel free to explore the code for reference, but please don't reuse the personal content/branding as your own.
