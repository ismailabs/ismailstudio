# Ismail Studio — verified production release

Released and independently verified on **2026-10-21** at **https://www.ismailstudio.my/**. Apex and HTTP website requests permanently redirect to HTTPS www, retaining path and query. All critical items in `10-qa-and-dod.md` are checked with the evidence below.

## Source and deployment

- Repository: https://github.com/ismailabs/ismailstudio, `main`, pushed without force or history replacement.
- Deployed source: **`74ddae2f873e45f89dc2837456ca7441985be96e`**. Local HEAD, origin/main and independently advertised remote SHA matched after push. The final evidence commit changes documentation/screenshots only; the public `X-Release-Commit` header intentionally identifies this deployed source.
- Cloudflare account: `44214a829e2337ca50cf40e4cd827cba`; zone: `dc2bee92d5853929394633d0a4165093`.
- Static-site Worker `ismailstudio`: version **`4317599d-6080-4ac6-9237-3503bc0971e9`**, deployment `224c085a-9853-40bd-9943-955c62ef8f7f`, 100% traffic.
- Redirect Worker `ismailstudio-apex`: version **`b1fb9bf9-8597-4210-b782-4a951bc1e820`**, deployment `98aa3e69-71d6-4ffe-83f3-45385afd301d`, 100% traffic. Its code is unchanged from the initial source commit.
- Built static Astro output, packaged only allowlisted assets, checked both cf dry runs, uploaded workers.dev previews and independently smoked them before enabling the website routes. No paid subscription or new runtime service was created.

## Verification receipts

| Gate | Result and evidence |
|---|---|
| Handoff | `python tools/validate_handoff.py`: PASS, 21 required deliverables |
| Typecheck/build | `npm run check`: 43 files, zero errors/warnings/hints; `npm run build`: PASS, one static page |
| Local browser | `npm test`: 17 passed; seven widths, exact commercial copy, axe, keyboard/menu/FAQ, no-JS, reduced motion, reflow and isolated form outcomes; `evidence/browser-local.json` |
| Redirect handler | `npm run test:redirect`: 3 passed; actual workers.dev/public redirects also checked |
| Preview | 34 public HTTP/asset checks and 5 browser checks passed; `evidence/preview-http.json`, `browser-preview.json` |
| Canonical HTTP | 38 passed: trusted HTTPS, source header, security/no-transform headers, asset SHA256 matches, private paths 404 and exact permanent redirects; `evidence/production-http.json` |
| Canonical browser | Full repaired run: 16 passed, one global timeout at the 390px package assertion. Exact unchanged focused rerun: 1 passed in 13.3s. All 17 checks verified, with the timeout retained honestly; `evidence/browser-production-full.json`, `browser-production-rerun.json` |
| Real enquiry | Formspree HTTP 200, explicit provider acceptance and UI success; owner separately confirmed arrival in Zoho inbox; `evidence/form-production.json` |
| Structured data | Official Schema.org Fetch URL UI against the live site: one WebSite, zero errors and zero warnings; `evidence/structured-data.json` |
| Visual | Three local review cycles, production captures at seven widths, final desktop hero/phone contact reviewed; `visual-review.md`, `evidence/screenshots/`, `evidence/screenshot-measurements-production.json` |
| Performance | Three mobile and three desktop runs with settings/medians/ranges; `performance-review.md` and `evidence/lighthouse-*.json` |
| Privacy/source | Targeted staged credential/phone/private-path scan: no findings; staged whitespace check passed. This was not Gitleaks or an exhaustive security audit. No credentials, personal phone or customer submission contents published. |

The real production marker is `ISM-PRODUCTION-20261021120823`; notification recipient is `contact@ismailstudio.my`. Owner confirmed applicable provider-account permission and the recipient. The subsequent repair changed response headers only: generated HTML/enquiry code and all application assets were verified unchanged, and Cloudflare reported no updated asset files. No unnecessary extra real submission was sent. Automated form tests use isolated mocks and are not presented as delivery proof.

## DNS and existing projects preserved

**No DNS edits were needed or attempted. No additional DNS permission was required.** The owner's separate token was verified active and used only for permitted zone/DNS reads, never a mutation or write probe. Existing Workers OAuth supplied Workers Scripts/Routes permissions.

The existing proxied apex A (`216.198.79.1`) and www CNAME to apex remain intact. Only these Worker routes were installed:

| Pattern | Worker | Current route ID |
|---|---|---|
| `www.ismailstudio.my/*` | `ismailstudio` | `e93eb7ccf5b74019bedf670c884bfe8b` |
| `ismailstudio.my/*` | `ismailstudio-apex` | `69b87e8c352248dc9ac8143067f9e982` |
| `http://www.ismailstudio.my/*` | `ismailstudio-apex` | `9c8c90fe1b81492fb236b10be8bd81b9` |

Fresh post-repair reads at 12:54 UTC compared all **17 DNS records unchanged**, including seven mail/TXT/CAA records. Record IDs, names, types, content, priority, proxy and TTL are included in the comparison. Full DNS fingerprint: `e655f87c8e32f7951544b2a9f90eeb3633e185b8a84de5191c91a86c06a6da43`. Raw DNS snapshots stay private; compact proof is `evidence/dns-preservation.json`.

All seven prior Workers retained their modification times and all six prior custom Worker domains compared unchanged (`evidence/cloudflare-state.json`). All four concept project URLs returned HTTP 200 after the switch (`evidence/project-links-live.json`). No email, unrelated subdomain, nameserver or global zone setting was changed.

## Repair and limits

Production tests exposed Cloudflare automatically injecting an analytics beacon blocked by the intentional CSP. Analytics management reads returned 403, so no verified analytics property is claimed. A site-only `Cache-Control: public, max-age=0, must-revalidate, no-transform` header now prevents injection; the CSP and unrelated zone analytics remain unchanged. The final HTTP check verifies the beacon is absent and browser checks verify no console errors. Original failures are retained in `evidence/browser-production-before-header-fix.json`.

Mobile lab LCP median 1.763s, CLS median 0; TBT median 586.5ms with substantial host variability (39–645.5ms). Desktop LCP median 0.375s, CLS 0, TBT 33.4ms. These are synthetic results, not p75 field or INP evidence. Physical mobile devices and NVDA/VoiceOver listening were not tested. The unmodified 390px browser check timed out once during a run where the runner reported an unusually long 33.6-minute duration; its focused rerun passed. No timeout or assertion was weakened.

Search Console ownership/indexing submission and optional analytics need owner accounts; instructions are in `search-and-operations.md`. No indexing/ranking promise, analytics conversion claim or automatic email acknowledgment. Public Formspree free allowance starts at 50/month; actual dashboard plan/usage was not inspected. No paid enrollment was made.

## Rollback

For future regressions, restore the known-good site version `4317599d-6080-4ac6-9237-3503bc0971e9` at 100% in the intended Worker's deployment controls. Keep the redirect version above. Re-run HTTP, source-header and browser smoke checks. A rollback procedure is recorded; no rollback drill was performed against the live site.

If restoring the prelaunch routing is necessary, remove only the three route IDs above after checking current ownership. The prelaunch route list was empty and www/apex returned 404. Do not delete unrelated Workers, reassign custom domains or alter any DNS record. Code rollback does not restore mailboxes or provider submissions. Preserve `.local` snapshots privately and never upload credential files.
