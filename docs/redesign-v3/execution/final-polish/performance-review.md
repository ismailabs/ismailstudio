# Current measured performance

The final approved Monolithic Landscape uses the same pinned toolchain as the starting runtime. Twelve alternating cold baseline/candidate Lighthouse runs are retained in lighthouse-monolithic-controlled.json. A bounded mobile layer experiment is retained in lighthouse-monolithic-mobile-frame.json. It preserved the visible composition but did not materially improve LCP. Final density-aware exports and the image layer were measured in six fresh cold runs, three mobile and three desktop, in lighthouse-monolithic-responsive-final.json. Each final run records the actual served HTML hash; all match the final build. No concurrent local browser suite ran during measurement.

| Lab median | Starting runtime | Final responsive hero |
|---|---:|---:|
| Mobile LCP |2.567s|2.359s|
| Mobile TBT |342.0ms|375.5ms|
| Mobile CLS |0.0147|0.0112|
| Desktop LCP |0.651s|0.645s|
| Desktop TBT |27.50ms|27.56ms|

The first landscape candidate had mobile LCP2.738s. LCP attribution changed from baseline headline text to the semantic decorative image. A smaller768w mobile variant reduced its payload from73,404to42,842bytes;960w remains available to denser screens. Desktop is107,190bytes. Actual requests select exactly one image; the same approved crop/composition is preserved. No client JavaScript or dependency was added.

Final mobile LCP range2.308–2.995s, TBT292.1–909.5ms. The initial frame experiment's4.257s/938.7ms outlier is retained. Final desktop LCP0.639–0.652s, TBT12.73–31.13ms. Final mobile CLS ranges0–0.17497; the starting baseline also recorded the same0.17497 maximum. The final median improves; the outlier remains an explicit loading-layout limitation rather than being omitted. The raw layout-shift audit is retained for diagnosis.

Assessment: final loading median improves, desktop remains stable, and no material regression is established. Mobile TBT median is33.5ms higher with broad overlapping ranges and unchanged JavaScript; low-end interactivity headroom remains a limitation. Final automated accessibility/SEO/best-practices categories score100 in all six runs; mobile performance scores80/91/70 and all desktop scores100 are reported without replacing them with a preferred run. This is lab evidence, not field INP/CWV, WCAG certification or ranking evidence. Physical hardware/assistive technology and Search Console remain unmeasured. Exact statistics/settings/raw pointers are in monolithic-hero/performance-summary.json. Earlier V3/first-polish records remain historical.
