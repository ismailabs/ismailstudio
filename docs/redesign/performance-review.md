# V2 measured performance

2026-10-22 Malaysia time; pinned Lighthouse 13.5.0, Edge 155 on Windows (~3.8GB RAM). Three sequential cold-cache mobile and three desktop runs per phase. Raw reports are private in `.local/lighthouse/`; complete settings and metrics are in `../evidence/lighthouse-v2-baseline.json` and `../evidence/lighthouse-v2-final.json`.

| Signal | Fresh V1 public baseline, median (range) | V2 production-build local preview, median (range) |
| --- | --- | --- |
| Mobile LCP | 2.079s (1.581–2.128) | 2.143s (1.814–2.447) |
| Mobile CLS | 0 (0–0.000111) | 0 (all runs) |
| Mobile TBT | 50ms (12–2366.5) | 199ms (50.5–214) |
| Desktop LCP | 0.720s (0.535–0.740) | 0.673s (0.459–0.972) |
| Desktop CLS | 0.000183 (all runs) | 0 (all runs) |
| Desktop TBT | 0ms (0–9.5) | 25.5ms (0–49.5) |

V2 performance scores: mobile 94 median (91–99), desktop 99 median (96–100). Accessibility, best practices and SEO are 100 in all six V2 runs. Mobile LCP stays below 2.5s in every sample and CLS is zero. TBT varies on this constrained host; the final range and baseline outlier are retained, not discarded. The baseline used the public V1 URL and the final phase used local static output, so network/origin conditions differ; these samples do not establish a controlled causal improvement or regression. No CrUX/first-party RUM/p75/INP evidence is available. TBT is not INP.

Mobile profile: 412×823, DPR 1.75, simulated 150ms RTT / 1638.4Kbps, 4× CPU slowdown. Desktop uses the pinned Lighthouse desktop preset. Complete conditions and available host memory are retained per run. Baseline runs were collected during early audit; V2 runs were sequential after functional browser work. No analytics, login, consent experiment or third-party runtime script.

Current emitted executable JS: 7,545 bytes before compression; CSS 30,513 bytes; self-hosted Latin variable font 29,400 bytes. No framework hydration, motion dependency, WebGL loop or above-fold bitmap. SVG identity is inline and content is present on first paint. Project images remain genuine responsive WebP derivatives with explicit dimensions and lazy loading. Old unused V1 public artwork is removed; its historical source originals remain in `assets/` for recovery.

Remaining measurement limits: physical-device/AT listening, field p75 and public post-release lab behavior are separate from this local evidence. No Lighthouse score is treated as WCAG certification or a ranking/conversion promise.
