# V3 release record

Status: **PASS — V3 deployed and canonical verification complete.** GitHub main publication is the remaining administrative closure step. No unresolved mandatory implementation, provider or infrastructure gate.

## Exact release identity

- Production: https://www.ismailstudio.my/ ; website Worker `ismailstudio` only.
- Runtime source: `6393bf7ada13c089f3ed7e7c12a781fafb440e50`. The subsequent reviewed release/tooling commit is `3ec35b374a5eb6e2782f975370b62c823d5cdaa5`; a scoped Git diff confirms identical runtime source, public assets, dependencies and build configuration. Later evidence/documentation commits do not change the tested version.
- Remote branch: `https://github.com/ismailabs/ismailstudio/tree/codex/ismailstudio-v3-redesign`.
- Immutable preview: https://b46cfec0-ismailstudio.mohamad-ismail-mohd-izwan.workers.dev ; alias `v3-review-ismailstudio.mohamad-ismail-mohd-izwan.workers.dev`.
- Tested and promoted version: `b46cfec0-8728-4c4d-8031-92d354f10a19`, uploaded 2026-10-22T09:17:58.542827Z.
- Production deployment: `76513860-4004-41d7-ac33-786f0d005a64`, 100% traffic, 2026-10-22T09:32:57.542937Z (17:32:57 Malaysia).
- No generic deploy, trigger deployment, apex build, DNS mutation, new binding or paid enrollment occurred. Packaging used **both** `--site-only --preview-only`.

## Implemented and visually refined

Original rounded SVG identity and favicons; optimized cinematic scene with massive semantic headline; light, spacious work/offers/process/about sections; four genuine Concept Projects; exact protected From pricing/page/revision counts; feasible one-time SEO scopes; accessible floating navigation and short-height menu; preserved dialog routes/history/focus, FAQ and progressively enhanced three-step form.

The four original approved PNGs control visual direction. Three critique/repair cycles, 15 concrete observations and justified adaptations are in `design-and-visual-review.md`. Before/after screenshots, the reference comparison and 27-state local/preview/production captures are under `../evidence/`. Four project families (16 files) are byte-identical to observed baseline. Dated market research did not establish a comparable basket, so an unsupported numeric market chart was omitted. All 21 installed skills were inventoried with hashes/dispositions; no skill was installed or changed. Motion 14.5.0 was provenance-reviewed, pinned and installed without lifecycle scripts; optional Mini loads on navigation interaction, with no React runtime.

## Verification evidence

| Gate | Result / receipt |
|---|---|
| Handoff integrity, Astro typecheck/build | PASS through `npm run verify`; no lint script configured. |
| Redirect units | 3/3 PASS; established 308 behavior retained. |
| Local Playwright | 38/38 PASS, zero skipped/flaky/unexpected; `local-tests-final.json`. |
| Preview Playwright | 38/38 PASS in the unchanged full final run; `hosted-preview-final.json`. Initial navigation reset retained in `hosted-preview-first.json`, not hidden by retries or weakened assertions. |
| Canonical Playwright | All 38 cases verified: first full run passed 37 with one normal 60s timeout while axe opened a secondary page; that unchanged 1920px case passed alone in 17.7s with identical timeout/assertions. Zero skipped tests. The initial failure and focused result are both retained in `production-browser.json`; this is not represented as a single clean 38-test production run. |
| GitHub CI | Reviewed commit `3ec35b3` passed [run 39755193748](https://github.com/ismailabs/ismailstudio/actions/runs/39755193748). Local build/redirect/browser checks ran; the optional hosted CI step was conditionally omitted for this branch, with hosted tests executed directly and recorded separately. |
| Responsive and accessibility | 11 viewport/landscape sizes, four dialog paths, keyboard/touch-mode/focus/history, no-JS, forced colors, reduced motion, zoom-equivalent reflow, eight-width axe samples; `matrix-preview/manifest.json` and its current motion trace. No page error/horizontal overflow in that matrix. |
| Hosted bytes / SEO / privacy | All 48 public assets match the selected build on preview and canonical host. HTML source header, CSP/nosniff, canonical metadata and private/source-path 404s pass. Three apex/HTTP routes preserve path/query with 308. `preview-integrity.json`, `production-integrity.json`. |
| Live demos | Four actual demo links returned HTTP 200; `baseline/live-http-and-demos.json`. |
| Form preview | One actual POST, HTTP 200/ok:true and correct UI. Owner independently confirmed Zoho arrival for `ISM-V3-PREVIEW-20261022091959`, with unchanged account eligibility and verified recipient. |
| Form production | One actual POST, HTTP 200/ok:true and correct UI. Owner independently confirmed Zoho arrival for `ISM-V3-PRODUCTION-20261022093601`. Both `form-*-acceptance.json` receipts distinguish provider acceptance from owner inbox evidence. No mailbox access or customer data is claimed. |
| Performance | Three cold mobile and three desktop runs each for V2/V3; measured bundle costs and lab limits in `performance-review.md`. Mobile median LCP 2.510s (range 2.496–4.443), CLS 0.0147, TBT 434.5ms; desktop median LCP 0.718s, CLS 0.00248. No field CWV/INP claim. |
| Security / provenance | Reviewed staged-file pattern/path scan: zero findings. Runtime dependency audit: zero known vulnerabilities. Static allowlist and symlink checks passed. These are bounded checks, not Gitleaks or a complete security audit. |
| Protected infrastructure | Fresh before/pre-upload/preview/pre-promotion/after snapshots. 9 Workers, 6 domains, 3 routes, 17 DNS records including 7 mail/CAA, zero website bindings/build triggers. DNS fingerprint unchanged: `d627da74614e8feeed07836cc16a35141025ada7a8002cb283ff2f693055153b`. All unrelated Worker timestamps, apex deployments, routes and domain mappings compare equal; `infrastructure-after.json`. |

The immediate canonical smoke after promotion encountered one asset 404. The exact same unmodified URL subsequently returned HTTP 200 with the correct V3 source, and the complete 48-file hash smoke then passed. This is consistent with rollout propagation; that cause is an inference, not a provider incident diagnosis. No cache purge, infrastructure edit or new version was needed.

## Baseline and rollback

Freshly reread baseline V2 source `488a88c34a2a78d4ece64636dff14ac4d42e8395`, version `559ca179-d268-4db7-a486-181df5238e66`, prior deployment `573f6883-09a9-4883-9a34-64be843350bb`. Apex remains version `b1fb9bf9-8597-4210-b782-4a951bc1e820`, deployment `98aa3e69-71d6-4ffe-83f3-45385afd301d`.

The known-good website version is readable. Installed cf beta.19 validated the exact rollback payload via dry run before promotion; `rollback-ready.json`. No actual rollback drill was performed. Reverify current state and version visibility before any future rollback, then use the existing authorized CLI context:

```sh
# Reviewed JSON: [{"version_id":"559ca179-d268-4db7-a486-181df5238e66","percentage":100}]
cf workers deployments create --worker ismailstudio --strategy percentage --versions @.local/v3/rollback-versions.json --dry-run
# Only on a confirmed regression, repeat that exact command without --dry-run.
```

Never use `--bypass-deployment-checks`, deploy apex, or reapply triggers/DNS for rollback.

## Remaining boundaries

`remaining-issues.md` records mobile lab headroom, available browser/device coverage and retained execution diagnostics. Physical-device/screen-reader hardware and field traffic were unavailable; WCAG 2.2 AA remains the target. User-owned pre-existing documentation deletions, `skills-lock.json` and local skill folders remain uncommitted and preserved. Current raw infrastructure snapshots, auth helpers, real-send intent guards and private diagnostics remain ignored in `.local/`.
