# Visual design system — Codex implementation specification

## Evidence and precedence

- First study `assets/approved-mockups/frames/00-direction-overview.png`, `01-desktop-hero.png`, `02-desktop-work.png`, `03-desktop-work-cont.png`, `04-desktop-pricing.png`, `05-desktop-process-about.png`, `06-desktop-case-study.png`, `07-desktop-contact-step1.png`, `14-desktop-faq.png`, and mobile frames `08`–`16`.
- Desktop approval frames: **1440 × 900**. Mobile approval frames: **390 × 844**. Note that height represents a framed section/state, not necessarily full-page scroll length.
- Review boards: `frames/desktop-review-board.jpg`, `frames/mobile-review-board.jpg`.
- Image-generated text and decorative source photos are unreliable; verified business details and real project previews take precedence. Do **not** paste screenshot mockups as flattened background images.

## Proposed tokens to calibrate, not hardcodes to copy blindly

| Role | Directional token | Intended usage |
|---|---|---|
| Ink | `#080D12` | Primary cinematic background |
| Dark surface | `#101820` | Form, pricing, layered panels |
| Warm paper | `#F4F2EC` | Work contrast section and UI relief |
| High contrast text | `#FFFAF4` | Large headings on ink |
| Signal orange | `#FF5733` | Active cues, decisive contrast, core identity |
| Cool atmospheric | `#C3CFFF` | Focus/ambient signal; verify small-text contrast |
| Muted label | `#A9B3B7` | Secondary information with AA checks |

Typography: heavyweight grotesk display with tightly controlled tracking for huge headings, simple sans body, numerical labels and uppercase microtype; no extra decorative font for every section. **Font selection is Codex's decision after checking license, availability and real rendering.** Prefer local optimized fonts and variable weights. Avoid pure-outline title strokes as the only accessible representation of words.

## Design rules by section

**Navigation:** compact mark + readable `ismail studio` wordmark, Work/Services/Process/About + clear quote CTA. Mobile menu is genuinely operable and visible. Screen reader and focus return specified in `docs/08-responsive-a11y.md`.

**Hero:** near-black atmospheric stage; 50–65% of visual emphasis to assertive editorial title, 35–50% to bespoke interactive form/media. Motion is background/subordinate to value proposition. Large typography but no overlaps at 320/390/768. One clear quote CTA and one work CTA, true introductory statement and small price starting note. The current classic symmetrical V1 split hero is **not** the pattern to clone.

**Work showcase:** switch to warm paper in approved frames; large bold heading and lively staggered/bento presentation. Use **actual original screenshots** only, not image-gen recreations. Distinct image proportions, varying vertical rhythms and project-specific copy and palette; give each concept purposeful CTA. Reassure `Concept Project` in every detail/dialog, not just a legend.

**Manifesto/process:** editorial contrasting section; `Discuss → Define → Build → Review → Launch` stays intelligible. Process may use temporal progression/numbered track, but not just 5 feature cards laid out equally without visual intention. Respect information density.

**Pricing:** mockups show a striking full-width comparison **row/table-like** pattern and clear `Starter / Business / Premium` differences. Do not revert to default three stacked equal cards on desktop merely due ease. Mobile rows stack with each tier's price/scope/revisions/CTA, no horizontal overflow. Business highlight is a visual emphasis, **never call it popular without evidence**. Exact three from-prices and limits must survive.

**About:** bold independent-practice typography, an evocative studio-specific glyph/artifact, concise factual first-person writing. No fabricated founder photo or personal biography.

**FAQ:** plain native `<details>` or accessible disclosure components with full answers from source data. Visual hierarchy bold but the interaction ordinary and trustworthy.

**Contact:** full-width editorial CTA and 3-step guided UI, strong contrast without making the form hard to read. All existing fields/provider retained. Clear progress, validation, review step and real receipt state. `docs/07-contact-flow.md` is controlling.

## Layout constraints

- Use a logical wide container of approximately 1280–1440 content width on desktop; responsive side padding approximately 20–80px. The mockup uses 1440 frames, so inspect spacing ratios rather than count pixels blindly.
- Large display titles often 72–130px at desktop but must adapt with `clamp()` and prevent overflow. Body ~15–18px minimum comfortable sizing and 1.5+ leading. Tiny overtracked micro-labels are **secondary only**; never put required disclosures exclusively at 10px.
- Contrast, large tap targets, no motion blockers, semantic headings. Avoid infinite scroll/hijacking and costly JS for composition.
- Keep UI coherent at 320, 390, 768, 1024, 1440, wider desktops and mobile landscape.

## Visual success / failure

Success: a visitor immediately sees a **distinctive developer's designed work**, understands the service, experiences fluid but unobtrusive motion, can compare prices and get in touch. Difference from V1 is unmistakable at a glance. Failure: visual signature unrelated to business, inaccessible style, confusing project reality, identical reusable cards, copy implying real paid outcomes, illegible light-on-light, broken modals/forms or mockup rendered as a screenshot poster.
