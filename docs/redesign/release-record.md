# Ismail Studio V2 — release record

**IMPLEMENTED / TESTED / DEPLOYED / VERIFIED — all mandatory release gates passed.**

Completed 2026-10-22, Malaysia time. Implementation, three refinement cycles, source publication, exact-version preview and canonical production browser verification are complete. The owner directly confirmed preview arrival in Zoho before promotion and independently confirmed the production enquiry arrived in Zoho afterward. Both acceptance and inbox-delivery evidence are recorded; no mandatory release blocker remains. Measurement limits below remain explicit.

## Source and preview

- Runtime source: `488a88c34a2a78d4ece64636dff14ac4d42e8395`, pushed to `codex/ismailstudio-v2-creative-redesign`. Local/tracking/advertised SHA matched.
- Verification commit: `fe3b41f69ce794148740c1da4e6662484ff0948c`; adds focused tests, CI and evidence. Runtime/public/config/redirect/packaging diff from `488a88c` is empty.
- Website version: **`559ca179-d268-4db7-a486-181df5238e66`**, now 100% production traffic.
- Exact preview: https://559ca179-ismailstudio.mohamad-ismail-mohd-izwan.workers.dev/
- Alias: https://v2-review-ismailstudio.mohamad-ismail-mohd-izwan.workers.dev/
- Clean five-page Astro build from runtime SHA; **31 allowlisted static files**. Apex/trigger settings excluded. Actual served source header and asset hashes matched. No internal references, docs, source, submission records or credentials are public assets.
- Pinned cf beta.19 build validation, exact-version promotion dry-run and rollback dry-run passed. Exact-version promotion created deployment **`573f6883-09a9-4883-9a34-64be843350bb`** at **2026-10-21T21:33:51.14378Z** (2026-10-22 05:33:51 MYT). No reupload or trigger deployment was performed.

## Verified gates

| Gate | Result / evidence |
| --- | --- |
| Visual | Three critique/repair cycles, 81 primary captures + 27 final preview + 27 canonical production frames (135 total); visual-reviews.md and evidence/round1–3, preview-final, production-final |
| Assets/facts | All 16 authentic derivatives byte-identical to V1; four Concept Project disclosures; protected package/project/FAQ/form data unchanged; asset-evidence.json |
| Build/check | Five pages; Astro 53 files, zero errors/warnings/hints; clean CI npm run verify |
| Redirect units | 3/3 PASS; actual apex path/query 308 also checked |
| Browser | **31/31 local + 31/31 exact preview**, no skipped/unexpected/flaky cases; browser-ci-local.json, browser-ci-preview.json |
| CI | [Run 39646381434](https://github.com/ismailabs/ismailstudio/actions/runs/39646381434), job 119382934975; artifact downloaded and SHA256 verified; evidence/ci.json |
| Canonical CI | [Run 39680006800](https://github.com/ismailabs/ismailstudio/actions/runs/39680006800), source 94c72a3, job 119499710295; full verify + **31/31 local in 44.9s and 31/31 production in 58.1s**, zero skipped/unexpected/flaky. Downloaded artifact 12384195628 SHA256 verified; ci-production.json and browser-ci-production*.json. |
| HTTP/assets | 37 preview checks PASS: hashes, source, CSP/security/no-transform, private paths 404; preview-http.json |
| Resilience | Eight widths, sampled axe, keyboard/dialog focus/history/deep links, guided flow/edit/payload, isolated native POST, no-JS, reduced motion, forced colors, landscape and provider/network/timeout outcomes |
| Performance | Three mobile + three desktop runs; local median LCP 2.143s / 0.673s, CLS 0; ranges/conditions in performance-review.md |
| Real acceptance | Formspree 200, accepted ok:true, UI success; marker **ISM-PREVIEW-V2-20261021173515**; form-preview-v2.json |
| Preview inbox | **PASS**; owner directly replied "Arrived in Zoho inbox" for ISM-PREVIEW-V2-20261021173515. Recorded in form-preview-v2.json. |
| Production HTTP/assets | **41/41 PASS**; canonical V2 source/header/assets/security/private-path and permanent redirects, production-http.json. Root SHA256 also matches the exact preview artifact; all four actual concept URLs return 200, production-integrity.json. |
| Production real enquiry | **PASS**: Formspree 200, accepted ok:true, UI success; **ISM-PRODUCTION-V2-20261021213408**. Owner independently replied "Arrived in Zoho inbox" for this exact production marker; form-production-v2.json records direct receipt confirmation. |
| Publication safety | Targeted staged scan zero findings; staged whitespace PASS; no new app/workstation dependency; CI provenance reviewed/pinned. Not Gitleaks or an exhaustive audit. |

The Windows host reached ~7MB free RAM and produced retained budget timeouts. Tests were separated by responsibility with every assertion and timeout retained. Independent Ubuntu CI then completed all 62 cases cleanly. Hosted captures record local verification SHA separately from observed served runtime SHA.

## Current production and preservation

https://www.ismailstudio.my/ returns V2, HTTP 200, source **488a88c34a2a78d4ece64636dff14ac4d42e8395**.

- Active website version **559ca179-d268-4db7-a486-181df5238e66**, deployment `573f6883-09a9-4883-9a34-64be843350bb`, 100% traffic. Prior V1 version **4317599d-6080-4ac6-9237-3503bc0971e9** and deployment `224c085a-9853-40bd-9943-955c62ef8f7f` remain rollback references.
- Apex version **b1fb9bf9-8597-4210-b782-4a951bc1e820**, deployment `98aa3e69-71d6-4ffe-83f3-45385afd301d`, unchanged.
- Fresh prepromotion reads at `2026-10-21T21:33:21Z`, postpromotion comparison at 21:35:55Z and **final closure comparison at 21:47:25Z PASS**: three routes, six custom domains, all **17 DNS records** (including seven MX/TXT/CAA), eight other Workers (including apex), bindings and build-trigger list unchanged. See infrastructure-after.json. Historical prepromotion receipts remain separately dated. Final canonical root/hash and all four concept URLs rechecked at 21:48:00Z; production-integrity.json.
- DNS fingerprint `d627da74614e8feeed07836cc16a35141025ada7a8002cb283ff2f693055153b`; raw data remains ignored in .local/v2.
- All four concept URLs 200; apex path/query 308 verified. Remote main was normally fast-forwarded from observed baseline `d9dc2b8fdea169742a1951c3690a055af9a02869`, atomically with the feature branch, to release/evidence commit **`bc57e0c9355e27ddaada2618da97ca95aa680cc9`**. Fresh local HEAD, local main, both tracking refs and both advertised remote SHAs matched; app/production-packaging diff from runtime `488a88c` is empty. GitHub reports main unprotected and no rulesets. No history replacement or hosting build trigger; evidence/publication.json records the boundary before this documentation receipt.
- Only website-version traffic was promoted. No DNS/mail/route/global setting edit, paid enrollment or unrelated deployment. Original user skill/lock changes preserved outside implementation commits.

## Completed delivery verification

The owner directly confirmed that **“Ismail Studio delivery check ISM-PRODUCTION-V2-20261021213408”** arrived at `contact@ismailstudio.my` in Zoho, replying **“Arrived in Zoho inbox”** on 2026-10-22 Malaysia time. This is independent of the earlier preview receipt and satisfies the canonical-host requirement in `../redesign-v2/docs/07-contact-flow.md` and `13-production-release.md`. Confirmation-recording time is retained in form-production-v2.json; no arrival timestamp, mailbox screenshot, message body or personal data is inferred or published.

The exact tested version was promoted through the existing authenticated cf path:

```text
cf workers deployments create --worker ismailstudio --strategy percentage --versions @.local/v2/production-versions.json
```

That ignored file contains version 559ca179-d268-4db7-a486-181df5238e66 at 100%; fresh dry-run inspected immediately beforehand. Canonical HTTP checks, full canonical browser CI, final hosted screenshots and protected-infrastructure comparison passed. Exactly one deliberate production enquiry was sent, accepted and owner-confirmed in Zoho. Final receipt closure changes documentation only; no repeat enquiry, runtime change or extra deployment was made. Completion evidence is mapped in completion-audit.md.

## Rollback and limits

Exact old-version API read succeeded and retains known-good asset configuration/source. `.local/v2/rollback-versions.json` contains 4317599d-6080-4ac6-9237-3503bc0971e9 at 100%; its deployment dry-run passed. On a post-promotion incident, use the same command with that file and verify old source/functional V1. Keep apex/DNS/other Workers untouched. No live rollback drill was performed; code rollback does not restore mailbox/provider records.

Physical devices, screen-reader listening, field p75/INP, analytics and Search Console owner actions remain unverified. No conversion/ranking/full-WCAG claim is made.
