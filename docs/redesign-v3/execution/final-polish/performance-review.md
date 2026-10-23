# Measured performance and evidence limits

Fresh controlled baseline exports the exact starting runtime b65a208 into an ignored snapshot, with the same locked dependencies and preview server as the candidate. No owner historical file was restored. Pinned Lighthouse13.5.0 used fresh Edge155 profiles/ports, three cold mobile and three cold desktop runs per variant. The first12alternating runs are retained in lighthouse-controlled.json. After the final menu-wrap repair, six fresh candidate navigations are retained in lighthouse-final-polish-final.json; each records the served HTML hash. No concurrent browser suite ran during these measurements.

| Lab median | Starting runtime | Final candidate |
|---|---:|---:|
| Mobile LCP |2.507s|2.327s|
| Mobile TBT |308.5ms|278.6ms|
| Desktop LCP |0.648s|0.621s|
| Desktop TBT |28.8ms|20.3ms|

Final mobile LCP range2.273-2.357s; TBT238.3-1018.9ms. The first alternating candidate mobile run had TBT2196.5ms; it is retained as a noisy diagnostic, not erased. Its long-task/bootup audit showed large page/instrumentation costs, while subsequent equivalent runs and all desktop repetitions were materially lower. Do not call a lab TBT result field INP. Mobile headroom remains a measured limitation rather than a guaranteed score.

Accessibility, SEO and best-practices Lighthouse categories score100 in all final repetitions; that is automated subset evidence, not WCAG certification or ranking proof. Final CLS remains between0and0.0112mobile and around0.0016desktop. See performance-summary.json for exact ranges, settings/evidence pointers and resource measurements. The two hero exports are99,264desktop/45,380mobile bytes, both smaller than the starting images. Brand, project previews, fonts and favicon assets are unchanged. The initial JS remains one small module; Motion Mini is interaction-deferred, and reveals use native transforms with readable text throughout. Only the selected hero word has ambient gradient movement.

Assessment: no significant median loading/interactivity regression established. Field CWV, physical mobile hardware, real traffic and Search Console remain unmeasured. All raw Lighthouse JSON stays private under .local/lighthouse; current summarized receipts contain no customer or mailbox data.
