# Definition of done — mandatory evidence gates

## Business and content
- [ ] H1 immediately states professional websites for small businesses; mobile reader understands offer in first screen.
- [ ] All 3 exact prices with "From" and exact page counts and revisions; explicit exclusions and no unsupported guarantee.
- [ ] Four correct project links load and truthful "Concept Project" labels; genuine screenshots or clearly explained unavailable fallback.
- [ ] About and FAQ claims validated; no invented client results, testimonials, business registration, office, sales or ratings.
- [ ] Primary CTA contact form + secondary `contact@ismailstudio.my`; personal WhatsApp not exposed in HTML, JS, CSS, assets, repository or analytics.

## Design and accessibility
- [ ] Desktop design looks distinctive, deliberate and aligned to supplied visual references; hero/offer/contact compositions individually reviewed.
- [ ] Actual screenshot review at 360,390,430,768,1024,1440; responsive images and font legibility; no horizontal overflow.
- [ ] Typography motion is tasteful and reduced-motion disables effects; content remains visible with JS disabled.
- [ ] Keyboard support, skip link, focus indicator, field labels and errors; tested with automation plus manual checks.
- [ ] Forms/links have real hit targets; colour contrast checked; decorative art does not harm readability.

## Engineering and SEO
- [ ] Astro static production build succeeds, typed build/typecheck tests pass, no console errors or broken links/images.
- [ ] CSS/assets optimized; performance audits run mobile/desktop with recorded device and measured results; no fictitious field metrics.
- [ ] Title/description/H1/canonical/sitemap/robots/OG/favicon valid, relevant schema passes validator if present.
- [ ] Canonical `https://www.ismailstudio.my/`; apex redirects and existing subdomains untouched.
- [ ] Security/privacy: secrets not committed, no unnecessary PII, correct contact-form privacy notice and spam safeguards.

## Form gate (CRITICAL)
- [ ] Managed provider account legitimately configured; current eligibility and costs understood.
- [ ] Live form valid/invalid submission, loading, success and failure tested; errors accessible.
- [ ] Actual enquiry successfully reaches `contact@ismailstudio.my` in Zoho via real provider; receipt verified, no invented evidence. If unavailable, state BLOCKED and do not claim complete site.

## Release gate
- [ ] `main`/appropriate deploy commit pushed to `ismailabs/ismailstudio`, SHA recorded, no force-push or deletion.
- [ ] Cloudflare deployment succeeded; `https://www.ismailstudio.my/` loads correct site over HTTPS from independent live request.
- [ ] apex www redirect verified, DNS compatibility and Zoho mail records preserved.
- [ ] Live smoke test all critical sections, redirects, external links, form, sitemap, robots, mobile and OG.
- [ ] Release test and rollback record; no misleading announcement.

**Blocked counts as incomplete.** If an external gate genuinely needs eligible account holder, provider authorization or unavailable integration, continue nonblocked work and report next precise action, not fabricate success. Never bypass age, terms or payment safeguards to satisfy autonomy.
