# Required original visual assets, logo, identity and scroll typography

## Assets provided in this archive
All original design assets were authored as editable SVG and also rendered to PNG with the same visual composition. `assets/brand-identity.svg` (monogram + wordmark), `assets/mark.svg` (favicon core), `assets/hero-editorial.svg`, `assets/offers-editorial.svg`, `assets/contact-editorial.svg`, `assets/social-cover.svg`; raster equivalents in `assets/png/`. Visuals are **art direction reference and usable original assets**, not a substitute for actual website coding and iterative browser critique. Codex should improve implementation while preserving the signature visual concept. The SVGs are safe plain vector markup; review files before adding to public site.

## Brand strategy
Signature monogram combines an open **I** with architectural angular stroke, referencing a framing window/page section. Voice: confident, warm, capable, independent; no fake award graphic, agency seal, geographic badge or imitated trademark. Mark must render sharply at 16/32/64/180/512 px. Build valid `favicon.svg`, `.ico`, touch icon, OG asset from mark/cover, correct colors and tests. Check legibility and distinguishability at small sizes; refine if it reads as a generic lettermark. Do not claim trademark registration.

## Hero artwork
`hero-editorial.svg`: editorial page-window study with quiet olive + coral; responsive placement. This is abstract design art and may be shown as such. Primary H1 must remain HTML and not be embedded in an image. Text/button overlays must not obscure art at mobile breakpoints. No illegitimate product screenshots.

## Offers motif
`offers-editorial.svg`: three nested structures indicating the 1 / 5 / 12 page scope. This is decorative, not actual pricing text; display real accessible HTML price cards and scope. Meaningful hierarchy > ornament.

## Contact artwork
`contact-editorial.svg`: stylized envelope / route motif; contact form remains ordinary high-contrast real controls, not drawn into graphic. Keep responsive and consider removing illustration mobile if it compromises form readability.

## Typographic motion specification
- Set typography in a stable semantic DOM, then progressively reveal by word/line or block on intersection. Animation max 350–650 ms, easing cubic-bezier(.2,.8,.2,1), stagger up to 35 ms where appropriate; no word-by-word screenreader fragments or unsupported splitting around inline links.
- Use lightweight CSS keyframes + IntersectionObserver if JS available. `prefers-reduced-motion:reduce` must disable translation, blur and delayed stagger. Initial content is visible by default; JavaScript may add motion-ready class only once observer is attached. Never cause layout shifts or hide content from crawlers.
- Animate hero heading and selected editorial section headers, not every sentence; preserve scroll controls. Avoid full-scroll hijacking, perpetual parallax and text clipping.
- Test keyboard focus movement, resizing during animation and screenshot stability. No GSAP dependency unless alternatives measurably fail. Interaction is for refined comprehension, not spectacle.

## Authentic project images
Capture screenshots using Playwright at representative desktop widths and validate actual live domain appearance and ownership. Avoid collecting unnecessary personalized banners or logged-in views. Do not construct fictitious site screenshots with generative tools. Use clear cropping/optimized WebP/AVIF, width/height, alt and links. If site inaccessible, fallback to factual text card with no false screenshot claim; report blocker. Cover image licenses and ownership; no random unlicensed stock.

## Further optional generation prompts (for future asset pipelines, no external generation required)
1. Hero: 'original abstract editorial composition for Malaysian independent web designer; modular paper/page geometries, warm ivory #F6F5F1, ink #1B1C1B, deep green #24463C, vermilion #C64E39; refined print-art studio look, restrained lines, elegant asymmetry, absolutely no fake UI, no text, no stock photo, no watermark, 4:5.'
2. Pricing: 'three distinctive editorial paper columns expressing simple, growing and broad scope; coherent typography system but no actual pricing text in image; high-end editorial design, warm offwhite, dark forest and vermilion, crisp vector shapes, 3:2.'
3. Contact: 'quiet sculptural paper envelope/connecting path concept; delicate hand-drawn quality with deliberate geometric order, modern boutique web studio aesthetic, no text/people, 5:4.'
4. Mark: 'signature minimal I-shaped architectural window monogram for Ismail Studio; precise geometric silhouette, standout at 16 px, one-color compatible, original brand system, not an existing trademark.'
