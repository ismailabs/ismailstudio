# Ismail Studio V3 final-polish delivery

Status at this checkpoint: **PREVIEW ONLY (BLOCKED)** on independent owner confirmation of the single preview marker in Zoho. Production has not been promoted. This report will be reconciled with actual release evidence before closure.

Target: https://www.ismailstudio.my/. Verified immutable preview: https://b767642c-ismailstudio.mohamad-ismail-mohd-izwan.workers.dev/. The alias is convenience only; validation uses the immutable version.

Source branch: `codex/ismailstudio-v3-final-polish`. Runtime/source commit: [`eef2185fb3590a60e9c267794609efe3b6a6001c`](https://github.com/ismailabs/ismailstudio/commit/eef2185fb3590a60e9c267794609efe3b6a6001c), starting from `b65a208f03dfd01d535eb4a865ad00e2d8fc4146`. Main remains at the starting SHA at this checkpoint. No force push, reset, stash, clean or owner cleanup commit was used. The original dirty checkout is preserved exactly, including 328 owner paths, 24 existing-file hashes, intentional historical deletions, skills-lock changes and untracked skills/handoff. See [workspace preservation](../../evidence/final-polish/workspace-preservation.json).

## Approved scope and facts

| Area | Final implementation |
|---|---|
| Hero | `Hero.astro`, `global.css`, two approved WebP derivatives and `prepare-final-polish-assets.mjs`; semantic H1 **BUILT FOR BIGGER PROBLEMS.**, original brand, contact-first CTA and work CTA. Desktop scene and mobile option A preserve the supplied background composition. No headline was embedded into the bitmap. |
| Navigation and motion | `Header.astro`, `site.ts`, `global.css`; circular three-line action-labelled toggle, large panel, focus/scroll containment, Escape/backdrop/anchor/resize closure and focus return. Short landscape scrolls vertically. Once-only transform cues keep all text visible; reduced motion cancels animation. Only the selected hero word has ambient gradient motion. |
| Business copy | `About.astro`, `Packages.astro`, `FAQ.astro`, `Portfolio.astro`, `data/packages.ts`, `faq.ts`, `projects.ts`, `studies.ts`; Melaka identity, specific outputs/suitability, one-time SEO scope, seven separately quoted integrations and neutral individually agreed payment/rights/support terms. No invented credentials, client results, rankings or popularity claims. |
| Offers | Starting from RM599 / one page / one revision; RM1,299 / up to five pages / two revisions; RM2,999 / up to 12 pages / two revisions. All three are starting prices. |
| Timelines | Estimated **2 / 3 / 7 working days**. Monday-Friday excluding applicable Malaysian public holidays. Scope, required materials, initial payment and written start date must be agreed; materials/payment must be received. Estimates are not guaranteed deadlines. The [direct owner amendment](owner-amendment.md) resolves the original handoff's day-type gate without changing checksum-covered originals. No commercial-policy decision remains open. |
| Projects | All four remain **Concept Project**. Six-part hypothetical stories and honest limitations; authentic existing project captures and live links to `https://kopikita.ismailstudio.my/`, `https://kilatmoto.ismailstudio.my/`, `https://makansedap.ismailstudio.my/`, `https://malaysia.ismailstudio.my/`. Actual demo links were checked in Edge. No live reservation/order/real-client result is implied; generated scenery is identified where relevant. |
| SEO | `BaseLayout.astro`; home title exactly **Ismail Studio**, en-MY, truthful canonical www metadata/schema, descriptive study titles, sitemap/robots and redirects. No ranking promise. |
| Form | Existing primary form, secondary `contact@ismailstudio.my`, three steps, exact provider endpoint/field contract and native fallback preserved. `contact.ts` unchanged. No personal WhatsApp number, analytics enrollment, paid service or credential change. |
| Quality/docs | Twenty added cases, existing assertions preserved, fail-closed obsolete image generators, both handoff validators, scoped branch CI, repeatable capture/performance/infrastructure/form harnesses and current execution/evidence records. No dependency/lock/skill installation or upgrade. All 21 installed skill metadata entries reviewed and dispositions recorded. |

## Hero provenance

| Image | SHA-256 | Output |
|---|---|---|
| Desktop approved original | `1b65fd0024b9011e966b7c90e8babdfee2cc1cba890e871d943aec897141bbd6` | `public/assets/hero-desktop.webp`, 99,264 bytes, `d09d18fef49f3b36d298b545c86ecf08f09f5d5daf9f9c9a018d00ace60234e6` |
| Mobile option A original | `4b7f7ec88e1c5a4f898addd8fef61c5c25e24ad48fcec72d218a01e22c9a6739` | `public/assets/hero-mobile.webp`, 45,380 bytes, `b84e0e1608e4066d56b50a977a6b32f5c57100fd7ecec1559c166086ead9ef32` |

Encoding only, pinned Sharp 0.35.5/WebP 1.6.0, quality 82/effort 6; no source redraw/crop/recolor. [Provenance](../../evidence/final-polish/asset-provenance.json) records dimensions and encoder. All nonhero public assets remain byte-identical to the baseline. Original approved files and all 16 handoff checksums pass.

## Verification

- `npm run verify`: both handoff validators, Astro check with zero errors/warnings/hints, five-page static build, three redirect unit tests and 58/58 browser cases, zero skips/failures/flakes. No lint script is configured. Final small disclosure/menu fixes additionally passed 2 + 5 focused cases. Fresh exact-source [GitHub CI run 39939250031](https://github.com/ismailabs/ismailstudio/actions/runs/39939250031) succeeded with all 58 cases.
- Immutable hosted `TEST_BASE_URL=<preview> npx --no-install playwright test`: 57 passed, one 30-second Axe execution timeout. The same KopiKita test passed alone in 7.8 seconds with unchanged assertions/timeout. [Preview receipt](../../evidence/final-polish/preview-browser.json) retains both outcomes; there are no unresolved case failures or hidden skips. A first focused invocation selected no test; that diagnostic and the original failure trace remain private. This is not reported as a clean single-invocation 58-pass run.
- Browser coverage includes ten sizes from 320px to 1920px, short landscape, reflow, axe, keyboard/focus, dialogs/history, native/no-JS paths, reduced motion, honest form validation/provider-error/timeout/retry states, links, SEO and CSP/privacy checks. Mocked browser tests never send real enquiries.
- Three actual critique/repair/recapture cycles, followed by [50 immutable hosted captures](../../evidence/final-polish/preview-final-matrix/receipt.json), zero page errors and source headers matching the exact commit. [Desktop hero](../../evidence/final-polish/preview-final-matrix/1440-hero.png), [mobile hero](../../evidence/final-polish/preview-final-matrix/390-hero.png), expanded content and short landscape were inspected. [Visual review](visual-reviews.md) preserves observed defects, repairs and harness failures.
- Exact [commit-bound package](../../evidence/final-polish/commit-bound-package.json): 49 dist files including nonpublic `_headers`, 48 public hashes. [Preview HTTP receipt](../../evidence/final-polish/preview-integrity.json): all 48 match; source/header/private-path 404 and three canonical/apex redirects preserve path/query. Deterministic website-only archive SHA-256 `247eba8bd5e09ed3e9ba518d4ea427646ddeaba67a75036950fc66c1da6d255d`.
- Controlled pinned Lighthouse/Edge comparison: median mobile LCP 2.507s to 2.327s; mobile TBT 308.5ms to 278.6ms; desktop LCP 0.648s to 0.621s; desktop TBT 28.8ms to 20.3ms. Final mobile TBT range 238.3-1018.9ms and earlier 2196.5ms diagnostic retained. Final category scores for automated accessibility/SEO/best practices are 100. No significant median regression established; noisy mobile headroom remains a limitation. [Performance review](performance-review.md) and JSON summaries retain bounds/raw pointers; lab TBT is not field INP.
- Scoped custom secret/path scan found zero selected findings, not a Gitleaks audit. Independent bounded [source/package audit](independent-audit.md) found no additional material blocker; it does not establish production clearance.

## Form, infrastructure and release gate

The one preview test marker is `ISM-FINAL-POLISH-PREVIEW-20261023105053`. Formspree returned HTTP 200 with `ok:true` and the browser displayed success at 2026-10-23 10:51:01 UTC. [Acceptance receipt](../../evidence/final-polish/form-preview-acceptance.json). Independent owner Zoho confirmation is **pending**. Provider acceptance alone is insufficient. No second preview submission is allowed; no agent mailbox access is authorized. The owner chose to check Zoho and confirm each supplied marker.

Existing Worker **ismailstudio**, ID `128d5b2374444f61a98b1c666132f208`, new unpromoted version `b767642c-53d1-473d-8d00-277aa7fe5318`. Previous active deployment `76513860-4004-41d7-ac33-786f0d005a64` still routes 100% to `b46cfec0-8728-4c4d-8031-92d354f10a19` at this checkpoint. Packaging/upload affected only the website Worker; no generic deploy or trigger deploy was used.

Fresh complete prepromotion comparison at 10:51:31 UTC passes: all 17 DNS records, mail/CAA, three routes, six domains, apex deployment/settings, eight other Workers, website bindings/global settings and all build triggers remain unchanged. [Protected-resource receipt](../../evidence/final-polish/infrastructure-prepromotion.json). Raw snapshots remain private. A truncated provider response was rejected and replaced by complete smaller GET batches; no gate was relaxed.

Rollback version `b46cfec0-8728-4c4d-8031-92d354f10a19` is readable. The reviewed website-only deployment request and exact 100% payload passed dry run; no live rollback drill was performed. [Rollback receipt](../../evidence/final-polish/rollback-ready.json). Remove only `--dry-run` from the reviewed command if a confirmed website regression requires rollback; never change apex/DNS/mail or bypass checks.

Next required action: owner confirms the exact preview marker in Zoho. After that gate passes, recheck protected state, normally fast-forward permitted main, promote only the tested version, verify canonical production and send exactly one production test for a second independent Zoho confirmation. Do not report RELEASED before public verification and receipt evidence pass.

Known evidence limits: no physical-device or assistive-technology hardware certification, Search Console/real-traffic data, field Core Web Vitals or ranking guarantee. Shared-host lab variability is recorded. The GitHub connection cannot read administrative branch-protection details (403); the branch resource reports unprotected, inherited rulesets are empty and permitted ordinary pushes are used. No owner action is requested for routine implementation choices.
