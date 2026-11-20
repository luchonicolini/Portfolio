# Phase 02 — Design System Implementation Report

**Date:** 2026-11-20

**Scope:** reusable design foundations and a development-only preview. No Home, Navbar, Hero or secondary page was implemented.

## Implemented

- Extended semantic CSS tokens for the approved palette, disabled states, type weights and fluid sizes, spacing, containers, responsive grids, borders, hard shadows, focus, motion and stacking layers.
- Applied the approved paper texture as a low-opacity page surface. Kept the Canvas, Ink, Primary, Mint, Coral and Pink values unchanged.
- Added reusable Button, IconButton, TextLink, Container, Section, SectionHeading, Typography, BrutalistPanel, ProjectCard primitives, Tag, Divider and ImageFrame components.
- Added client-island LanguageSwitcher, CopyButton, accessible native dialog and responsive Motion examples. Dialog Escape/focus return and clipboard feedback are covered by browser interaction tests.
- Added `/{locale}/dev/design-system`, marked `noindex` and gated to development. Production navigation returns 404. React Grab remains dynamically imported only in development and can be suppressed for preview tests.
- Added a bilingual preview for tokens, typography, spacing/grid, interactive states, panel/card/image surfaces, responsive reflow and reduced-motion-aware layout/reveal examples.
- No runtime or development dependency was added. Existing dependencies remain the project’s stack.

### Existing dependency roles

- Next.js App Router, React and TypeScript provide the existing application runtime and strict typing.
- Tailwind CSS 4 remains available for utility composition; CSS Modules hold reusable component styling without introducing utility strings throughout the components.
- Motion drives the purposeful reveal and layout sample; Lucide React provides the existing icon system; next-intl supplies Spanish and English preview content.
- Space Grotesk and Space Mono remain local Next font foundations. Vitest, React Testing Library, Playwright, axe-core, Knip, Lighthouse CI, ESLint and Prettier remain the existing verification stack.

## Intentional visual patterns

Keep these approved patterns when reviewing automated aesthetic advice: flat high-contrast accent colors, heavy black borders, sharp corners, displaced hard shadows, dense editorial typography, restrained paper grain and asymmetrical desktop composition. Impeccable’s detected hard-offset shadows are required design tokens, not defects. The small paper-texture raster is intentionally subtle. Illustration captions state that art is not product evidence; card copy is explicitly illustrative.

## Added structure and configuration

```text
src/app/[locale]/dev/design-system/page.tsx
src/components/design-system/
  client-components.tsx
  components.module.css
  components.test.tsx
  components.tsx
  design-system-preview.module.css
  design-system-preview.tsx
  motion-patterns.module.css
  motion-patterns.tsx
e2e/design-system.spec.ts
playwright.preview.config.ts
docs/DESIGN_SYSTEM_IMPLEMENTATION_REPORT.md
docs/screenshots/design-system-{desktop,mobile}.png
```

`package.json` adds the preview E2E target to `npm run check`; `playwright.config.ts` keeps dev-preview tests separate from production smoke tests; `next.config.ts` hides Next's development indicator. `.github/workflows/ci.yml` runs preview E2E in CI. `messages/{es,en}.json` contains the bilingual preview copy.

## Installed tools and dependencies

The lockfile and installed tree matched for all 29 dependencies (`npm ls --depth=0`; package manifest, lockfile and installed package versions compared). Key versions: Next.js 16.4.6, React 19.3.1, TypeScript 5.9.3, Tailwind CSS 4.3.5, Motion 14.14.0, next-intl 4.15.3, Lucide React 1.76.0, ESLint 10.15.0, Prettier 3.10.1, Vitest 5.1.1, React Testing Library 16.3.3, Playwright 1.65.1, axe-core Playwright 4.14.0, Knip 6.46.1 and Lighthouse CI 0.16.1. The phase added no dependency and did not change `package-lock.json`.

Agent-side tooling remains pinned as in Phase 01.1: Impeccable CLI 4.10.0, React Grab 0.2.0, Playwright MCP 0.0.86 and Chrome DevTools MCP 1.13.0. `skills-lock.json` pins the Vercel React best-practices source to commit `1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62` and Emil Design Engineering skills to `64eb3deb9a5fbfa041faf783e0bc3fd635872e9c`.

## Impeccable

- `impeccable doctor --json --target .`: zero findings; rule registry available. Product/design artifact paths are unset, with the approved repository docs and references remaining the source of truth.
- `impeccable hooks status`: hook enabled and `.agents` wiring reported as wired. Phase 01.1 recorded `hook.consent: accepted` in the local Impeccable configuration, so no further owner approval is needed.
- Source detection: zero findings on the design-system TSX sources.
- Live detection at 1280×800: 20 findings (18 advisories, 2 warnings); at 390×844: 24 findings (22 advisories, 2 warnings). Both runs reported 16 hard-offset-shadow patterns, 1 cramped-padding warning on the intentionally full-bleed project media and 1 overused-font warning for the approved Space Grotesk body face. The remaining advisories include short final lines in fluid copy (2 desktop, 6 mobile); they cause no overflow. No buried-raster finding remained.
- Hard offset shadows, flat color, paper grain and sharp corners are intentional, per approved direction. The two warnings are detector false positives in this approved system.
- Independent critique gave the system a 32/40 heuristic score: visibility 3, real-world match 3, control 4, consistency 4, prevention 3, recognition 3, flexibility 3, minimalism 4, error recovery 3, help 2. The mobile project-card overlap, squeezed desktop media, spacing-grid height and spacing-label wrapping were fixed. Final visual verification confirmed those fixes, the distinct paper-texture sample and no remaining high-priority layout issue. A minor observation is that a long reference catalog has no section index; the preview deliberately keeps examples visible for review.
- Detector overlay was injected at both target viewports, reported 20/24 findings in its console and was removed when its temporary server stopped.

## Browser and accessibility results

- Playwright MCP navigated to the Spanish preview, inspected its document/landmark tree, captured full-page desktop and mobile screenshots and inspected the console: zero errors; one Next.js LCP advisory for the preview artwork. All three page images loaded in the captured review. The screen sizes in the automation are 320, 390, 768, 1024 and 1440 CSS pixels.
- Chrome DevTools MCP opened the same page, inspected the full accessibility/DOM snapshot and console, and captured a full-page screenshot to a temporary file. No console errors or warnings were returned. Impeccable's detector overlay was also injected and removed by its temporary live server.
- Final Playwright preview tests passed in Spanish and English. Full-document axe scans reported zero violations in both locales. The production Spanish/English smoke scan also reported zero violations; the preview URL returns HTTP 404 in production.
- Interaction coverage: keyboard skip/focus, visible focus, 44px minimum visible target height, hover, disabled controls, dialog and Escape/focus return, clipboard feedback, language route, reduced-motion preference and grid/list transitions. Horizontal overflow checks passed at all five target widths.
- No screen-reader user test was performed; automated axe scans and browser keyboard checks are the recorded evidence.

## Lighthouse CI baseline

Collected against the current production scaffold at `http://localhost:3000/es` (not a completed portfolio page):

| Performance | Accessibility | Best practices | SEO |
| ----------: | ------------: | -------------: | --: |
|          96 |           100 |            100 | 100 |

FCP: 0.8s; LCP: 0.8s; Speed Index: 1.5s; Total Blocking Time: 220ms; CLS: 0. The configured 95-point warning threshold was met in this run. These are bootstrap baselines, not release scores.

## Final quality gates

`npm run check` completed successfully (exit 0): format, ESLint, TypeScript, Vitest (2 files, 3 tests), Knip, production build, production Playwright smoke (1 test), Lighthouse CI and preview Playwright (5 tests). The reduced-motion E2E emits Motion's development diagnostic while reduced motion is emulated; the test passed and the UI respects the preference.

## Browser review captures

- Desktop, 1440px: [design-system-desktop.png](screenshots/design-system-desktop.png)
- Mobile, 390px: [design-system-mobile.png](screenshots/design-system-mobile.png)

These captures are for human review and are not accepted as visual baselines automatically.

## Remaining review actions

- The approved Home and secondary page references still require their real project assets before those pages are implemented.
- Available assets for this phase are the approved hero artwork and paper texture. Authentic project screenshots, portrait, CV and verified store links remain outstanding for later pages; no asset blocked this system work.
- No manual owner action is required for the Impeccable hook; local consent was already verified during Phase 01.1.
- Review the design system screenshots before proceeding to Home implementation.
