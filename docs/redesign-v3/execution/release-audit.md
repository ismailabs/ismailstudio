# V3 release audit

Read-only audit on 2026-10-22 Malaysia time. No deployment, DNS/provider change or live form submission was made. Historical deleted documents were inspected with `git show HEAD:path`; their working copies were not restored.

## Observed source and tools

- Initial HEAD: `65d2f51fec8d612882aea2617e6c54ec49d4c23b` on `codex/ismailstudio-v2-creative-redesign`; origin is `https://github.com/ismailabs/ismailstudio.git`.
- Extensive user deletions include the V1/V2 handoffs, `docs/redesign/` and `docs/evidence/`; `skills-lock.json` is modified. Preserve this existing work and stage only reviewed V3 changes explicitly.
- Current stack and locally installed CLI match the handoff: Astro 7.4.1, Tailwind 4.3.3, TypeScript 5.9.3, Playwright 1.64.1, cf 1.0.0-beta.19.
- Read `.agents/skills/cf-cli/SKILL.md` and `.agents/skills/cloudflare/SKILL.md`. Existing `cloudflare.config.ts` selects cf. Installed CLI help was inspected; no executable was installed.

## Current external evidence limits

The direct cf credential store reports `authenticated:false` / `Not logged in`. No Cloudflare token or account environment variable is set. Existing ignored helper code safely supplies previously authorized credentials without printing them: `.local/cloudflare-command.py` reads the official Wrangler OAuth store; `.local/cloudflare-dns-command.py` reads the existing DNS token file. No credential contents were output.

Read-only deployments and DNS requests through those helpers both failed with `APIError: fetch failed`. The Cloudflare connector identity call failed at transport to the connector endpoint. Direct Node canonical HTTPS timed out; system curl reached a TLS close error. Current Cloudflare docs retrieval also failed at transport. These failures do **not** prove token expiry, permission loss, production outage or a changed DNS state. A refreshed current inventory remains a release gate.

The current installed CLI help is sufficient to confirm the commands below, but current account/version/provider facts cannot be inferred from historical receipts.

## Historical known-good reference only

`git show HEAD:docs/redesign/release-record.md` records V2 source `488a88c34a2a78d4ece64636dff14ac4d42e8395`, website version `559ca179-d268-4db7-a486-181df5238e66`, deployment `573f6883-09a9-4883-9a34-64be843350bb` at 100%. It records apex version `b1fb9bf9-8597-4210-b782-4a951bc1e820` and deployment `98aa3e69-71d6-4ffe-83f3-45385afd301d`.

The historical infrastructure receipt at 2026-10-21T21:47:25.344Z records 9 Workers, 6 custom domains, 3 routes, 17 DNS records, 7 MX/TXT/CAA records, no website bindings and zero build triggers. DNS fingerprint: `d627da74614e8feeed07836cc16a35141025ada7a8002cb283ff2f693055153b`. The V3 snapshot must independently reread those resources before release and compare after release; the historical fingerprint is not a current preservation proof.

Protected website routes in current source and historical receipt are `www.ismailstudio.my/*` → `ismailstudio`; `ismailstudio.my/*` and `http://www.ismailstudio.my/*` → `ismailstudio-apex`. V3 must not deploy apex, triggers, routes, domains, DNS or mail configuration.

## Exact safe release sequence

Run only after all local visual, behavior, provenance and security gates pass. Commands shown here were inspected, **not executed**.

1. Select and commit reviewed runtime files. Set `RELEASE_COMMIT` to that full 40-character SHA and rebuild using the existing package build. Run typecheck, redirect units, the complete Playwright suite, current V3 handoff validation, allowlist and staged scan. There is no lint script currently.
2. Package with `npm run package:cloudflare -- --site-only --preview-only`. Both flags are essential: the package script's default includes the apex Worker, while `--preview-only` strips website trigger settings. Inspect `.cloudflare/output/v0/workers/` to require only `default`; require name `ismailstudio` and absent `triggers` in its config. Inspect `.local/release-assets.json` hashes and forbid internal docs/source/maps, submission data or references in the published output.
3. Validate with `node node_modules/cf/bin/cf workers versions create --prebuilt --mode production --preview-alias v3-review --dry-run` under the existing authorized credential context. The config and build output must still select only the website.
4. Reread the current active website deployment and exact immutable version, apex deployment, other Worker modification times, domains, routes, DNS, bindings and build triggers. Preserve raw snapshots only in ignored local storage; publish redacted counts and fingerprints.
5. Upload without promotion using the same `workers versions create --prebuilt --mode production --preview-alias v3-review` command, omitting `--dry-run`. Record the returned immutable version and exact preview URL. Confirm production traffic still points to the fresh baseline version.
6. Run exact preview HTTP/source/header/asset-hash checks and the full browser tests at `TEST_BASE_URL=<exact immutable preview URL>`. The alias alone is not immutable evidence.
7. Obtain sanctioned preview provider acceptance and independent recipient evidence. Keep one-or-fewer synthetic form submissions per required environment, with clearly labeled non-customer content and no saved message body/PII.
8. Reread the observed baseline version with `node node_modules/cf/bin/cf workers versions get <baseline-version> --worker-id ismailstudio`. Prepare an ignored JSON file containing `[{"version_id":"<baseline-version>","percentage":100}]`. Verify rollback request with `node node_modules/cf/bin/cf workers deployments create --worker ismailstudio --strategy percentage --versions @<rollback-json> --dry-run`. Do not use a bypass flag or claim a live rollback drill occurred.
9. Prepare the equivalent ignored JSON array pinning the exact tested V3 version. Inspect `node node_modules/cf/bin/cf workers deployments create --worker ismailstudio --strategy percentage --versions @<production-json> --dry-run`. Promote with that exact command only after every mandatory gate passes, omitting `--dry-run`.
10. Independently verify canonical runtime source/assets/browser, apex redirects, four demos, production provider/recipient delivery and unchanged protected inventory. Record actual version/deployment/SHA/date. If a confirmed regression requires rollback, pin the verified baseline with the already inspected deployment command and reverify website health. Preserve all protected infrastructure.

Do **not** use `npm run deploy:worker` here: it invokes a generic immediate `cf deploy --prebuilt --mode production` path. Do not invoke `cf workers triggers deploy`, `apexConfig`, DNS changes, paid onboarding or force pushes.

## Provider facts and missing evidence

Current `src/lib/form-config.ts` uses public endpoint `https://formspree.io/f/mljgyabo`, enabled unless `PUBLIC_FORM_ENABLED` is exactly `false`; recipient is `contact@ismailstudio.my`. The existing HTML native POST and JS payload use `name`, `business`, `email`, `package`, `timeline`, `message`, `_gotcha`, `_subject`. Package values are `Not sure yet`, `Starter`, `Business`, `Premium`. JS success requires a successful HTTP response and JSON `ok:true`, disables duplicate submission and retains values on failure.

Historical preview marker `ISM-PREVIEW-V2-20261021173515` and production marker `ISM-PRODUCTION-V2-20261021213408` both have Formspree HTTP 200/`ok:true` and direct owner Zoho receipt confirmation in V2 git evidence. This proves the recorded V2 delivery, not V3 preview or production delivery. Provider settings/eligibility and current recipient evidence have not been reread. No connected Zoho mailbox tool is available in the supplied tool inventory.

The V3 runbook explicitly makes current provider acceptance and reliable recipient-delivery evidence mandatory. Missing current preview recipient proof blocks promotion; old owner confirmation or simulated Playwright success must not be relabeled as new receipt proof. If access cannot be responsibly resolved, finish all local/preview work and report the precise required owner action.

## Legacy integration repairs needed

- `npm run verify` begins `python tools/validate_handoff.py`, whose V1 files are user-deleted. Route this to current V3 integrity/semantic validation; do not restore deleted V1 handoffs merely to satisfy the old validator.
- `scripts/smoke-release.mjs` asserts the V2 headline and writes old `docs/redesign/evidence/` paths. Create or adapt a V3 verifier with exact source/asset checks.
- `scripts/check-form-delivery.mjs` performs one real POST and writes old V2-scoped paths. Do not run it repeatedly or count it as isolated testing. It needs intentional V3 scope and private data handling before sanctioned use.
- `scripts/v2-assets.mjs` requires deleted V1 capture evidence. A V3 authentic-media check can compare all retained project assets byte-for-byte to observed HEAD and record their SHA256 hashes.
- `.github/workflows/quality.yml` currently triggers push only for main and the V2 branch. Include the actual V3 branch or use a verified safe workflow dispatch. Its production browser step has a V2-specific condition; adapt deliberately.
- Preserve meaningful existing tests while changing explicitly superseded V2 visual/copy assertions. Add current V3 navigation, hero, logo, offers and accessibility assertions. No skipped checks or relaxed failure assertions.

## Audit status

Local source and installed release-command audit is complete. **Current external snapshot and conditional release remain blocked by unavailable transport and unverified current provider/recipient evidence.** Continue authorized local implementation and browser work; retry current scoped reads when useful. No external state change is claimed.

## Subsequent live refresh

The initial transport and stale CLI-token failures above were resolved during implementation. The existing official CLI session was refreshed without printing credentials or adding permissions. Fresh connector and CLI reads reconfirmed the website and apex versions, zero build triggers, zero bindings and the unchanged protected inventory; see `../evidence/infrastructure-before.json`. The known-good V2 version was reread and remains available for rollback preparation. Initial failures remain preserved as historical execution evidence, not current blockers. Recipient-delivery proof is still a separate gate.

Final outcome: preview and canonical live provider acceptance each passed once, with direct owner confirmation of the exact marker in Zoho. All pre-promotion gates were completed before exact-version website promotion; fresh after-inventory confirms the protected infrastructure is unchanged. Current status and full diagnostics are in `release-record.md`; the earlier blocked state above is historical.
