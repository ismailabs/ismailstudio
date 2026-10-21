# AGENTS.md — Ismail Studio

Scope: the **Ismail Studio** repository only. Refer to `START_HERE.md` and `docs/`. Working agreement: complete an Astro + Tailwind v4 + TypeScript single-page marketing website, verify it in an actual browser, and push/deploy to approved GitHub/Cloudflare targets when gates pass.

## Nonnegotiables
- Public domain `https://www.ismailstudio.my/` (apex redirects); professional mail `contact@ismailstudio.my`; **never publicly expose the supplied personal WhatsApp number**.
- Prices: RM599 one page; RM1,299 up to five pages; RM2,999 up to 12 pages, each **starting from**. Three public prices; no invented client testimonials, results, registrations or credentials.
- All four projects labeled **Concept Project**; screenshots must be authentic to their live demo projects, not generative misrepresentations.
- Contact form is primary, email is secondary; never imply a form works until real provider-to-Zoho delivery passes. Use managed service, verified account eligibility, no leaked secrets.
- SEO: truthful metadata and schema, optimized static HTML, canonical host, sitemap, redirects, no ranking promises. Mobile-first, WCAG 2.2 AA as target, reduced motion, performance discipline.
- Install no new skill or executable dependency without reviewing provenance, capabilities and need; explicitly review all installed skills and use each in appropriate stages. Nothing may authorize unrelated actions.
- Never hardcode secrets; commit no API keys, personal WhatsApp number or contact submission data. No paid service enrollment or destructive DNS changes.

## Work cadence
Reinspect state → assess and schedule tasks from documented implementation phases → implement → browser view and critique → test → repair loop → repeat. Maintain `docs/implementation-progress.md` and explicit outstanding issues. Continue autonomously; ask only on genuinely blocked/unsafe/irreversible external dependencies that can't be responsibly resolved. Commit/push/deploy when verified.

## Required checks
`npm run check` (Astro check), `npm run build`, `npm run lint` if configured, `npm run test` if configured, `npx playwright test`; run page/link/form/mobile/focus/reduced-motion/SEO/security verification. Use exact project commands after reading package.json, not blindly. User-visible claims are verified against `docs/02-copy-final.md`.
