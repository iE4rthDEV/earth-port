# Earth Port Mobile-First Responsive Refactor Design

**Status:** Approved

**Date:** 2026-08-19

**Scope:** Entire Earth Port portfolio

**Primary design-system reference:** `DESIGN.md` version 2.0.0

## 1. Context

Earth Port is a Next.js portfolio with four user-facing route groups: Home, Projects, Project Detail, and Contact. The current UI avoids horizontal overflow at common viewport widths, but it is not consistently mobile-first. Several components use fixed widths or heights, interactive targets are frequently smaller than 44 by 44 pixels, mobile navigation is crowded, project media has rigid proportions, and the Home page becomes excessively long on small screens because experience descriptions are always fully expanded.

A browser audit of the current implementation found the following representative results at 320 pixels:

- Home is approximately 8,683 pixels tall and has 25 undersized interactive targets out of 32.
- Projects is approximately 4,866 pixels tall and has 22 undersized interactive targets out of 38.
- Project Detail has 14 undersized interactive targets out of 14.
- Contact has 11 undersized interactive targets out of 16.
- No audited route produced horizontal document overflow at 320, 375, 768, 1024, or 1280 pixels.

The absence of horizontal overflow is not considered sufficient responsive behavior. The refactor must improve content priority, readable measure, component proportions, keyboard support, motion preferences, and touch usability while preserving the existing portfolio identity.

## 2. Goals

- Refactor the entire site to a mobile-first layout using Tailwind CSS default breakpoints.
- Support viewports from 320 pixels through `xl` and remain usable above `xl` through bounded containers.
- Preserve the existing blue visual identity, portfolio content, routes, and project data.
- Apply a relevant semantic subset of `DESIGN.md` instead of importing the unrelated product system wholesale.
- Keep Tailwind CSS and DaisyUI as the component styling stack.
- Improve hierarchy, spacing, card proportions, navigation, touch targets, focus behavior, and reduced-motion behavior.
- Meet the relevant WCAG 2.2 AA rules defined by `DESIGN.md`.
- Keep Server Components as the default and isolate client-side interactivity.

## 3. Non-goals

- Dark mode or a theme switcher.
- Migration to shadcn/ui.
- Registration, form, alert, or status-message components that the portfolio does not use.
- Custom responsive breakpoints.
- Carousels or horizontal content scrollers.
- New routes, API changes, or project-data changes.
- A full rewrite of biography or project content.
- Inventing loading or error states for static components with no asynchronous behavior.

## 4. Design-System Adaptation

`DESIGN.md` version 2.0.0 is the source of truth. `app.css` and `aipass-design-system.css` are reference material only and must not be imported wholesale. They contain product-specific tokens and values that conflict with the current specification, including a translucent focus ring that does not meet the documented contrast target, an outdated 10/10-pixel caption scale, older card radii, and provisional dark-mode values.

Earth Port will adopt only the relevant foundations:

- Brand, foreground, background, border, and focus semantics.
- Fluid typography based on the documented mobile and desktop scales.
- Tailwind's standard four-pixel spacing scale.
- Card radii and blue-tinted shadows.
- Fast and normal motion durations.
- A minimum interactive target of 44 by 44 pixels.
- A visible two-pixel focus outline with a two-pixel offset.
- Thai-language line-height and word-breaking rules.
- Reduced-motion behavior.

Component code must use semantic Tailwind utilities or DaisyUI theme roles. It must not contain raw hexadecimal colors. DaisyUI remains installed and its theme roles will be aligned with the selected semantic values.

## 5. Responsive Domain Model

### 5.1 Viewport bands

The implementation uses Tailwind CSS 4.3.3 default breakpoints without customization.

| Domain band | Tailwind form | Range | Layout policy |
|---|---|---:|---|
| `mobile` | Unprefixed utilities | 320-639px | One column, 16px gutter, content priority first |
| `small` | `sm:` | 640-767px | 24px gutter, eligible grids become two columns |
| `medium` | `md:` | 768-1023px | Desktop navigation and wider content arrangements |
| `large` | `lg:` | 1024-1279px | Three-column project grids and two-column detail layout |
| `extraLarge` | `xl:` | 1280px and above | Bounded page container and readable content measures |

320 pixels is a minimum validation width, not a custom breakpoint. Tailwind's `2xl` behavior remains available, but the page container prevents uncontrolled content expansion.

### 5.2 Layout concepts

- **PageContainer:** Owns maximum width and horizontal gutters.
- **PageSection:** Owns vertical rhythm, background treatment, and the PageContainer boundary.
- **ContentMeasure:** Limits long-form text to a readable line length.
- **ResponsiveGrid:** Owns one-, two-, and three-column transitions.
- **DisclosureState:** Represents collapsed or expanded experience details on small viewports.
- **MotionPreference:** Represents normal or reduced motion without changing information availability.

Breakpoints must be owned by the component whose layout changes. Pages must not duplicate breakpoint rules already owned by a shared primitive.

## 6. Responsive Foundations

- The page container has an approximate maximum width of 1280 pixels.
- Horizontal gutters are 16 pixels at mobile sizes and 24 pixels from `sm` upward, with additional breathing room where the container allows it.
- Long-form text uses a bounded character or measure width instead of stretching across the full container.
- Section spacing scales fluidly from approximately 48 pixels on mobile to 96 pixels on large screens.
- Display, page-heading, section-heading, card-title, and body roles use `clamp()`-based scaling derived from `DESIGN.md`.
- Thai body text must maintain a line-height of at least 1.4 times its font size.
- Layout must not create horizontal document scrolling at any supported validation width or at 200 percent zoom.

## 7. Component Ownership

### 7.1 Shared primitives

- `PageSection` owns page container placement, gutters, section spacing, optional muted surfaces, and section anchors.
- `SectionHeading` owns heading size, line-height, alignment, highlight treatment, and readable width.
- `Button` owns variants, sizes, focus, touch targets, disabled semantics, and long-label wrapping.
- `ProjectCard` owns media aspect ratio, equal-height behavior, title and summary clamping, and grid/list variants.
- `TechBadge` owns badge sizing and icon/text alignment without forcing parent layout widths.

### 7.2 Interactive islands

Only components with real browser interaction should be Client Components:

- `Navbar` for the mobile menu and focus lifecycle.
- `ExperienceCard` for mobile disclosure behavior.
- `ProjectImageModal` for the zoom dialog.

Pages, static sections, layout primitives, and project cards remain Server Components.

### 7.3 Experience data

Hardcoded experience markup will move into typed data. A single experience entry includes an identifier, period, role, organization, location, summary, full description, and related links or achievements. Mobile and desktop presentations consume the same data source.

## 8. Page and Component Layouts

### 8.1 Global navigation

- Below `md`, display the portfolio brand and a hamburger button.
- At `md` and above, display the brand on the left and the three primary route links on the right.
- Do not add a redundant navigation CTA.
- Keep the header sticky without obscuring anchor targets.
- Constrain header content with the shared page container.

### 8.2 Home

#### Hero

- On mobile, present the name, role/introduction, and primary actions before the profile image.
- At `lg`, use a two-column composition with the image on the left and content on the right.
- Replace fixed image width and height utilities with a responsive bounded size and stable aspect behavior.
- Actions become full-width or stacked only when the available width requires it.
- Remove the fixed-string typewriter effect. Stable text avoids unnecessary layout instability and is available immediately to assistive technology.

#### Technology stack

- Keep badges in a wrapping layout with compact mobile gaps.
- Bound the badge group width so it does not spread excessively on large screens.
- Do not use horizontal scrolling.

#### Featured projects

- Use one column by default, two columns at `sm`, and three columns at `lg`.
- Cards use the full grid-track width instead of fixed `w-72`, `w-80`, or `w-96` sizing.
- Media uses a consistent aspect ratio instead of a fixed 24rem height.
- Cards in a row have equal height.

#### Experience

- On mobile, show a concise summary and an explicit control to reveal full details.
- At wider sizes, show full details and arrange meta information and body content proportionally.
- Preserve all factual content while allowing typo and microcopy corrections.

### 8.3 Projects

- Keep one project per row.
- Stack image above content on mobile.
- Switch to a horizontal card at `md` and above.
- Use a bounded media width and allow the content column to grow.
- Replace ambiguous `View more` labels with destination-specific project-detail labels.

### 8.4 Project Detail

The mobile content order is:

1. Breadcrumb.
2. Project name and tags.
3. Project image.
4. Description.
5. Responsibilities.
6. Technologies.
7. Live and repository links.

At `lg`, the page becomes a two-column image/detail layout while preserving logical DOM and heading order.

### 8.5 Contact

- Use one card column by default, two at `sm` or `md` as space allows, and three at `lg`.
- Cards in the same row have equal height.
- Every contact and social action has at least a 44-by-44-pixel target.

### 8.6 Footer and Not Found

- Footer content stacks on mobile, becomes two columns at `sm`, and three columns at `lg`.
- Footer links and social controls receive compliant focus and touch treatment.
- The Project Not Found route uses the same container, heading, button, and spacing foundations as the rest of the site.

## 9. Interaction and Accessibility

- Add a skip link as the first focusable control and target `<main id="main-content">`.
- Mark the active primary navigation link with `aria-current="page"`.
- The mobile menu traps focus while open, closes with Escape, and returns focus to its trigger.
- Experience disclosure uses a real button with `aria-expanded` and `aria-controls`.
- Project image zoom uses a real button rather than an `onClick` handler on an image.
- The modal keeps its accessible name, focus containment, close behavior, and focus return.
- Inline links remain distinguishable without color alone. External links communicate that they open a new tab through visible or assistive text.
- Each page has one `h1`; following headings do not skip hierarchy levels.
- Focus indicators use a solid, contrast-compliant two-pixel outline with a two-pixel offset.
- Hover-only movement is wrapped in hover-capable media queries and must not change element dimensions.
- When `prefers-reduced-motion: reduce` is active, AOS, typewriter effects, transitions, and decorative animation are effectively disabled without hiding content.

## 10. Content Policy

- Preserve project facts, biography meaning, work history, contact data, and route names.
- Correct obvious typos and inconsistent capitalization.
- Replace ambiguous action labels with labels that describe the destination or outcome.
- Add accessibility-only text where an icon or new-tab behavior needs clarification.
- Do not perform a full content rewrite.

## 11. Migration Sequence

1. Add the semantic token subset and responsive foundations to `src/app/globals.css`.
2. Refactor `PageSection`, `SectionHeading`, and `Button`.
3. Refactor the global layout, Navbar, Footer, skip link, and main target.
4. Refactor Hero, Tech Stack, Project Cards, and Experience.
5. Refactor Projects, Project Detail, Contact, and Project Not Found.
6. Apply microcopy, focus, external-link, modal-trigger, and reduced-motion fixes.
7. Remove `react-type-animation` if no imports remain and synchronize `package-lock.json`.
8. Run automated validation and browser QA, then fix regressions.

## 12. Expected File Impact

Primary files and directories include:

- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/app/projects/[slug]/not-found.tsx`
- `src/app/contact/page.tsx`
- `src/components/layout/*`
- `src/components/sections/*`
- Relevant `src/components/ui/*`
- New typed experience data and presentation component files
- `package.json` and `package-lock.json` only if `react-type-animation` becomes unused

Project JSON, project routes, shared project types, and APIs are outside the planned change unless an implementation constraint is discovered and explicitly approved.

## 13. Validation and Acceptance Criteria

### 13.1 Automated checks

- `npm run lint`
- `npm run typecheck`
- `npm run build`

### 13.2 Viewport matrix

Validate every route at:

- 320px
- 360px
- 375px
- 640px
- 768px
- 1024px
- 1280px
- 1440px

Also validate representative landscape sizes and 200 percent browser zoom.

### 13.3 Functional and accessibility checks

- No route creates horizontal document overflow.
- Keyboard users can reach and operate every interactive element.
- Mobile navigation opens, traps focus, closes with Escape, and restores focus.
- Experience disclosures expose the correct state and controlled region.
- Project image modal opens from a keyboard-accessible trigger and restores focus.
- Focus indicators remain visible on light and brand-colored surfaces.
- Every actionable target is at least 44 by 44 pixels or has an equivalent expanded hit area.
- Text and UI contrast meet the relevant WCAG 2.2 AA thresholds.
- Heading hierarchy is valid on every route.
- Reduced-motion mode preserves all information and removes non-essential motion.
- Project cards have stable media proportions and equal height within each grid row.
- Mobile content order matches this specification.

## 14. Risks and Mitigations

| Risk | Level | Mitigation |
|---|---|---|
| Cross-site visual regression | Medium-high | Migrate foundations first and validate each route at the full viewport matrix |
| DaisyUI and semantic-token conflicts | Medium | Map a small approved subset and avoid importing the source CSS wholesale |
| Client-side hydration or layout shift | Medium | Keep client islands small and render stable initial content |
| Navigation focus bugs | Medium | Verify open, tab cycle, Escape, close, and focus return explicitly |
| Long Thai text breaking layouts | Medium | Use readable measures, compliant line-height, normal word breaking, and real-device widths |
| Data or routing regression | Low | Do not change project data, route structure, or data access functions |

## 15. Decision Records

### ADR-001: Use Tailwind default breakpoints

**Decision:** Use unprefixed mobile styles and Tailwind's standard `sm`, `md`, `lg`, and `xl` variants.

**Reason:** They already match the approved viewport bands, avoid project-specific mental overhead, and integrate naturally with the existing stack.

**Rejected:** Adding an `xs` breakpoint or redefining the default breakpoint scale.

### ADR-002: Adapt, do not import, the external design system

**Decision:** Treat `DESIGN.md` as the source of truth and implement a portfolio-specific semantic subset.

**Reason:** The source system targets a different product and stack, and its ready-made CSS contains outdated or provisional values.

**Rejected:** Importing `app.css` or `aipass-design-system.css` wholesale.

### ADR-003: Keep DaisyUI and light mode

**Decision:** Keep DaisyUI and ship only the current light theme in this refactor.

**Reason:** Responsive polish does not require a component-library migration or a second theme.

**Rejected:** Migrating to shadcn/ui or adding dark mode.

### ADR-004: Use disclosure for mobile experience content

**Decision:** Present experience summaries first on small screens and allow users to reveal full details.

**Reason:** The current Home page is excessively long on mobile, while removing content would lose useful portfolio detail.

**Rejected:** Always-expanded mobile content or permanently deleting detail.

### ADR-005: Prefer stable headings over fixed-string typewriter animation

**Decision:** Remove the typewriter treatment from headings that contain a single fixed string.

**Reason:** It adds motion and layout instability without conveying additional information.

**Rejected:** Preserving the effect solely as decoration.

## 16. Glossary

- **Mobile-first:** Base styles target the smallest supported layout; larger layouts are progressive enhancements.
- **Viewport band:** A named range in which a component uses a particular layout policy.
- **Semantic token:** A design value named by purpose, such as foreground or card border, rather than by a raw color value.
- **Page container:** The shared boundary that controls maximum width and horizontal gutters.
- **Content measure:** The maximum readable line width for long text.
- **Disclosure:** A control and region pair that reveals or hides additional content while exposing its state to assistive technology.
- **Client island:** A small interactive Client Component embedded within an otherwise server-rendered page.
- **Reduced motion:** A user preference that disables non-essential animation while keeping all content and actions available.
- **Touch target:** The effective area that activates an interactive control.

## 17. Approved Outcome

The completed refactor will preserve Earth Port's content and brand while replacing rigid, page-specific responsive styling with a small semantic foundation and component-owned mobile-first behavior. The site will remain a Tailwind CSS and DaisyUI application, use light mode only, and be validated across the complete approved viewport and accessibility matrix.
