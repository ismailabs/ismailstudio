# Protected release and GitHub publication runbook

The owner authorizes **conditional** autonomous publication to the established Ismail Studio website only. Current infrastructure and credentials must be freshly read before any remote action. Reference historic `docs/redesign-v3/execution/release-record.md` and original `docs/redesign-v3/docs/15-release-runbook.md` as proven operational method, but do not blindly copy stale IDs/flags.

## Release target and excluded targets

Allowed (subject to all gates): a new verified version of the existing `ismailstudio` Cloudflare Worker serving `https://www.ismailstudio.my/`, and normal (non-force) authorized GitHub publication of the scoped source changes.

Never change: `ismailstudio-apex` or its redirect, existing DNS records (including MX/TXT/Zoho), zone-wide features, unrelated Workers/sites/subdomains, API tokens, Formspree recipient/provider, paid offerings/domains or ownership accounts. Do not use the generic `npm run deploy:worker` or unqualified `cf deploy` where behavior could immediately update public traffic. No `cf workers triggers deploy`. Check current CLI help/schema and cloud docs rather than guessing commands.

## 0. Preserve owner workspace and source proof

- Record `git status --porcelain=v1`, branch, `HEAD`, remote, protection status, file-level diff, and intended agent-owned paths.
- Your code changes and derived approved images must be **commit-bound** before release; a dirty nonreproducible folder does not establish deployed provenance. Never use `git add -A` or commit the owner's intentional historical deletions, locally modified skill lock or untracked skills. If needed, a safe isolated worktree should contain only the reviewed implementation snapshot plus installed handoff references.
- Preserve a known-good remote branch; never overwrite existing refs or bypass branch rules. Direct main fast-forward only if permitted by account/branch settings and a successful fresh CI run. If protected or owner cleanup state makes a safe publication impossible, push only a verified allowed branch if feasible and report what remains blocked.

## 1. Read-only infrastructure baseline

Collect account/zone/site Worker names, domain routes and apex behavior, preview capabilities, actual Worker versions/deployments/traffic, bindings, other Workers, DNS+mail record inventory, Formspree endpoint and sender/receipt status. Compare current version against baseline; historical version `b46cfec0-8728-4c4d-8031-92d354f10a19` (deployed 22 Oct) is a **reference**, not blindly trusted rollback target. Keep raw account snapshots private/ignored and use redacted diffs for evidence.

## 2. Local pass and exact immutable preview

- Use the project`s pinned toolchain and `npm run verify` plus expanded checks in `05_QA_ACCEPTANCE_MATRIX.md`. Source must be reproducible and known; record clean source identity, optimizer versions and output manifest/hashes.
- Review `scripts/package-cloudflare.mjs`, `cloudflare.config.ts`, installed `cf` CLI version/help, and current Cloudflare documentation. Reuse the site's established `--site-only --preview-only` packaging only if those flags are still verified safe and upload is nonpromoting.
- Create a new **unpromoted** website Worker version and immutable preview URL; maintain existing route/bindings. Record version ID, build source SHA and published assets/hash. Never send preview traffic to production by default.
- Run direct HTTP/assets/header/redirect tests, current live browser matrix, actual desktop/mobile captures, isolated form UI tests and any sanctioned provider validation. Note that a preview success alone does not establish production readiness.

## 3. Mandatory prepromotion comparison

- Source-only diff review: authorized files and exact lock changes; no secret files or V1/V2 cleanup D/M/?? swept into commit.
- Preserved all required business/data/asset invariants and explicit owner artwork approvals; unresolved day-type wording handled as an actual gate.
- CI, browser, SEO, accessibility, form, perf and security results pass with zero hidden skips and accepted limitations written plainly.
- Exact version preview is served correctly and hashes match built source. All protected Cloudflare/DNS/mail/other worker resources are unchanged; future promotion affects **website Worker only**.
- The current old-good version/deployment details are retrievable, and a **documented, reviewed rollback procedure** exists. Validate current CLI syntax/dry-run without executing a rollback on an unrelated worker.
- Confirm current Formspree account/owner receipt requirements. One synthetic test per environment maximum, with no repeat of uncertain submissions.

## 4. Promote only exact tested version

Use the installed verified CLI/API equivalent of existing `cf workers deployments create --worker ismailstudio --strategy percentage ...` with explicit exact version and traffic target after verifying actual CLI signature. Inspect arguments with safe help/dry-run, ensure correct account and one website Worker. If the precise command/API/permissions are unsupported, do not improvise. No reverse deployment with generic, trigger or apex commands.

## 5. Postpromotion checks

- Actual `https://www.ismailstudio.my/` and each `/work/{slug}/` deliver tested site and correct source version/asset hashes; HTTPS/www/apex 308 and query/path preservation unchanged.
- Real desktop/mobile hero approved assets in production, typography/scroll/menu, offer numbers/timelines disclosure, FAQ, form, Concept Project labels/links, empty state/error handling, SEO tags, sitemap/robots and CSP remain correct.
- Compare current DNS/routes/mail/apex and other Workers to protected baseline, documenting any discrepancy before closing.
- If production regression verified, perform only the prevalidated website-version rollback procedure and record exact scope/state. Never edit DNS/mail/apex as a “repair” to a website problem.
- If actual provider-to-Zoho receipt evidence cannot be obtained under permitted workflow, do not record successful end-to-end delivery. Treat this as required gate, even if HTTP acceptance passes.

## 6. Final source and communication

Commit and push without force to correct `ismailabs/ismailstudio` target, observing actual branch protection, origin changes and checkout state. Do not reset/stash/commit owner's deleted old docs or local skill modifications. Published source and runtime must be traceable by exact commit + build hash + Worker version. Report release status, URL, time, CI/browser receipts, source and version IDs, rollback target, measured caveats and any owner action needed. No “work completed” claim based solely on local build or preview.

**If ANY material gate fails:** preserve working safe source, testing logs and immutable preview (if established). Continue safe remediation, then stop publication and report a single clear external blocker. Do not fake a deployment or continue unattended after app/session stops.

References to verify at time of execution: https://developers.cloudflare.com/workers/versions-and-deployments/ and https://developers.cloudflare.com/cf/projects/ .
