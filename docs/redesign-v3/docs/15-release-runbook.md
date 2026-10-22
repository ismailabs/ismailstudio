# Production release: scoped autonomy with hard gates

**Allowed mutation:** update only the main `ismailstudio` Cloudflare Worker serving `www.ismailstudio.my`, and normal non-force GitHub publication of verified project changes if permitted. The user explicitly authorized this scope after completion; no routine approval loops. NOT authorized: apex `ismailstudio-apex` deployment, DNS edits, mail/service secrets, unrelated subdomains/Workers/routes, spending/paid onboarding, purchasing domains or changing legal registrations.

## 1. Read actual release state

Read `cloudflare.config.ts`, `package.json`, `scripts/package-cloudflare.mjs`, V2 release record and latest Cloudflare CLI docs. Capture actual account/zone/site worker, triggers/route mappings, all 17 DNS records if still present, current worker version/traffic, preview setup, other workers and mail-related DNS and health. Mask secrets and sensitive raw fields; put raw snapshots in ignored local safe area, redacted checksums in evidence. V2 documentation records source `488a88c...`, version `559ca179...`, old V1 version `4317599d...` but these are historical observations, NOT an automatically safe target.

## 2. Predeployment evidence

Build strictly from selected Git SHA using repo scripts, run existing tests and V3 test suite, scan staged assets and static publish allowlist, compare predeployment infrastructure, review Formspree provider eligibility and privacy, protect existing redirects. All mandatory gates in `13-acceptance-gates.md` must pass; missing proof is a failure, not permission to assume it passed.

Cloudflare `cf` CLI current documented behavior: `cf deploy --dry-run` validates without uploading; `cf workers versions create` uploads without promoting and supports dry run. Follow **actual installed** CLI help before using flags: https://developers.cloudflare.com/cf/projects/ . Do not blindly use `cf deploy` for production if it immediately changes traffic. Do not invoke `cf workers triggers deploy` or `apexConfig` for this redesign.

## 3. Preview isolated version

Create/update a website-only `ismailstudio` Worker **version** from the tested build, with existing assets and bindings preserved. Use a version preview URL/alias where supported. Confirm exact served version/source header and asset hashes. Run browser tests and HTTP smoke on real preview. Conduct one approved synthetic provider test (if necessary) and obtain independently supported inbox-delivery proof; do not invent this proof.

## 4. Promotion

On PASS, use version-specific `cf workers deployments create --worker ismailstudio --strategy percentage ...` with exact JSON/current documented CLI syntax, or an equivalently safe verified deployment action. Pin precisely the tested version. Verify old version rollback visibility first. If user access is absent, leave preview/evidence and request only the required authentication action; no pretending the user is present.

## 5. Canonical verification

Request `https://www.ismailstudio.my/` and expected paths; verify runtime source/hash, `ismailstudio.my` redirects, headers/privacy, homepage/resources, all concepts, nav/motion/reduced-motion, offers/claims/form feedback. Independently verify actual Formspree-to-Zoho delivery in production before recording as passed. Compare DNS/routes/custom domains/apex and other Workers against predeployment inventory. If a regression is confirmed, promote observed known-good version with verified rollback procedure and record before/after evidence.

## 6. GitHub and closure

Push without force to correct owner/repo and branch; update main only if allowed and checked against observed remote state/branch protection. Do not overwrite local changes, history or unapproved production actions. Record commit, full immutable version ID, deployment ID, confirmation time, tests with paths, tests skipped (should be zero), unresolved measured limits, rollback target and whether actual route health and mail provider confirmed. Clearly separate deployed from only previewed implementation.

References: https://developers.cloudflare.com/workers/versions-and-deployments/ ; https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/ ; https://developers.cloudflare.com/cf/projects/ . Recheck commands before execution.
