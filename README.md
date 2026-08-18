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

Project and tech-stack data lives in [`src/data/project.json`](src/data/project.json) and [`src/data/tech-stack.ts`](src/data/tech-stack.ts) — update these files to add or edit portfolio entries without touching component code.

## Contact

- GitHub: [@iE4rthDEV](https://github.com/iE4rthDEV)
- LinkedIn: [Niti Surakongka](https://www.linkedin.com/in/nitisurakongka/)

## License

This project is personal portfolio source code. Feel free to explore the code for reference, but please don't reuse the personal content/branding as your own.
