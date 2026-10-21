# Ismail Studio V2 — release record

**IMPLEMENTED, PRODUCTION BLOCKED — fresh Zoho inbox receipt is unverified.**

Recorded 2026-10-22, Malaysia time. Implementation, three refinement cycles, source publication and exact-version public preview verification are complete. The approved contact/release runbooks require separate inbox evidence before promotion. No further design approval is needed.

## Source and preview

- Runtime source: `488a88c34a2a78d4ece64636dff14ac4d42e8395`, pushed to `codex/ismailstudio-v2-creative-redesign`. Local/tracking/advertised SHA matched.
- Verification commit: `fe3b41f69ce794148740c1da4e6662484ff0948c`; adds focused tests, CI and evidence. Runtime/public/config/redirect/packaging diff from `488a88c` is empty.
- Website version: **`559ca179-d268-4db7-a486-181df5238e66`**, uploaded only, zero production traffic.
- Exact preview: https://559ca179-ismailstudio.mohamad-ismail-mohd-izwan.workers.dev/
- Alias: https://v2-review-ismailstudio.mohamad-ismail-mohd-izwan.workers.dev/
- Clean five-page Astro build from runtime SHA; **31 allowlisted static files**. Apex/trigger settings excluded. Actual served source header and asset hashes matched. No internal references, docs, source, submission records or credentials are public assets.
- Pinned cf beta.19 build validation, exact-version promotion dry-run and rollback dry-run passed. No actual production deployment request was sent.

## Verified gates

| Gate | Result / evidence |
| --- | --- |
| Visual | Three critique/repair cycles, 81 primary captures plus 27 final hosted frames; visual-reviews.md and evidence/round1–3, preview-final |
| Assets/facts | All 16 authentic derivatives byte-identical to V1; four Concept Project disclosures; protected package/project/FAQ/form data unchanged; asset-evidence.json |
| Build/check | Five pages; Astro 53 files, zero errors/warnings/hints; clean CI npm run verify |
| Redirect units | 3/3 PASS; actual apex path/query 308 also checked |
| Browser | **31/31 local + 31/31 exact preview**, no skipped/unexpected/flaky cases; browser-ci-local.json, browser-ci-preview.json |
| CI | [Run 39646381434](https://github.com/ismailabs/ismailstudio/actions/runs/39646381434), job 119382934975; artifact downloaded and SHA256 verified; evidence/ci.json |
| HTTP/assets | 37 preview checks PASS: hashes, source, CSP/security/no-transform, private paths 404; preview-http.json |
| Resilience | Eight widths, sampled axe, keyboard/dialog focus/history/deep links, guided flow/edit/payload, isolated native POST, no-JS, reduced motion, forced colors, landscape and provider/network/timeout outcomes |
| Performance | Three mobile + three desktop runs; local median LCP 2.143s / 0.673s, CLS 0; ranges/conditions in performance-review.md |
| Real acceptance | Formspree 200, accepted ok:true, UI success; marker **ISM-PREVIEW-V2-20261021173515**; form-preview-v2.json |
| Inbox | **UNVERIFIED**; no authenticated Zoho surface available; owner confirmation requested. V1 history is not reused as V2 proof. |
| Publication safety | Targeted staged scan zero findings; staged whitespace PASS; no new app/workstation dependency; CI provenance reviewed/pinned. Not Gitleaks or an exhaustive audit. |

The Windows host reached ~7MB free RAM and produced retained budget timeouts. Tests were separated by responsibility with every assertion and timeout retained. Independent Ubuntu CI then completed all 62 cases cleanly. Hosted captures record local verification SHA separately from observed served runtime SHA.

## Current production and preservation

https://www.ismailstudio.my/ still returns V1, HTTP 200, source **74ddae2f873e45f89dc2837456ca7441985be96e**.

- Active website version **4317599d-6080-4ac6-9237-3503bc0971e9**, deployment `224c085a-9853-40bd-9943-955c62ef8f7f`, 100% traffic.
- Apex version **b1fb9bf9-8597-4210-b782-4a951bc1e820**, deployment `98aa3e69-71d6-4ffe-83f3-45385afd301d`, unchanged.
- Latest reads at `2026-10-21T17:49:17Z`: three routes, six custom domains, all **17 DNS records** (including seven MX/TXT/CAA), eight other Workers (including apex), bindings and build-trigger list unchanged. See infrastructure-after.json and production-preserved.json.
- DNS fingerprint `d627da74614e8feeed07836cc16a35141025ada7a8002cb283ff2f693055153b`; raw data remains ignored in .local/v2.
- All four concept URLs 200; apex path/query 308 verified. Main remains `d9dc2b8fdea169742a1951c3690a055af9a02869`.
- No main merge, production promotion, DNS/mail/route/global setting edit, paid enrollment or unrelated deployment. Original user skill/lock changes preserved outside implementation commits.

## Required next fact and authorized continuation

Owner: confirm whether **“Ismail Studio delivery check ISM-PREVIEW-V2-20261021173515”** arrived at `contact@ismailstudio.my` in Zoho. No credentials or message contents are needed. This requirement comes from `../redesign-v2/docs/07-contact-flow.md` and `13-production-release.md`; provider acceptance alone is insufficient. Silence is not confirmation.

After direct confirmation, record it, refresh current infrastructure/active version, then promote exactly the tested version using the existing authenticated cf path:

```text
cf workers deployments create --worker ismailstudio --strategy percentage --versions @.local/v2/production-versions.json
```

That ignored file already contains version 559ca179-d268-4db7-a486-181df5238e66 at 100%; dry-run inspected. Do not run triggers deploy, redeploy apex or change provider/DNS. Preserve .local/release-assets.json. Immediately verify canonical HTTPS/source/assets/redirects, critical browser flows and one safe canonical-host real enquiry, separately confirm its Zoho receipt, recompare infrastructure, and publish final evidence without force-push. Production permission is already granted after the gate passes; no generic new approval is needed.

## Rollback and limits

Exact old-version API read succeeded and retains known-good asset configuration/source. `.local/v2/rollback-versions.json` contains 4317599d-6080-4ac6-9237-3503bc0971e9 at 100%; its deployment dry-run passed. On a post-promotion incident, use the same command with that file and verify old source/functional V1. Keep apex/DNS/other Workers untouched. No live rollback drill was performed; code rollback does not restore mailbox/provider records.

Physical devices, screen-reader listening, field p75/INP, analytics and Search Console owner actions remain unverified. No conversion/ranking/full-WCAG claim is made.
