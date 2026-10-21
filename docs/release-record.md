# Release record — in progress

**Not released yet.** Do not interpret a successful build, local form receipt or packaging dry run as public production completion.

## Verified so far

- Repository identity `ismailabs/ismailstudio`, branch main, baseline `25ded7bececeef7bc9d09b875c966d2db200e853`; remote re-fetched and unchanged during implementation.
- Handoff validator PASS; Astro strict check/build PASS; exact offers and four genuine concepts implemented.
- Real local Formspree acceptance and owner-confirmed Zoho inbox receipt, marker `ISM-LOCAL-20261021103959` (docs/evidence/form-local.json).
- Final full browser suite: 17 passed in 1.9m, seven viewport widths and WCAG 2.1 A tags included. Three redirect handler tests passed. Astro check: 41 files, zero errors/warnings/hints.
- Mobile/desktop performance measured three times each; medians, ranges, settings and mobile TBT limitation in performance-review.md. No field metrics claimed.
- Cloudflare Build Output v0 package passed `cf deploy --prebuilt --dry-run`; no Worker bindings or source/private directories in assets.
- Design probe/rules through working Edge/Playwright transport: zero failures at 1440/768/390 after documented brief exceptions. Ten elements moved during actual load/scroll. Remaining warnings explicitly recorded; no native inspector success invented.

## Pending gates

- Source commit, push, independent HEAD/tracking/advertised-remote SHA comparison.
- Preview upload and independent smoke, canonical www binding, permanent apex redirect retaining path/query, HTTPS and all assets/routes.
- Production-browser form check and separate Zoho receipt confirmation.
- Post-change comparison proving mail records and unrelated subdomains were preserved.

## Access evidence

Cloudflare connector and new cf OAuth flows remain unavailable. The existing official Wrangler client successfully refreshed its previous OAuth session; Workers Scripts/Routes write access is usable by cf through a child environment. No token is printed, copied into source or committed.

The owner supplied a separate DNS **read-only** token. Validity verification and exact zone/DNS read calls passed. It is used only for reads, never for a mutation or write probe. Account `44214a829e2337ca50cf40e4cd827cba`, zone `dc2bee92d5853929394633d0a4165093`, active. Seven unrelated Workers, six custom Worker domains, zero pre-existing routes; neither intended Worker existed. Seventeen DNS records captured in ignored .local/cloudflare-baseline.json.

Mail/TXT/CAA records: 7, fingerprint `a1112c745f075ade82d22a8871bfbab79c1e98b7c1ecf4cc3af6e8220996aa11`. All protected records: 15, fingerprint `7cc055cd555b1917fc5e76a3bfee2fa58f8f1cdf0567c69b40a939a8a57e32e0`. Existing apex A `216.198.79.1` and www CNAME to apex are both proxied. **No DNS record changes are required.** Use exact-host Worker routes with the existing Workers authorization; do not use the read-only token for writes. Production HTTPS baseline returned 404 for www and apex; TLS was valid. See evidence/prelaunch-http.json.

Desired routes: `www.ismailstudio.my/*` to `ismailstudio`; `ismailstudio.my/*` and `http://www.ismailstudio.my/*` to `ismailstudio-apex`. No hostname wildcard or unrelated service is included. The separate redirect returns 308 to HTTPS www, retaining path/query. Routes are deliberately omitted from the initial workers.dev upload for independent smoke testing. No Cloudflare mutation has occurred at this preparation point.

## Release/rollback procedure

Build from the reviewed commit with `RELEASE_COMMIT=<40-character SHA>`, package with --preview-only, dry-run, upload both intended Workers and smoke the returned workers.dev URLs before adding exact-host routing. Re-read routes immediately before the switch and stop on a conflicting binding. No existing ismailstudio Worker means no pre-existing build trigger for that target.

Snapshot any prior version/deployment and relevant website-only DNS/route state. Roll back to that known-good Worker version or restore the exact website route/record from baseline if live verification fails. Never alter MX, SPF, DKIM, DMARC, CAA, unrelated Workers/domains or entire-zone configuration. Code rollback does not restore a provider mailbox or submission records.

If access remains unavailable, finish and preserve all nonblocked work, report the exact missing permission/session and leave the public domain unchanged. Do not declare the definition of done achieved.
