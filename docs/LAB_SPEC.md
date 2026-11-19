# Developer Lab v1

Approved scope: six real interactive experiments. Visual concept: editorial neo-brutalism; no glassmorphism or generic rounded UI. A preview, labeled controls, reset, concise explanation and copyable matching code are required for every experiment. No fake execution of native SwiftUI or Flutter.

## Experiments

| Experiment | Controls | Implementation | Acceptance |
| --- | --- | --- | --- |
| Brutalist Button Builder | palette, radius 0–20px, shadow 0–12px | React + CSS variables, native button | pointer and keyboard press feedback; generated CSS matches preview |
| Spring Physics | stiffness 50–400, damping 5–40, replay | Motion spring | animation settles; replay and reduced motion work |
| Typography | approved font, size, weight, tracking, line height | CSS variables and approved fonts | no overflow; copy matching CSS |
| Design Tokens | palette, spacing, border, shadow; reset | scoped CSS custom properties | preview changes without altering site; show contrast warning |
| Layout Animation | list/grid toggle, reorder | Motion layout | logical DOM order, keyboard alternative to dragging |
| SVG Animation | shape, duration, replay | native SVG + Motion; GSAP only if required | fixed viewBox; no clipping; static accessible alternative |

## Dependencies

Use Motion and CSS first. Use Shiki to highlight static snippets on the server or at build time; dynamic snippets may use plain pre/code until a lightweight solution is justified. Lazy-load interactive demos. GSAP is conditional for complex SVG timelines; Sandpack is phase 2 only for real isolated React editing with an explicit security and performance review. Radix primitives optional for complex accessible controls; Rive and React Three Fiber deferred. Verify versions and current official setup before installing.

## Page layout

Desktop: editorial hero, category navigation, experiment index and live preview. Mobile: one-column flow, controls below preview, code collapsible without hiding essential information. Use keyboard-operable native controls, visible focus, status feedback for copy, scoped state and reduced-motion handling. Avoid emoji and automatic looping. Use real code, no decorative fake terminals.

## Validation

Test parameter boundaries, reset, copy code, keyboard operation, mobile reflow, reduced motion, absence of console errors and matching generated code. Use Vitest for pure snippet generators, Playwright for interactions and screenshot baselines, axe for accessibility, Impeccable for critique and Lighthouse production checks. No tests or installs are claimed until executed.

Status: scope accepted; implementation pending scaffold and approved visual references. The repository currently contains documentation only. Follow AGENTS.md and ROADMAP.md before creating runtime code.
