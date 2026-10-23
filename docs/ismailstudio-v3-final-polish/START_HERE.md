# EXECUTE — Ismail Studio V3 final polish

**Mission:** Improve the existing live V3 site in the already established Astro/TypeScript/Tailwind/Motion repository. **Do not reinitialize, redesign wholesale, or reinstate the V1/V2 handoff.** Finish implementation, objective browser QA, repairs, safe GitHub publication and (only after every gate passes) the scoped `ismailstudio` Cloudflare Worker release. Report the real public URL, evidence and blockers. Work through safe tasks autonomously; request owner action only for genuinely unresolved material decisions or access/safety blockers.

Canonical website: https://www.ismailstudio.my/  
Repository: https://github.com/ismailabs/ismailstudio  
Expected ZIP extraction directory: `<repo>/docs/ismailstudio-v3-final-polish/`.

## Read once, in order (each file has a distinct job)

1. `01_APPROVALS_AND_BOUNDARIES.md` — exact approvals, prohibited assumptions, release scope and unresolved commercial terms.
2. `09_WORKSPACE_BASELINE.md` — owner's **dirty local working tree** and historically verified build; preserve it.
3. `02_VISUAL_ASSETS_AND_MOTION.md` — approved artwork and responsive/motion behavior.
4. `03_CONTENT_AND_BUSINESS.md` — approved business copy facts, offers, 4 concept narratives and FAQ.
5. `04_COMPONENT_IMPLEMENTATION_MAP.md` — file- and behavior-level implementation.
6. `05_QA_ACCEPTANCE_MATRIX.md` — tests, evidence and release-stopping failures.
7. `06_PROTECTED_RELEASE_RUNBOOK.md` — safe preview/promotion/rollback procedure.
8. `07_SKILLS_AND_HISTORICAL_CLEANUP.md` — skill orchestration and historical cleanup restrictions.
9. `08_DELIVERY_REPORT.md` — final output requirements.
10. `assets/` and `manifest.sha256` — approved pixels and integrity.

Also inspect **current** `AGENTS.md`, `README.md`, `package.json`, `cloudflare.config.ts`, relevant `src/`, `tests/`, `.github/workflows/quality.yml`, old V3 protection and release records, and installed CLI help. If historical instructions conflict with this newly approved *final-polish* scope, follow current direct owner approvals while preserving all existing nonnegotiable safety restrictions. Never let an agent skill, generated image label or old document override approval, privacy, legal/platform constraints or measured behavior.

## Execution plan

**0. Read-only preflight.** Confirm repo root, active branch, `git status --porcelain=v1`, `git rev-parse HEAD`, remote, local-only skill files and `skills-lock.json` diff. Create a redacted current-state record under an appropriate ignored `.local/` directory. Run `python docs/ismailstudio-v3-final-polish/tools/verify_handoff.py` and verify the three approved image checksums. Check available browser, test, credentials and Cloudflare scopes *without disclosing secrets*. Inspect current live site and screenshot its actual desktop/mobile states; historical V3 release receipts are not current proof.

**1. Protect preexisting work.** The owner has intentionally deleted many historic `docs/` V1/V2 records but **has not committed the deletions**; also modified `skills-lock.json` and installed two untracked skill directories. Do not restore, stage, commit, delete, overwrite, stash or reset these. No `git add .`, `git add -A`, `git clean`, `git reset --hard`, force operations or automated mass cleanup. If a clean source tree is needed for reproducible testing, use a separate non-destructive worktree/isolated snapshot and explicitly account for the handoff assets. Branch creation must not risk local owner changes. Do not describe those deletions as finished or pushed. If safe isolation cannot be established, stop only affected Git actions and finish other safe work.

**2. Baseline and implement.** Inspect live UI/DOM/network; identify regressions first. Preserve existing V3 hero H1, visual rhythm, identity, prices, authentic screenshots, contact provider/field contract and working tests. Replace *only the hero media* with optimized copies of approved desktop and mobile option A. Execute tightly scoped component/content/navigation/motion/SEO improvements from files 02–04. Ensure any legacy script cannot regenerate the old hero/favicons during the new build. Do not add a new custom backend, database, React runtime, unverified third-party script or paid service. Do not change protected Cloudflare/DNS/email resources.

**3. Actual visual critique.** Capture desktop/tablet/mobile and interaction states, compare against current V3 and approved mobile option A; record at least three deliberate observe → targeted repair → recapture cycles, without inventing changes or forcing needless edits. Confirm real semantic HTML and accessible interfaces (the screenshot's copy is not production source). Prevent all P1/P2 visual/usability defects from passing.

**4. Objective verification.** Run the current repository's actual `npm run verify`, relevant extended browser tests, fresh accessibility/SEO/metadata/form tests, Lighthouse/performance assessments and safety/asset checks as required by `05_QA_ACCEPTANCE_MATRIX.md`. Do not weaken assertions, mark failures as passes or run real form submissions through CI. Tests must validate new behaviors and invariants, not only the existing 38 historical tests. Review any compatibility adjustments with the V3 validator before changing its manifest.

**5. Source and preview release.** Commit/push **only authorized agent-created changes**, using explicit path selection and an isolated verified branch if safe; never sweep up owner's D/M/?? paths. Observe current GitHub refs and applicable branch protections; no force pushes. Produce a tested, reproducible, commit-bound website package with hashes. Use the established Cloudflare *website-only version upload/preview* path, verify the immutable preview against that source, check protected resources and exact release constraints. Stage only artifacts that belong to the approved website; credentials and raw customer data remain private.

**6. Conditional production.** Promote only the exact tested version to `ismailstudio` after every mandatory gate passes and rollback/current traffic state is recorded. **Never** deploy `ismailstudio-apex`, mutate DNS/Zoho/other Workers/subdomains, or use a generic deploy command that might promote prematurely. If a material gate is unproven (including unresolved public timeline wording if it is being published, form delivery, access, or asset provenance), finish safe nonrelease work, record the concrete blocker and do not claim production success. This is authorization for a *scoped conditional release*, not permission to bypass requirements.

**7. Closure.** Verify actual canonical live site, redirects, source/version, assets, the owner-visible form delivery evidence, content, interactions, protected infrastructure and rollback readiness. Report `PASS/RELEASED` or `BLOCKED/PREVIEW ONLY` precisely, with working URL, full SHA, immutable version ID, GitHub status and a concise owner-readable issue list. Do not promise background persistence.

## Nonnegotiable design and commercial facts

Read files 01 and 03 rather than inferring facts from screenshots. At minimum: `BUILT FOR BIGGER PROBLEMS.`; Melaka-based frontend developer serving Malaysian SMEs; exactly three From prices RM599 / RM1,299 / RM2,999 with page limits 1/5/12 and revisions 1/2/2; one-time basic/technical/advanced on-site SEO; four honest **Concept Project** showcases; primary verified enquiry form and secondary contact@ismailstudio.my; no fabricated client, SEO, sales, experience, registration or project duration guarantees.

**Definition of done:** A working, verified deployed website with true evidence, not a draft, screenshot, commit, build or preview alone. If safe publication is blocked, report exact evidence without claiming done.
