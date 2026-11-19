# Contact design brief

Use the approved editorial neo-brutalist direction, cream, yellow, mint, pink and black palette, large “HABLEMOS.” headline, custom geometric envelope illustration and clearly labeled contact links. No emojis, generic marketing cards or fake availability. Prefer direct links over a form in v1; no backend required. Mobile: stacked headline, illustration and spacious touch targets. Keyboard focus, contrast, accessible link names and reduced motion required.

## Contact configuration and testing

- Development-only email fixture: contact@example.com (reserved example domain; not a real contact address).
- GitHub: https://github.com/luchonicolini (real public profile).
- LinkedIn and CV: use explicitly labeled preview placeholders or omit until the owner supplies real values. Do not invent a profile or downloadable file.
- Keep contact values in a central typed configuration when implementing the application. The owner will supply the final email, LinkedIn URL and CV during coding.
- Test email link formatting and clipboard behavior with the fixture; do not send real email.
- Prevent test fixtures or missing required contact values from being published to production.

## Interactions

CSS hard-shadow press states; optional Motion envelope entrance/rotation and typography underline reveal. Honor reduced motion. Use accessible copy-email feedback. Playwright should verify links, keyboard behavior, responsive layout and copying the fixture.

Status: specification only; implementation and mobile reference pending.
