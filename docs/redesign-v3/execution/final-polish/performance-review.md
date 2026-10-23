# Current measured performance

Final source a21e78718f216d9c700e56fb940035bf91a83eb4 was measured in six fresh cold profiles, three mobile and three desktop, with pinned Lighthouse 13.5.0 and Edge 155. No concurrent local browser suite ran. Every final response HTML hash matches the release build. Initial twelve alternating baseline/candidate runs and all frame/density diagnostics remain available, including outliers. Final six runs: lighthouse-monolithic-release-final.json.

| Lab metric | Starting median | Final median | Starting range | Final range |
|---|---:|---:|---:|---:|
| mobile largest-contentful-paint | 2567.3010 | 2803.2650 | 2514.9650 to 2599.3980 | 2801.9640 to 3353.3240 |
| mobile total-blocking-time | 342.0000 | 528.0000 | 20.0000 to 607.0995 | 252.5000 to 652.0000 |
| mobile cumulative-layout-shift | 0.0147 | 0.0000 | 0.0147 to 0.1750 | 0.0000 to 0.1750 |
| desktop largest-contentful-paint | 651.0070 | 670.9024 | 639.7250 to 656.9620 | 656.3320 to 692.7780 |
| desktop total-blocking-time | 27.5035 | 23.1390 | 24.8625 to 33.4810 | 0.0000 to 130.7988 |
| desktop cumulative-layout-shift | 0.0025 | 0.0000 | 0.0025 to 0.0025 | 0.0000 to 0.0704 |

LCP/TBT are milliseconds; CLS is unitless. Mobile image payload is 42,842 bytes at regular density or 73,404 bytes at higher density; desktop is 107,190 bytes. Actual browser requests confirm exactly one responsive image. Content-derived query revisions ensure returning browsers fetch the approved image. No client JavaScript or dependency was added.

All six final runs score 100 for automated accessibility, SEO and best practices. Performance scores by run: [{"formFactor": "mobile", "run": 1, "performance": 87}, {"formFactor": "mobile", "run": 2, "performance": 70}, {"formFactor": "mobile", "run": 3, "performance": 69}, {"formFactor": "desktop", "run": 1, "performance": 94}, {"formFactor": "desktop", "run": 2, "performance": 94}, {"formFactor": "desktop", "run": 3, "performance": 97}].

Measured low-end mobile headroom and intermittent loading shifts remain limitations. Initial baseline also recorded CLS 0.1749696; all outliers are retained, and their cause is not asserted. These results are not field INP/CWV, certified WCAG conformance, physical-device results or rankings evidence. Exact settings and statistics are in monolithic-hero/performance-summary.json.

## Constrained-host disposition

No material consistent product regression established. Alternating paired median increases are137.5ms LCP/38.4ms TBT, mixed directions and broad overlapping ranges. Candidate pre-page host benchmark throughput is consistently lower; this is a constrained comparison, not statistical equivalence. Independent review found no concrete defect requiring animation changes or additional remote measurement. Proceed with remaining gates; preserve all outliers and low-memory limits.

Three additional alternating baseline/current mobile pairs use the exact final HTML.

| Metric | Baseline median (range) | Current median (range) |
|---|---:|---:|
| largest-contentful-paint | 2747.8840 (2732.1485 to 3193.8712) | 2885.4175 (2720.4814 to 3948.9260) |
| total-blocking-time | 336.3243 (277.5580 to 998.0000) | 374.7330 (266.0000 to 613.5000) |
| cumulative-layout-shift | 0.0000 (0.0000 to 0.0147) | 0.0000 (0.0000 to 0.0000) |

Memory and pre-page benchmark distributions differ and are fully recorded. No claim of matched hardware load, statistical equivalence or proven gradient causality is made. Installed Lighthouse obtains its benchmark on about:blank before target navigation. The CSP-blocked inline experiment is invalid optimization evidence; the stylesheet layer showed no gain; the cadence experiment was not adopted. All raw diagnostic results remain available. All production source/styles/animations remain exactly the CI-tested a21e787 snapshot.
