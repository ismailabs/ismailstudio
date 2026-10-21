# Implementation plan — execute sequentially, do not re-plan the objective

The phases, acceptance checks, design priorities and copy are predetermined by ChatGPT. Codex may make routine engineering decisions (file structure tweaks, bug fixes, provider-compatible configuration) but cannot change commercial requirements, falsify evidence, replace the desired design with a generic template, or skip downstream QA to save time.

## Phase 0: Inspect and protect
Read repository tree, `git status`, `AGENTS.md` if present, 19 skills, current branch/remotes/lockfile, Cloudflare account scopes (when authorized), existing www/apex DNS records, Zoho MX/SPF/DKIM/DMARC, deployment target. Establish baseline; do not overwrite unrelated material. Test whether required services and command CLIs are actually available. Report actionable blockers. Create/review `docs/implementation-progress.md`.

## Phase 1: Buyer narrative + art direction
Use customer research and copy skills to validate needs with public evidence, no guessed metrics. Use the **full copy in `docs/02-copy-final.md` as baseline**; refine only truthful wording. Review design assets, lock color/type/layout directions based on `docs/03-design-system.md`; create quick static visual previews in local browser. Check early CTA visibility and headline readability. Do not create three competing designs or spend cycles researching endlessly.

## Phase 2: Astro foundation
Initialize Astro static starter inside existing repo (without removing `.agents`), TypeScript strict, Tailwind 4/Vite official integration, Lucide, semantic BaseLayout, SEO primitives and tokens; author exact package data, FAQ and project links. Commit incrementally locally. Configure Cloudflare static output with officially supported workflow.

## Phase 3: Full page content implementation
Implement header/hero/business problem/work/why/pricing/process/about/FAQ/contact/footer. Follow approved text. Add original brand assets and responsive artwork. Prioritize polished hero and authentic portfolio captures, then accessible pricing and form. Make original high-quality grid with strong editorial visual rhythm; don't substitute generic gradient cards.

## Phase 4: Interactions and lead capture
Package selector prefill, responsive nav, real focus/keyboard support, progressive enhancement, typography reveals with reduced motion, genuine managed provider submission, Zoho notifications and email fallback. Manual provider connection required if account missing; never pretend submitted. Security/privacy basics, provider eligibility, no personal WhatsApp exposure.

## Phase 5: SEO and analytics
Canonicals, OG, sitemap, robots, meaningful semantic text, minimal eligible JSON-LD, fast optimized assets. Add Cloudflare Web Analytics where available and configured; do not claim custom events work without tests. Record privacy notice accurately. Add guidance for Google Search Console.

## Phase 6: Browser/quality passes (minimum two review cycles)
Use Playwright at 360, 390, 430, 768, 1024, 1440 (and 1920 when feasible); screenshot key sections. Review actual page vs art direction and CRO goals; annotate at least 5 real design observations and fix significant issues, or state why fewer exist. Run keyboard/tab/focus/skip link/screen-reader accessibility checks, form invalid/success/failure, links, reduced-motion, console/network, tests/build, SEO audits, performance lab checks. Iterate until gates pass; don't hallucinate score. Ensure all evidence is repeatable.

## Phase 7: Deployment and real-world smoke
Only after local criteria satisfied and authorized accounts available, push to GitHub main or reviewed implementation branch consistent with safe repo state. Deploy to Cloudflare suitable static product. Use existing account/project if correct; avoid interfering with other subdomains. Bind `www.ismailstudio.my`, set apex 301/308 redirect, inspect SSL and DNS, preserve mail records. Smoke-test live routes, OG, canonical, sitemap, favicon, external projects and real form notification to Zoho. If live account access or eligible managed form remains blocked, label **not done**, report exact authorization or configuration needed and leave best safe local/preview result. Do not fake a release.

## Phase 8: Evidence and closeout
Record repo commit SHA, deploy URL, DNS/redirect results, test commands+outputs, screenshots, Lighthouse lab context, form-provider receipt and Zoho receipt confirmation, known limitations, provider costs, privacy note, rollback procedure and post-launch actions. No more implementation loops after all DoD gates pass; no indefinite unnecessary churn. Report only verified outcomes.
