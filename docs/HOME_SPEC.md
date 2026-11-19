# Home specification — v1

Status: creative direction approved (Creative Engineering + Product Showcase); detailed mockup and copy pending owner approval.

## Goal

Present Luciano Nicolini as a mobile-first developer capable of building web products and thoughtful digital experiences. A recruiter should understand the profile, see credible work and find the CV or contact route within a short visit. The site itself is a demonstration of engineering and design craftsmanship.

## Art direction

Combine Product Showcase (approximately 65%) with Creative Engineering (35%). This is a proposed balance, not a measurable design constraint. Use StitchHub's visual language, not its application layout. Follow DESIGN_SYSTEM.md, TOOLING.md and AGENTS.md.

Space Grotesk, Space Mono, warm canvas #F8F8F6, black #000000, yellow #FFDE00, mint #4ECDC4, coral #FF6B6B and pink #FF70A6. Strong 2–3px borders, solid 4–8px offset shadows, intentional whitespace, asymmetric editorial composition. Use accent colors selectively. No emoji UI, decorative gradients, glassmorphism, generic SaaS cards, purposeless stickers, stock imagery or fabricated claims. Prefer original SVG graphics and authentic project captures. Default light theme for initial concept; dark theme requires separate approval.

## Information architecture and wireframe

Design desktop at 1440px first, then mobile at 390px. The following is a proposed layout, not a pixel-perfect approved reference.

| Order | Section | Desktop composition | Mobile adaptation |
| --- | --- | --- | --- |
| 01 | Navbar | Wordmark, Work / About / Lab / Contact, language control, CV link | Wordmark, accessible menu, CV access |
| 02 | Hero | 8-column editorial introduction, 4-column custom graphic or product composition | Text first, graphic below if useful |
| 03 | Technology strip | Compact horizontal typographic band | Wrap or static stack; no forced horizontal overflow |
| 04 | Selected Work | Asymmetric 12-column layout; featured product pairs and wide case studies | Single column, meaningful source order |
| 05 | About | Short personal introduction and evidence-based capabilities | Stacked copy and links |
| 06 | Developer Lab | One or two authentic interactive previews | Touch-friendly previews or accessible static fallback |
| 07 | Contact | Strong typographic closing and direct links | Stacked links, visible CV access |
| 08 | Footer | Identity, navigation and verified social links | Compact stacked layout |

Proposed desktop container: max 1280px, 48–80px outer margins depending on width, 24px grid gap; tablet gutters 24px, mobile gutters 16–20px. Use fluid typography and spacing; exact values await mockup approval. No horizontal overflow at 320px.

## Section details

### 01 — Navigation

Use a distinctive simple wordmark (draft: LN.) and direct links to Work, About, Lab and Contact. Language control ES/EN; CV link must resolve to an owner-approved accessible PDF. Do not publish placeholder contact links. Mobile menu must support keyboard, focus management, Escape and accessible naming. Sticky behavior optional, contingent on avoiding obstruction.

### 02 — Hero

Draft English copy:
- Luciano Nicolini
- Mobile & Web Developer
- I build digital products with design, code and intent.
- Explore my work / Download CV

Draft Spanish copy:
- Luciano Nicolini
- Desarrollador mobile y web
- Construyo productos digitales con diseño, código e intención.
- Ver proyectos / Descargar CV

Use one clear h1 and a compact introduction. The primary CTA goes to selected work; secondary opens/downloads the approved CV. Do not add availability, seniority, location or employment claims without confirmation. Graphic should communicate craft or showcase an actual product, not merely fill space. No generic mascot required.

### 03 — Technology strip

Candidate labels: SwiftUI, UIKit, Flutter, Dart, Next.js, TypeScript, React. Verify against project evidence. Use typography or restrained custom SVG, not a wall of badges. Motion is optional; if continuous, provide pause and static reduced-motion alternative.

### 04 — Selected Work

Initial candidate order (subject to project audit and owner approval):

1. Puente — Flutter / accessibility; prominent mobile product presentation.
2. DolarTo — iOS / SwiftUI; validate publication and store link.
3. StitchHub — creative platform; wide desktop showcase, own visual identity.
4. LeadRadar — automation / CRM; dashboard and architecture evidence.
5. QuoteFlow — mobile productivity; verify current name and status.
6. Rial Electrónica — e-commerce redesign demo; label as demo rather than commissioned client work unless verified.

Each project preview includes title, concise problem/solution, category or technology, accurate status where useful, authentic screenshot, and link to its case study. Provide repository or live demo links on detail pages. Avoid identical repeated cards. Use proposed varied spans (7/5, 12, 5/7, 12), with logical reading order. Do not use generated images as proof of shipped functionality. If assets are missing, mark placeholders in design concepts only.

### 05 — About

Short first-person introduction and links to the full About page and CV. Highlight mobile development, web engineering, accessibility and product thinking with concrete project examples. No arbitrary skill percentages. Personal and employment details require approval.

### 06 — Developer Lab

Show one or two genuine experiments or reusable components with meaningful interaction. Candidate: hard-shadow button interaction and a responsive layout experiment. These are suggestions, not approved features. No fake demos, terminal gimmicks or features that exist only as decoration. Provide a link to the Lab page when implemented.

### 07 — Contact and 08 — Footer

Large closing statement (draft: Let's build something. / Hablemos de tu proyecto.). Provide verified GitHub, LinkedIn and email links plus CV access. GitHub: https://github.com/luchonicolini. Do not invent other destinations. Footer includes wordmark and simple navigation; avoid repeated oversized CTAs.

## Motion and responsive behavior

Use CSS for press, hover and focus states; Motion only for meaningful transitions. Optional hero reveal and project entrances must not delay content or hide it without JavaScript. No scroll hijacking, custom cursor requirement, or gratuitous looping. Honor prefers-reduced-motion and ANIMATIONS.md.

Review at 1440, 1280, 1024, 768, 390 and 320 CSS px. Check long Spanish labels, keyboard order, focus visibility, touch targets, image aspect ratios and no clipped content. Maintain WCAG 2.2 AA target and ACCESSIBILITY.md. Use optimized responsive images and minimize client-side JavaScript.

## Master design brief

Create an original 1440px desktop portfolio Home for Luciano Nicolini, combining expressive StitchHub-inspired editorial neo-brutalism with a refined product showcase. Use the approved palette and typography, hard black outlines and offset shadows, purposeful asymmetry and restrained accents. Make mobile and web projects the central visual proof. Include the eight sections above, prioritize readable hierarchy and authentic assets, and provide a matching 390px mobile composition. No emoji, generic AI-template patterns, decorative gradients, fabricated statistics or fake product screenshots. Mark any missing assets clearly as placeholders. Deliver a visual reference for review, not production code.

## Approval and quality gates

- [ ] Desktop mockup created and approved.
- [ ] Mobile mockup created and approved.
- [ ] Section order, copy, navigation and project ordering confirmed.
- [ ] Authentic project assets and verified destinations collected.
- [ ] Typography scale, grid, spacing and interaction states finalized.
- [ ] Visual references saved under references/ with approval metadata.
- [ ] Implementation reviewed against reference using Impeccable, browser inspection, Playwright, axe and Lighthouse according to TOOLING.md.

Do not scaffold or implement the definitive Home before visual approval. This specification does not certify project claims, install tools, or imply completed testing.
