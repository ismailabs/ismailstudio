# Implementation work packages and commit plan

## Phase 0 — Baseline and worktree

Read `AGENTS.md`, refresh repo HEAD/working tree/CI; inventory V2 Cloudflare, form route, served SHA and current browser. Preserve uncommitted skills-lock and local skill changes. Create V3 worktree/branch. Add `docs/redesign-v3/evidence/` for real results (do not place submissions/secrets in git).

## Phase 1 — Identity + macro layout

Build original readable SVG wordmark/mark/favicon; light content theme tokens; ambitious H1, cinematic hero composition; responsive nav frame. Compare reference 01/04 at 1440/390 immediately. Stop piling on decorative art before composition works.

## Phase 2 — User journey

Rebuild work gallery with authentic assets; problem statement, differentiated offers, neutral market panel gated by research, Lucide process icons, concise about, FAQs and case-study dialogs. Preserve static HTML semantic hierarchy. Verify type, media and small phone view.

## Phase 3 — Interaction and forms

Integrate justified Motion.dev vanilla JS with reduced-motion/no-JS fallback, floating nav behavior, contact three-step state; preserve provider acceptance/fallback; avoid form breaks. Add focused tests.

## Phase 4 — Browser-based critique and repair

Use `docs/12-visual-review.md` and templates for 3 cycles, screenshots actual. Fix composition/scale first, then responsive/interaction, then polish/claims. Do not claim subjective design quality from Lighthouse alone.

## Phase 5 — Release evidence

`npm run check`, `npm run build`, `npm run test:redirect`, `npm test`, `npm run verify` as actually configured; additional V3 tests, Lighthouse and hosted preview. Confirm immutable version/source/assets, provider behavior, rollback and infra preservation; promote only after gates. Run canonical checks after.

## Git discipline

Small meaningful commits after passing scoped tests; no `git reset --hard` to discard unrelated work, no force push, no changes to unrelated Workers. Update root AGENTS conflict lines surgically; old `docs/redesign-v2/` stays as historical artifact. Keep asset provenance/release record. Final report must state any intentional variance from the approved mockups and unresolved limits.
