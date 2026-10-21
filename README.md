# Ismail Studio

Single-page Astro website for an independent Malaysian frontend developer. Approved offers: Starter from RM599 / 1 page / 1 revision; Business from RM1,299 / up to 5 pages / 2 revisions; Premium from RM2,999 / up to 12 pages / 2 revisions. All four portfolio sites are concept projects.

Canonical production target: https://www.ismailstudio.my/. Release state and actual evidence live in [docs/implementation-progress.md](docs/implementation-progress.md) and [docs/release-record.md](docs/release-record.md). A local build is not production verification.

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

The production preview is http://127.0.0.1:4321/ and applies the generated security headers. Astro's ordinary preview does not apply Cloudflare `_headers`. The test suite intercepts Formspree requests and never sends real enquiries. It covers seven widths, axe, metadata/routes, keyboard/menu, package choice, native FAQ, no-JS, reduced motion, validation and async outcomes.

## Form

Native HTML POST with progressive vanilla JS enhancement, using the public owner-supplied Formspree ID. No API key, React or external SDK. Owner confirmed applicable permission and notification to contact@ismailstudio.my. Real local delivery was accepted by Formspree and confirmed in the Zoho inbox; see docs/evidence/form-local.json. Production delivery must also be tested after deployment.

Optional public configuration is documented in `.env.example`. `PUBLIC_FORM_ENABLED=false` switches to an explicitly described email-preparation fallback. No personal phone number is used. No draft storage, advertising pixel, speculative analytics event, database, login or custom enquiry backend.

## Cloudflare packaging

```sh
npm run package:cloudflare
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
