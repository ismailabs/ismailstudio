# Motion engineering — expressive, responsive, accessible

Motion's job is to communicate progression from problem to solution and connect real work to the studio identity. Not an arbitrary animation showcase.

1. **Hero:** layered sign/plane gently reacts to pointer or scroll; large title has an intentional static first paint, optional stagger reveal **after** semantic content is present. Do not block reading while waiting for animation.
2. **Work:** clips/images transition between gallery and case-study overlay through position/scale continuity where feasible. No fake project capture morphing. Animate opacity/transform only; no disruptive layout shifts.
3. **Navigation:** responsive disclosure/overlay uses brief coherent transition; links work without animation and obey Escape/focus.
4. **Process:** as user scrolls, highlight current stage; no arbitrary forced-snap/pinning or overly long animation timeline. The full explanation remains legible on its own.
5. **Pricing:** subtle row/marker response on hover/focus; no misleading recommendation labels, no unavoidable carousel.
6. **Contact:** step transition provides continuity and clear focus placement/announcements, preserving field values.

## Technical guidance

Start with Astro + CSS transforms/opacity, carefully scoped JS and IntersectionObserver; add animation library only when it demonstrably improves quality without loading/perf regression. No compulsory continuous WebGL render loop, unlicensed commercial asset, or decorative 3D model that costs most of the page budget. Pointer-follow effects must have device-appropriate gating. Do not use `will-change` on dozens of idle elements. Respect `prefers-reduced-motion: reduce` by omitting parallax, scrub, stagger and large transforms; keep all content available. Do not introduce large layout shifts during type/font loading.

## Checkable QA

- First content paint works with JS disabled.
- Hero heading and CTA readable throughout animation.
- No motion-induced scrolling lock, trap, horizontal movement or vestibular-heavy effects.
- Reduced-motion is actually tested, not just CSS declaration.
- No permanent `opacity:0` if observer fails.
- Smooth hover on capable pointer; touch keyboard states are equivalent.
- Buttons are real controls and all visible affordances perform real actions.
