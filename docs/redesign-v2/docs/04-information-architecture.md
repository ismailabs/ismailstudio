# Information architecture and approved routes/states

## Required pages/anchors

Preserve canonical homepage at `/` and exact canonical host. Existing permanent apex/HTTP redirects remain. Required semantic sections, in a narrative order Codex can refine without dropping them:

1. Header and hero (identity, proposition, quote/work CTAs)
2. Problem/opportunity or editorial manifesto (actual rationale, not invented conversion claims)
3. Selected work (4 genuine previews) and concise project case-study overlays
4. Approach and process (5 steps, honest responsibilities)
5. Services and starting pricing (3 offerings and exclusions)
6. About (independent developer)
7. FAQ (6 baseline questions/accurate answers)
8. Contact/three-step quote form, privacy note and footer

Supplementary routes may be added only when they concretely improve deeper case-study reading, privacy disclosure or SEO, without fragmenting the main homepage. Keep old anchor links and meaningful inbound URLs working, with redirects if removing route/anchor. New routes need unique metadata and canonical links. Case-study popup *first*; `?case=kilatmoto` or equivalent deep link may be progressively added if fully accessible on direct load/back-forward and no-JS fallback exists. Do not create empty pages solely to have more URLs.

## State matrix

| State | Reference frame | Mandatory behavior |
|---|---|---|
| Desktop hero | `01` | H1 readable; 2 CTAs; prominent signature without obscuring text |
| Work first pair | `02` | Genuine project screenshot, clear interaction/disclosure |
| Work second pair | `03` | Same facts and quality; varied composition |
| Pricing | `04` | All tier details visible without toggles hiding comparisons |
| Process + about | `05` | 5 steps and accurate identity |
| Case-study overlay | `06` | Full modal a11y and real live-demo link |
| Contact step 1 | `07` | Name, business, email; validation |
| FAQ | `14` | 6 accurate accessible disclosures |
| Mobile hero | `08` | Legible headline, usable CTA, no visual overflow |
| Mobile work | `09` | Screenshot fidelity, scannability |
| Mobile modal | `10` | Scroll, focus/close, viewport-safe dialog |
| Mobile contact steps | `11`, `12`, `16` | Progress, field persistence, review, send state |
| Mobile pricing | `13` | Tier names and exact prices all visible |
| Mobile navigation | `15` | Operable disclosure; no focus trap |

Supplemental states Codex must capture independently: loading/error, submitting/success, invalid field, focus ring, menu keyboard, modal close/focus return, reduced-motion, no-JS fallback, tablet and narrow mobile widths, contact provider unavailable and direct email route.
