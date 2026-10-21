# V2 verification report

This report separates current evidence from V1 history. Tests isolate Formspree; their simulated acceptance/failure screenshots do not establish real delivery.

| Gate | Current result | Evidence |
| --- | --- | --- |
| Approved package integrity | PASS, 61 files and all 17 mockup frames | validate_package.py run |
| Basic source facts | PASS | check_repo_facts.py run; protected typed-data diff empty |
| Legacy handoff integrity | PASS, 21 required deliverables | npm run verify |
| Astro check | PASS, 51 files, 0 errors/warnings/hints | npm run check via verify |
| Build | PASS, homepage + four static studies | npm run build via verify |
| Apex unit contracts | PASS, 3 | npm run test:redirect via verify |
| Browser full run | 25 PASS; one compound test global timeout | evidence/browser-local-full.json |
| Exact unchanged focused rerun | PASS, 1 in 12.6s test time | evidence/browser-local-focused.json |
| Homepage responsive/axe | PASS at 320/360/390/430/768/1024/1440/1920 | full run; zero sampled axe violations |
| Dialog/focus/history/direct URLs | All four verified, including unchanged focused rerun | v2.spec.ts and both receipts |
| Guided enquiry | PASS steps/back/edit/review, all fields/payload, default and tier selection, pending/double-send, reset/success | isolated browser tests |
| Provider/network/unconfirmed/timeout | PASS; data retained and no false success | isolated browser tests |
| No-JS | PASS, full form + actual isolated native POST, FAQ/menu and study page | browser tests |
| Reduced motion/forced colors/reflow | PASS; landscape/narrow modal controls accessible; pointer/static preference switch tested | browser tests; resilience manifest, private motion traces |
| Visual reviews | Three cycles, 81 primary captures with explicit repairs | visual-reviews.md and round1–3 manifests |
| Project screenshot integrity | PASS, all 16 unchanged | asset-evidence.json |
| Unique metadata/CSP | Main metadata/links PASS; all-page inline hashes and truthful WebPage data implemented | final hosted HTTP/route audit pending |
| Performance | PASS sampled local LCP/CLS targets; 3 mobile + 3 desktop per phase | performance-review.md and ../evidence/lighthouse-v2-*.json |
| Production | Not changed; conditional release pending gates | release-record.md |

No lint script is configured. `npm test` is the exact Playwright command; `npx playwright test` was also run explicitly during repair. The old heading/title/gallery-link assumptions were updated to V2; commercial values, zero-overflow, zero-axe, no-console, provider, no-JS and privacy assertions remain. Added 320px, four dialog/history flows, native POST, guided payload/editing, timeout and landscape controls. No assertion was removed to force a pass.

Known environment limit: this Windows machine has about 4GB physical memory and was observed with only ~28MB free during the slow full run. Retain timeout evidence; do not equate host scheduling delays with a demonstrated production defect or claim a clean single run.

Preview follow-up: combined dialog cases again exhausted their global 30-second budget after earlier assertions passed, and one native integration case reached all assertions but timed out during context cleanup. Split each dialog audit/focus flow from its multi-navigation history/static route flow, and separated native POST from the extra static fallback navigation. Every original assertion remains, with unchanged 5-second expectations and 30-second test budgets. This creates 31 focused cases; no site runtime byte changes. The original preview receipt remains `evidence/browser-preview-combined.json`; focused rerun results follow.

The next host run reached only ~7MB free RAM and timed out in an unchanged 60-second desktop audit. Interrupted it, retained `evidence/browser-preview-constrained-host.json`, and moved final local-plus-hosted verification to the pinned official GitHub Actions workflow. Linux uses Playwright's pinned Chromium; Windows keeps existing Edge. No test assertion or timeout is relaxed. CI has no production access and isolates all enquiry transport. CI results are recorded separately below when complete.

Physical-device testing, screen-reader listening and real-user p75/INP are not verified. Search Console owner actions remain separate. Current synthetic metrics and accessibility samples are not a WCAG certification, field-performance claim or search ranking promise.
