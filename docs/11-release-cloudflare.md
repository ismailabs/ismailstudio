# Authorized autonomous deployment — non-destructive playbook

**Authorization scope:** User expressly approved pushing the completed Ismail Studio website and deploying to Cloudflare at canonical `https://www.ismailstudio.my/`; do not pause for ordinary release signoffs once quality gates pass. Other projects/subdomains and email services are out of scope. Do not buy domain, subscribe to paid services or reassign existing sites.

## Preparation
1. Read repo branch, remote, status, tracked files, build output. Confirm Cloudflare connected account and domain ownership with actual read APIs/CLI. The creator's Cloudflare account was not readable by ChatGPT at handoff time: **no assumption that connection will be available to Codex**.
2. Check current Cloudflare official Astro deployment guidance and use suitable static hosting path (Cloudflare Pages or supported Workers static assets). Avoid obsolete recommendations; follow installed `cloudflare` / `cf-cli` skill only after validating against installed CLI/documentation.
3. Read existing zone records for `ismailstudio.my` and `www`, Cloudflare routing, SSL and access to account; preserve `MX`, `TXT` (SPF, DKIM, DMARC), `CAA` if present, and all existing subdomain records. DNS has real dependencies—do not blindly replace entire zone.
4. Ensure the managed form vendor is legitimately provisioned and testable; privacy/analytics settings correct. For unattended deploy, sensitive credentials must come from authorized environment secrets, not ZIP or git. If access is impossible, stop production step safely and label blocked.

## Local preflight
Clean tracked tree (or documented changes), install dependencies via lockfile, typecheck, lint, tests, production build. `npm run build` must produce Astro static deploy output. Check no secrets with `git diff --check`, credential scanners if available, and targeted search for personal contact number (do not put it in scan logs). Capture preview.

## Push
Push without force to intended authorized `ismailabs/ismailstudio`, default branch `main` if appropriate and safe, or merge approved branch via safe strategy. Re-fetch remote and handle concurrent updates rather than overwriting. Record SHA and compare remote content to built revision. GitHub connector permission is not equivalent to local Codex authentication.

## Cloudflare deploy
Create or select correct account-bound static project after discovery; upload/build from verified revision. Use preview first and test independently. Connect verified `www` host, configure apex 301/308 to `https://www.ismailstudio.my/` retaining path/query as sensible. Ensure HTTPS, CSP/headers appropriately tested; avoid redirect loops and unintended impact on `*.ismailstudio.my`. Do not alter unrelated DNS. Configure any necessary settings only when within approved website scope and permitted by actual token.

## Live verification checklist
- GET https://www.ismailstudio.my/ => expected 200; appropriate content and headers.
- GET https://ismailstudio.my/ => 301/308 to correct canonical; check path and HTTP variants.
- `/robots.txt`, `/sitemap-index.xml` or actual sitemap path, `/favicon.svg`, OG image live.
- Domain can render on mobile; external concept project links open.
- Active managed form posts successfully and notification arrives in Zoho; if no eligible managed account, release gate unmet.
- Zoho MX/DKIM/SPF/DMARC records verified unchanged from preflight; send+receive test if authorized.
- Document Cloudflare account/project/zone IDs **without exposing secrets**, deployment version, commit SHA, rollback path, test evidence.

## Failure/rollback
If build fails: fix before push. If staging fails: do not switch live domain. If live domain fails post-switch: rollback to prior known-good deployment if available within authorized scope; do not erase other zone records. If no prior deployment exists, prioritize restoring accurate DNS state. Account permission or provider eligibility missing → report precisely; never invent token, access or successful result. Do not send test email to people other than authorized contact mailbox without consent.
