# Architecture proposal

Status: planned; validate versions before scaffolding.

Next.js App Router, React, TypeScript strict mode, Tailwind CSS and native CSS. Prefer static rendering and server components, with client islands for interactive examples, motion and filters. No database or authentication in v1.

Proposed routes: /[locale], /[locale]/work, /[locale]/work/[slug], /[locale]/about, /[locale]/lab, /[locale]/contact. Use next-intl after verifying routing compatibility. Local typed project metadata and MDX case studies if justified. Generate static params, localized metadata, sitemap and canonical/hreflang links. Default locale Spanish or English requires owner confirmation.

Suggested directories: src/app, src/components/{layout,ui,projects,lab}, src/content, src/lib, src/styles, messages, public/projects, tests, e2e. Keep public CV and media owner-approved and optimized. Contact uses verified external links initially; no form backend required.

Use a single package manager, lockfile, ESLint, typecheck, unit tests and Playwright; see TOOLING.md. Configure CI after scaffolding. Deployment target Vercel with preview review and manual production approval. No secrets in client bundles.