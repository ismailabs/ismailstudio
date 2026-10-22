# Motion.dev / floating navigation / visual restraint

Official documentation verified on 2026-10-22:
- https://motion.dev/docs — JS platform docs
- https://motion.dev/docs/inview — inView is IntersectionObserver-based
- https://motion.dev/docs/scroll — scroll-linked animations with ScrollTimeline where supported

## Motion use (later implementation)

Use the **JavaScript** build of Motion with Astro's existing lightweight client JS; do **not** introduce React solely for animation. Check actual current package API before import. Only add dependency after provenance and bundle impact review.

### Priority interactions

1. **Navigation:** header lives in normal layout on first load, morphs into a compact, translucent floating pill after user scroll. Animate transform, opacity, dimensions when feasible; avoid layout jump and lost focus. Remain reachable on keyboard. Detect active section where it helps orientation. Avoid hiding menu during user attempts to click it.
2. **Hero:** gentle introductory opacity/translate or a lightweight artistic glint. The major iridescent scene can be pre-rendered with subtle opacity/transform response. No full WebGL scene required; use efficient visual layer(s).
3. **Work cards:** subtle image reveal and hover/focus movement; project screenshot clarity must remain. No needless rotations.
4. **Case-study dialog:** fast, accessible open/close animation with correct focus and scroll restoration.
5. **Process / price CTA:** minimal feedback and optionally in-view reveal; do not cause content flashes or text invisibility in no-JS mode.

### Motion guidelines / targets (proposals)

- Small hover transitions ~150–250ms, menu morph ~250–450ms, modest section reveals ~300–550ms. Values are art direction guidance, not benchmark claims.
- Avoid perpetual ambient movement except extremely slow/contained hero atmosphere, preferably none when user is reading.
- Avoid scroll hijacking, pinned multi-screen storytelling, background video autoplay, high-cost animated blur and unconstrained parallax.
- `prefers-reduced-motion: reduce`: disable transforms/parallax/reveal timing and present the final static state immediately. Functional state changes must still work.
- Avoid animating large layout properties on scroll when transform/opacity suffice; inspect real browser performance and INP/CLS.

### Testing

Validate real scroll-down/up at mobile/desktop, keyboard tab order and focus retention, active anchor offsets, reduced-motion, no-JS fallback navigation, and visual stillness while filling forms. Motion is an enhancement, never a prerequisite for access or submission.
