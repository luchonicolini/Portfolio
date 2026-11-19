# Motion guidelines

Motion should communicate hierarchy, feedback or state. Use native CSS for simple hover/focus/press transitions and Motion for meaningful layout transitions; add GSAP only if approved sequences require it.

Provisional timings: 120–180ms press/hover, 200–300ms state transitions, 300–500ms entrances. Prefer transform and opacity. Hard-shadow buttons can translate 2–4px on press; preserve focus indication and avoid layout shifts. Optional marquee must pause on interaction and have a static reduced-motion variant. Avoid scroll hijacking, cursor replacement and gratuitous looping effects.

Respect prefers-reduced-motion; provide controls for persistent animations when needed. Never delay essential content behind an entrance animation. Verify keyboard/touch parity and no animation-related overflow. Final choreography follows approved mockups.