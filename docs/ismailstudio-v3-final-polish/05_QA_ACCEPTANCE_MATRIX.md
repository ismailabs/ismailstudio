# QA, measurable acceptance and release-stop matrix

Run genuine checks against **the new implementation**, not only historical V3. All QA receipts record UTC timestamp, tested URL, full source SHA, test tool version, viewport/environment, results, explicit exclusions, source evidence path and any failed assertions. Never mark automated results as physical-device certification, real search rankings or real customer conversions.

## Required source checks (run current scripts from repository root)

```powershell
python docs/ismailstudio-v3-final-polish/tools/verify_handoff.py
npm run verify
```

`npm run verify` currently invokes `python tools/validate_handoff.py`, Astro typecheck, build, redirect unit tests and Playwright tests. Historical owner baseline: five generated pages, zero type diagnostics, three redirect unit passes, 38 browser passes. After implementation, **test count must increase or coverage visibly adapt** to changed behavior. Never delete/skip tests merely because they fail. Inspect current `package.json`, `playwright.config.ts` and code at runtime. Do not run `npm run deploy:worker` as a “test”.

## Mandatory responsive and interaction matrix

| Area | Representative viewport/state | Objective pass condition |
|---|---|---|
| Desktop hero | 1440×900 and 1920×1080 | Correct text-free 01+06 source, readable left H1 and CTA, workspace/skyline identifiable on right; no clipped heading or overlapped nav |
| Tablet | 768×1024, 1024×768 | Breakpoint/menu behavior coherent, no horizontal overflow, image still useful, CTA reachable |
| Mobile hero A | 320×700, 360×780, 390×780, 430×932 | Dark top for real text, image lower portion, no raster text/buttons, correct responsive file/asset, suitable contrast and usable CTAs |
| Mobile short landscape | e.g. 667×375, 844×390 | Overlay scrolls to final link, no trapped/offscreen close, no obstruction of key controls |
| Navigation | desktop/top and scrolled, mobile open/close, resize | Links valid, floating pill remains accessible, aria-expanded/controls right, Escape and outside close, focus managed, no-JS fallback |
| Keyboard / screen-reader semantics | keyboard-only full journey | Logical tab order/focus visible, skip link, menu labels, dialog focus return, accessible FAQ/inputs, aria live errors |
| Reduced motion | `prefers-reduced-motion: reduce`, plus no JS | No forced transforms/reveal hiding content, static gradient, equivalent info/actions visible |
| Image failure | blocked/disabled media or slow image network | H1/CTAs/links visible independently of backgrounds, no critical layout shift |
| Four concept cards | gallery, dialogs, each `/work/slug/` | Actual demo images and matching URLs preserved; Concept Project always disclosed; history/dialog/static fallback preserved |
| Packages | three tiers, query CTA | Exact protected From values/pages/revisions; SEO language truthful; add-ons not assumed included; Business not labeled popular; form tier prefilled |
| FAQ | all questions open/close, keyboard | Eleven selected intents addressed, no invented contract/ownership/timeline claim |
| Form | required/invalid/large values, provider rejection/timeout/success mocks, no-JS | No PII leaks, no misleading success, correct field keys and endpoint, one request on intentional submit, fallback accurate |
| SEO | homepage and 4 static study pages | Home title exactly Ismail Studio; descriptions/canonicals/structured data/sitemap/robots/alt text valid; eligible truthful schema only |
| HTTPS and headers | preview + public if released | Established www canonical, existing 308 redirects, CSP/nosniff/privacy and allowed publish files remain correct |
| Release | preview URL → exact version → canonical | Hash-match packaged assets/HTML headers, version/commit identity, protected infra unchanged, known-good rollback available |

## Performance budget and evidence

Measure new hero art and interactions in controlled cold-profile mobile and desktop lab runs. Historical V3 lab report recorded mobile median LCP ~2.51s, mobile TBT ~434.5ms (with noisy/outlier results), and desktop median LCP ~0.718s. These are **historical lab** observations on constrained hardware, not current field CWV; do not claim LCP/INP field compliance from them. Record raw run variations and distinguish TBT from INP. Compare like-for-like repeated runs; unexpected significant regression requires diagnosis and fix or explicit release-blocking disposition. Check LCP image priority, dimensions, image weights, initial JS and browser animation cost. Don't manufacture green Lighthouse scores.

## Accessibility targets

WCAG 2.2 AA is an engineering **target**, not certified conformance. For normal body text use at least 4.5:1 text contrast; for large text 3:1 where WCAG applies; maintain clear focus and minimum functional target sizes (aim comfortably touchable), 200%/400% equivalent reflow, forced colors and motion reduction. Automated axe checks are a subset, not complete screen-reader testing. Esc/Enter/Space, no mouse, modal state, heading landmarks and reduced motion require manual/browser inspection as well.

## Visual evaluation — three cycles

Record for each cycle: baseline screenshots, 3–5 *actual* observations prioritized P0/P1/P2/P3, cause, modified file(s), new screenshots, impacted regression tests and disposition. Review both mobile A and desktop original source. Emphasis: original brand identity; cinematic workspace and Malaysian skyline rather than abstract scene replacement; very large readable headline; dark hero → mostly light body; meaningful work imagery; uncluttered About/FAQ/contact; readable package details; visual consistency. No pixel-perfect tracing of generative display UI in imagery.

## Security, privacy and source integrity

- Scan staged/static publishing files for secrets, private contacts, raw customer submissions, environment files, node_modules, source/docs and unrelated assets. Existing `scripts/package-cloudflare.mjs` publish allowlist can be reused after source check.
- Keep authentication/credentials out of commit and screenshots; redacted protected Cloudflare account/zone/route/DNS/mail diff.
- Preserve original accepted hero assets in this handoff; compare SHA-256. If optimized WebP/AVIF is generated, document source hash, output hash, encoder parameters and dimensions. Do not retouch the approved master.
- Historical project preview hashes and live URLs should be rechecked and preserved. Screenshot assets from unapproved generative concepts are prohibited as actual client/case evidence.
- Assess any new dependencies/scripts from provenance, licensing, maintenance and execution safety before installing. No remote installer one-liners merely because skills.sh says so.

## Form-provider and real-delivery constraints

Automated UI tests always stub the real Formspree endpoint. For a *real* acceptance: inspect existing owner/provider state and private intent receipts; the current project `scripts/v3-form-delivery.mjs` enforces a single synthetic test per environment and writes a pre-send private receipt. Check present status carefully; do not retry upon timeout/uncertain send, and do not send again merely to improve evidence. Independently verify recipient (Zoho) receipt if permitted; provider `HTTP 200/ok:true` is **not** inbox proof. If proper receipt is unavailable, record BLOCKED. Do not access mailbox without authorization or publish mailbox content.

## P0/P1 release blockers

- Production hero uses wrong/unapproved image or rasterized mockup UI; missing/broken headline, links, mobile navigation, form or site at critical viewports.
- Any leaked owner contact/secret/customer data, changed DNS/mail/apex/routes/other Worker, wrong production target or unreviewed billing action.
- Modified/unverifiable core pricing, fabricated project claims, fixed guaranteed schedule, ambiguous unapproved published turnaround durations, fake SEO/client/ownership/payment promises.
- Test failures or hidden/skipped tests, actual significant unresolved accessibility/performance blocker, source mismatch/unknown deployment version, lack of rollback state, wrong domain/redirect/CSP.
- Real form-delivery gate unproven where required by release contract.

A P2 can block if significant to responsive use/trust; an accepted measured limitation must be documented, not hidden. All mandatory production gates must pass; otherwise preview/source delivery is a legitimate *blocked* outcome, not production completion.
