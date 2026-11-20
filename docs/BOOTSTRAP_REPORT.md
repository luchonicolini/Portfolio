# Phase 01 — Technical bootstrap report

Date: 2026-11-19 (initial report; hardening results are recorded in `BOOTSTRAP_HARDENING_REPORT.md`)

## Repository audit before changes

- The supplied workspace contained 40 files: project guidance, roadmap, 11 domain documents, seven original local skills, eight approved design references, proposed artwork and brand assets, and project asset instructions.
- The workspace had no `.git` directory, package manifest, application source, installed project dependencies, lockfile, or existing test/build tooling. The supplied GitHub URL resolves, but this local directory was not a checkout of it.
- Approved desktop and mobile concepts are available under `references/`. They are concept references and include illustrative interface content. The available `public/projects/` directory contains instructions only. Authentic product screenshots, portrait, CV, verified DolarTo store URL, and final contact configuration are outstanding.
- `public/artwork/hero-artwork.webp` and three artwork crops are present. Crops are marked drafts and must be visually reviewed before production use. No artwork or project mockup is used as product evidence in this phase.

## Foundation delivered

- Next.js App Router scaffold with strict TypeScript and Spanish/English locale routing via `next-intl`; Spanish is the provisional default from the architecture proposal.
- Tailwind CSS v4 setup and approved tokens for canvas, ink, primary yellow, mint, coral, pink, 4px spacing base, 2px borders, 4/6/8px hard shadows, visible focus outline and reduced-motion support.
- Space Grotesk and Space Mono loaded through `next/font`.
- Minimal localized foundation status route for browser smoke checks. This is scaffolding, not the Home page or a secondary page implementation.
- Motion and Lucide React installed for later purposeful, case-specific usage. No unnecessary service, database, or authentication was added.
- ESLint, Prettier, TypeScript, Vitest, React Testing Library, Playwright, axe-core, Knip, Lighthouse CI, GitHub Actions and scripts configured.
- React Grab loads through a development-only dynamic import.
- Impeccable 4.10.0, Vercel `vercel-react-best-practices`, Emil `animate` and `review-animations` skills were installed from their official repositories and reviewed. Existing local project skills were retained. The checked Impeccable launcher and project detector hook are wired. At initial bootstrap time, hook approval had not yet been verified; Phase 01.1 verified accepted local consent and exercised detection (see hardening report).
- `.codex/config.toml` pins Playwright MCP 0.0.86 and Chrome DevTools MCP 1.13.0. At initial bootstrap time, configuration and CLI discovery were checked; Phase 01.1 performed browser operations through both servers (see hardening report).

## Exact direct dependencies

| Package                               | Version | Reason                                            |
| ------------------------------------- | ------- | ------------------------------------------------- |
| `next`                                | 16.4.6  | App Router framework                              |
| `react`, `react-dom`                  | 19.3.1  | Compatible stable React runtime                   |
| `tailwindcss`, `@tailwindcss/postcss` | 4.3.5   | Styling utilities and PostCSS integration         |
| `next-intl`                           | 4.15.3  | App Router locale routing and message handling    |
| `motion`                              | 14.14.0 | Approved for future purposeful interactive motion |
| `lucide-react`                        | 1.76.0  | Consistent SVG icon system when icons are needed  |

Exact-pinned development tools: ESLint 10.15.0, `@eslint/js` 10.0.1, Next's official ESLint plugin 16.4.6, `typescript-eslint` 8.73.0, Prettier 3.10.1, TypeScript 5.9.3, Vitest 5.1.1, React Testing Library 16.3.3, `jest-dom` 8.0.0, jsdom 31.0.1, Playwright 1.65.1, axe-core Playwright 4.14.0, Knip 6.46.1, Lighthouse CI 0.16.1, React Grab 0.2.0 and Vite React plugin 6.3.0. The exact dependency tree is in `package-lock.json`.

Agent-side tooling: Impeccable 4.10.0, Vercel React Best Practices skill, and Emil `animate` / `review-animations` skills. `skills-lock.json` records immutable source commit hashes. Playwright MCP 0.0.86 and Chrome DevTools MCP 1.13.0 are configured in `.codex/config.toml`.

## Compatibility sources

- Next.js official installation and Node requirements: https://nextjs.org/docs/app/getting-started/installation
- React official release information: https://react.dev/versions
- Tailwind CSS official Next.js guide: https://tailwindcss.com/docs/installation/framework-guides/nextjs
- next-intl official docs: https://next-intl.dev/docs/routing/setup
- Playwright MCP official setup: https://github.com/microsoft/playwright-mcp
- Chrome DevTools MCP official setup: https://github.com/ChromeDevTools/chrome-devtools-mcp
- React Grab official setup: https://github.com/aidenybai/react-grab
- Vercel Agent Skills official collection: https://github.com/vercel-labs/agent-skills
- Impeccable: https://github.com/pbakaus/impeccable
- Emil Design Engineering Skills: https://github.com/emilkowalski/skills

Node v24.19.0 and npm v11.17.0 are available locally. Next's documented minimum Node version is 20.9.

## Validation record

Executed via `npm run check` on 2026-11-19:

- Prettier check — passed.
- ESLint — passed without warnings.
- TypeScript strict type check — passed.
- Vitest / React Testing Library — 1 test passed.
- Playwright browser smoke + axe-core — 1 test passed for Spanish and English routes at 320px; axe reported no violations in the app's `<main>` landmark.
- Knip — passed without findings; `motion` and `lucide-react` are allowlisted because the user explicitly required these libraries for later phases.
- Next.js production build — passed; locale page routes prerendered successfully.
- npm install audit — 0 vulnerabilities reported across the installed tree.
- Playwright MCP and Chrome DevTools MCP CLIs — each launched and returned their help/version options. `codex mcp list --json` recognized both project-local servers as enabled. Reload the Codex desktop project/server list to start exposing their tools in an active session.
- Impeccable — its checksum-verified engine ran; project detector hook enabled and `detect` ran against the smoke route. The route is only a temporary foundation placeholder, so this is not a critique of the approved Home design.

The browser smoke ran in Next development mode, so Node printed a benign `NO_COLOR`/`FORCE_COLOR` warning. One earlier axe run included React Grab's development-only overlay canvas and found an unlandmarked canvas; the final test scopes axe to the application `<main>`, and production excludes React Grab. The final run passed.

Lighthouse CI was configured but not run; performance/release scoring is not meaningful on the temporary foundation route. No Home screenshot baseline was recorded or changed because the Home is not implemented in this phase. No visual comparison to the Home reference was claimed.

The supplied workspace had no Git metadata. To provide the requested local conventional commit, the directory was initialized as a fresh Git repository; no remote was added and no push was attempted.
