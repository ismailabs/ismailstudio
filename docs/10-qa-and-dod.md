# Definition of done — mandatory evidence gates

## Business and content
- [x] H1 immediately states professional websites for small businesses; mobile reader understands offer in first screen.
- [x] All 3 exact prices with "From" and exact page counts and revisions; explicit exclusions and no unsupported guarantee.
- [x] Four correct project links load and truthful "Concept Project" labels; genuine screenshots or clearly explained unavailable fallback.
- [x] About and FAQ claims validated; no invented client results, testimonials, business registration, office, sales or ratings.
- [x] Primary CTA contact form + secondary `contact@ismailstudio.my`; personal WhatsApp not exposed in HTML, JS, CSS, assets, repository or analytics.

## Design and accessibility
- [x] Desktop design looks distinctive, deliberate and aligned to supplied visual references; hero/offer/contact compositions individually reviewed.
- [x] Actual screenshot review at 360,390,430,768,1024,1440; responsive images and font legibility; no horizontal overflow.
- [x] Typography motion is tasteful and reduced-motion disables effects; content remains visible with JS disabled.
- [x] Keyboard support, skip link, focus indicator, field labels and errors; tested with automation plus manual checks.
- [x] Forms/links have real hit targets; colour contrast checked; decorative art does not harm readability.

## Engineering and SEO
- [x] Astro static production build succeeds, typed build/typecheck tests pass, no console errors or broken links/images.
- [x] CSS/assets optimized; performance audits run mobile/desktop with recorded device and measured results; no fictitious field metrics.
- [x] Title/description/H1/canonical/sitemap/robots/OG/favicon valid, relevant schema passes validator if present.
- [x] Canonical `https://www.ismailstudio.my/`; apex redirects and existing subdomains untouched.
- [x] Security/privacy: secrets not committed, no unnecessary PII, correct contact-form privacy notice and spam safeguards.

## Form gate (CRITICAL)
- [x] Managed provider account legitimately configured; current eligibility and costs understood.
- [x] Live form valid/invalid submission, loading, success and failure tested; errors accessible.
- [x] Actual enquiry successfully reaches `contact@ismailstudio.my` in Zoho via real provider; receipt verified, no invented evidence. If unavailable, state BLOCKED and do not claim complete site.

## Release gate
- [x] `main`/appropriate deploy commit pushed to `ismailabs/ismailstudio`, SHA recorded, no force-push or deletion.
- [x] Cloudflare deployment succeeded; `https://www.ismailstudio.my/` loads correct site over HTTPS from independent live request.
- [x] apex www redirect verified, DNS compatibility and Zoho mail records preserved.
- [x] Live smoke test all critical sections, redirects, external links, form, sitemap, robots, mobile and OG.
- [x] Release test and rollback record; no misleading announcement.

**Blocked counts as incomplete.** If an external gate genuinely needs eligible account holder, provider authorization or unavailable integration, continue nonblocked work and report next precise action, not fabricate success. Never bypass age, terms or payment safeguards to satisfy autonomy.

Verification completed 2026-10-21. See release-record.md and evidence/. Production browser proof is 16 passes in the full run plus the exact unchanged 390px rerun after a global timeout; all 17 checks verified. External Schema.org Fetch URL: one WebSite, zero errors/warnings. This checklist does not claim physical-device, assistive-technology listening or field-CWV certification; limits are recorded in search-and-operations.md and performance-review.md.
