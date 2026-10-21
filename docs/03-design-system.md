# Art direction — premium editorial, conversion-first

## Design principle
A visitor should feel clarity and care immediately. The website must not resemble a generic AI-generated agency template. Combine a strong editorial type system, asymmetrical arrangements, confident negative space, signature monogram/art, tactile borders and a disciplined accent. Retain effortless scanning of offers and contact. The provided SVG/PNG art files are **starter commissioned-for-this-handoff original vector designs** that Codex may refine; NOT fake photographs or live website screenshots.

## Direction
Concept name: **Quiet confidence / visible craft**. Editorial rather than corporate: oversized hero typography, calibrated tracking, subtle typographic animation, fine rules, informative marginal annotations, generous whitespace, tilted but grounded overlapping window shapes, and restrained vermilion accent. Avoid excessive pale gradient blobs, infinite logo marquees, tiny grey copy, arbitrary cards, fake dashboard mockups, neon glow, animated cursor or full-page parallax.

## Tokens (starting point, refine through browser review)
```
--paper:#F6F5F1; --white:#FFFFFF; --ink:#1B1C1B; --muted:#555C59;
--line:#D5D9D2; --accent:#C64E39; --accent-deep:#A93827;
--green:#24463C; --pale-green:#E5ECE6;
--content:1200px; --measure:64ch; --radius:20px;
--font-sans:'Geist', 'Inter', ui-sans-serif, system-ui, sans-serif;
```
Accent must meet WCAG text contrast; use as decorative/solid buttons with verified contrast; don't apply muted labels below AA. Combine font weights strategically. Test on actual Windows/system font rendering. Use Astro font optimization responsibly; self-host permitted fonts with appropriate license.

## Layout and composition
- Header: restrained logomark and wordmark, elegant compact navigation, outlined/solid enquiry button. Mobile: accessible toggle or lightweight direct links, never inaccessible hover-only menu.
- Hero: left text broad with memorable typographic treatment and 2 CTAs; right desktop original editorial graphic from `assets/hero-editorial.svg` (or improved execution) with layered page facets + signature mark. Dynamic aesthetic but legible. On mobile place visual below text/condense it.
- Benefit section: pull-quote and slender metrics-like labels that are clearly descriptors (not invented numbers).
- Work: authentic big screenshot editorial gallery in 2-column responsive composition, with genuinely different image aspect ratios and typographic project details; three relevant businesses have prominence, creative project last.
- Why section: slim numbered value props; not 4 identical gradient icon cards.
- Offers: one designed continuous pricing canvas with three distinct columns and transparent scope; visually emphasize Business as **suggested fit**, not fabricate popularity. Use `assets/offers-editorial.svg` only as supporting motif; prices must be real selectable HTML text.
- Process: numbered rail, simple clear steps.
- About: confident narrow editorial biography, tasteful pullout message, no fake portrait.
- FAQ: accessible HTML `details/summary` or progressively enhanced design.
- Contact: large typographic invitation + tangible art `assets/contact-editorial.svg`, readable form, wide submit button, backup email.

## Mobile
360/390/430 portrait, 768 tablet, 1024 laptop, 1440 desktop, optional 1920. Body min ~16 CSS px; avoid tiny type; ample touch targets; no overflow/clipped headline; pricing fits column stack without horizontal scroll. Ensure full-width mobile CTAs and accessible spacing.

## Quality rubric (1–5, judge from screenshots)
Clarity first viewport; hierarchy; signature originality; screenshot authenticity; price scanability; form comprehension; typographic composition; responsive coherence; contrast/focus/motion; performance. No arbitrary claimed 5/5: annotate screenshots and issues, then fix.
