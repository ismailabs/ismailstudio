# Actual-browser visual review — evidence over self-assurance

Reference authority: four original V3 approved images (`approved-v3-specs/assets/approved-mockups/`), the source-issued 19 images (`approved-image-only-pack/`) and the two contextual images. Resized screenshots in `frames/` are NOT independently responsive. Do not evaluate designs by automatically pixel-diffing incompatible aspect ratios or treating AI-generated text as factual.

## Screenshot matrix

- Desktop: 1440×900, 1920×1080, 1280×800; separate viewport capture and full-page capture.
- Tablet: 1024×768, 834×1112, 768×1024; portrait and landscape navigation states.
- Mobile: 430×932, 390×844, 375×812, 320×700; cover both initial hero, scrolling, menu, project dialog, offers, contact flow, error and confirmation states.
- All breakpoints: 200% zoom/400% narrow reflow when feasible; keyboard focus; reduced-motion; no JS; light-dark section transition; working form states.

Every critique cycle shall collect actual browser screenshot paths and: timestamp, commit SHA, CSS viewport/device scale, network/backend, screenshot before, target, discrepancy, root cause, code change, after, remaining deviation. Preserve source photos/screenshots as their actual repository originals.

### Cycle 1 — Major silhouette

Evaluate dark hero to predominantly light body balance, dominant 3-line H1, hero art visibility/readability, logo large enough to recognize, white/black wordmark contrast. If missing, repair composition before any microanimation or card polish.

### Cycle 2 — Responsive and business hierarchy

Evaluate authentic oversized project previews, stable floating pill navigation, visible package and starting-price differentiation, accurate SEO detail, market comparison without invented claim, mobile readability, no sideways scrolling, reasonable content length.

### Cycle 3 — Polish and behavior

Check radius consistency, headings/line lengths, symbol legibility 16–128 px, meaningful Lucide icons, form states/labels, motion easing/reduced mode, CLS, a11y, interaction and cross-browser issues. Record every conflict with generated image and justified deviation.

## Visual acceptance gates

Do not approve by saying 'looks premium' or passing Lighthouse. Create comparison contact sheets and write at least 10 specific observations overall. Fatal rejection conditions: entire site dark, orange brand accents, tiny body text, old [IS] logo/cube, random iridescent blobs on every section, project images replaced by generated lookalikes, fake client proof, wrong package facts, sticky/nav disappearance or form broken, whole reference screenshots pasted as site's background including text.
