# V2 browser critique and refinement

Reference: `../redesign-v2/assets/approved-mockups/frames/`. Approved creative direction remains unchanged. Genuine captures take precedence over the mockup's altered project UIs. Original authored SVG IS portal replaces the reference's mood-only chrome sculpture; no flattened mockup is shipped. Warm-paper accent text is darker for contrast. Unequal staggered work is a deliberate translation of the approved bento direction.

## Cycle 1 — macro direction

Actual built Astro site, Edge, 1440×900/390×844, 27 state screenshots in `evidence/round1/manifest.json`. Compared hero, work, pricing, mobile contact and case study against both review boards. Strong ink/paper rhythm, oversized proposition, original IS geometry, genuine project images and comparison rows are present. This is a material reinvention of V1.

| ID | Expected / observed | Severity | Repair / retest |
| --- | --- | --- | --- |
| V2-01 | Desktop header has plain navigation; mobile Menu also appeared at 1440 | Medium | Hide menu above mobile breakpoint; retest round2 |
| V2-02 | Hero footer is quiet and legible; glyph caption collided with scroll cue | Medium | Reduce desktop glyph 48% → 45%; move caption into glyph's reserved area; round2 |
| V2-03 | Entire mobile composition has a clear close; oversized glyph pushed footer below first frame | Low | Mobile glyph 84% → 74%; preserve headline/CTAs; round2 |
| V2-04 | Dialog centered with viewport clearance; Tailwind reset left it at viewport origin | High | Explicit native-dialog `margin:auto`; round2 and keyboard/viewport assertions |

No tests or aesthetics are claimed passed from this review alone. Later cycles and final dispositions follow.

## Cycle 2 — cross-device and conversion

27 fresh screenshots in `evidence/round2/manifest.json`. Inspected desktop/mobile hero, mobile pricing/menu/review, desktop modal/contact and second work pair. V2-01–04 visually repaired: desktop nav now clean, caption no longer collides, mobile footer fits 844px, centered dialog clears viewport.

| ID | Expected / observed | Severity | Repair / retest |
| --- | --- | --- | --- |
| V2-05 | Pricing has decisive line breaks; “YOU.” was orphaned on 390px | Medium | Shorten creative heading to “SHAPED TO FIT.”, same business facts; round3 |
| V2-06 | Review is concise; six full-width summary rows buried submit | Medium | Two-column summary for short values, full-width email/message; all values retained; round3 |
| V2-07 | Open menu state has an obvious close cue; plus icon did not change | Low | Rotate plus to close glyph on expanded state; round3 |
| V2-08 | Visible project disclosure agrees with voice-control name; axe flagged mismatch | High | Accessible link names begin “Concept Project”; keep WCAG 2.1 A assertion; final suite |

Added brief transform-only step continuity; reduced-motion removes it. The first test run was stopped after eight repeated instances of V2-08; its failure evidence is retained locally. No accessibility assertion was relaxed.

## Cycle 3 — polish and resilience

27 screenshots in `evidence/round3/manifest.json`. Inspected mobile pricing/menu/review/FAQ/contact and desktop process/about. V2-05–07 repaired: heading has two deliberate lines, complete review and send control fit the form frame, open menu shows a close cue. Functional suite at this point passed 23/26, with failures retained in `evidence/browser-cycle3.json`.

| ID | Expected / observed | Severity | Repair / retest |
| --- | --- | --- | --- |
| V2-09 | About lead is separate from body; paragraph visually crowded its final line | Low | Explicit lead bottom margin; final screenshot |
| V2-10 | Tablet has no page overflow; 768px/1024px measured 16px/8px extra | High | Traced to decorative pseudo-elements, not text: grid negative insets exceeded responsive gutters; atmospheric pseudo extended right. Match actual gutters and keep atmosphere inside. Preserve overflow assertion; final suite |
| V2-11 | Shared identity reflects V2; favicon/OG were still V1 green/paper | Medium | Generate original ink/orange identity icons and readable 1200×630 cover; no mockup raster shipped |
| V2-12 | Study structured data describes actual page; inherited WebSite URL pointed at each study | Medium | Homepage retains WebSite; four study pages use truthful WebPage data, all script hashes allowed by CSP |

All earlier visual invariants remain present. Final retest/capture results are appended after the full check and release preflight; no numeric aesthetic score or WCAG certification is claimed.

### Repair verification

Final matrix captures (`evidence/matrix/`) show 320/768/1024/1920 hero and all four standalone studies at desktop/mobile. Measured page width now exactly matches each viewport, including 768 and 1024. All 26 functional cases verified across the full 25-pass run and unchanged focused pass. Resilience captures (`evidence/resilience/`) show reduced motion, pending, provider failure and no-JS; runtime errors zero in sampled flows. Pointer motion and live reduced-motion switch are asserted with private traces in `.local/v2/`. No actual form submission is made by these simulated QA scripts.
