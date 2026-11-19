# Project inventory and evidence audit — 2026-11-19

Scope: repository README files, dependency manifests and selected directory listings inspected through GitHub. This is a source inventory, not an executed build, security audit, live deployment check or exhaustive code review. Test files do not prove passing tests. Recheck claims before publication.

| Project | Status supported by repository | Portfolio role |
| --- | --- | --- |
| Puente | Functional MVP in active development (README); physical-device and user validation pending | Featured mobile/accessibility |
| DolarTo | Native iOS source and screenshots; owner reports App Store release, listing URL pending | Featured native mobile |
| StitchHub | Web platform with documented deployment URL, not live-tested here | Featured full-stack |
| LeadRadar | Private B2B tool; implemented research/audit phases documented | Engineering case study |
| ScopeGuard (QuoteFlow_Flutter) | Early local demonstrative foundation, no real backend or approvals | Work in progress / Lab |
| Rial Electrónica | Independent unofficial interactive commercial demo | Web/product design |

## Puente

[Repository](https://github.com/luchonicolini/Puente_Flutter) · [README](https://github.com/luchonicolini/Puente_Flutter/blob/main/README.md) · [manifest](https://github.com/luchonicolini/Puente_Flutter/blob/main/pubspec.yaml) · [source](https://github.com/luchonicolini/Puente_Flutter/tree/main/lib) · [tests](https://github.com/luchonicolini/Puente_Flutter/tree/main/test).

Purpose: reduce communication barriers for deaf and hard-of-hearing users in everyday situations. Flutter/Dart, Riverpod, layered core/domain/features, speech_to_text, flutter_tts, shared_preferences; Figtree typography. README describes explicit turn selection, audio lifecycle, confirmation of sensitive data, local quick phrases, onboarding and haptic feedback. Test directories cover conversation, comparison, preferences, onboarding and accessibility-related widgets. Do not claim Firebase, cloud AI, verified privacy compliance, clinical efficacy, published store availability or a current passing count without further evidence. Physical devices and user testing remain pending per README. Collect actual home, conversation, confirmation and onboarding captures.

## DolarTo

[Repository](https://github.com/luchonicolini/DolarToApp) · [README](https://github.com/luchonicolini/DolarToApp/blob/main/README.md) · [ViewModel](https://github.com/luchonicolini/DolarToApp/tree/main/ViewModel) · [Views](https://github.com/luchonicolini/DolarToApp/tree/main/Views).

Native iOS currency quotation app; source separates model, views and DolarNetworkManager. README links DolarApi and two existing screenshots. Unit and UI test targets exist; their substantive coverage and results are unverified. Owner reports App Store publication; obtain exact store URL and current availability. Avoid claiming guaranteed real-time rates, usage or revenue. Collect current screenshots and app icon.

## StitchHub

[Repository](https://github.com/luchonicolini/StitchHub) · [README](https://github.com/luchonicolini/StitchHub/blob/main/README.md) · [manifest](https://github.com/luchonicolini/StitchHub/blob/main/package.json) · [routes](https://github.com/luchonicolini/StitchHub/tree/main/src/app) · [E2E](https://github.com/luchonicolini/StitchHub/tree/main/e2e).

Visual discovery platform for UI ideas, prompts and code (not embroidery). Next.js, React, TypeScript, Tailwind, Supabase, Framer Motion; dependencies include Sentry and Vercel analytics. README describes profiles, posting, search, saves, follows and notifications. Route inventory includes auth, submit, design and profile. Public and authenticated E2E specs exist. The earlier inspected home source loads public designs from Supabase with explicit demo/error states. Deployment documented at https://stitch-hub-one.vercel.app (not live-tested here). Existing screenshot: public/screenshots/homepage.png. Collect actual gallery and detail screenshots; avoid exposing account data.

## LeadRadar

[Repository](https://github.com/luchonicolini/Oportunidades_laborales) · [README](https://github.com/luchonicolini/Oportunidades_laborales/blob/main/README.md) · [manifest](https://github.com/luchonicolini/Oportunidades_laborales/blob/main/package.json) · [source](https://github.com/luchonicolini/Oportunidades_laborales/tree/main/src/lib) · [tests](https://github.com/luchonicolini/Oportunidades_laborales/tree/main/test).

Private semi-automated B2B discovery and website audit system, not job application software. Next.js, TypeScript, Supabase/PostgreSQL, Playwright, Zod and Vitest; worker script in manifest. README describes campaign CRUD, CSV import, deduplication, owner-only authentication, atomic queue, heartbeat/fencing, pre-connection SSRF controls and audit evidence handling. These are documented claims, not independently validated security guarantees. Current README reports 118 passing tests; not rerun; do not publish historical or current counts without fresh evidence. Directory inventory shows phase 1/2 integration tests, audit and authorization modules. Do not claim later CRM/proposal functionality based on older history without checking the current branch. Use sanitized screenshots/diagrams, no prospect data or private access links; verify repository visibility before publishing a source link.

## ScopeGuard

[Repository](https://github.com/luchonicolini/QuoteFlow_Flutter) · [README](https://github.com/luchonicolini/QuoteFlow_Flutter/blob/main/README.md) · [mobile manifest](https://github.com/luchonicolini/QuoteFlow_Flutter/blob/main/apps/mobile/pubspec.yaml).

Display name is ScopeGuard, although repository remains QuoteFlow_Flutter. Android-first scope/change proposal tool for independent professionals. Flutter, Riverpod, go_router, Material 3; Next.js approval-web workspace. README explicitly says local demo only: no accounts, persistence, backend, shared approval links or actual approvals. Source and test directories exist. Present as early-stage product or Lab, not a completed quotation app. Collect actual navigation/states and clearly labeled portal demo screenshots. No Firebase or working Supabase claims.

## Rial Electrónica

[Repository](https://github.com/luchonicolini/Rialelectronic_demo) · [README](https://github.com/luchonicolini/Rialelectronic_demo/blob/main/README.md) · [manifest](https://github.com/luchonicolini/Rialelectronic_demo/blob/main/package.json) · [routes](https://github.com/luchonicolini/Rialelectronic_demo/tree/main/src/app).

Independent unofficial redesign demonstration, not a commissioned engagement or official shop. Next.js, React, TypeScript, Tailwind, Motion, Lenis, React Context. README describes responsive catalog, product detail, quotation list and WhatsApp handoff, plus USDT quotation endpoint. Route inventory, mock-catalog.ts and cart-context.tsx support the described structure. No real payments; sample catalog and testimonial data must not be represented as verified sales/reviews. Candidate demo https://rialelectronic-demo.vercel.app (owner-provided earlier; verify before linking). Capture Home/catalog/list without sending messages to a real business. Avoid commercial contact details in case study.

## Content and release gates

Suggested featured order: Puente, DolarTo, StitchHub, LeadRadar, Rial; ScopeGuard as a clearly labeled in-progress project. All six may appear in Work. Owner approval required for reorder. Collect actual captures and approved links; verify source visibility, authorship/contribution, current branch, test results, licensing and publication status. Secondary candidates Kune, Nicolini Import, Vivero Web and Panel_demo remain unaudited. No changes made to the six source repositories.
