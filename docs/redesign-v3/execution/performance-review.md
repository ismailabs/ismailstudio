# Performance evidence and limits

Runtime source: implementation `f996be0`, followed by deferred motion in `6393bf7`. The V2 baseline was rebuilt from observed `65d2f51` source into ignored local storage, using the same installed Astro/font toolchain. Both were served by the repository HTTP preview with production headers on ports 4322 and 4321 respectively.

Final comparison: Lighthouse 13.5.0, installed Edge/Chromium, fresh profile and unique port for each cold navigation; default simulated mobile and official desktop presets. Three runs per device per version, in sequence. Effective network/CPU/viewport settings and timestamps are retained in `evidence/lighthouse-{v2,v3}-clean-profile.json`. These are lab measurements, not CrUX p75 or field INP.

| Metric | V2 mobile median (range) | V3 mobile median (range) | V2 desktop median | V3 desktop median |
|---|---|---|---|---|
| LCP | 2.519s (1.752–2.589) | 2.510s (2.496–4.443) | 0.544s | 0.718s |
| CLS | 0 (0–0.0455) | 0.0147 (0–0.0147) | 0 | 0.00248 |
| TBT | 151.5ms (41–230.5) | 434.5ms (249.3–579.5) | 32ms | 23.9ms |

Accessibility, SEO and Best Practices scored 100 in every final lab run. This is automated coverage, not accessibility certification, search outcomes or a complete security assessment. Mobile LCP is near the 2.5s good-experience target, with a slow outlier; mobile TBT shows limited headroom on this host. No claim of a field Core Web Vitals pass or improved real-user speed is made.

## Concrete changes and costs

- Optional Motion Mini now loads only when navigation changes to its floating state. The initial JS entry fell from 16,083 bytes / 6,185 gzip to 9,777 bytes / 3,906 gzip. Its later chunk is 12,026 bytes / 4,852 gzip. All scripts are local; React and React DOM are absent. The total transferred after interaction is disclosed rather than hidden behind the initial-byte reduction.
- The hero uses the approved study, with separate 131,966-byte desktop and 76,302-byte mobile WebP assets. Useful text is real HTML, visible immediately. No video/WebGL runtime or ongoing hero animation is required.
- Self-hosted Geist font is 29,400 bytes. CSS is 30,804 bytes / 7,787 gzip, close to the baseline 30,513 bytes / 7,806 gzip. Four unchanged responsive project image families remain lazy-loaded with explicit dimensions.
- The final mobile trace attributes most startup work to style/layout, with only the primary JS entry requested. Measured script parse/compile was small; the later motion chunk was absent from initial load. Further mobile profiling should focus on layout and actual production traffic, not assume a larger JS download was the only cause.

## Harness repair and uncertainty

Earlier reports (`v3-final`, `v2-isolated`, `v3-stable`, `v3-deferred`) are retained as diagnostic history. Some runs overlapped, encountered Edge connection/launch errors, or ran with 69–600 MB free RAM. Edge's relaunch behavior left temporary audit processes alive after the launcher's cleanup. Project-owned processes were checked for this project's localhost pages and closed; a pre-existing Lighthouse browser from before this task was preserved. The runner now sends Browser.close on its owned CDP connection before launcher cleanup, and process inventory confirmed the accumulation stopped.

The host reports approximately 3.75 GiB visible memory. Even the repaired sequence had roughly 382–611 MB free before V3 runs, so the ranges matter. No score or outlier was discarded to manufacture a pass. Current delivery gates require measured costs and comparison; those are supplied here. The remaining lab headroom is explicitly recorded. Physical-device checks, field traffic, CrUX and recipient mail delivery are separate evidence boundaries.
