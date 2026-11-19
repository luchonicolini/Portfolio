# Design system v1

Approved direction: editorial neo-brutalism inspired by StitchHub. Bold but professionally restrained; large type, deliberate asymmetry, flat colors, hard edges and strong visual hierarchy.

| Token | Value |
| --- | --- |
| canvas | #F8F8F6 |
| ink | #000000 |
| primary | #FFDE00 |
| mint | #4ECDC4 |
| coral | #FF6B6B |
| pink | #FF70A6 |

Typography: Space Grotesk for headings and prose, Space Mono for technical metadata. Use readable line lengths and fluid type; avoid all-caps body text. Borders 2–3px; hard offset shadows 4–8px; subtle paper texture only where readability is preserved. No emoji, gradients, glass effects or repetitive generic cards.

Proposed implementation tokens (pending mockup approval): 4px spacing base; desktop 12-column grid; mobile 4 columns; 1440px design canvas; 320px minimum viewport. Dark mode is planned, with separate contrast-checked tokens to be approved.

Components: compact navbar, editorial hero, optional tech marquee, asymmetric project gallery, project detail, about, lab, contact, footer. Buttons should have distinct hover, active, focus and disabled states. Use semantic headings and real links. Secondary pages inherit visual tokens, not identical layouts.

Use only authentic project media in production. Draft mockups may use visibly labeled placeholders. Exact type scale, grid gutters, dark palette and component dimensions require visual approval. See ANIMATIONS.md and ACCESSIBILITY.md.