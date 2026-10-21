# Engineering and iteration work plan (autonomous)

## Phase 0: actual-state audit (no mutation)

- Confirm branch/worktree, lockfile, build scripts, Astro and static Cloudflare deployment; compare against baseline. Inspect `AGENTS.md`, old V1 docs and `.agents/skills` (21 local vs 19 GitHub; don't assume local matches remote).
- Locate real project image originals, image pipeline, asset licenses, favicon/OG, form endpoint config, smoke tests, site route handling and contact privacy.
- Browser baseline screenshots at specified viewports including old V1 and a simple working form test where safe. Record performance/axe and browser console; distinguish measured vs historical.
- Capture current deploy version, DNS/mail/route inventories and rollback mechanism using read-only APIs; no required credentials in handoff text.

## Phase 1: safe branch + governance correction

- Create new feature branch from observed `main` SHA. If dirty tree contains user changes, preserve them and adapt without deleting/stashing nonconsensually.
- Insert brief V2 routing note into root `AGENTS.md`, **do not replace the old nonnegotiables**. Archive historical design decisions as V1 rather than deleting historical evidence. Copy or cross-reference `docs/redesign-v2` resources.
- Validate `$ai-design-engineering` discovery/reading. Scope specialist skills; record used/not relevant with artifact evidence. Optional deletion only after actual reference/dependency audit and safe backup/version-controlled rollback.

## Phase 2: foundation and visual identity

- Establish tokens, typographic scale and real image manifest. Prototype bespoke IS/portal motif with static fallback; verify readability/CLS/LCP before adding motion.
- Rebuild Header, Hero and Portfolio layout to match approved visual rhythm; compare captures immediately. Do not defer visual assessment to the end.

## Phase 3: content architecture and conversions

- Implement truthful concise case-study overlays, accurate descriptions and stable demo links; verify project image fidelity.
- Build distinctive manifesto/process, services/pricing, about, FAQ, contact and footer. Implement 3-step enquiry as progressive enhancement of existing provider contract.
- Check pricing copy, exclusions, navigation, SEO and privacy. Ensure no fake support metrics or paid-project claims.

## Phase 4: interaction and polish

- Bring in deliberate motion one capability at a time; measure and keep reduced-motion equivalent. Responsive and keyboard states get equal priority to desktop screenshot.
- Visual polish and repair: see `docs/11-visual-qa.md` for 3 recorded cycles. Do not accept a well-tested generic UI.

## Phase 5: preflight and conditional release

- Run required checks, verify user-approved facts and unique art direction, review all diffs. Capture source SHA and preview. Compare expected/actual Workers and mail/DNS state. Prepare rollback. Deploy only once critical gates pass as detailed in `docs/13-production-release.md`.
- Immediately verify production, incl. safe form provider-to-inbox if accessible. Report precise completion status and evidence. On error, rollback *within authorized website scope* if safe; otherwise stop and escalate with rollback commands/paths.

## Minimum working implementation record

`docs/redesign/implementation-progress.md` (phase/time/shas), `docs/redesign/asset-evidence.json`, `docs/redesign/skills-audit.md`, `docs/redesign/evidence/` screenshots, `docs/redesign/visual-reviews.md`, `docs/redesign/test-report.md`, `docs/redesign/release-record.md` and `docs/redesign/remaining-issues.md`.
