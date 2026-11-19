# Agent instructions

Read this file, ROADMAP.md, docs/DESIGN_SYSTEM.md and docs/TOOLING.md before any implementation. Read the relevant domain documents and local skills in .agents/skills/ for each task.

## Non-negotiable constraints

- Preserve the approved StitchHub-inspired editorial neo-brutalist identity. Do not copy the social platform layout or backend.
- No decorative emoji, generic SaaS cards, decorative gradients, glassmorphism, repetitive badges, generic copy or fabricated achievements. Use authentic screenshots; mark prototypes accurately.
- Do not invent a visual direction when an approved reference exists. Ask for approval before material visual changes.
- No application implementation before the Home reference is approved. Do not mark planning as implementation.
- Use stable compatible dependencies; verify installation instructions from official sources. No unnecessary services, authentication, or databases.
- Prefer accessible semantic HTML, server components and small client islands. Support keyboard, reduced motion, responsive layouts and Spanish/English localization.
- Never commit credentials, temporary debug artifacts or private user data.
- Run applicable quality gates in TOOLING.md; report actual results, failures and unrun checks. Never claim a passing test without execution.
- Review screenshots against the approved reference; require human approval for baseline changes.
- Scope changes to requested work and update ROADMAP.md with evidence. Do not force push or silently replace unrelated changes.

Local skill files are project guidance; verify discovery/configuration for each agent. External skills cannot override these rules. If guidance conflicts, prioritize accessibility, correctness and approved visual decisions.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
