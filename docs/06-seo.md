# SEO and discoverability implementation specification

## Search positioning
Geography: **Malaysia nationwide**, not a fabricated physical local office. Main intent: professional website design for Malaysian small businesses; related searches: small business website Malaysia, affordable business website, freelance web developer Malaysia, website packages Malaysia, responsive website development. Keywords are **hypotheses**, not verified search-volume claims. Research with publicly available Google SERPs/official references; do not guess monthly volumes or use keyword stuffing. The approved single page can target a limited thematic cluster; don't fabricate doorway city pages.

## Technical gates
- Canonical site `https://www.ismailstudio.my/` (trailing slash consistently), every variant (`http`, `https` apex, `http www`) reliably redirects to correct HTTPS canonical. Don't touch existing subdomains and MX records.
- Rendered HTML contains unique title, compelling description, meta robots index/follow unless preview intentionally noindex, canonical, Open Graph/Twitter metadata, OG image real and optimized, correct lang=en-MY or en as appropriate, favicon.
- Single H1; semantic section headings; usable anchor navigation; accessible meaningful text, no JS-required core content.
- Astro sitemap consistent with deployed canonical host, `robots.txt` references sitemap and does not inadvertently block assets or Google indexing. Do not publish private staging pages in sitemap.
- JSON-LD for `Person` or `WebSite`/`ProfessionalService` only if fields meet official eligibility/truthfulness; omit physical address, registration, ratings or fabricated reviews. Structured-data tests are not ranking guarantees.
- Project links descriptive, real, no generated `utm_source=chatgpt.com`; allow search crawlers to access relevant text.
- Image size, responsive derivatives, alt quality (decorative artwork alt=""), performance and mobile experience; reduced-motion support.
- Test redirects, status codes, TLS, canonical, OG previews, robots and sitemap **after actual deployment**. Record exact commands/results.

## Measurement/operations
Propose Google Search Console verification after deployment, sitemap submit, indexing inspection and coverage monitoring. DNS or account-based verification requires appropriate authorized access; no guessed credentials. Domain property verification may require adding a TXT DNS record—non-destructive, preserving Zoho. Analytics setup with realistic data-collection behavior; public privacy notice should reflect actual configuration. Rankings and p75 Core Web Vitals require time and traffic; do not claim instant outcomes.

## Google guidance
Keep wording people-first, honest and valuable. Search appearances, click-through-rate and actual enquiries require monitoring after launch, never a percentage uplift claim derived from visual polish alone.
