# Visual design, approved image assets and motion

## Approved images — exact files in this package

| Asset | Pixels | Approval | Usage |
|---|---:|---|---|
| `assets/hero-desktop-approved-original.png` | 1672 × 941 | Owner approved hybrid **01 + 06** on 23 Oct 2026 | Master desktop atmospheric workspace with KL sunset skyline; unmodified original |
| `assets/hero-mobile-option-A-background.png` | 750 × 1500 | Owner approved **mobile option A** on 23 Oct 2026 | Text-free portrait composition, dark negative space above desk/skyline; approved mobile background |
| `assets/mobile-option-A-approval-preview.png` | 390 × 780 | Owner approved option A UI context | Raster reference showing approximate mobile hero balance; not the production DOM |

Check `manifest.sha256` before any transformation. **Do not** substitute `a_cinematic_...` files, which contain AI-generated UI text/buttons and are not approved production artwork. The original desktop art itself has incidental simulated interface pixels *inside a depicted monitor*—treat that as illustrative scenery, not authentic project documentation or a real screenshot. The true four Concept Project previews come from existing `public/assets/projects/` and remain authentic/unmodified.

## Desktop integration

- Preserve hero section composition, real HTML heading `BUILT FOR / BIGGER / PROBLEMS.`, current wordmark/navigation and two real CTA links. New background art primarily anchors **right**; protect uncluttered **left** with readable dark area/scrim.
- Use `<picture>` with source sizes appropriate to the actual layout; encode optimized WebP or AVIF from approved originals (no aesthetic redraw, text overlay or color retouch not authorized). Keep source originals only in this handoff and optimized deploy assets in `public/assets/`.
- Existing `src/components/Hero.astro` expects `/assets/hero-desktop.webp` and `/assets/hero-mobile.webp`; new filenames can be used if imports, tests, hashes and fallback are updated coherently. Never run `scripts/prepare-v3-assets.mjs` against the old atmospheric study after new assets are installed: it would overwrite them. Review any workflow that generates hero and brand assets; ensure code/doc tests can't silently recreate obsolete assets.
- Preserve meaningful text in HTML, accessible contrast over every viewport, CTA reachability and top-of-page load priority. The image is decorative; use empty alt with appropriate non-announcing structure rather than misleading alt text about a real office/client.
- Do not use scroll hijacking, a cinematic video layer, WebGL or excessive image layers; these are not required by the approved artwork.

## Mobile integration — Option A

- The approved background already contains a large deep-navy/black upper band, with workspace and KL skyline occupying the bottom section. Preserve that layout; it gives the real heading/CTAs room to breathe.
- User-approved illustrative preview is a 390 × 780 reference. Implement semantic nav/logo/H1/supporting copy/form CTA as **live HTML**; never embed/copy the raster screenshot as production UI.
- The final site needs to adapt safely to 320px width, 360/390/430px portrait, short landscape, 200% zoom and variable text lengths. Do not center-crop the entire image so aggressively that the monitor and skyline vanish; use appropriate object-position and/or image aspect fitting with intentional CSS background color. Avoid the dark-to-light transition coming too late or hiding CTA.
- Use a dark overlay where necessary for legibility without losing the approved cinematic scene. For reduced-data connections and images disabled, meaningful content must remain visible.
- Desktop original and mobile option A should be stable visual anchors for 3 rounds of screenshot critique; do not select B or generate alternatives.

## Typography, rhythm, geometry, visual credibility

- Preserve large H1, accessible legibility and visible custom logo. Restrained cinematic dark hero followed by predominantly **light** minimal sections, spacious work imagery, clean offers/FAQ/contact and occasional dark bands only where already appropriate.
- Use existing self-hosted Geist font unless an objectively justified change is approved; don't add remote fonts.
- Highlight palette: `#B19EFF` lavender, `#82ACFF` blue, `#FF73E2` pink. Most gradient words STATIC. Animate a **selected hero accent** slowly horizontally via `background-position` or restrained transform, with reduced-motion override. Hover accents may move locally. Do not apply continuous animated gradients to every heading.
- Continue recognizable 12–20px rounded corners on panels/controls where V3 uses them; keep pills for CTA and floating nav. Avoid template-style icons, arbitrary glowing glass cards, repeating UI grid filler or full dark pages.

## Navigation behavior acceptance

- On desktop, keep real visible Work, Offers, Approach, About, Contact navigation with focused states and the existing floating pill on scroll.
- On narrow viewports, replace the `Menu +` visual with a round **three horizontal lines** toggle. Accessible name describes action ('Open menu' / 'Close menu'), `aria-expanded`, `aria-controls` accurately reflect state.
- Opening reveals a **near-full-screen** animated layer with clear large link targets, focus order, Escape/close-button/backdrop close, focused trigger restoration, scrolling lock as appropriate, safe resizing into desktop state and safe scroll-to-anchor offsets. If functioning as a modal, manage background inertness and focus appropriately. No keyboard or screen-reader traps.
- With JS disabled, navigation remains usable (e.g. visible in a natural fallback). Reduced-motion users see immediate state changes rather than forced movement. No loss of existing dialog/query/history logic.

## Scroll effects and Motion integration

- Reveal major section headings once on viewport entry, supporting paragraphs with short low-amplitude transitions, project media with modest reveal. Keep text visible with JS off, load errors and `prefers-reduced-motion: reduce`.
- Use the existing `motion` dependency thoughtfully; verify cost of added JS, style/layout work and LCP before choosing library-based versus CSS/IntersectionObserver effects. Do not add React.
- No scroll-synced parallax over content that increases dizziness or harms reading; no animation required to access a CTA; avoid re-triggering every time users scroll back.
- Make tests assert initial visibility, reveal state progression, reduced-motion behavior and no new accessibility violations.

## Verification images

Capture actual rendered (not mock) views at desktop 1440×900 / 1920×1080, tablet 768 and 1024, mobile 320 / 390 / 430, landscape and relevant menu/form/project states. Compare visual silhouette, headline density, image focal point, light/dark rhythm, spacing, wordmark scale and work media. Log three focused observe/repair/recapture cycles; avoid claiming visual review without actual screenshots.
