# Visual QA and accessibility acceptance for future implementation

These are **criteria**, not completed execution results.

## Must be visually demonstrable

- Full-bleed cinematic hero meaningfully matches approved headline scale and atmospheric art. Real project screenshots appear, unaltered.
- Strong dark-to-light transition after hero. Majority of body sections are clean white or pale neutral with spacious layout.
- No orange in Ismail Studio UI accents; existing *project screenshots* may retain original project colors.
- Logo and icons comfortably large; no 10–11px essential body information.
- No repetitive dense-card grids or fake dashboards; negative space and image size carry hierarchy.
- Pricing shows exactly three real starting prices, page limits, revisions and scope differences. No unsupported Most Popular/savings/rankings.
- Morphing floating nav remains visible, functional and accessible while scrolling.

## Functional/accessibility gates

- WCAG 2.2 AA target; keyboard-only walkthrough; visible focus on nav, CTAs, project studies, accordions and form.
- Dialog focus containment/restore, ESC/close button, history/deep link and scroll behavior.
- `prefers-reduced-motion` and no-JS: all primary copy, links, offers, FAQ and native form path remain useful.
- No horizontal overflow at 320/375/390/768/1024/1440/1920.
- Lighthouse mobile/desktop and actual browser asset/performance trace; no fabricated lab/field scores.
- Page speed/motion balanced so the cinematic hero doesn't harm reading or block CTA.
- Quote flow must maintain Formspree acceptance semantics, truthful errors/success; provider-to-Zoho test only with an appropriately authorized safe test process.
- Verify page metadata, canonical URL, sitemap, schema eligibility and no accidental noindex.

## Three qualitative screenshot critique passes

1. **Art direction:** Compare hero composition, brand mark, project media and light/dark rhythm to approved images.
2. **Legibility/responsiveness:** Compare headline size, white space, cards, CTA and mobile nav, repair problems.
3. **Polish and factual truth:** Hover/focus/reduced-motion, real project provenance, market numbers, content and forms.

Each pass should log screenshot path, finding, severity, changed file, before/after proof and retest status. A built website is not automatically visually approved because technical tests pass.
