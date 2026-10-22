# Responsive and interaction-state contract

Desktop and mobile examples appear in the approved images. They are intended as *art direction*, not precise CSS screenshots. Build genuine responsive states and verify real dimensions.

## Desktop 1440 × 900 target

- One visible oversized H1 that anchors the first viewport.
- Artwork is cinematic and impactful, but not over the headline, menu or CTAs; practical clarity comes first.
- Logo at usable size. Initial transparent header morphs into floating nav without changing content position or covering anchor targets.
- Work images should read as real websites, not postage-stamp thumbnails.
- Light sections have text hierarchy, white space and restrained trim; offer price should be effortlessly scannable.

## Mobile 390 × 844 target

- Strong headline readable in 2–4 intentional lines. Allow normal text reflow rather than positioning text over faces/artwork.
- Cinematic art may crop/recompose differently; the key mark remains visible and the CTA remains unobstructed.
- Use functional menu trigger with accessible label; no horizontal overflow, no impossible pointer-only hover requirements.
- Featured concept imagery at full readable card width; overlay concept disclosure visible.
- Offer cards stack cleanly. Do not use a tiny three-column desktop pricing table on mobile.
- Dialogue/panel within viewport with focus trap and Escape close; external link visible; native page path for deep-link/JS-off behavior where available.
- Contact steps preserve values when moving back; labels and validation clear, no forced animation before use.

## Test states/viewport set

- 320, 375/390, 430, 768, 1024, 1440 and 1920px widths.
- Initial hero, scroll-morphed nav, open mobile menu, selected work/hover/focus, four case studies, price CTA prefill, FAQ expanded, form step 1/2/3, invalid input, network error and success (mocked unless provider permission to send), no-JS and reduced-motion.
- Zoom/reflow checks 200%/400% equivalent where practical, forced-colors and touch interaction.

## Nonnegotiable adaptation

No element may require a precise fixed text length or image crop to avoid breaking. Hard-coded desktop placement copied from a raster image is prohibited. Do not keep a mobile background repeating vertically (an issue seen in earlier rejected prototype). Preserve a natural document flow.
