# Outstanding issues and measured limits

No open severity-1/2 design or implementation defect was identified in the inspected final local and hosted preview states.

| Item | Impact / disposition |
|---|---|
| Mobile lab performance headroom | Median LCP 2.510s with a 4.443s outlier; median TBT 434.5ms on the constrained host. Measured against V2 and disclosed in `performance-review.md`. The handoff requires measurement and comparison rather than a manufactured score. Further real-device/field profiling is a maintenance opportunity; no field pass is claimed. |
| Native-device/assistive-technology coverage | Edge/Chromium viewport, touch-mode, keyboard, forced-colors, no-JS and reduced-motion samples passed. Physical iOS/Android and screen-reader hardware were not available. WCAG 2.2 AA remains the target, not certification. |
| Initial hosted connection reset — resolved | First preview suite passed 37 tests and encountered one navigation reset before application assertions. The unchanged full rerun passed all 38 with zero skips; both receipts are retained. |
| Canonical browser harness timeout — resolved | The production full run passed 37 cases; axe's secondary-page creation in the 1920px case hit the normal 60s test limit. Trace retained privately. That unchanged case passed alone in 17.7s; no timeout increase, skipped assertion or source change. Aggregate evidence covers all 38 cases, rather than claiming one clean production run. |
| Initial canonical asset 404 — resolved | Immediately after version promotion one asset returned 404. The exact same URL then returned 200 with correct bytes/source; all 48 published assets subsequently hash-matched. No version, cache or infrastructure adjustment was made. Rollout propagation is a plausible inference, not an established provider diagnosis. |
| Release gates | Canonical HTTP/assets, all browser cases, provider acceptance, independent owner Zoho receipt, rollback preparation and protected-infrastructure comparison are complete. No mandatory release blocker remains. Publication details are recorded in `release-record.md`. |

The user's pre-existing documentation deletions and local skill/lock changes remain outside this release's staged changes. No missing receipt may be replaced with an assumption.
