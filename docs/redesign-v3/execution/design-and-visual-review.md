# V3 implementation and actual-browser review

Approved direction: the four original PNGs in `approved-v3-specs/assets/approved-mockups/`, under `00-AUTHORITY-AND-PROTECTIONS.md`. The index board and image-only pack support comparison; rejected former V3 frames do not control this implementation.

The implementation retains Astro static HTML, Tailwind v4 and native TypeScript. Narrative: cinematic hero → light genuine work → concise purpose → three offers and scope context → icon-led process → Melaka developer → FAQ → guided contact → footer. Four permanent study routes and their progressive dialogs remain.

## Three focused browser repair cycles

Evidence was captured in Chromium/Edge at 1440×900 and 390×844. Each manifest records actual browser version, time, source HEAD, dirty working-tree status, URL and state. The initial `round1` screenshots were captured before full capture instrumentation; subsequent folders contain manifests. Screenshots show working source based on `65d2f51`, not a fictitious committed V3 SHA.

| Cycle | Observations, severity and root cause | Repair and after evidence |
|---|---|---|
| 1 / silhouette | (1) Desktop art was excessively cropped by cover scaling, losing the sculpture silhouette (P2). (2) Hero consumed nearly the entire first viewport and delayed the light work entry (P2). (3) Mobile H1 needed a slightly stronger scale (P2). (4) The new rounded wordmark was comfortably legible, unlike the old angular glyph; retain it. | Responsive desktop contain composition, separate optimized mobile art, smaller desktop hero padding, larger mobile H1. `evidence/round1/{1440,390}-hero.png` → `evidence/round1-after/{1440,390}-hero.png`. |
| 2 / responsive business hierarchy | (5) Artwork had an abrupt top edge when contained (P2). (6) Offer prices did not align because descriptions had different natural heights (P2). (7) Visible offer CTA wording differed from accessible names; axe found label-in-name violations (P1). (8) Wordmark text nodes lacked a literal space, also failing accessible-name matching (P1). (9) Real work media was large and recognizable; preserve its original colors and bytes. | Feathered atmospheric layer, aligned desktop title area, matching visible/accessible enquiry CTA, literal wordmark word separation. Mobile content remains natural height. `evidence/round1-after/` → `evidence/round2/`. Axe failures retained in `.local/v3/first-browser-failures.json`; all eight width audits subsequently pass. |
| 3 / polish and behavior | (10) Mobile art was still too large behind useful copy; a fully contained trial then made it too small (P2). (11) Desktop light transition could move higher (P2). (12) Floating nav needs clearance when keyboard focus scrolls controls into view (P2). (13) Menus and native dialog close controls remain clearly reachable. (14) Short-height disclosure menus needed their own bounded scroll area (P1); final CSS caps the panel to the available viewport and a focused landscape test exercises its last link. (15) New resize test incorrectly searched a hidden desktop button by exposed role; this was a test lookup defect, not a reason to remove the assertion. | Final mobile art crop blends beneath CTA while copy stays on dark scrim; compact desktop spacing; scroll margins on focus targets; resize assertion reads the hidden button's actual state and checks exposed desktop navigation. `evidence/round3/` → `evidence/final-local/`, plus `evidence/matrix/`. Final full verification: 36/36 browser tests and 3/3 redirect tests. |

No open severity-1/2 visual defect was identified in the inspected final views. This is an evidence-led implementation review, not a new human creative approval or a WCAG certification. Approved visual direction is already recorded; no user acceptance of a final rendered screenshot is invented.

Subsequent final verification includes the deferred-motion regression and short-height menu checks: 38/38 local browser tests and 3/3 redirect units. The immutable hosted preview was also captured in 27 states and a fresh 11-viewport matrix, including a current motion/reduced-motion trace. Desktop hero/offers and mobile hero/contact screenshots were visually inspected again; no additional severity-1/2 defect was identified. These manifests record served runtime source `6393bf7...` separately from the documentation HEAD.

## Deliberate adaptations

- The approved atmospheric background study is composed as a single optimized hero scene, not a raster homepage. All copy, controls and logo remain real HTML/SVG. Mobile crops prioritize legible content and an unobstructed quote CTA over generative pixel matching.
- The paired rounded vector symbol is original, with consistent standalone/stacked/inline assets. It follows the approved character without claiming a supplied editable vector or registered trademark. Actual header wordmark uses self-hosted Geist; editable export wordmarks use common Arial fallback.
- Two wide work columns and stacked mobile previews replace generated project photography. Every work item discloses Concept Project. Project media is unchanged and hash-verified.
- The invented market graph and “Most Popular” ribbon are omitted. Three primary provider pages were checked (see market-evidence.md); scope and recurring costs were not like-for-like. A transparent scope explanation uses no unsupported competitor figures. Three starting prices, page limits and revisions are exact.
- SEO scopes are one-time setup/check work. No ranking, indexing, sales, response-time, turnaround, ownership or recurring-maintenance promise has been invented.
- Motion Mini is loaded on the first navigation interaction to animate its floated state transition. Initial hero motion was removed after profiling put mobile LCP near 2.55s; the cinematic artwork remains immediately visible and static. Text starts visible, no repeated reveals, no scroll hijacking, reduced motion cancels movement. Actual trace: `evidence/matrix/motion-and-reduced-motion.zip`.

## Coverage and limits

`evidence/matrix/manifest.json` records 11 viewport/landscape cases, four study dialogs at mobile/desktop, forced colors, no-JS and 16 authentic preview hashes. `evidence/final-local/manifest.json` covers work, offers, process, about, FAQ, menu, case dialog and contact steps/errors/simulated acceptance. Form transport is mocked in automated interaction screenshots; these are never recipient-delivery evidence. Soft keyboards, physical iOS/Android devices and screen-reader listening have not been observed; browser emulation is labeled as such.

Comparison artifacts: `evidence/comparisons/desktop-reference-and-browser.jpg` and `identity-sizes.png`. Source and final viewport screenshot paths are retained rather than relying on aesthetic scores.
