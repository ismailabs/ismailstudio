# Skill orchestration and safe handling of historical material

## Current local agent skill state (owner-supplied 23 Oct 2026)

**21** folders in `.agents/skills/`: accessibility, ai-design-engineering, astro-best-practices, best-practices, cf-cli, cloudflare, copywriting, core-web-vitals, customer-research, design-taste-frontend, frontend-design, marketing-psychology, performance, playwright-cli, seo, tailwind-design-system, typescript-guidelines, ui-ux-pro-max, web-design-guidelines, web-quality-audit, wrangler.

GitHub tracked **19** of these; `ai-design-engineering` and `wrangler` are owner-installed untracked local folders. The owner's `skills-lock.json` has an unstaged wrangler entry. The ZIP must not overwrite, remove, install or stage them.

### Activation by job (do not run every skill simultaneously)

| Role | Skills | Activation boundary |
|---|---|---|
| Orchestration | `ai-design-engineering` | Explicitly inspect local content/provenance; coordinate approved visual critique and release without overriding approvals |
| Design implementation | `frontend-design` + narrowly `design-taste-frontend` | Approved V3 taste/critique only; no random new art direction or copying references |
| Astro/CSS/TS | `astro-best-practices`, `tailwind-design-system`, `typescript-guidelines` | Existing stack, minimal JS and no framework rewrites |
| Copy and offers | `copywriting` | Factual, concise business copy; no fabricated proof; `marketing-psychology` optional for ethical clarity |
| QA specialists | `accessibility`, `seo`, `performance`, `core-web-vitals` reference, `web-quality-audit` | Distinct responsibilities; measure instead of redundant repeated audits |
| Browser | `playwright-cli` or repository's existing Playwright library | Favor already configured tests, no install required |
| Hosting/release | `cf-cli`, `cloudflare` | Existing verified `cf` website-version method; `wrangler` is **not** the default deployment alternative and cannot override current Cloudflare config |
| Extra reference only | `ui-ux-pro-max`, `best-practices`, `web-design-guidelines`, `customer-research` | Only when useful; no claims of user research without primary evidence |

No skills.sh addition is necessary for this approved work; do not search/install solely to satisfy a skill count. If a new skill is genuinely needed, first verify official provenance, exact current repo/package/version, license, required commands/network/credential behavior, overlap and maintenance. Ask for approval if installation requires privileged/paid/risky changes; never execute anonymous remote installers.

## Existing manual cleanup must stay owner-controlled

User locally deleted historical `docs/00*`, other original V1 docs, `docs/evidence/`, `docs/redesign-v2/`, `docs/redesign/`, older root reports. These deletions are **unstaged**; the original tracked Git commits still retain the bytes. `npm run verify` passed after deletions. Owner chose to perform cleanup themselves; Codex must not revert, finalize, archive, re-delete, stage, or commit historical cleanup for them without new explicit authorization.

**Do not make the active new handoff depend on deleted V1/V2 records.** Treat the new `docs/ismailstudio-v3-final-polish/START_HERE.md` as final-polish entrypoint. Existing `AGENTS.md` and root `START_HERE.md` route toward completed V3; update only those active pointers *carefully* to avoid confusing Codex, preserving their infrastructure/business protections. Old V3 release records and approved SHA manifest remain relevant until migration.

### Legacy scripts and active references

Owner's read-only `git grep` found source paths to deleted directories in `scripts/audit-performance.mjs`, `scripts/capture-projects.mjs`, `scripts/compare-dns.mjs`, `scripts/record-cloudflare-state.mjs`, `scripts/check-form-delivery.mjs`, `scripts/smoke-release.mjs` and `scripts/v2-*.mjs`/`v2-assets.mjs`. Some **write** missing historical folders; `v2-assets.mjs` also **reads** deleted `docs/evidence/project-captures.json`. Do not execute indiscriminately; when active helper functionality is needed, first migrate its output to a safe current location (e.g. ignored `.local/` or scoped current evidence) with caller/tests updated. Do not recreate entire old folders merely to silence scripts. Preservation of historical evidence belongs to Git history and selected final V3 release records.

- The root `tools/validate_handoff.py` still invokes old V3 `docs/redesign-v3/tools/validate_handoff.py`. It validated 411 entries PASS in the owner's local test. This means old V3 image originals and SHA manifest are active validation dependencies and should be **retained** pending a specific migration, not deleted automatically.
- `scripts/prepare-brand.mjs` regenerates obsolete V2 favicon/social media; `scripts/prepare-v3-assets.mjs` regenerates previous atmospheric hero from old study. Do not run either as part of new hero optimization. If project commands reference them, repair that linkage without overwriting approved images.
- `src/components/Why.astro` and `StudioGlyph.astro` may be obsolete from homepage but are not deletion-authorized; perform dependency scan before making any separate proposal.
- `docs/redesign-v3/evidence/` (~84 MiB) includes genuine V3 release receipts, provider and performance evidence. Do not remove for token savings; selective, intentionally scoped reading is sufficient.
- Old V1/V2 mockups, prompt sheets and files do not control current visual direction. `docs/redesign-v3/approved-v3-specs/` contains historical approved visuals, but this new desktop/mobile approval supersedes *hero media only*; the original approved V3 overall rhythm still governs everything else.

## Operating efficiency

Read `START_HERE.md` and the single relevant numbered module for each task rather than ingesting hundreds of screenshots or 21 skills. Run source search/reference maps, keep a compact issue/decision log and attach evidence links instead of repeating logs or reading all historical context. This saves tokens without destructive file removal. Do not treat prompt brevity as excuse to omit verification or safeguards.
