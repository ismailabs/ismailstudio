# Motion.dev, floating navigation and reduced-motion contract

Use Motion's **vanilla JS** library when it provides a measurable implementation benefit; Astro static and existing vanilla TS remain the framework. Official current docs (2026-10-22) https://motion.dev/docs/quick-start, https://motion.dev/docs/inview, https://motion.dev/docs/scroll, https://motion.dev/docs/animate . Confirm version/API locally before installing `motion` and update lockfile intentionally. No React addition solely for animation. Avoid unrelated paid Motion+ packages.

## Implementation strategy

1. In baseline without JS, top navigation/anchors remain usable and primary content visible. After JS enhancement, establish a **scroll-dependent floated compact pill**. Use stable layout/height to prevent CLS and CSS transform/opacity where feasible, with `position:fixed` or sticky based on measured header behavior. Keep keyboard focus stable and active section visible. Provide `scroll-margin-top` to target sections.
2. Motion `animate()` or `animate` from `motion/mini` as suitable; `inView()` for minimal reveals that do not hide non-JS content; `scroll()` only if progress-linked animation genuinely adds value. Configure reduced motion to immediately show final state, use `matchMedia`, `prefers-reduced-motion` CSS and cleanup/disposal for route/viewport listeners.
3. Hero artwork only: slow subtle glint/opacity/translate or layered parallax with limited amplitude, ideally no constant motion when reading. Don't animate huge blur/backdrop filters, use content-visibility and optimized static fallback.
4. Work links/dialogs/controls: restrained 150–450ms transitions, focus-visible equivalent interaction. Form must not animate away error messages or lose focus during stepping.
5. Test after resizing, zooming, tab navigation, scroll down/up, reduced-motion toggle and on low-powered emulated mobile device. Record actual JS size/performance and rollback animations that materially harm input responsiveness/LCP.

Functional test assertions: nav visible at multiple scroll points, no obstruction, active anchors correct, no layout shift, `Escape` + focus return for menus/dialogs, reduced-motion returns final state, no-JS submission still possible. Static mockup does not test these. Code snippets are not imported unreviewed from third-party sites.
