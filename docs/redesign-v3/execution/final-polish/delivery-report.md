# Ismail Studio V3 final-polish delivery

**Status: PASS / RELEASED.** All mandatory implementation, source, preview, canonical production, independent inbox and protected-resource gates passed. No mandatory blocker or unresolved commercial decision remains.

Production: https://www.ismailstudio.my/. Immutable tested preview: https://2209bc13-ismailstudio.mohamad-ismail-mohd-izwan.workers.dev/.

Runtime/source: [`a21e78718f216d9c700e56fb940035bf91a83eb4`](https://github.com/ismailabs/ismailstudio/commit/a21e78718f216d9c700e56fb940035bf91a83eb4), branch [`codex/ismailstudio-v3-final-polish`](https://github.com/ismailabs/ismailstudio/tree/codex/ismailstudio-v3-final-polish), normally fast-forwarded to main. Starting SHA: `b65a208f03dfd01d535eb4a865ad00e2d8fc4146`. Later closure publication contains documentation/evidence only; the final Git receipt SHA is identified in the owner completion message. Runtime identity remains the tested source above, without a needless redeployment for documentation.

The original owner checkout remains at its original HEAD and preserves all 328 original owner paths, 24 existing-file hashes, intentional historical deletions, modified skills lock, untracked skills/handoff, and the subsequently supplied PNG. Nothing was reset, restored, stashed, cleaned or swept into a commit. Work occurred in the attached isolated worktree. [Preservation receipt](../../evidence/final-polish/workspace-preservation.json).

## Scope and facts

| Area | Delivered change |
|---|---|
| Hero | `Hero.astro`, image-only rules in `global.css`, verified source PNG, three responsive WebPs and `prepare-final-polish-assets.mjs`. The direct owner Monolithic Landscape approval supersedes previous art. Mountain stays on the right, real left-side text remains readable, mobile uses the lower landscape. Existing layout/type/gradient/navigation/buttons/animations preserved; eight before/after geometries and nonhero DOM match. Content hashes revise image URLs for returning browsers. |
| Nav/motion | Earlier approved `Header.astro`, `site.ts`, `global.css` polish: action-labelled circular toggle, accessible panel, focus/scroll containment, Escape/backdrop/anchor/resize closure/return; short landscape scrolls in one column. Readable once-only native cues and reduced motion remain intact. No experimental gradient cadence or layer styling was adopted. |
| About/offers/FAQ | `About.astro`, `Packages.astro`, `FAQ.astro`, typed package/FAQ data: Melaka frontend developer for Malaysian SMEs; specific outputs/suitability, one-time basic/technical/advanced on-site SEO, separately quoted integrations. Payment/rights/support agreed individually, without invented fixed policies or credentials. |
| Projects | `Portfolio.astro`, typed project/study data: four truthful **Concept Project** narratives, preserved authentic screenshots and matching live links. All four demo homepages returned200 in actual Edge; all POSTs were blocked during that read-only check. No real client, reservation/order, sales or ranking result implied. |
| SEO | `BaseLayout.astro`: exact home title **Ismail Studio**, en-MY, truthful canonical/schema/metadata. Five static routes, sitemap/robots and established redirects preserved. |
| Form | Existing primary form, secondary contact@ismailstudio.my, three-step flow, endpoint/field contract/native fallback retained. No personal WhatsApp number, customer content, new backend/analytics/paid enrollment or credential disclosure. |
| Quality/docs |20 added cases with original assertions retained, both checksum validators, fail-closed obsolete generators, pinned source/hosted CI, actual capture/review cycles and scoped release evidence.21 installed skill entries reviewed; no dependency/lock/skill installation or upgrade. |

Protected offers are **starting from RM599 /1page /1revision**, **RM1,299 /up to5 pages /2revisions**, **RM2,999 /up to12pages /2revisions**. H1 is **BUILT FOR BIGGER PROBLEMS.** Delivery estimates are **2/3/7 working days**, Monday-Friday excluding applicable Malaysian public holidays. Scope, materials, initial payment and written start date must be agreed; required materials/payment must be received. Estimates are not guaranteed deadlines. [Owner timing amendment](owner-amendment.md) and [hero amendment](hero-amendment.md) are authoritative. No unrelated section changed in the later hero amendment.

## Current artwork provenance

The supplied 1672×941PNG is preserved byte-identically at `src/assets/hero/monolithic-landscape.png`:2,017,119bytes, SHA-256 `8096e7eb92492c8d630efda52bba969bf898db0dd91f84f342c9847d8810d886`. Encoding/cropping only with existing pinned Sharp 0.35.5 / WebP 1.6.0, effort 6; no generated/retouched pixels or raster headline/UI.

| Public output | Dimensions / bytes | SHA-256 |
|---|---|---|
| `assets/hero-desktop.webp` |1672×941 /107,190, quality 80|`cd0f99118556de7bdf19c3351ecfa2141d9ff38f31a97b885c821c25785dbcc7`|
| `assets/hero-mobile.webp` |768×576 /42,842, quality 75|`8ec34401a392f5038f8489242c1187ee4b69d07db0f83a77e53fcdc04bf1986e`|
| `assets/hero-mobile-large.webp` |960×720 /73,404, quality 80|`f9872ee0144f413379a2a98c8c52e92e17d38553917ca6f03cbee1f2b1b37df5`|

Exactly one responsive image is requested, with density cases verified at1×/1.75×/2×/3×. Desktop uses the full composition, mobile a right-aligned4:3crop. All 37 nonhero public files remain byte-identical to the starting source. [Current provenance](../../evidence/final-polish/monolithic-hero/asset-provenance.json), [density](../../evidence/final-polish/monolithic-hero/responsive-density.json), [comparison](../../evidence/final-polish/monolithic-hero/comparison.json).

All 16 original handoff checksums remain valid. Superseded historical masters retain SHA-256 `1b65fd0024b9011e966b7c90e8babdfee2cc1cba890e871d943aec897141bbd6` and `4b7f7ec88e1c5a4f898addd8fef61c5c25e24ad48fcec72d218a01e22c9a6739`; they are preserved historical evidence, not current runtime assets.

## Verification

- `npm run verify`: handoff validators, Astro check 0 errors/warnings/hints,5 page build,3 redirect unit passes,58/58 browser cases with0 failures/skips/flakes. No lint script configured. [Current local receipt](../../evidence/final-polish/monolithic-hero/local-verify.json).
- Exact-source [CI39981641908](https://github.com/ismailabs/ismailstudio/actions/runs/39981641908) passed 58. [Preview CI39987766181](https://github.com/ismailabs/ismailstudio/actions/runs/39987766181) passed source 58 and hosted 58. [Main CI39988702860](https://github.com/ismailabs/ismailstudio/actions/runs/39988702860) passed 58after its browser installation delay. [Production CI39990069648](https://github.com/ismailabs/ismailstudio/actions/runs/39990069648) passed source 58 and canonical hosted 58. Preview/production artifacts were downloaded and their SHA-256digests independently matched. All complete current suites have0 failures/skips/flakes.
- Hosted coverage includes responsive320–1920, short landscape, reflow/axe/keyboard/focus, dialogs/history, no-JS/image failure, reduced motion, forms with isolated validation/error/timeout/success mocks, SEO/canonicals/schema/links and privacy/CSP. CI and captures send no real enquiries.
- Three original critique/repair cycles are retained. Current immutable preview and production each have50 captured states across 10 sizes, no page errors or hero overflow, all PNG dimensions/source headers matched. Desktop/mobile/wide/menu/offers were inspected. [Visual review](visual-reviews.md), [production matrix](../../evidence/final-polish/monolithic-production-matrix/receipt.json), [desktop](../../evidence/final-polish/monolithic-production-matrix/1440-hero.png), [mobile](../../evidence/final-polish/monolithic-production-matrix/390-hero.png).
- Exact commit-bound website-only package: 50 files including private `_headers`,49 public hashes,5 HTML routes. Immutable preview and canonical production match every public asset, source/header, private404 and all 3 path/query-preserving308redirects. [Package](../../evidence/final-polish/monolithic-hero/commit-bound-package.json), [canonical HTTP](../../evidence/final-polish/monolithic-hero/production-integrity.json). Deterministic archive SHA-256 `0527c415e218d62edc554c200c3e0f36822b9c1877743c6cd875c5d3a00e4a72`, 1,146,673bytes.
- Earlier selected-case timeouts, interrupted Windows hosted duplicate, stale copied JSON detection and CSP-blocked/layer/cadence experiments are retained and excluded from clean current pass counts. No assertion/timeout was weakened, no failed diagnostic relabelled as pass. Independent bounded [current source/package audit](../../evidence/final-polish/monolithic-hero/current-release-audit.md) found no additional material blocker.

## Performance and limits

Pinned Lighthouse 13.5.0 / Edge 155 cold profiles retain every baseline/current run and outlier. The final additional alternating mobile pairs measured baseline median LCP 2.748s / TBT 336.3ms versus current 2.885s / 374.7ms; paired directions are mixed and ranges substantially overlap. Source-S standalone 6 runs measured mobile 2.803s / 528ms and desktop 0.671s / 23.1ms medians. All six source-S automated accessibility/SEO/best-practices categories scored 100. Low-memory and pre-page benchmark distributions differ materially; no statistical equivalence or proven gradient causality is claimed.

Independent review found **no material consistent product regression established**, so no unproven animation change was adopted. Mobile headroom/intermittent loading shifts remain measured limitations, with all raw diagnostics retained. This is lab evidence, not field INP/CWV, certified WCAG conformance, physical-device/assistive-technology testing, Search Console data or rankings evidence. [Full performance review](performance-review.md), [disposition/ranges/conditions](../../evidence/final-polish/monolithic-hero/performance-disposition.json).

## Independent form delivery

Preview marker `ISM-FINAL-POLISH-PREVIEW-20261023105053` received provider 200 / ok:true and browser success, then direct owner exact-marker Zoho confirmation on prior version `b767642c`/source`eef2185`. Its historical context is retained. The current hero version independently matches 10 integration source blobs,2 served scripts, full form HTML and CSP, and passes current hosted isolated form cases. No second preview email was sent. [Equivalence](../../evidence/final-polish/monolithic-hero/form-preview-equivalence.json).

Production marker **`ISM-FINAL-POLISH-PRODUCTION-20261023164949`** received provider 200 / ok:true and browser success at 2026-10-23T16:49:58.210Z, followed by the owner's direct **“Yes, that exact marker arrived in Zoho”** confirmation. [Production receipt](../../evidence/final-polish/form-production-acceptance.json) binds source/version/deployment and records the confirmation. Exactly one real synthetic send per environment; no mailbox access, raw mailbox content or customer data published. Provider acceptance and independent inbox confirmation are recorded separately.

## Cloudflare, publication and rollback

Worker **ismailstudio**, ID`128d5b2374444f61a98b1c666132f208`, exact tested version **`2209bc13-8c8b-41a4-bd6c-1e4e9db054b7`**, deployment **`01e6f5e9-b642-4418-a9e1-e972d7a80adb`**,100% traffic. Deployment time **2026-10-23 16:49:06UTC / 2026-10-24 00:49:06MYT**. [Deployment proof](../../evidence/final-polish/monolithic-hero/production-deployment.json).

Fresh before/after comparisons pass for 17 DNS records including mail/CAA,3 routes, 6 domains, apex deployment/settings,8 other Workers, website bindings/global settings and zero build triggers. Only website version upload and exact percentage promotion occurred. No generic/trigger deploy, DNS/mail/apex/otherWorker/billing/token-scope mutation. [Postproduction protection proof](../../evidence/final-polish/monolithic-hero/infrastructure-production.json).

An initial promotion request was rejected 401on an expired CLI credential; API immediately confirmed unchanged old traffic. The existing official cached session was refreshed and authenticated by GET, protected state rechecked, and the same reviewed request succeeded. The failed request/intent/log is retained; no uncertain mutation was blindly repeated. At promotion, the additional main job was still installing its browser; the two completed exact-source source/hosted runs already met the documented fresh-CI gate. Main subsequently passed as well.

Known-good rollback version **`b46cfec0-8728-4c4d-8031-92d354f10a19`** remains API-readable. Exact100%website-only promotion and rollback payloads passed dry runs. [Rollback procedure](../../evidence/final-polish/monolithic-hero/rollback-ready.json): only for a confirmed website regression, recheck state then remove `--dry-run` from the recorded rollback request. No live rollback drill performed; never change DNS/mail/apex or bypass checks.

Normal Git pushes preserved history; main and feature source refs were independently compared with local/tracking/advertised SHA. Branch resources report unprotected and inherited rulesets empty; administrative protection-detail read is unavailable403, with no bypass attempted. The final closure commit is evidence/docs only and receives its own scoped path/secret-pattern review and cached-diff check. Custom scan is not Gitleaks. Raw credentials, signed artifact URLs and synthetic send intent guards remain ignored/private.

**Owner next action: none required for this release.** No mandatory issue remains. The isolated worktree is retained for review and private no-repeat guards; the owner's original checkout remains untouched.
