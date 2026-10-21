# Responsive design, accessibility and resilience

Target **WCAG 2.2 AA**. The approved frames are visual targets, not proof that any real code is accessible.

## Required viewports

| Width | Height | Concern |
|---|---|---|
| 320 | 700 | small-phone long words, tap targets, form/dialog |
| 390 | 844 | primary approved mobile visual target |
| 768 | 1024 | portrait tablet / menu and pricing layout |
| 1024 | 768 | tight desktop, layered hero/image position |
| 1440 | 900 | approved desktop visual target |
| 1920 | 1080 | overscaling, max-width, image quality |

Also test device zoom 200% and 400% where relevant, landscape phone, browser text resize. No horizontal page scrolling at 320–390 except intentional bounded carousels with accessible controls. Content should adapt without absolute positioning fights.

## Minimum interaction requirements

- Semantic page landmarks, one H1, keyboard skip link, sufficient headings/hierarchy; HTML first for primary copy.
- Visible, non-obscured focus; color contrast verified on *actual* adjacent colors; no color-only messaging; controls comfortably touchable (~44 px where feasible).
- `prefers-reduced-motion`, no scroll hijack, no functional dependence on animation.
- `dialog`/modal focus: active trigger opens, initial focus moves inside, background inert where supported, Tab stays in active dialog, Escape and explicit close, focus returns to trigger, body scroll restored. Mobile modal remains scrollable without losing controls.
- Mobile nav: `aria-expanded`/controls accurate; Escape and outside click close, focus restoration, no links inaccessible under overlays.
- Interactive project cards must use real buttons/links, not click listener on plain `div`; nested controls must not collide.
- Inline validation with associated field error, status announcements, full no-JS fallback; verify with axe and manual keyboard routes.
- Descriptive project screenshot alt; purely decorative signature gets `aria-hidden="true"`; real link text distinguishes destinations.
- FAQ should use accessible native details/disclosure behavior.
- A full working experience does not require pointer precision, hover, high-speed scrolling, an animation finish or an available graphics GPU.

## Release-worthy functional checks

Deep links and back/forward; open modal from long scroll; contact package CTA → correct selected package; no-JS submit; blocked provider fallback; page with failed hero asset; no broken font causing severe reflow; correct HTTP redirects, robots/sitemap metadata.
