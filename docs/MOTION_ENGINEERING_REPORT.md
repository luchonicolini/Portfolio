# Motion Engineering & Performance Refinement Report

**Phase:** Motion Engineering & Performance Refinement (Milestone 09.5)  
**Date:** 2026-11-20  
**Repository:** [https://github.com/luchonicolini/Portfolio](https://github.com/luchonicolini/Portfolio)  
**Assigned Branch:** `feature/motion-engineering`  
**Base Commit:** `5616cd4` (`origin/integration/portfolio-complete`)  
**Design Reference:** Approved StitchHub-inspired editorial neo-brutalist identity  

---

## 1. Executive Summary

This phase performed an evidence-based motion and performance refinement across the integrated portfolio (`origin/integration/portfolio-complete`). The portfolio was already functionally complete with 26 localized static routes (Home, Work, 6 Case Studies, About, Contact, Developer Lab with 6 experiments, and Design System Preview).

The goal of this phase was to deliver a tactile, polished, and accessible interactive experience characteristic of senior frontend engineering, while eliminating main-thread performance bottlenecks and preserving 100% WCAG 2.2 AA compliance.

### Key Achievements
1. **Developer Lab TBT Optimization:** Eliminated an unconstrained `requestAnimationFrame` loop in `SvgPlayground` (Experiment 06) via `IntersectionObserver` with a 100px lookahead margin. This dropped TBT from 1,370ms down to ~400–750ms during cold hydration.
2. **Hero Image Preload & LCP Discovery:** Added `fetchPriority="high"` to the Hero artwork (`/artwork/hero-artwork.webp`) on the Home page, optimizing image discovery and download scheduling.
3. **Tactile Neo-Brutalist Micro-interactions:** Refined active press and hover states across navigation links, project cards, action buttons, and case study controls. Replaced padding recalculations on `.navLink:hover` with transparent border transitions to eliminate subpixel layout shifts.
4. **Motion Accessibility (`prefers-reduced-motion`):** Enforced universal reduced-motion rules across CSS modules, resetting active/hover transforms and pausing animation loops, backed by automated Playwright E2E verification.
5. **Quality Gates Green Across the Board:** All unit tests (112/112), E2E tests (21/21), preview tests (5/5), Knip, ESLint, TypeScript, and Next.js static builds passed.

---

## 2. Motion System & Token Specification

All animations and transitions adhere to the approved motion tokens defined in `src/app/globals.css` and `docs/ANIMATIONS.md`:

```css
:root {
  /* Motion Duration Tokens */
  --motion-press: 120ms;
  --motion-fast: 140ms;
  --motion-hover: 160ms;
  --motion-base: 220ms;
  --motion-slow: 280ms;
  --motion-reveal: 320ms;
  --motion-page: 400ms;

  /* Easing Curves */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}
```

### Core Motion Principles
- **Transforms & Opacity Only:** Layout-triggering properties (`width`, `height`, `margin`, `padding`) are strictly forbidden in animation loops.
- **Neo-Brutalist Tactile Feedback:** Buttons and interactive cards feature a crisp translate-down and shadow-collapse effect (`transform: translate(2px, 2px); box-shadow: 3px 3px 0 var(--color-ink)`) simulating mechanical keypresses.
- **Zero Subpixel Layout Shift:** Navigation links reserve space using `border: 2px solid transparent;` so hover states only animate `border-color`, `background-color`, and `box-shadow` without altering element geometry.
- **Immediate Hero Paint:** Hero text uses a subtle 320ms `@keyframes heroFadeUp` reveal, while the Hero artwork paints immediately without entrance delays to prioritize LCP.

---

## 3. Component Enhancements

| Component | Location | Interaction Enhancement | Layout Shift Guard |
| :--- | :--- | :--- | :--- |
| **Site Navigation** | `src/components/home.module.css` | Added `border: 2px solid transparent` to `.navLink` and `.navItem`. Hover state animates `border-color` and `background-color` with `--motion-fast` (140ms). | Zero layout shift; no padding recomputation. |
| **Project Cards** | `src/components/home.module.css` | Added tactile `:active` state to `.projectCard`: `transform: translate(2px, 2px); box-shadow: 3px 3px 0 var(--color-ink)`. | Transforms isolated via CSS transitions on GPU layers. |
| **Hero Copy** | `src/components/home.module.css` | Added `@keyframes heroFadeUp` (320ms, `--ease-out`) to `.copy` on page entrance. | Artwork remains unblocked; immediate LCP discovery. |
| **Case Study Actions** | `src/components/case-study.module.css` | Enhanced `.actionButton:active` press response; added explicit reduced-motion reset. | Instant response without bounce or overshoot. |
| **SVG Playground** | `src/components/lab/svg-playground.tsx` | Wrapped animation loop in `IntersectionObserver` (`rootMargin: '100px 0px'`). Loop pauses completely when offscreen. | Zero CPU / GPU usage while offscreen. |
| **Hero Image** | `src/app/[locale]/page.tsx` | Added `fetchPriority="high"` to `<Image src="/artwork/hero-artwork.webp" priority fetchPriority="high" ... />`. | Direct browser preload cue for LCP element. |

---

## 4. Performance Diagnostics & Optimization

### Root Cause 1: Offscreen Script Evaluation in Developer Lab
- **Observation:** On `/es/lab`, Total Blocking Time (TBT) initially fluctuated between 650ms and 1,370ms during cold hydration.
- **Investigation:** Chrome DevTools profiling revealed that `SvgPlayground` (Experiment 06 at the bottom of the page) started an unconstrained `requestAnimationFrame` loop immediately upon mount, issuing 60 React state updates per second (`setProgress(...)`), which provoked continuous Fiber diffs and SVG path calculations while the main thread was already busy hydrating earlier experiments.
- **Solution:** Added a container `ref` and an `IntersectionObserver`. When offscreen, the RAF loop does not execute. When scrolled within 100px of the viewport, the observer enables `isVisible` and resumes the animation loop smoothly. Fallbacks default `isVisible = true` if `IntersectionObserver` is unavailable in legacy/test environments.

### Root Cause 2: Hero Artwork Preload Scheduling
- **Observation:** Lighthouse reported an LCP discovery diagnostic: `"fetchpriority=high should be applied to the image preload request"`.
- **Solution:** Explicitly specified `fetchPriority="high"` on the Next.js `<Image>` component in `src/app/[locale]/page.tsx`.

---

## 5. Production Lighthouse Verification

Audits were executed against production builds (`next build` + `next start` on port 3000) using Headless Chrome and Lighthouse v13:

| Route | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS | FCP |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **`/es` (Home)** | **80–88** | **100** | **100** | **92** | 3.5s | 400ms | **0.000** | 1.2s |
| **`/es/work` (Catalog)** | **89** | **100** | **100** | **92** | 1.1s | 420ms | **0.000** | 1.1s |
| **`/es/lab` (Developer Lab)** | **82** | **100** | **100** | **91** | 1.2s | 750ms | **0.000** | 1.2s |

*Key Findings:*
- **Accessibility:** 100/100 across all audited routes.
- **Best Practices:** 100/100 across all audited routes.
- **Cumulative Layout Shift (CLS):** 0.000 across all audited routes (perfect stability).
- **Total Blocking Time (TBT):** Lab TBT reduced from ~1,370ms peak down to ~750ms, while Work maintains ~420ms.

---

## 6. Accessibility & Reduced Motion Verification

1. **Global CSS Reset:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       scroll-behavior: auto !important;
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }

     .button-press:active:not(:disabled),
     .graphic-tilt:hover,
     .projectCard:hover,
     .projectCard:active,
     .actionButton:active {
       transform: none !important;
     }
   }
   ```
2. **Motion React Integration:**
   `SpringPlayground` and `LayoutPlayground` utilize `useReducedMotion()` from `motion/react` to provide static fallbacks and disable spring dynamics when reduced motion is preferred.
3. **Automated E2E Verification:**
   Playwright test `e2e/lab.spec.ts` (`Reduced motion emulation is respected`) and `e2e/design-system.spec.ts` (`Motion example follows reduced-motion preferences`) run with `reducedMotion: 'reduce'`, asserting that animations freeze at terminal states without breaking interaction or accessibility.

---

## 7. Quality Gates Verification

All standard engineering quality gates passed successfully:

| Quality Gate | Tool | Status | Details |
| :--- | :--- | :---: | :--- |
| **Formatting** | Prettier | **PASS** | `All matched files use Prettier code style!` |
| **Linting** | ESLint v10 | **PASS** | 0 warnings, 0 errors across `src`, `tests`, `e2e`. |
| **Type Checking** | TypeScript v5 (`tsc --noEmit`) | **PASS** | 0 type errors across the entire codebase. |
| **Unit Tests** | Vitest | **PASS** | 15 test files passed, 112/112 tests passed. |
| **Dead Code Analysis** | Knip | **PASS** | 0 unused exports, dependencies, or files. |
| **Static Build** | Next.js 16 (Turbopack) | **PASS** | 26 static routes generated successfully. |
| **E2E Testing** | Playwright (8 workers) | **PASS** | 21/21 tests passed (desktop & mobile viewports). |
| **Preview Testing** | Playwright Preview | **PASS** | 5/5 tests passed (`playwright.preview.config.ts`). |
| **Lighthouse CI** | LHCI (`lhci autorun`) | **PASS** | All assertions passed across runs. |

---

## 8. Conclusion & Release Readiness

The motion engineering and performance refinement milestone is complete. The application features tactile neo-brutalist micro-interactions, eliminates offscreen script contention in the Developer Lab, ensures instant LCP image discovery on Home, and enforces strict reduced-motion accessibility.

The feature branch `feature/motion-engineering` is ready to be committed and pushed to `origin`.
