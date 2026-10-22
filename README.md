# Ismail Studio

Astro + Tailwind v4 + TypeScript marketing website for an independent frontend developer in Melaka, Malaysia. V3 uses the approved cinematic hero, original rounded vector identity and predominantly light content, with four case-study dialogs and static `/work/{slug}/` fallbacks. Approved offers: Starter from RM599 / 1 page / 1 revision; Business from RM1,299 / up to 5 pages / 2 revisions; Premium from RM2,999 / up to 12 pages / 2 revisions. All four portfolio sites are concept projects.

Canonical site: https://www.ismailstudio.my/. Apex permanently redirects to HTTPS www. Current [release status](docs/redesign-v3/execution/release-record.md), [visual reviews](docs/redesign-v3/execution/design-and-visual-review.md), [measured performance](docs/redesign-v3/execution/performance-review.md) and [implementation progress](docs/implementation-progress.md) distinguish preview from production evidence. V1/V2 records are historical.

## Local development

Node >=22.22 (tested on 24.19.0), npm, Python 3 for the handoff validator, and installed Microsoft Edge for browser checks.

```sh
npm ci --ignore-scripts
npm run dev
npm run check
npm run build
node scripts/serve-preview.mjs
npm test
# Full handoff, Astro, redirects and browser verification:
npm run verify
```

The production preview is http://127.0.0.1:4321/ and applies generated security headers. Restart it after rebuilding to read the current `_headers`. Astro's ordinary preview does not apply them. Tests isolate Formspree and never send real enquiries. Coverage includes eight widths, axe, metadata/routes, keyboard/menu/dialog history and focus, package choice, FAQ, no-JS native POST, reduced motion, validation, provider errors and timeout.

## Form

Native HTML POST progressively enhanced into identity, project-needs and review steps, retaining the owner-supplied Formspree endpoint and fields. No API key, React or external SDK. Current V3 provider acceptance and independent owner Zoho receipt evidence are in `docs/redesign-v3/evidence/form-*-acceptance.json` and the release record. Provider acceptance alone does not establish inbox arrival.

Optional public configuration is documented in `.env.example`. `PUBLIC_FORM_ENABLED=false` switches to an explicitly described email-preparation fallback. No personal phone number is used. No draft storage, advertising pixel, speculative analytics event, database, login or custom enquiry backend.

The HTML response uses `no-transform` to prevent Cloudflare from injecting an unverified analytics script that conflicts with the site's CSP. No zone-wide analytics setting is changed. Enabling analytics later requires a verified property, reviewed privacy copy and intentional CSP/network verification.

## Cloudflare packaging

```sh
node scripts/package-cloudflare.mjs --site-only --preview-only
node node_modules/cf/bin/cf workers versions create --prebuilt --mode production --preview-alias v3-review --dry-run
```

Astro remains static. The packaging script copies only `dist` into the pinned cf Build Output v0 shape, checks for source/secrets paths and symlinks, and records hashes locally. This prerelease format is tied to cf beta.19 in the lockfile. See cloudflare.config.ts. The existing canonical route is already established; normal website releases preserve it, apex and mail DNS.

The release path packages site-only, uploads without production traffic, tests its immutable version URL and conditionally promotes through `cf workers deployments create --worker ismailstudio --strategy percentage --versions @<reviewed-version-file>`. That file names only the tested website version and its traffic percentage. Inspect the current CLI schema, account, release gates and exact version before use. Do not reapply triggers or deploy `ismailstudio-apex` during a normal website release. Read-only Cloudflare inventories establish the protected DNS/mail/routes baseline. `npm run test:redirect` checks the existing redirect handler.

The owner has authorized GitHub push and Cloudflare deployment after gates pass. Check the current release record, correct account, remote changes and mail-record baseline before deployment. For the established site, rollback restores the verified prior **website Worker version**; preserve apex, routes and DNS.

## Evidence and assets

- `docs/redesign-v3/START_HERE.md`: approved V3 entrypoint and authority; `execution/acceptance-review.md` maps requirements to evidence.
- `docs/redesign-v3/evidence/`: actual screenshots, viewport/asset/infrastructure receipts, provenance, skills and measured lab reports. Private raw snapshots remain ignored in `.local/`.
- `npm run capture:projects`: genuine project captures; `node scripts/v3-capture.mjs <round>`: repeatable isolated page screenshots.
- `scripts/v3-smoke.mjs <https-url> <runtime-sha> <phase>`: exact asset/source/headers/privacy/redirect verification against the packaged manifest.
- `scripts/v3-form-delivery.mjs <https-url> <preview|production>`: initiates **one real test** per environment, guarded by a private intent receipt. Do not include in CI or repeat after a failed or uncertain send; independent Zoho evidence remains necessary.

Follow AGENTS.md. Preserve installed skills and unrelated work. Never commit credentials, personal phone numbers, mailbox content or customer submissions.
