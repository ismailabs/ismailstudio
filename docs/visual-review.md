# Rendered design review — 2026-10-21

Reviewed the real HTTP-served static build in Edge, with full-page and section captures at 360, 390, 430, 768, 1024, 1440 and 1920 pixels. Local originals are in `.local/screenshots/round1`, `round2` and `round3`. These are browser screenshots, not proposed mockups. Selected empty-form samples are retained under `docs/evidence/screenshots/`.

## Observations and repairs

| Observation | Action and verification |
|---|---|
| The initial phone eyebrow, proof line and project metadata were too small to read comfortably. | Raised the smallest public type to 13px, increased project/process body copy to 16px and darkened muted text. Reviewed final phone and desktop captures. |
| Pricing exclusions and footer/legal text were visually weak. | Increased those sizes; retained every scope, revision and exclusion from the approved copy. Reviewed 390/768/1440 pricing. |
| The translated-offscreen skip link appeared at the top of clipped screenshots. | Replaced the hiding technique with clipping until focus. Keyboard test confirms the first Tab reveals it and Enter focuses main content. |
| A generic card grid would flatten the four different project identities. | Used staggered genuine project screenshots on distinct muted mats, with explicit Concept Project labels and real links. At phone widths the gallery becomes a single readable sequence. |
| The page needed a clear visual change between proof and offers. | Retained the forest field for the practical approach, then returned to paper for the three exact offers. The about monogram and pale contact field provide different compositions further down. |
| Contact illustration competed with form space on phones. | Hide this decorative image at the phone breakpoint; preserve the enquiry headline, direct email, labels, notice and full form. Reviewed phone contact capture. |
| Lighthouse found accessible link names that did not contain the visible wording. | Made the wordmark's natural name include its visible words and changed project link names to start with “View live concept”. Added WCAG 2.1 A tags to the axe checks. |
| Lighthouse found oversized phone project downloads. | Added 400/800 derivatives from the original genuine captures and corrected sizes/srcset on both source and img. No fabricated imagery or recapture substituted. |
| Tailwind's default repository scan emitted utilities from skill examples and documentation. | Restricted class discovery to src, following the official source() configuration. Final browser checks cover the resulting stylesheet. |

The 1440px process, about and FAQ, and their 390px counterparts were read at useful section scale. Process copy and the about paragraph remain comfortably separated; FAQ questions wrap without clipping. The long phone page is intentional: the approved commercial copy is complete, rather than hidden or shortened for a screenshot.

## Direction and evidence limits

The supplied paper/forest/vermilion identity and full headline control the result. Taste direction `uneven-photographs` informs the staggered real-project gallery. Required eyebrows, hairlines, numbered process, three pricing columns and supplied palette conflict with some generic taste rules; those exceptions are explicit in `design-decisions.md`. Raw source lint still reports those patterns and the checkmark glyph false positive; it is not a clean raw-lint pass.

The native taste CDP launcher failed to keep Edge open on this Windows host. The same bundled DOM/layout/frame/rule probes were run through working Playwright/Edge transport: zero failures at 1440/768/390 after the stated exceptions; ten actually moving elements observed. Remaining warnings concern required pricing/gallery repetition, cream palette, type variety and absent video. No owned video exists, so none was invented. These measurements and subjective review do not claim an external design award or complete accessibility certification.
