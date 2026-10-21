# Visual QA and critique/repair contract

## Evidence and comparison

Render **real website screenshots** at 1440×900, 390×844; additionally 1024, 768, 320 and desktop 1920. Capture hero, each work segment, pricing, process/about, FAQ, contact, mobile drawer, modal, form steps and error/success states. Store timestamp, Git SHA, URL, viewport, browser/build, state and image path. Compare with `assets/approved-mockups/frames/*`. Approval frames are intentionally static; behavior verified separately. Register deliberate technical adaptation with reason, not as silent fidelity drift.

## Composition checklist

1. The home hero looks fundamentally different from V1: dramatic typography/contrast, cinematic atmosphere and an original identity-bearing visual mechanism—not split left copy/right envelope art.
2. Work is the creative centerpiece with four **real** capture previews, different proportions and genuine live links; no generic equal-size 4-card row as primary visual experience.
3. Orange, ink, warm-paper and atmospheric cool hues form a coherent contrast cadence; not indiscriminate gradients or a random neon library.
4. Case-study overlay is concise, visually custom, accessible, sourced. Pricing is easily read without clicking through marketing gimmicks.
5. Mobile is intentionally designed, not desktop squeezed down. Type, overlay, CTAs, pricing and multi-step contact all remain first-class.
6. Motion is purposeful, performant, reduced-motion safe; hero visual does not hold back content or reduce LCP for no functional benefit.
7. All content preserves truth; **no invented client testimonials, stats, successes, guarantees or company claims**.

## Three mandatory focused cycles (until blockers or completion)

- **Pass 1 — macro direction:** screenshot critique of brand recognizability, editorial hierarchy, hero/work balance, page pacing, contrast and distinctiveness. Repair only the highest-impact 3–8 defects; retain before/after images.
- **Pass 2 — cross-device and conversion:** examine mobile/menu, case-study readability/focus, pricing comparison, quote steps, precise scroll states and actionable copy. Repair defects and retest behavior.
- **Pass 3 — polish and resilience:** typography, imagery/cropping, transitions, focus, microspacing, performance and reduced motion; recheck no-JS/provider failure states. If major defects remain, continue additional cycles where feasible, but never mark done falsely.

Use `templates/visual-review-template.md` and `templates/issue-log.csv`. Defect record minimum: ID, frame/viewport, expected, observed, severity (blocker/high/medium/low), screenshot, owner, change, retest result. Human already approved creative direction and mockups; Codex can make minor engineering adaptations but **must not silently switch to a different art direction**. Inability to meet a major invariant is a release blocker unless documented and genuinely unavoidable.

No empirical "design score" from AI and no claim that a Lighthouse 100 proves visual excellence. Final screenshots and test results are the evidence.
