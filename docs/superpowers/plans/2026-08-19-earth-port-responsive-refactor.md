# Earth Port Mobile-First Responsive Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor every Earth Port route into a consistent mobile-first, WCAG 2.2 AA-oriented interface from 320px through `xl` while preserving portfolio content, routes, project data, Tailwind CSS, and DaisyUI.

**Architecture:** Add a small semantic token layer to the existing DaisyUI theme, then make shared primitives own container, typography, button, card, and breakpoint behavior. Keep pages and static sections as Server Components; isolate browser state in Navbar, ExperienceCard, and ProjectImageModal. Prove user-visible behavior with Playwright E2E tests written before each behavior change.

**Tech Stack:** Next.js 16.3.1 App Router, React 19.2.8, TypeScript strict mode, Tailwind CSS 4.3.3, DaisyUI 5.7.18, Mantine 7.17.1, Playwright 1.62.x, npm.

**Spec:** `docs/superpowers/specs/2026-08-19-earth-port-responsive-refactor-design.md`

## Global Constraints

- Use Tailwind's default breakpoints exactly: base, `sm` 640px, `md` 768px, `lg` 1024px, and `xl` 1280px.
- Treat 320px as the minimum validation width, not as a custom breakpoint.
- Keep the site light-mode only and retain Tailwind CSS plus DaisyUI; do not add shadcn/ui.
- Use `DESIGN.md` version 2.0.0 as the design-system source of truth; do not import `app.css` or `aipass-design-system.css` wholesale.
- Do not place raw hexadecimal colors in component code; use DaisyUI semantic colors or semantic Tailwind tokens.
- Preserve project data, routes, contact data, and biographical meaning; only microcopy and obvious typo corrections are allowed.
- Keep Server Components by default. Add `'use client'` only to Navbar, ExperienceCard, and ProjectImageModal or another component that demonstrably needs browser state.
- Every actionable control must have at least a 44-by-44-pixel effective target and a visible two-pixel focus indicator.
- Thai body text must use normal word breaking and a line-height of at least 1.4 times its font size.
- Respect `prefers-reduced-motion` without hiding content.
- Use npm only and keep `package-lock.json` synchronized.
- Task 1 is the only configuration-only TDD exception. Approval of this plan authorizes that test-harness bootstrap; every production behavior change after it must begin with a failing Playwright test.
- After every task, stop at an inter-task review gate: inspect the exact diff, run the task's focused tests and static checks, compare the result with its declared interfaces and acceptance criteria, and resolve every finding before starting the next task.

## File Structure Map

### Create

- `playwright.config.ts` — Playwright server, browser, and reporting configuration.
- `tests/e2e/support/responsive.ts` — Shared viewport and overflow assertions.
- `tests/e2e/responsive-baseline.spec.ts` — Cross-route no-overflow characterization coverage.
- `tests/e2e/app-shell.spec.ts` — Skip-link, focus, and reduced-motion behavior.
- `tests/e2e/navigation.spec.ts` — Desktop/mobile navigation behavior and focus lifecycle.
- `tests/e2e/home.spec.ts` — Hero and featured-project responsive layout behavior.
- `tests/e2e/experience.spec.ts` — Mobile experience disclosure behavior.
- `tests/e2e/projects.spec.ts` — Projects listing and ProjectCard behavior.
- `tests/e2e/project-detail.spec.ts` — Detail-page content order, links, and image modal.
- `tests/e2e/contact-and-not-found.spec.ts` — Contact grid and 404 semantics.
- `src/types/experience.ts` — Shared experience-entry types.
- `src/data/experiences.ts` — Typed experience content moved from JSX.
- `src/components/ui/ExperienceCard.tsx` — Client-side mobile disclosure island.

### Modify

- `package.json` and `package-lock.json` — Add Playwright scripts/dependency; later remove unused `react-type-animation`.
- `.gitignore` — Ignore Playwright artifacts.
- `src/app/globals.css` — DaisyUI theme mapping, semantic tokens, fluid typography, focus, and reduced motion.
- `src/app/layout.tsx` — Skip link and main target.
- All route pages under `src/app` — Page-level heading and responsive composition.
- `src/components/layout/Navbar.tsx` and `Footer.tsx` — Responsive global shell.
- All section components under `src/components/sections` — Mobile-first section composition.
- Relevant files under `src/components/ui` — Shared responsive primitives and accessible interactions.

---

### Task 1: Establish the Playwright E2E Harness

**Files:**
- Modify: `package.json:5-28`
- Modify: `package-lock.json`
- Modify: `.gitignore:1-42`
- Create: `playwright.config.ts`
- Create: `tests/e2e/support/responsive.ts`
- Create: `tests/e2e/responsive-baseline.spec.ts`

**Interfaces:**
- Consumes: Existing npm scripts and Next.js development server.
- Produces: `VIEWPORT_WIDTHS`, `ROUTES`, and `expectNoHorizontalOverflow(page)` for all later E2E tasks.

- [ ] **Step 1: Install the single E2E dependency and Chromium runtime**

Run:

```bash
npm install --save-dev @playwright/test@^1.62.1
npx playwright install chromium
```

Expected: `package.json` and `package-lock.json` include `@playwright/test`; Chromium installs successfully. This is the approved configuration-only TDD exception.

- [ ] **Step 2: Add reproducible test scripts and artifact ignores**

Add these scripts to `package.json`:

```json
{
  "test:e2e": "playwright test",
  "test:e2e:headed": "playwright test --headed"
}
```

Append to `.gitignore`:

```gitignore
# playwright
/playwright-report/
/test-results/
/blob-report/
```

- [ ] **Step 3: Create the Playwright configuration**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
```

- [ ] **Step 4: Add shared responsive assertions**

Create `tests/e2e/support/responsive.ts`:

```ts
import { expect, type Page } from "@playwright/test";

export const VIEWPORT_WIDTHS = [320, 360, 375, 640, 768, 1024, 1280, 1440] as const;

export const ROUTES = [
  "/",
  "/projects",
  "/projects/addkaithai-crs",
  "/contact",
] as const;

export const expectNoHorizontalOverflow = async (page: Page): Promise<void> => {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(
    dimensions.scrollWidth,
    `scrollWidth ${dimensions.scrollWidth} exceeded clientWidth ${dimensions.clientWidth}`,
  ).toBeLessThanOrEqual(dimensions.clientWidth + 1);
};
```

- [ ] **Step 5: Add the passing characterization test before refactoring**

Create `tests/e2e/responsive-baseline.spec.ts`:

```ts
import { test } from "@playwright/test";
import {
  expectNoHorizontalOverflow,
  ROUTES,
  VIEWPORT_WIDTHS,
} from "./support/responsive";

for (const width of VIEWPORT_WIDTHS) {
  test.describe(`${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    for (const route of ROUTES) {
      test(`${route} has no horizontal document overflow`, async ({ page }) => {
        await page.goto(route);
        await expectNoHorizontalOverflow(page);
      });
    }
  });
}
```

- [ ] **Step 6: Run the harness and confirm the baseline is green**

Run:

```bash
npm run test:e2e -- tests/e2e/responsive-baseline.spec.ts
```

Expected: 32 passing tests. These characterize an existing invariant; they do not authorize production changes without later failing tests.

- [ ] **Step 7: Commit the harness**

```bash
git add package.json package-lock.json .gitignore playwright.config.ts tests/e2e
git commit -m "test: add responsive Playwright harness"
```

---

### Task 2: Add Semantic Foundations and the Accessible App Shell

**Files:**
- Create: `tests/e2e/app-shell.spec.ts`
- Modify: `src/app/globals.css:1-92`
- Modify: `src/app/layout.tsx:1-54`
- Modify: `src/components/ui/PageSection.tsx:1-29`
- Modify: `src/components/ui/SectionHeading.tsx:1-44`
- Modify: `src/components/ui/Button.tsx:1-63`

**Interfaces:**
- Consumes: DaisyUI `earthport` theme and the Playwright harness.
- Produces: `main#main-content`, a skip link named `Skip to main content`, responsive `PageSection`, `SectionHeading` with `as`, and `Button` with `size`.

- [ ] **Step 1: Write failing shell behavior tests**

Create `tests/e2e/app-shell.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("the first Tab exposes a skip link targeting main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveAttribute("href", "#main-content");

  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-content")).toBeFocused();
});

test("reduced-motion removes non-essential transition time", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const durationSeconds = await page.getByRole("link", { name: "View Projects" }).evaluate(
    (element) => {
      const duration = getComputedStyle(element).transitionDuration;
      const value = Number.parseFloat(duration);
      return duration.endsWith("ms") ? value / 1000 : value;
    },
  );

  expect(durationSeconds).toBeLessThanOrEqual(0.001);
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run:

```bash
npm run test:e2e -- tests/e2e/app-shell.spec.ts
```

Expected: FAIL because the skip link and `main-content` target do not exist and the current transition remains approximately `0.3s`.

- [ ] **Step 3: Map the approved design subset into the DaisyUI theme**

Update `src/app/globals.css` without importing the reference CSS files. Keep all required DaisyUI custom-theme variables and change the relevant values to the approved palette:

```css
@plugin "daisyui" {
  themes: earthport --default;
}

@plugin "daisyui/theme" {
  name: "earthport";
  default: true;
  prefersdark: false;
  color-scheme: light;
  --color-base-100: #ffffff;
  --color-base-200: #f9f9f9;
  --color-base-300: #f1f1f1;
  --color-base-content: #1e1e1e;
  --color-primary: #0052ff;
  --color-primary-content: #ffffff;
  --color-secondary: #00b4ff;
  --color-secondary-content: #1e1e1e;
  --color-accent: #56ffc6;
  --color-accent-content: #1e1e1e;
  --color-neutral: #4b4b4b;
  --color-neutral-content: #ffffff;
  --color-info: #357df0;
  --color-info-content: #ffffff;
  --color-success: #067647;
  --color-success-content: #ffffff;
  --color-warning: #ff8c05;
  --color-warning-content: #1e1e1e;
  --color-error: #b42318;
  --color-error-content: #ffffff;
  --radius-selector: 0.375rem;
  --radius-field: 9999px;
  --radius-box: 1.5rem;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 1px;
  --depth: 0;
  --noise: 0;
}
```

Add fluid type, measure, shadow, and motion tokens under `@theme`/`@theme inline`; keep semantic aliases separate from DaisyUI component code:

```css
@theme {
  --text-display: clamp(2rem, 1.5rem + 2.5vw, 3.75rem);
  --text-page-title: clamp(2rem, 1.65rem + 1.75vw, 3rem);
  --text-section-title: clamp(1.75rem, 1.55rem + 1vw, 2.25rem);
  --text-card-title: clamp(1.125rem, 1.05rem + 0.375vw, 1.5rem);
  --shadow-card: 0 8px 24px rgb(30 30 30 / 6%);
  --shadow-card-hover: 0 12px 30px rgb(30 30 30 / 9%);
  --container-page: 80rem;
  --container-measure: 65ch;
  --duration-fast: 160ms;
  --duration-normal: 420ms;
}
```

- [ ] **Step 4: Add global focus, Thai text, anchor, and motion behavior**

Add to the appropriate CSS layers:

```css
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    word-break: normal;
  }

  :focus-visible {
    outline: 2px solid #357df0;
    outline-offset: 2px;
  }

  [id] {
    scroll-margin-top: 5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }

  [data-aos] {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

The raw focus color is allowed only in this central theme file; component files must use semantic utilities.

- [ ] **Step 5: Add the skip link and main target**

Update the body content in `src/app/layout.tsx`:

```tsx
<AosProvider>
  <a
    href="#main-content"
    className="btn btn-primary fixed top-3 left-3 z-50 -translate-y-24 focus:translate-y-0"
  >
    Skip to main content
  </a>
  <Navbar />
  <main id="main-content" tabIndex={-1} className="flex-1">
    {children}
  </main>
  <Footer />
</AosProvider>
```

- [ ] **Step 6: Make shared primitives own responsive behavior**

Update the public APIs to these exact shapes:

```ts
type SectionSpacing = "compact" | "default";

interface PageSectionProps {
  children: React.ReactNode;
  muted?: boolean;
  spacing?: SectionSpacing;
  className?: string;
  containerClassName?: string;
  id?: string;
  labelledBy?: string;
}

interface SectionHeadingProps {
  title: string;
  highlight?: string;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  aosProps?: AosProps;
}

type ButtonSize = "md" | "lg";
```

Use these base classes:

```ts
const spacingClasses: Record<SectionSpacing, string> = {
  compact: "py-10 sm:py-12 lg:py-16",
  default: "py-12 sm:py-16 lg:py-24",
};

const containerClasses = "mx-auto w-full max-w-(--container-page) px-4 sm:px-6 lg:px-8";
const headingClasses = "text-balance font-display text-section-title font-semibold leading-tight";
```

Keep DaisyUI's required `btn` class in `Button`. Map variants to `btn-primary`, `btn-outline`, and `btn-ghost`; map sizes to `min-h-11` and `min-h-12`. Do not resize controls on hover.

- [ ] **Step 7: Run shell tests and the baseline suite**

Run:

```bash
npm run test:e2e -- tests/e2e/app-shell.spec.ts tests/e2e/responsive-baseline.spec.ts
npm run lint
npm run typecheck
```

Expected: all tests pass; lint and typecheck exit 0.

- [ ] **Step 8: Commit the foundations**

```bash
git add src/app/globals.css src/app/layout.tsx src/components/ui/PageSection.tsx src/components/ui/SectionHeading.tsx src/components/ui/Button.tsx tests/e2e/app-shell.spec.ts
git commit -m "refactor: add responsive design foundations"
```

---

### Task 3: Refactor Navigation and Footer

**Files:**
- Create: `tests/e2e/navigation.spec.ts`
- Modify: `src/components/layout/Navbar.tsx:1-67`
- Modify: `src/components/layout/Footer.tsx:1-109`

**Interfaces:**
- Consumes: Shared container classes, DaisyUI `navbar`, `menu`, `modal`, `btn`, and semantic colors.
- Produces: Desktop primary navigation, modal mobile navigation, brand link, `aria-current`, Escape close, and focus restoration.

- [ ] **Step 1: Write failing navigation tests**

Create `tests/e2e/navigation.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("mobile navigation opens as a focus-contained dialog and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const trigger = page.getByRole("button", { name: "Open navigation" });
  await expect(trigger).toBeVisible();
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("desktop navigation is visible without a hamburger", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/projects");

  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeHidden();
  await expect(page.getByRole("link", { name: "Projects", exact: true })).toHaveAttribute("aria-current", "page");
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run:

```bash
npm run test:e2e -- tests/e2e/navigation.spec.ts
```

Expected: FAIL because the hamburger, brand layout, dialog, navigation labels, and `aria-current` are missing.

- [ ] **Step 3: Implement the desktop navbar and native-dialog mobile menu**

Use DaisyUI's `navbar`, `menu`, and HTML-dialog `modal` structures. Keep the existing `navLinks` source and add these refs/functions:

```tsx
const triggerRef = useRef<HTMLButtonElement>(null);
const dialogRef = useRef<HTMLDialogElement>(null);

const restoreTriggerFocus = (): void => {
  requestAnimationFrame(() => triggerRef.current?.focus());
};

const openMenu = (): void => dialogRef.current?.showModal();
const closeMenu = (): void => dialogRef.current?.close();
```

The rendered structure must include:

```tsx
<header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 backdrop-blur">
  <div className="navbar mx-auto max-w-(--container-page) px-4 sm:px-6 lg:px-8">
    <div className="navbar-start">
      <Link href="/" className="btn btn-ghost min-h-11 px-2 font-display text-lg font-semibold">
        Niti Surakongka
      </Link>
    </div>
    <nav aria-label="Primary navigation" className="navbar-end hidden md:flex">
      <ul className="menu menu-horizontal gap-1 p-0">
        {navLinks.map((link) => (
          <li key={link.href}>
            <NavLink pathname={pathname} {...link} />
          </li>
        ))}
      </ul>
    </nav>
    <div className="navbar-end md:hidden">
      <button ref={triggerRef} type="button" className="btn btn-ghost btn-square" onClick={openMenu} aria-label="Open navigation">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
    </div>
  </div>
  <dialog ref={dialogRef} aria-label="Mobile navigation" className="modal modal-top md:hidden" onClose={restoreTriggerFocus}>
    <div className="modal-box mt-20 rounded-box bg-base-100 p-4 shadow-xl">
      <nav aria-label="Mobile navigation">
        <ul className="menu w-full">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink pathname={pathname} {...link} onNavigate={closeMenu} />
            </li>
          ))}
        </ul>
      </nav>
      <form method="dialog" className="mt-3">
        <button className="btn btn-ghost btn-block">Close navigation</button>
      </form>
    </div>
    <form method="dialog" className="modal-backdrop"><button aria-label="Close navigation">close</button></form>
  </dialog>
</header>
```

Set `aria-current={active ? "page" : undefined}` and use semantic active styles. The close-event handler only restores focus; explicit close actions call `dialog.close()`.

- [ ] **Step 4: Refactor Footer with DaisyUI footer semantics**

Use `footer footer-vertical sm:footer-horizontal`, wrap link groups in separately labelled `<nav>` elements, and give social links `btn btn-ghost btn-square min-h-11 min-w-11` treatment. Keep the current destinations unchanged.

- [ ] **Step 5: Run navigation, shell, and baseline tests**

Run:

```bash
npm run test:e2e -- tests/e2e/navigation.spec.ts tests/e2e/app-shell.spec.ts tests/e2e/responsive-baseline.spec.ts
npm run lint
npm run typecheck
```

Expected: all pass with no console errors.

- [ ] **Step 6: Commit navigation and footer**

```bash
git add src/components/layout/Navbar.tsx src/components/layout/Footer.tsx tests/e2e/navigation.spec.ts
git commit -m "refactor: add accessible responsive navigation"
```

---

### Task 4: Refactor Hero, Technology Stack, and Featured Projects

**Files:**
- Create: `tests/e2e/home.spec.ts`
- Modify: `src/components/sections/Hero.tsx:1-59`
- Modify: `src/components/sections/TechStack.tsx:1-31`
- Modify: `src/components/sections/ProjectsGrid.tsx:1-37`
- Modify: `src/components/ui/ProjectCard.tsx:1-93`
- Modify: `src/components/ui/TechBadge.tsx:1-38`

**Interfaces:**
- Consumes: `PageSection`, `SectionHeading`, `Button`, Project data helpers, DaisyUI hero/card/badge classes.
- Produces: Stable hero heading, mobile-first content order, responsive project grid, and fluid ProjectCard media.

- [ ] **Step 1: Write failing home-layout tests**

Create `tests/e2e/home.spec.ts`:

```ts
import { expect, test, type Locator } from "@playwright/test";

const columnCount = async (cards: Locator): Promise<number> => {
  const boxes = await cards.evaluateAll((elements) =>
    elements.map((element) => Math.round(element.getBoundingClientRect().left)),
  );
  return new Set(boxes).size;
};

test("mobile hero prioritizes content before the profile image", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const headingBox = await page.getByRole("heading", { level: 1, name: "Niti Surakongka" }).boundingBox();
  const imageBox = await page.getByRole("img", { name: "Portrait of Niti Surakongka" }).boundingBox();

  expect(headingBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(headingBox!.y).toBeLessThan(imageBox!.y);
});

for (const [width, expectedColumns] of [[375, 1], [768, 2], [1024, 3]] as const) {
  test(`featured projects use ${expectedColumns} columns at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const cards = page.locator("#featured-projects article");
    await expect(cards).toHaveCount(6);
    expect(await columnCount(cards)).toBe(expectedColumns);
  });
}

test("mobile project media uses a landscape aspect ratio", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const box = await page.locator("#featured-projects article figure").first().boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width / box!.height).toBeGreaterThan(1.4);
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run:

```bash
npm run test:e2e -- tests/e2e/home.spec.ts
```

Expected: FAIL because the current mobile image precedes the heading, the grid does not reach three columns until `xl`, and card images are portrait-like at mobile width.

- [ ] **Step 3: Replace the typewriter Hero with stable Server Component content**

Remove `'use client'` and `react-type-animation` from `Hero.tsx`. Use DaisyUI's hero structure and responsive order:

```tsx
<section className="hero bg-base-200">
  <div className="hero-content mx-auto w-full max-w-(--container-page) px-4 py-12 sm:px-6 sm:py-16 lg:grid lg:grid-cols-[minmax(20rem,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-8 lg:py-24">
    <div className="order-1 space-y-5 text-center lg:order-2 lg:text-left">
      <h1 className="text-gradient text-display font-display font-black leading-tight">Niti Surakongka</h1>
      <p className="mx-auto max-w-(--container-measure) font-thai text-base leading-7 text-base-content/70 sm:text-lg sm:leading-8 lg:mx-0">
        สวัสดีครับ! ผมชื่อเอิร์ธ หรือ นายนิติ สุระคงคา เป็น Junior Full Stack Developer
        ที่มีพื้นฐานในการพัฒนา Web Application ด้วยเทคโนโลยีสมัยใหม่
        มีประสบการณ์ในการพัฒนาเว็บไซต์และออกแบบประสบการณ์ผู้ใช้งานทั้งฝั่ง Front-end และ Back-end
        และมุ่งมั่นพัฒนาทักษะการเป็นนักพัฒนาซอฟต์แวร์อย่างต่อเนื่อง
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
        <Button href="/projects" variant="primary" size="lg">View Projects</Button>
        <Button href="/contact" variant="secondary" size="lg">Contact</Button>
      </div>
    </div>
    <figure className="order-2 mx-auto w-full max-w-sm lg:order-1 lg:max-w-md">
      <Image
        src="/img/profile-earth-remove-bg.jpg"
        alt="Portrait of Niti Surakongka"
        width={450}
        height={450}
        loading="eager"
        sizes="(max-width: 1023px) min(calc(100vw - 2rem), 24rem), 28rem"
        className="mask-image-gradient h-auto w-full rounded-box object-cover ring-4 ring-primary/20"
      />
    </figure>
  </div>
</section>
```

- [ ] **Step 4: Make Tech Stack and Featured Projects own their layout**

Use a bounded badge wrap in `TechStack`. In `ProjectsGrid`, set `id="featured-projects"`, connect `aria-labelledby` to an explicit heading ID, and use:

```tsx
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
  {projects.map((project, index) => (
    <ProjectCard
      key={project.project_id}
      project={project}
      variant="grid"
      eagerImage={index === 0}
    />
  ))}
</div>
```

- [ ] **Step 5: Make ProjectCard width and media responsive**

Extend the interface:

```ts
interface ProjectCardProps {
  project: Project;
  variant?: "grid" | "list";
  eagerImage?: boolean;
}
```

For the grid variant, render a semantic `<article className="card card-border relative h-full w-full overflow-hidden">`, use `aspect-video` on `<figure>`, `h-full w-full object-cover object-top` on `Image`, and set:

```tsx
loading={eagerImage ? "eager" : "lazy"}
sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 2.25rem), 25rem"
```

Keep one real project-detail link per clickable card and use an overlay-link technique rather than nested interactive elements.

- [ ] **Step 6: Run home and regression checks**

Run:

```bash
npm run test:e2e -- tests/e2e/home.spec.ts tests/e2e/responsive-baseline.spec.ts
npm run lint
npm run typecheck
```

Expected: all pass.

- [ ] **Step 7: Commit Home responsive layout**

```bash
git add src/components/sections/Hero.tsx src/components/sections/TechStack.tsx src/components/sections/ProjectsGrid.tsx src/components/ui/ProjectCard.tsx src/components/ui/TechBadge.tsx tests/e2e/home.spec.ts
git commit -m "refactor: make home sections mobile first"
```

---

### Task 5: Extract Experience Data and Add Mobile Disclosure

**Files:**
- Create: `tests/e2e/experience.spec.ts`
- Create: `src/types/experience.ts`
- Create: `src/data/experiences.ts`
- Create: `src/components/ui/ExperienceCard.tsx`
- Modify: `src/components/sections/MyExperiences.tsx:1-324`

**Interfaces:**
- Consumes: Existing three experience records and links from `MyExperiences.tsx`.
- Produces: `Experience`, `ExperienceLink`, `EXPERIENCES`, and `ExperienceCard({ experience })`.

- [ ] **Step 1: Write failing mobile/desktop disclosure tests**

Create `tests/e2e/experience.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("mobile experience details are hidden until explicitly expanded", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Show details for Software Developer" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByText(/Oracle/, { exact: false }).first()).toBeHidden();

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(/Oracle/, { exact: false }).first()).toBeVisible();
});

test("desktop experience details are visible without disclosure controls", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/");

  await expect(page.getByRole("button", { name: /details for Software Developer/ })).toBeHidden();
  await expect(page.getByText(/Oracle/, { exact: false }).first()).toBeVisible();
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run:

```bash
npm run test:e2e -- tests/e2e/experience.spec.ts
```

Expected: FAIL because no disclosure button exists and all details are always visible.

- [ ] **Step 3: Define exact typed data contracts**

Create `src/types/experience.ts`:

```ts
export interface ExperienceLink {
  label: string;
  href?: string;
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  summary: string;
  description: string;
  links: readonly ExperienceLink[];
}
```

- [ ] **Step 4: Move all three existing records into typed data**

Create `src/data/experiences.ts` with the complete three-record source:

```ts
import type { Experience } from "@/types/experience";

export const EXPERIENCES: readonly Experience[] = [
  {
    id: "software-developer",
    period: "May 2025 - Present",
    role: "Software Developer",
    organization: "CHAZ Insurance Brokers Ltd.",
    location: "Bangkok",
    summary:
      "พัฒนาและปรับปรุงเว็บไซต์จริงร่วมกับทีมด้วย C#, .NET MVC และ Oracle โดยเน้นประสิทธิภาพและการใช้งานของระบบสำหรับบริษัท พนักงาน และลูกค้า",
    description:
      "ในการทำงานตำแหน่ง Software Developer (Full-Stack) ผมได้มีโอกาสร่วมทำโปรเจกต์เว็บไซต์จริง ร่วมงานกับทีม และได้เรียนรู้และทำงานกับ C# และ .NET MVC ซึ่งเป็นประสบการณ์ใหม่สำหรับผม ได้มีการพัฒนาและปรับปรุงเว็บไซต์ของบริษัท โดยเน้นไปที่การเพิ่มประสิทธิภาพและความสามารถในการใช้งานของเว็บไซต์ ไม่ว่าจะเป็นเว็บไซต์หลักของบริษัท เว็บไซต์สำหรับพนักงาน หรือเว็บไซต์สำหรับลูกค้า นอกจากนี้ยังได้มีโอกาสเรียนรู้เกี่ยวกับการจัดการฐานข้อมูลโดยใช้ Oracle เพื่อให้สามารถจัดการข้อมูลได้อย่างมีประสิทธิภาพมากยิ่งขึ้น ได้เรียนรู้การใช้งาน Navicat เพื่อช่วยในการจัดการฐานข้อมูล และได้มีส่วนร่วมในการพัฒนาและปรับปรุงระบบต่าง ๆ ของบริษัท เพื่อให้ตอบสนองความต้องการของลูกค้าและพนักงานได้อย่างมีประสิทธิภาพ รวมถึงใช้ SourceTree เพื่อช่วยจัดการโค้ดและทำงานร่วมกับทีม",
    links: [
      { label: "CHAZ Insurance Brokers Ltd.", href: "https://chazinsurance.com" },
      { label: "Clients Chazinsurance", href: "https://clients.chazinsurance.com/" },
      { label: "CIBS Web for employees" },
    ],
  },
  {
    id: "frontend-developer-intern",
    period: "Dec 2024 - Mar 2025",
    role: "Frontend Developer Intern",
    organization: "EventTech.ai",
    location: "Bangkok",
    summary:
      "ร่วมพัฒนาเว็บไซต์จริงและปรับปรุง Core Web Vitals, SEO และประสบการณ์ผู้ใช้ด้วยเทคโนโลยี Frontend สมัยใหม่และ WordPress",
    description:
      "ในการเป็นนักศึกษาฝึกงานตำแหน่ง Frontend Developer ผมได้มีโอกาสร่วมทำโปรเจกต์เว็บไซต์จริง ร่วมงานกับทีม และใช้เทคโนโลยีสมัยใหม่เพื่อยกระดับประสบการณ์ของผู้ใช้งาน นอกจากนี้ยังได้เรียนรู้และทำงานกับ WordPress ซึ่งเป็นประสบการณ์ใหม่สำหรับผม พร้อมทั้งศึกษาเพิ่มเติมเกี่ยวกับ SEO ผมได้มีส่วนร่วมในการปรับปรุงประสิทธิภาพของเว็บไซต์ โดยเน้น First Contentful Paint (FCP), Largest Contentful Paint (LCP) และ Cumulative Layout Shift (CLS) เพื่อให้เว็บไซต์ทำงานได้ราบรื่นและมีประสิทธิภาพมากยิ่งขึ้น รวมถึงปรับแต่ง URL ให้อ่านง่าย เพิ่ม Meta Titles, Meta Tags และปรับปรุง Image SEO เพื่อช่วยเพิ่มอันดับในการค้นหา",
    links: [
      { label: "Koh Mak" },
      { label: "bepeerapat 20th" },
      { label: "SEO for Whiteroom.ai", href: "https://whiteroom.ai/" },
      { label: "EventTech contact form", href: "https://inquiry.eventtech.ai/" },
      { label: "Ticket Protect", href: "https://ticketprotect.eventtech.ai/" },
      { label: "Shop EventTech", href: "https://shop.eventtech.ai/" },
      { label: "Touchpoint Groups", href: "https://touchpointgroups.com/" },
    ],
  },
  {
    id: "undergraduate-student",
    period: "Jul 2021 - Apr 2025",
    role: "Undergraduate Student",
    organization: "Nakhon Pathom Rajabhat University",
    location: "Nakhon Pathom",
    summary:
      "เรียนรู้การพัฒนาเว็บไซต์ตั้งแต่ UX/UI ไปจนถึงระบบทดสอบอัตโนมัติ ผ่านโปรเจกต์ที่ใช้ React, Next.js, TypeScript, MERN Stack และ Firebase",
    description:
      "ระหว่างเป็นนักศึกษา ผมได้เรียนรู้พื้นฐานของการพัฒนาเว็บไซต์ ตั้งแต่การออกแบบ UX/UI การสร้างแพลตฟอร์มเพื่อการศึกษา ไปจนถึงการทำระบบทดสอบอัตโนมัติ โดยโปรเจกต์เหล่านี้เปิดโอกาสให้ผมทดลองใช้เทคโนโลยีและเฟรมเวิร์ก เช่น React, Next.js, Tailwind CSS, MUI, TypeScript, Redux, RESTful API, MERN Stack และ Firebase",
    links: [
      { label: "TechVibe: An Academic Weblog Platform", href: "https://github.com/msssrp/tech-vibe.git" },
      { label: "Web Application for Purchasing Music Equipment", href: "https://github.com/entsrkk/Mini-Project.git" },
      { label: "MERN E-commerce", href: "https://github.com/entsrkk/MERN_SeShop.git" },
      { label: "MERN Blog", href: "https://github.com/entsrkk/MERNBlog.git" },
      { label: "MERN Chat", href: "https://github.com/entsrkk/MERN_Chat.git" },
      { label: "Blockchain for Buying Pokémon", href: "https://blockchain-beige.vercel.app/" },
    ],
  },
] as const satisfies readonly Experience[];
```

- [ ] **Step 5: Implement the client disclosure island**

Create `src/components/ui/ExperienceCard.tsx` with this state contract:

```tsx
"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { Experience } from "@/types/experience";

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <article className="card card-border bg-base-100 shadow-(--shadow-card)">
      <div className="card-body gap-4 p-6 sm:p-8 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wide text-base-content/60 uppercase">{experience.period}</p>
          <h3 className="font-display text-card-title font-semibold">{experience.role}</h3>
          <p className="text-sm text-base-content/70">{experience.organization}, {experience.location}</p>
          <p className="font-thai text-sm leading-6 text-base-content/80 md:hidden">{experience.summary}</p>
        </div>
        <div id={contentId} className={expanded ? "space-y-4" : "hidden space-y-4 md:block"}>
          <p className="font-thai text-base leading-7 text-base-content/80">{experience.description}</p>
          <ul className="list-inside list-disc space-y-2 font-thai text-base leading-7 text-base-content/80">
            {experience.links.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <Link className="link link-primary" href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}<span className="sr-only"> (opens in a new tab)</span>
                  </Link>
                ) : link.label}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="btn btn-ghost btn-block min-h-11 md:hidden"
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? `Hide details for ${experience.role}` : `Show details for ${experience.role}`}
        </button>
      </div>
    </article>
  );
};

export default ExperienceCard;
```

Use `<ul>` for related work and a real `<Link>` only when `href` exists.

- [ ] **Step 6: Reduce MyExperiences to a Server Component mapper**

Render `EXPERIENCES.map((experience) => <ExperienceCard key={experience.id} experience={experience} />)` inside `PageSection id="experience" labelledBy="experience-heading"`.

- [ ] **Step 7: Run disclosure and regression tests**

Run:

```bash
npm run test:e2e -- tests/e2e/experience.spec.ts tests/e2e/home.spec.ts tests/e2e/responsive-baseline.spec.ts
npm run lint
npm run typecheck
```

Expected: all pass and the mobile Home height drops materially while all details remain available.

- [ ] **Step 8: Commit experience extraction**

```bash
git add src/types/experience.ts src/data/experiences.ts src/components/ui/ExperienceCard.tsx src/components/sections/MyExperiences.tsx tests/e2e/experience.spec.ts
git commit -m "refactor: add responsive experience disclosure"
```

---

### Task 6: Refactor the Projects Listing and ProjectCard List Variant

**Files:**
- Create: `tests/e2e/projects.spec.ts`
- Modify: `src/app/projects/page.tsx:1-34`
- Modify: `src/components/ui/ProjectCard.tsx:1-93`
- Modify: `src/components/ui/ProjectLinks.tsx:1-62`

**Interfaces:**
- Consumes: `ProjectCardProps.eagerImage`, `PageSection`, and project helpers.
- Produces: One accessible detail link per list card, responsive stacked/side layout, eager first image, and destination-specific microcopy.

- [ ] **Step 1: Write failing Projects-page tests**

Create `tests/e2e/projects.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("Projects exposes one page heading and descriptive card links", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByRole("heading", { level: 1, name: "All Projects" })).toHaveCount(1);
  await expect(page.getByRole("link", { name: /View project details:/ }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "View more", exact: true })).toHaveCount(0);
});

test("the first project image loads eagerly and later images remain lazy", async ({ page }) => {
  await page.goto("/projects");
  const images = page.locator("main article img");
  await expect(images.first()).toHaveAttribute("loading", "eager");
  await expect(images.nth(1)).toHaveAttribute("loading", "lazy");
});

test("project list cards stack on mobile and become side-by-side at md", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/projects");
  const mobileImage = await page.locator("main article figure").first().boundingBox();
  const mobileBody = await page.locator("main article .card-body").first().boundingBox();
  expect(mobileImage!.y).toBeLessThan(mobileBody!.y);

  await page.setViewportSize({ width: 768, height: 900 });
  const desktopImage = await page.locator("main article figure").first().boundingBox();
  const desktopBody = await page.locator("main article .card-body").first().boundingBox();
  expect(desktopImage!.x).toBeLessThan(desktopBody!.x);
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run:

```bash
npm run test:e2e -- tests/e2e/projects.spec.ts
```

Expected: FAIL because the page heading is currently `h2`, links say `View more`, and every list image is lazy.

- [ ] **Step 3: Promote the page heading and pass first-image intent**

In `src/app/projects/page.tsx`, render `SectionHeading as="h1"`, and pass `eagerImage={index === 0}` to each list card.

- [ ] **Step 4: Implement a semantic responsive list card**

Use `<article className="card card-border relative overflow-hidden md:card-side">`, a responsive `<figure className="relative aspect-video w-full md:aspect-auto md:w-80 xl:w-96">`, and a card body that grows. Use one heading link with an overlay pseudo-element and accessible label:

```tsx
<Link
  href={detailHref}
  aria-label={`View project details: ${project.project_name}`}
  className="after:absolute after:inset-0 focus-visible:rounded-box"
>
  <h2 className="card-title text-card-title line-clamp-2">{project.project_name}</h2>
</Link>
```

The visible action is a non-interactive `<span className="btn btn-soft pointer-events-none">View project details</span>` so the card has only one link and does not repeat the page's primary color role.

- [ ] **Step 5: Run Projects and regression suites**

Run:

```bash
npm run test:e2e -- tests/e2e/projects.spec.ts tests/e2e/home.spec.ts tests/e2e/responsive-baseline.spec.ts
npm run lint
npm run typecheck
```

Expected: all pass.

- [ ] **Step 6: Commit Projects listing behavior**

```bash
git add src/app/projects/page.tsx src/components/ui/ProjectCard.tsx src/components/ui/ProjectLinks.tsx tests/e2e/projects.spec.ts
git commit -m "refactor: improve responsive project cards"
```

---

### Task 7: Refactor Project Detail Order, Links, and Image Modal

**Files:**
- Create: `tests/e2e/project-detail.spec.ts`
- Modify: `src/app/projects/[slug]/page.tsx:1-96`
- Modify: `src/components/ui/ProjectImageModal.tsx:1-39`
- Modify: `src/components/ui/ProjectLinks.tsx:1-62`

**Interfaces:**
- Consumes: `ProjectImageModal({ src, alt })`, `ProjectLinks`, typed project data.
- Produces: Approved mobile DOM order, `lg` two-column layout, visible mobile links, and keyboard-operable modal trigger.

- [ ] **Step 1: Write failing detail-page tests**

Create `tests/e2e/project-detail.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/projects/addkaithai-crs");
});

test("mobile detail order is title, image, description, responsibilities, technologies, links", async ({ page }) => {
  const selectors = [
    "h1",
    "[data-project-image]",
    "[data-project-description]",
    "[data-project-responsibilities]",
    "[data-project-technologies]",
    "[data-project-links]",
  ];
  const positions = await Promise.all(selectors.map(async (selector) => (await page.locator(selector).boundingBox())!.y));
  expect(positions).toEqual([...positions].sort((a, b) => a - b));
});

test("project image opens from a named button and returns focus after close", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Enlarge Family Store Cashier & Reservation System image" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("live and repository links remain available on mobile", async ({ page }) => {
  await expect(page.getByRole("link", { name: /Open live preview/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open GitHub repository/ })).toBeVisible();
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run:

```bash
npm run test:e2e -- tests/e2e/project-detail.spec.ts
```

Expected: FAIL because detail text precedes the image, the image trigger is not a button, marker attributes are absent, and the live link is hidden below `sm`.

- [ ] **Step 3: Rebuild detail DOM in the approved order**

Keep breadcrumb first. Inside the detail content, render title/tags, image, description, responsibilities, technologies, then `ProjectLinks`. Use a single-column DOM and switch visual composition with `lg:grid lg:grid-cols-2`; do not use CSS `order` to contradict reading order. Add the semantic data markers used above to the six regions.

- [ ] **Step 4: Make the modal trigger keyboard accessible**

Wrap the responsive image in:

```tsx
<button
  type="button"
  data-project-image
  aria-label={`Enlarge ${alt} image`}
  className="block w-full rounded-box focus-visible:outline-offset-4"
  onClick={open}
>
  <Image
    src={src}
    alt={alt}
    width={1080}
    height={1080}
    loading="eager"
    sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
    className="h-auto w-full rounded-box border border-base-300 object-cover shadow-lg"
  />
</button>
```

Give the Mantine `Modal` a title such as `Preview of ${alt}`, keep Escape close, and verify focus return.

- [ ] **Step 5: Keep all project actions visible and descriptive**

Remove `hidden sm:inline-flex` from the live-preview button. Use accessible labels `Open live preview (opens in a new tab)` and `Open GitHub repository (opens in a new tab)` while retaining concise visible labels and icons with `aria-hidden="true"`.

- [ ] **Step 6: Run detail and regression suites**

Run:

```bash
npm run test:e2e -- tests/e2e/project-detail.spec.ts tests/e2e/projects.spec.ts tests/e2e/responsive-baseline.spec.ts
npm run lint
npm run typecheck
```

Expected: all pass.

- [ ] **Step 7: Commit Project Detail behavior**

```bash
git add src/app/projects/[slug]/page.tsx src/components/ui/ProjectImageModal.tsx src/components/ui/ProjectLinks.tsx tests/e2e/project-detail.spec.ts
git commit -m "refactor: improve responsive project details"
```

---

### Task 8: Refactor Contact and Project Not Found, Then Remove TypeAnimation

**Files:**
- Create: `tests/e2e/contact-and-not-found.spec.ts`
- Modify: `src/app/contact/page.tsx:1-92`
- Modify: `src/app/projects/[slug]/not-found.tsx:1-18`
- Modify: `package.json:5-28`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: `PageSection`, `SectionHeading as="h1"`, `Button`, DaisyUI card/grid behavior.
- Produces: Server-rendered Contact page, responsive 1/2/3-column grid, semantic 404 heading, and no `react-type-animation` dependency.

- [ ] **Step 1: Write failing Contact and Not Found tests**

Create `tests/e2e/contact-and-not-found.spec.ts`:

```ts
import { expect, test, type Locator } from "@playwright/test";

const columns = async (cards: Locator): Promise<number> => {
  const lefts = await cards.evaluateAll((elements) =>
    elements.map((element) => Math.round(element.getBoundingClientRect().left)),
  );
  return new Set(lefts).size;
};

test("Contact has one h1 and a 1/2/3-column card grid", async ({ page }) => {
  for (const [width, expected] of [[375, 1], [768, 2], [1024, 3]] as const) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/contact");
    await expect(page.getByRole("heading", { level: 1, name: "Contact" })).toHaveCount(1);
    expect(await columns(page.locator("main article"))).toBe(expected);
  }
});

test("unknown projects render a semantic not-found heading and recovery action", async ({ page }) => {
  const response = await page.goto("/projects/not-a-real-project");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "Project not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to Projects" })).toBeVisible();
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run:

```bash
npm run test:e2e -- tests/e2e/contact-and-not-found.spec.ts
```

Expected: FAIL because Contact uses an animated `h2`, its breakpoint columns differ, cards are not articles, and Not Found uses paragraphs instead of `h1`.

- [ ] **Step 3: Convert Contact back to a Server Component**

Remove `'use client'` and `TypeAnimation`. Render `SectionHeading as="h1" title="Contact"`, use a grid with `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, and render each contact item as an `<article className="card card-border h-full">` containing one full-card external link with a descriptive accessible label. Use `min-h-11` for every action.

- [ ] **Step 4: Make Project Not Found semantic and consistent**

Replace the title paragraph with `<h1>` and change the recovery label to `Back to Projects`. Use `PageSection spacing="default"` and the shared Button.

- [ ] **Step 5: Prove TypeAnimation is unused, then remove it**

Run:

```bash
rg "react-type-animation|TypeAnimation" src
```

Expected: no matches. Then run:

```bash
npm uninstall react-type-animation
```

Expected: `package.json` and `package-lock.json` remove the dependency.

- [ ] **Step 6: Run route tests and static checks**

Run:

```bash
npm run test:e2e -- tests/e2e/contact-and-not-found.spec.ts tests/e2e/responsive-baseline.spec.ts
npm run lint
npm run typecheck
```

Expected: all pass.

- [ ] **Step 7: Commit Contact, Not Found, and dependency cleanup**

```bash
git add src/app/contact/page.tsx src/app/projects/[slug]/not-found.tsx package.json package-lock.json tests/e2e/contact-and-not-found.spec.ts
git commit -m "refactor: finish responsive route layouts"
```

---

### Task 9: Complete Full Verification and Fix Only Reproduced Regressions

**Files:**
- Modify only if a failing test reproduces a defect discovered during this task.
- Test: all files under `tests/e2e`.

**Interfaces:**
- Consumes: Every prior task and the approved viewport matrix.
- Produces: Verified build and a clean final worktree containing only intended user files plus committed refactor changes.

- [ ] **Step 1: Run the complete automated suite**

Run:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Expected: all commands exit 0 with no application warnings. The Next.js image LCP warning observed on the current Projects page must be absent because the first list image is eager.

- [ ] **Step 2: Run keyboard behavior checks in Chromium**

Run:

```bash
npm run test:e2e:headed -- tests/e2e/app-shell.spec.ts tests/e2e/navigation.spec.ts tests/e2e/experience.spec.ts tests/e2e/project-detail.spec.ts
```

Expected: visible focus throughout; mobile menu, disclosure, and modal behave exactly as asserted.

- [ ] **Step 3: Inspect representative visual states**

Start the app with `npm run dev` and inspect Home, Projects, Project Detail, Contact, and Not Found at 320, 375, 768, 1024, 1280, and 1440 pixels. Also inspect one landscape mobile viewport and browser zoom at 200 percent.

Expected: no clipping, overlapping, hidden actions, unreadably long measures, or horizontal document scroll.

- [ ] **Step 4: Reproduce any discovered regression with a failing test before fixing it**

Add the smallest failing assertion to the closest existing spec file, run that test and confirm the expected failure, implement the minimal fix, then re-run the focused and full suites. Do not fix an untested regression directly.

- [ ] **Step 5: Confirm the intended file set and user-owned files**

Run:

```bash
git status --short
git diff --check
git log --oneline --decorate -10
```

Expected: no unstaged implementation changes. The user's pre-existing untracked `DESIGN.md`, `DESIGN.v1.0-token-reference.md`, `aipass-design-system.css`, and `app.css` remain untouched unless the user separately asks to add them.

- [ ] **Step 6: Commit only if Task 9 required a reproduced fix**

Stage the exact test and implementation files involved, then commit:

```bash
git commit -m "fix: resolve responsive verification regressions"
```

Skip this commit when verification required no code changes.

## Plan Approval Notes

Approving this plan also approves:

- Adding `@playwright/test@^1.62.1` as one development dependency.
- Downloading the Playwright Chromium runtime to the local tool cache.
- Adding Playwright scripts, configuration, tests, and ignored artifact directories.
- Removing `react-type-animation` only after `rg` proves it has no remaining imports.

Approval does not authorize dark mode, shadcn/ui, custom breakpoints, new pages, project-data rewrites, deployment, or committing the user's currently untracked design-system source files.
