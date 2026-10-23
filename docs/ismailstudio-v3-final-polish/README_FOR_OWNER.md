# Ismail Studio — final-polish handoff (owner guide)

**Approved:** 23 October 2026 (Malaysia). This ZIP is an implementation specification and approved visual reference package; it is not website code, a site backup, or a deployment.

## Installation (do not overwrite the old V3 directory)

1. In Windows Explorer, open `C:\Users\moham\OneDrive\Desktop\ismailstudio\docs\`.
2. Extract the **single `ismailstudio-v3-final-polish` folder** from this ZIP into `docs/`. The expected entrypoint becomes `docs/ismailstudio-v3-final-polish/START_HERE.md`. Keep all files within that folder and do not overwrite `docs/redesign-v3/`.
3. Open the existing `ismailstudio` repository in Codex Desktop. Use the instruction below. No need to type a master prompt.
4. Your existing uncommitted manual cleanup must remain intact. The agent must read `09_WORKSPACE_BASELINE.md` before touching Git or staging a commit.

**Paste in Codex Desktop:**

> Read `docs/ismailstudio-v3-final-polish/START_HERE.md` and execute the approved Ismail Studio V3 targeted final-polish implementation, verification, scoped GitHub publication and conditional Cloudflare website-only release end-to-end. Preserve all current uncommitted owner changes and follow every mandatory gate. Do not revive the old V1/V2 redesign mission.

## Approval state

- Desktop art: `assets/hero-desktop-approved-original.png` — approved concept 01 + 06, unchanged original, text-free.
- Mobile art: `assets/hero-mobile-option-A-background.png` — approved option A, text-free responsive treatment.
- Mobile UI preview: `assets/mobile-option-A-approval-preview.png` — **reference only**; do not paste its rasterized headline, buttons or nav into production.
- **No new artwork is authorized.** Production can derive optimized copies of the approved assets, with composition preserved.

## Safety reminders

- This ZIP contains no secret keys, private contact records or customer's submitted enquiries.
- Do **not** manually `git add -A`, `git clean`, `git reset --hard`, force-push, or discard your deleted historical documentation and two untracked skills.
- The prior working tree passed `npm run verify` (38 browser tests, 3 redirect tests); a new agent must retest after changes.
- The old `docs/redesign-v3/` reference pack is still used by the existing validator. Do not delete or edit its checksum-covered originals during manual cleanup.
- If Codex cannot validate all production release gates, the correct outcome is a verified local/preview build and an exact blocker, not a false deployed status.

Read `START_HERE.md` for agent tasks and `01_APPROVALS_AND_BOUNDARIES.md` for the nonnegotiable source of truth.
