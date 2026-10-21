# Ismail Studio

Astro marketing website for an independent Malaysian frontend developer. V2 uses the approved cinematic, bold contemporary and experimental digital direction, with four case-study dialogs and static `/work/{slug}/` fallbacks. Approved offers: Starter from RM599 / 1 page / 1 revision; Business from RM1,299 / up to 5 pages / 2 revisions; Premium from RM2,999 / up to 12 pages / 2 revisions. All four portfolio sites are concept projects.

Canonical site: https://www.ismailstudio.my/. Apex permanently redirects to HTTPS www. V2 release status is in [docs/redesign/release-record.md](docs/redesign/release-record.md), with [visual reviews](docs/redesign/visual-reviews.md) and [implementation progress](docs/implementation-progress.md). [The V1 release record](docs/release-record.md) remains historical evidence.

## Local development

Node >=22.22 (tested on 24.19.0), npm, Python 3 for the handoff validator, and installed Microsoft Edge for browser checks.

```sh
npm ci --ignore-scripts
npm run dev
npm run check
npm run build
node scripts/serve-preview.mjs
npm test
```

The production preview is http://127.0.0.1:4321/ and applies generated security headers. Restart it after rebuilding to read the current `_headers`. Astro's ordinary preview does not apply them. Tests isolate Formspree and never send real enquiries. Coverage includes eight widths, axe, metadata/routes, keyboard/menu/dialog history and focus, package choice, FAQ, no-JS native POST, reduced motion, validation, provider errors and timeout.

## Form

Native HTML POST progressively enhanced into identity, project-needs and review steps, retaining the owner-supplied Formspree endpoint and fields. No API key, React or external SDK. Owner confirmed provider permission and contact@ismailstudio.my notification for V1. Historical V1 inbox receipts are in docs/evidence; independent V2 acceptance and delivery status are recorded in docs/redesign/evidence and its release record. Provider acceptance alone does not establish inbox arrival.

Optional public configuration is documented in `.env.example`. `PUBLIC_FORM_ENABLED=false` switches to an explicitly described email-preparation fallback. No personal phone number is used. No draft storage, advertising pixel, speculative analytics event, database, login or custom enquiry backend.

The HTML response uses `no-transform` to prevent Cloudflare from injecting an unverified analytics script that conflicts with the site's CSP. No zone-wide analytics setting is changed. Enabling analytics later requires a verified property, reviewed privacy copy and intentional CSP/network verification.

## Cloudflare packaging

```sh
node scripts/package-cloudflare.mjs --site-only --preview-only
node node_modules/cf/bin/cf deploy --prebuilt --mode production --dry-run
```

Astro remains static. The packaging script copies only `dist` into the pinned cf Build Output v0 shape, checks for source/secrets paths and symlinks, and records hashes locally. This prerelease format is tied to cf beta.19 in the lockfile. See cloudflare.config.ts. Custom-domain binding is intentionally performed only after account/DNS inspection and independent preview smoke tests. Never change unrelated subdomains or mail DNS.

For an initial workers.dev smoke without public route changes, use `node scripts/package-cloudflare.mjs --preview-only`, then `cf deploy --prebuilt --mode production` for the site and the same command with `--worker ismailstudio-apex` for the redirect. Normal packaging includes the three exact-host routes in cloudflare.config.ts; apply them only after preview smoke. `npm run test:redirect` checks the redirect handler. No DNS mutation is required: existing proxied apex A and www CNAME records are preserved. The existing Workers session provides Workers Scripts/Routes Write; the separate owner-provided DNS token is used only for reads and never with a write command.

The owner has authorized GitHub push and Cloudflare deployment after gates pass. Check the current release record, correct account, remote changes and mail-record baseline before deployment. Rollback removes only the new exact-host routes or restores a verified prior Worker version.

## Evidence and assets

- `docs/00-requirements.md` through `docs/12-risks-and-progress.md`: approved specification.
- `docs/design-decisions.md`: copy/research boundaries and art direction.
- `docs/dependencies-and-provenance.md`: dependency and image origins/licenses.
- `docs/evidence/`: compact machine receipts; raw reports and original captures remain in ignored `.local/`.
- `npm run capture:projects`: genuine project captures; `node scripts/capture-qa.mjs <round>`: repeatable page screenshots.
- `scripts/check-form-delivery.mjs`: sends **one real test** to the owner's mailbox, only on deliberate execution. It stores acceptance/receipt markers without submission contents. Do not include in CI.

Follow AGENTS.md. Preserve installed skills and unrelated work. Never commit credentials, personal phone numbers, mailbox content or customer submissions.
