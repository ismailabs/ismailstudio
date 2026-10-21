# Implementation architecture

## Baseline
Astro static site (latest suitable stable version verified during execution); strict TypeScript, Tailwind v4 using **@tailwindcss/vite** per current Astro docs, Lucide icons or optimized inline SVG. Minimal client JS for reveal effects, menu state and form behavior. `@astrojs/sitemap` if appropriate. Avoid React, state framework, CMS, auth, server rendering, database, custom API, or build-time reliance on secrets unless concrete evidence justifies it. Verify official Astro and Cloudflare docs against installed versions.

## Suggested files (Codex should create)
```
astro.config.mjs
package.json, package-lock.json, tsconfig.json
public/favicon.svg, favicon.ico, apple-touch-icon.png, og-image.png
public/robots.txt, public/assets/... [licensed, optimized]
src/pages/index.astro
src/layouts/BaseLayout.astro
src/components/{Header,Hero,Problem,Portfolio,Why,Packages,Process,About,FAQ,Contact,Footer}.astro
src/data/{packages,projects,faq}.ts
src/styles/global.css
src/scripts/{reveal,contact}.ts
src/lib/{seo,form-config}.ts
scripts/... [validation]
tests/... [Playwright]
README.md, AGENTS.md, docs/implementation-progress.md
```
This is a design proposal rather than a command to erase the real repository. Preserve `.agents/skills/` and existing valid files. Integrate handoff files into docs; preserve repo ownership attribution.

## Code standards
- Semantic article/section/list/table/heading structure; H1 once. Maintain keyboard and screen-reader navigation.
- Escape dynamic content; validate inputs. No raw untrusted HTML injection. No exposed form-provider secret/token.
- Reliable skip link, real button semantics, visible focus, 44px-ish comfortable controls, proper label/error association and status announcements; do not rely on JS-only navigation for section links.
- Prefer Astro static generated images, `srcset`, `sizes`, width/height, AVIF/WebP when supported; project screenshots use genuine captures, meaningful alt. Honor font licensing.
- `<picture>` or Astro Image with responsive derivatives; don't lazyload main LCP hero if image is critical. Avoid layout shift with set dimensions.
- No animation library unless justified by budget and reduced-motion requirements; first try CSS and IntersectionObserver. Reveal text in accessible DOM even when JS disabled, never make content invisible forever.
- Form managed provider: provider-native POST + robust progressive enhancement; do not pretend private server-side validation is possible from a pure static page; provider processes spam and request.
- External links safe rel and correctly labelled, internal `#section` targets valid. CDN and custom domain must preserve Zoho MX and associated SPF/DKIM/DMARC.
- Package changes and migrations use lockfile, audit relevant dependency risks, document decisions.

## Target quality budget (aspirational, not invented result)
Primary JS ideally <40 KB compressed beyond Astro baseline, no costly hydration. Target LCP <=2.5s p75, INP <=200ms p75, CLS <=0.1 p75, subject to live-field traffic; run Lighthouse mobile and actual devtools, optimize measured regressions. Do not assert 100/100 or p75 success without real evidence. Record measured test device/network.
