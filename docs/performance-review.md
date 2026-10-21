# Performance lab evidence — 2026-10-21

Local static production build at `http://127.0.0.1:4321/`, with production security headers. Lighthouse 13.5.0 and installed Edge 155, Windows host with approximately 3.8 GB RAM. Each result below is the median of three cold-cache navigations; ranges are retained. Reports and complete settings are in `docs/evidence/lighthouse-before.json` and `lighthouse-final.json`; raw JSON stays in `.local/lighthouse/`.

| Signal | Before | Final |
|---|---|---|
| Mobile LCP | 2.119 s (1.832–2.157) | 1.763 s (1.750–1.987) |
| Mobile CLS | 0 (0–0) | 0 (0–0.000111) |
| Mobile TBT | 1,115.5 ms (340.5–1,772) | 586.5 ms (39–645.5) |
| Desktop LCP | 0.407 s (0.390–0.431) | 0.375 s (0.363–0.445) |
| Desktop CLS | 0.000184 (0–0.000184) | 0 (0–0) |
| Desktop TBT | 0 ms (0–49) | 33.4 ms (17.1–52.5) |

Final performance scores: mobile median 83, range 82–98; desktop 100 in all three runs. Accessibility, best practices and SEO scored 100 in the six final runs. These are synthetic scores, not a claim of complete accessibility compliance or real-user Core Web Vitals. Before runs also scored 100 for accessibility while exposing an unscored label-in-name issue; the issue was fixed and WCAG 2.1 A coverage added rather than relying on the score.

Mobile conditions: 412×823, DPR 1.75, simulated 150 ms RTT / 1,638.4 Kbps and 4× CPU slowdown. Desktop: 1350×940, DPR 1, Lighthouse desktop preset. No authentication, analytics, experiment or consent overlay. Browser storage/cache reset is enabled by Lighthouse. CLI runs are sequential, with no parallel browser suite.

## Measured fixes and limits

- Restricted Tailwind class discovery to application source: CSS fell from 50,456 to 26,720 bytes. Official [source detection documentation](https://tailwindcss.com/docs/detecting-classes-in-source-files/) supports this configuration. Skill/documentation examples no longer generate site utilities.
- Added correctly sized genuine project derivatives and accurate source/img sizes. The final mobile trace downloads four 640px images, around 148 KB combined including response overhead; the original trace downloaded four 1200px images, around 363 KB. Lighthouse still suggests more image savings; current quality retains readable real project detail.
- Production executable inline JavaScript is approximately 3.8 KB before compression; no hydration framework or animation library. Font is self-hosted, preloaded, 29.4 KB. All image dimensions are explicit. Content remains visible without JS.
- Baseline trace work was dominated by layout/rendering and unattributed tasks, not a large JavaScript bundle. TBT varies substantially on this low-memory host. It remains a lab concern, with the range reported rather than selecting the best run. LCP and CLS remain within the stated lab targets across all three final runs. Desktop TBT differences are too small and noisy here to establish a meaningful code regression.
- No CrUX or first-party RUM data is available for the new site. INP and p75 field targets are unverified. Hosting and real devices can behave differently; public smoke/browser evidence is recorded separately.

The initial programmatic CDP launch was unreliable on this Windows installation. The working helper now runs the pinned Lighthouse CLI against installed Edge, preserves all six reports and records settings/host memory. Repeat with `node scripts/audit-performance.mjs` while the production preview is running. This is a lab audit, not an ongoing monitor.
