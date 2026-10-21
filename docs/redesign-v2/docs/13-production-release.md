# Autonomous production release runbook — scoped permission already granted

**User authorization:** production deploy to **the Ismail Studio website** after full implementation and testing is approved for Codex autonomous execution. This is not authorization to change or remove other Workers/domains/DNS/email accounts, purchase plans, reveal secrets, bypass an authentication challenge or change third-party provider. If any mandatory step cannot be verified, STOP without touching production and report the blocker.

## Pre-deployment inventory (read only)

1. Confirm authenticated Cloudflare account and active Workers configuration; check actual `ismailstudio` Worker, custom `www.ismailstudio.my/*` route, static assets, `ismailstudio-apex` redirect Worker routes, zone DNS and mail MX/SPF/DKIM/DMARC. Existing other concept and unrelated Worker routes must stay as-is.
2. Record current git commit, deployed Worker version/deployment ID, assets mapping, redirect behavior, response headers, form settings and backup/rollback method. Never copy tokens/credential values into evidence.
3. `main` and feature branch status clean/understood; prepared, reviewed deployment artifact corresponds to tested SHA. Back up existing production release/version.
4. Validate tests (`docs/12-technical-verification.md`), visual critiques (`docs/11-visual-qa.md`), project screenshot fidelity, exact prices/exclusions, form no-JS, security, performance/regression and accessibility. No blocker or untested critical gate.
5. Build repeatably using current repo-specified version/pinned CLI. Existing `npm run deploy:worker` uses `cf deploy --prebuilt --mode production` after project-specific packaging. **Inspect actual scripts and current `cf` docs/CLI help**; do not blindly replace with generic `wrangler deploy`, Pages publish, or a new Worker name.
6. Validate release artifact allowlist, production env settings, dry run and preview smoke without changing production. Ensure preview does not contain private contact data or expose secret.

## Scoped autonomous production action

After all mandatory gates are **PASS**, execute only the intended deployment of the `ismailstudio` website Worker/static assets to the already established route. Maintain redirect Worker and routes unchanged. Do not run unrelated zone/domain administration or force-push. Do not create new paid services, remove DNS or transfer ownership. If deploy tool asks for new sensitive permission, user account eligibility, payment or destructive authorization, wait/report instead of bypassing.

## Post-deployment immediately

- HTTPS `https://www.ismailstudio.my/` renders V2 and expected release SHA or equivalent, correct canonical, title, assets, navigation, responsive first screen and case-study/open/close.
- `http://...` and apex permanently redirect to HTTPS www preserving paths and query (existing behavior).
- Every project subdomain still loads its actual app. Other known non-site Worker routes and email DNS records unchanged according to before/after inventory.
- Enquiry tests: native/post JS behavior, synthetic provider acceptance **and separately inbox arrival** where test-safe and access exists; if acceptance passes but delivery cannot be checked, report delivery `UNVERIFIED` (a mandatory release-risk decision; don't claim success). Avoid repeated uncontrolled sends.
- Record version, time, Git SHA, URLs, test screenshots, redacted logs and rollback commands specific to inspected deployment. Update repo release record and push safe changes; no personal info in commits.

## Incident response / rollback

If production form, redirect, domain, or core browsing is broken after release, rollback to the previously recorded **website Worker version/artifact** using confirmed safe mechanism; do not rollback unrelated `ismailstudio-apex` or other Worker. Verify old site restored and preserve V2 evidence. If rollback cannot be executed safely, report exact issue and immediate human action; never state the old deployment was restored without verification.

## Final communication contract

Report `Implemented / Tested / Deployed / Verified / Blocked` separately, with commit SHA, production URL, specific tests actually run, before-after visual evidence locations, form-delivery evidence status, known issues and current Worker version. Do not imply all checks passed from an unverified command exit status or cached previous records. If deployment blocked, provide ready artifact/branch, exact reason and next user action.
