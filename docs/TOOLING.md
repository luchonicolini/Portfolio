# Tooling and quality gates

Status: Core stack, quality scripts, CI and selected agent skills were installed and verified on 2026-11-19. The Home and secondary page implementations and release checks remain pending; see `BOOTSTRAP_REPORT.md` for versions and actual results.
Reference: [StitchHub](https://github.com/luchonicolini/StitchHub). Reuse its visual language, not its application architecture.

## Core stack

| Tool                                    | Purpose                                               | Priority                                   |
| --------------------------------------- | ----------------------------------------------------- | ------------------------------------------ |
| Next.js (App Router), React, TypeScript | Site architecture and typed components                | Required                                   |
| Tailwind CSS and native CSS             | Custom design tokens and responsive layouts           | Required                                   |
| Space Grotesk, Space Mono via next/font | Approved typography                                   | Required                                   |
| Motion                                  | Purposeful microinteractions                          | Required when motion is implemented        |
| Custom SVG, Lucide, SVGO                | Consistent iconography and optimized assets           | Required as needed                         |
| MDX, next-intl                          | Project case studies and Spanish/English localization | Planned; validate need before installation |
| GSAP                                    | Complex timelines and typography                      | Optional                                   |
| Rive, Lenis                             | Custom vector motion or smooth scrolling              | Optional; only with demonstrated benefit   |

Use stable mutually compatible releases, a single package manager and a committed lockfile. Keep client components minimal. Do not install optional libraries speculatively.

## Design and agent tooling

| Tool                                                                         | Purpose                                                              | Policy                               |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------ |
| [Impeccable](https://github.com/pbakaus/impeccable)                          | Critique, audit, polish, typography and generic AI-pattern detection | Required review workflow             |
| Human-Crafted Design (local skill, pending)                                  | Project-specific design constraints                                  | Required                             |
| [Emil Design Engineering](https://github.com/emilkowalski/skills)            | Motion and interaction craft                                         | Recommended                          |
| [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills)           | React and Next.js engineering guidance                               | Recommended                          |
| [React Grab](https://github.com/aidenybai/react-grab)                        | Select rendered components and share source context with agents      | Development only                     |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp)                | Browser navigation and screenshots for agents                        | Recommended                          |
| [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) | Inspect DOM, console and performance                                 | Recommended                          |
| Taste Skill / Frontend Craft                                                 | Additional design critique                                           | Optional; avoid conflicting guidance |

Verify official installation instructions and compatibility with Codex and Antigravity before configuring tools. MCP tools and skills are agent-side tooling, not production dependencies. Pin reviewed revisions where practical; inspect third-party instructions and permissions before use. Never expose credentials or private project data to external tools. Do not assume an AI critique is an objective authorship detector.

### Visual constraints

Approved identity: editorial neo-brutalism inspired by StitchHub. Canvas #F8F8F6, ink #000000, primary #FFDE00, mint #4ECDC4, coral #FF6B6B, pink #FF70A6. Space Grotesk and Space Mono; strong 2–3px borders, 4–8px solid offset shadows, subtle paper texture and intentional asymmetric compositions.

No emoji UI, generic SaaS card grids, decorative gradients, gratuitous glass effects, repetitive badges, generic marketing copy or fabricated project evidence. Use real screenshots and distinguish prototypes from shipped products. Design tokens and approved mockups take precedence over generic aesthetic advice, but never override accessibility requirements. Honor reduced motion.

## Testing and engineering quality

| Tool                          | Purpose                                            | Priority                  |
| ----------------------------- | -------------------------------------------------- | ------------------------- |
| ESLint, TypeScript, Prettier  | Static analysis, type safety and formatting        | Required                  |
| Vitest, React Testing Library | Unit and behavior tests                            | Required where applicable |
| Playwright                    | E2E and screenshot regression tests                | Required                  |
| @axe-core/playwright          | Automated accessibility checks                     | Required                  |
| Lighthouse CI                 | Performance, accessibility, SEO and best practices | Required before release   |
| Knip                          | Unused files, exports and dependencies             | Required                  |
| @next/bundle-analyzer         | Investigate bundle size                            | On demand                 |
| Storybook, Argos              | Component catalog or hosted visual regression      | Optional                  |
| Renovate                      | Dependency updates via reviewed PRs                | Optional                  |
| GitHub Actions, Vercel        | CI checks and preview/production deployments       | Planned                   |

Keep testing packages in devDependencies. Do not require paid services for the initial release. Prefer static content and local data; no Supabase, auth, Redux, Zustand or full generic UI kit without a concrete requirement.

## Approval workflow

1. Approve design reference and acceptance criteria before implementation.
2. Implement reusable components using approved tokens and authentic content.
3. Run Impeccable critique/audit and inspect the rendered page; document intentional exceptions.
4. Use browser tools to verify desktop (1440px), tablet (768px) and mobile (390px and 320px), keyboard navigation and reduced-motion behavior.
5. Compare the implementation manually with the reference. After human approval, record Playwright screenshots in a controlled browser environment; future tests compare against these baselines, not directly against arbitrary design images. Never auto-approve changed baselines.
6. Run lint, typecheck, unit tests, E2E, accessibility checks, Knip and production build. Run Lighthouse CI against a production preview.
7. Record results, limitations and screenshots in the PR; require human approval before merging visual changes.

## Acceptance targets

- No TypeScript or lint errors; all applicable tests pass.
- No serious or critical automated accessibility violations; manual keyboard, focus, contrast and responsive checks are also required (WCAG 2.2 AA target).
- No broken routes, horizontal overflow or unexpected console errors.
- Lighthouse target: 95+ in each category on representative production pages under documented test conditions. Investigate deviations; scores are targets, not guarantees.
- No unexplained visual regressions, unused dependencies or fabricated portfolio claims.
- No emojis as decorative interface elements.

## Implementation checklist

- [x] Approve Home mockup and responsive design.
- [x] Add AGENTS.md, design system, architecture, project inventory and motion/accessibility guidelines.
- [x] Bootstrap Next.js with verified versions and lockfile.
- [x] Install and verify required agent tooling; document configuration in `BOOTSTRAP_REPORT.md`.
- [x] Configure test scripts and GitHub Actions.
- [ ] Record visual baselines after the approved Home is implemented and reviewed.
- [ ] Implement pages and case studies; validate each quality gate.
- [ ] Deploy preview, review and publish.

This document records decisions only. It does not claim that packages, skills, CI pipelines or tests have already been installed or executed.
