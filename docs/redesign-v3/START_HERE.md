# START HERE — Ismail Studio V3 Codex Desktop execution

**Do not stop at a plan, mockup, prompt, or status report. Implement the authorized V3 redesign.**

Project: `https://github.com/ismailabs/ismailstudio`; canonical production `https://www.ismailstudio.my/`.
Preferred operator: GPT-6.1 Sol with Extra High effort if actually selectable. Project is an existing deployed Astro/TypeScript/Tailwind site on Cloudflare Workers; **never reinitialize it**.

## Authority and reading sequence

Read `00-AUTHORITY-AND-PROTECTIONS.md` then inspect these files in this handoff, in order:

1. `approved-v3-specs/boards/approved-visual-map.jpg`, the **four individual original PNGs** in `approved-v3-specs/assets/approved-mockups/`, plus `approved-v3-specs/00-APPROVAL-STATUS.md` and its `docs/01`–`docs/13`.
2. `docs/01-current-baseline.md`, `02-visual-authority.md`, `03-information-architecture.md`, `04-identity-and-artwork.md`, `05-responsive-and-components.md`, `06-offers-and-seo.md`, `07-content-and-claims.md`, `08-motion-and-navigation.md`, `09-work-and-contact.md`.
3. `docs/10-skills-and-dependencies.md`, `11-implementation-phases.md`, `12-visual-review.md`, `13-acceptance-gates.md`, `14-testing-matrix.md`, `15-release-runbook.md`, `16-delivery-and-blockers.md`.
4. Current **real** `AGENTS.md`, `package.json`, `cloudflare.config.ts`, `src/`, existing tests, `.agents/skills/`, `docs/redesign/` V2 records, and production Cloudflare facts. Treat recorded SHAs as historical until independently refreshed.

## Operating sequence (no routine confirmation prompts)

**0. Read-only snapshot:** git status/branches/commit, local changes, live render (desktop/mobile), Cloudflare website version, apex and mail/DNS/other Worker mappings, Formspree settings, skill inventory. Create `docs/redesign-v3/evidence/baseline/` with actual source/date/observations. Do not erase uncommitted work; use a safe worktree if appropriate.

**1. Branch and authority:** create a new isolated V3 branch from observed base, update the root `AGENTS.md` by editing contradictory V1/V2 *visual instructions only*, preserve business/security boundaries and document precedence. Do not rewrite user local skill changes without inspection.

**2. Build:** implement approved design in existing stack. Keep genuine work screenshots from repository; preserve values/URLs/contact field names. Create new logo SVG/favicons. Use `motion` JavaScript where justified, no React added solely for motion. Do not paste a raster image of an entire mockup as the homepage.

**3. Actual browser comparison:** capture 1440×900, 390×844 plus width matrix and meaningful hover/menu/dialog/contact states. Compare against **individual approved** V3 references using `docs/12-visual-review.md`; run and document **three focused repair loops**. Prioritize differences in silhouette, hero, light/dark balance, logo legibility, font scale and authentic media over pixel matching impossible generative details.

**4. Verify:** run repository commands and exact functionality cases. Keep failing logs, fix regressions without relaxing assertions. Add test coverage for new floating nav, logo/favicon and new offers. Validate claims, SEO, provider contract, media hashes, safe release asset allowlist.

**5. Preview and production:** use **only** scoped `ismailstudio` Worker version upload/preview/promotion mechanisms after all gates. Inspect and verify environment and Cloudflare CLI syntax before any mutation. Compare actual before/after infrastructure inventory. Maintain pretested version and tested rollback. If the tests, provider evidence, permissions, or safety invariants fail, **do not publish**. Otherwise deployment to the already authorized website is in scope; do not ask for another routine release approval.

**6. Closure:** production smoke/browser/redirect/assets, delivery evidence, actual SHAs/versions/rollout and date, design review with screenshot paths, issue registry, released/blocked status. Push to GitHub only when branch and publication checks allow; no force push, no unrelated repo changes.

## What to do when blocked

Perform all remaining safe local and preview work. Record a single precise blocker with evidence and next permitted action. No fabricated success, unverified delivery, speculative production version, invented market comparison or automatic bypass of access restrictions. Never promise unattended persistence if Codex Desktop is stopped.

## First code action

Read `docs/redesign-v3/00-AUTHORITY-AND-PROTECTIONS.md` and run `python docs/redesign-v3/tools/validate_handoff.py` from repo root before implementation. Any failure is an unpacking/integrity issue, not permission to ignore the missing specification.
