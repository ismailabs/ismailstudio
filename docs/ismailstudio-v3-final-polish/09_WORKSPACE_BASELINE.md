# Baseline — owner supplied, do not overwrite

**Observed 23 October 2026, Malaysia. Snapshot evidence, not guaranteed current at execution. Reobserve.**

- Windows repo path: `C:\Users\moham\OneDrive\Desktop\ismailstudio`.
- `git rev-parse --short HEAD` = `b65a208` (GitHub `main` full observed: `b65a208f03dfd01d535eb4a865ad00e2d8fc4146`).
- Owner's `git status --short` shows **many ` D` entries** under `docs/00...`, `docs/evidence/`, `docs/redesign-v2/`, `docs/redesign/`, `docs/release-record.md` etc. They are manually deleted **UNSTAGED** historical documentation/screenshots. The owner intentionally requested that Codex not perform the cleanup. Never automatically restore, stage, commit or remove these paths; leaving them alone is required.
- ` M skills-lock.json`: local owner added `wrangler` lock record from `cloudflare/skills`, hash `9eed4d658a9e8741d17cd4666701d25d4ca302a253dd62080338f473d051c50e`. Preserve exact local diff; do not overwrite lockfile from remote.
- `?? .agents/skills/ai-design-engineering/` and `?? .agents/skills/wrangler/`: owner-installed untracked skill folders. Preserve and inspect before selective use; no automatic addition or deletion.
- Local `.agents/skills` directory listed **21 entries**. GitHub tracked only **19**; do not confuse these states.
- Owner's `npm run verify` after those deletions: handoff integrity PASS, source boundaries PASS, Astro 0 errors/0 warnings, 5 static pages built, redirect tests 3/3 passed, Playwright 38/38 passed (1.8m). This verifies covered local tests, NOT all old helper scripts or the live site.
- `git grep` found legacy evidence writer/read paths in `scripts/audit-performance.mjs`, `capture-projects.mjs`, `check-form-delivery.mjs`, `compare-dns.mjs`, `record-cloudflare-state.mjs`, `smoke-release.mjs`, and `v2-assets.mjs`, `v2-baseline.mjs`, `v2-capture.mjs`, `v2-infrastructure.mjs`, `v2-matrix.mjs`, `v2-resilience.mjs`. Those scripts could recreate deleted directories or fail when a historical file is missing. Do not mass-run obsolete scripts or silently repopulate `docs/redesign/`/`docs/evidence/`.
- Current `package.json` uses Astro 7.4.1, Tailwind 4.3.3, TS 5.9.3, Motion 14.5.0, Playwright 1.64.1, Cloudflare `cf` 1.0.0-beta.19. Verify lockfile/tool availability at runtime.
- The current root `tools/validate_handoff.py` executes `docs/redesign-v3/tools/validate_handoff.py`, which relies on original approved files and `manifest.sha256`. Those were still present when the 2026-10-23 verify passed. **Do not delete these originals until the validation contract has been explicitly migrated and proven.**
- Cloudflare read-only API on 2026-10-23 showed `ismailstudio` deployment `76513860-4004-41d7-ac33-786f0d005a64` / version `b46cfec0-8728-4c4d-8031-92d354f10a19` at 100% traffic, deployed 2026-10-22. Website route and current version must be rechecked before publication. Preserve `ismailstudio-apex`, DNS and mail.

## Required startup Git precautions

1. Print actual branch/HEAD/status including untracked files, before any write.
2. Record owner's intentional D/M/?? paths, their preexisting hashes where applicable, and the exact intended agent-owned changed paths.
3. Use a safe isolated branch/worktree strategy that **does not discard or contaminate** current owner changes. No automatic stash/switch/reset when conflict exists. New handoff is expected at `docs/ismailstudio-v3-final-polish/` as separate added files.
4. Prefer explicit-path `git add -- <files...>` for the agent's work only; do not stage historical deletions, owner skill lock or untracked skills. Build/release from a reproducible exact source state and record difference from local dirty snapshot. No claim that clean GitHub HEAD includes manually deleted docs.
5. The owner, not Codex, determines whether and when to commit or archive historical deletions. If those changes prevent safe publication, keep source and preview evidence ready and report the **precise** needed owner action without deleting/restoring anything.

## Important repository paths

- Current DOM/UI: `src/components/{Header,Hero,Portfolio,Packages,About,FAQ,Contact}.astro`, `src/scripts/{site,contact}.ts`, `src/styles/global.css`.
- Grounded business data: `src/data/{packages,projects,studies,faq}.ts`.
- Metadata and pages: `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, `src/pages/work/[slug].astro`, `public/{robots.txt,sitemap.xml}`.
- Tests: `tests/{site,v2,v3}.spec.ts`, `tests-worker/`, `.github/workflows/quality.yml`, `playwright.config.ts`.
- CI/worker: `cloudflare.config.ts`, `scripts/package-cloudflare.mjs`, `scripts/v3-smoke.mjs`, `scripts/v3-form-delivery.mjs`, `workers/apex-redirect.mjs` (read-only unless authorized).
- Historical work: `docs/redesign-v3/` retained; `docs/redesign/`, `docs/redesign-v2/`, `docs/evidence/` locally deleted (unstaged).
