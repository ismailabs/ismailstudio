# Component change map, acceptance tests and ordered implementation

Respect current source shapes; this is **targeted work**, not instruction to rewrite files solely for aesthetics. Reinspect file content and real browser before touching. Maintain one main design system, native Astro HTML and project data sources; avoid redundant UI libraries.

| Area | Current file(s) | Required targeted change | Preserve/check |
|---|---|---|---|
| Hero | `src/components/Hero.astro`, `src/styles/global.css`, `public/assets/hero-{desktop,mobile}.webp` | Integrate checksum-approved hero sources via derived optimized exports; responsive desktop/right and mobile A/top-negative-space treatments; one concise business-support line; stationary/selected animated gradient | Real HTML H1 and CTA, no layout shift, original art unmodified, accessible fallbacks |
| Navbar | `src/components/Header.astro`, `src/scripts/site.ts`, global CSS | Round 3-line toggle, near-fullscreen animated mobile navigation; preserve pill desktop and visible links | Keyboard/focus/escape, aria, no-JS, resize, stable history/anchors, short height |
| Motion | `src/scripts/site.ts`, CSS, existing `motion` | Small-once scroll reveal headings/text/work media and selective hero gradient; reduced-motion override | No heavy initial JS or unnecessary continuous work |
| Positioning | Hero, `src/components/Problem.astro`, `src/components/Process.astro` | Clarify why websites are useful for SMEs; reduce generic text while preserving simple page rhythm | No fabricated proof; one focused CTA hierarchy |
| About | `src/components/About.astro` | Compact, authentic founder motivation and working methodology | Melaka/clients across Malaysia; no invented history |
| Offers | `src/data/packages.ts`, `src/components/Packages.astro` | Tangible deliverables, suitability examples, comparison and transparent exclusions, clarify Business | Protected from-prices/page limits/revisions/SEO; conditional timelines gate |
| Work | `src/data/studies.ts`, `src/components/Portfolio.astro`, `src/pages/work/[slug].astro` | Rich hypothetical situation/problem/goal/design decisions/customer journey with bounded real feature demos | All four genuine thumbnails/live URLs/Concept Project; modal and static route |
| FAQ | `src/data/faq.ts`, `src/components/FAQ.astro` | Cover all 11 user-selected concerns, avoid duplication and unspecific legal promises | Native details behavior; keyboard/anchor formatting |
| Form | `src/components/Contact.astro`, `src/scripts/contact.ts`, `src/lib/form-config.ts` | Mainly copy/layout polish and integration clarity. Preserve actual transport and field names | No real POST in browser CI; Zoho recipient/provider evidence gate |
| SEO | `src/layouts/BaseLayout.astro`, work route, `public/robots.txt`, `public/sitemap.xml` | Homepage title exactly Ismail Studio; localized natural descriptions; schema consistency and technical checks | Canonical www, accurate source/build tags, no ranking promises |
| Testing | `tests/site.spec.ts`, `tests/v2.spec.ts`, `tests/v3.spec.ts`, `.github/workflows/quality.yml` | Add tests for new mobile nav, animation/reduced motion, genuine images, meta titles, content and disclosure | Keep baseline 38 existing behavioral tests; no skipped/removed assertions without documented reason |
| Legacy validator | `tools/validate_handoff.py`, `docs/redesign-v3/tools/validate_handoff.py` | Preserve old checksum-validated V3 references until a new validation plan is formally in place. Update only if needed to accept newly-approved hero while protecting facts | `npm run verify` must continue to pass; no rewriting owner historical D files |
| Release scripts | `scripts/package-cloudflare.mjs`, `scripts/v3-*`, configuration | Reuse verified site-only preview/promotion path, avoid stale generator scripts | No broad `cf deploy`, no apex/DNS/Zoho modification |

## Implementation sequencing / checkpoints

**Phase 0 — Snapshot and safety.** Record current `git status`, source/worktree, repo read-only audit, current website screenshots and cloud version. Verify approved original assets and license/provenance. Preserve owner deletions/skill modifications and original V3 checksum manifest.

**Phase 1 — Content facts and SEO.** Update exact HTML title, hero service statement, About, 11 FAQ intents and truthful SEO metadata. Extend studies in existing data rather than hardcode repetitive HTML. Model paid integrations only as optional explanations. Add coverage for prices/project labels. Reserve timed packages pending day-type clarification.

**Phase 2 — Hero and visual composition.** Import exact approved desktop/mobile A assets and optimize variants without changing imagery. Check at least desktop 1440, mobile 390/320, tablet. Adjust scrims/focal point and avoid script-triggered old asset regeneration. Ensure genuine brand favicon and existing project screenshot families unchanged.

**Phase 3 — Navigation and motion.** Round menu behavior with keyboard/mobile, responsive large overlay and no-JS fallback; then low-complexity entrance motion and gradient. Keep LCP path unaffected where possible. Do not install new dependencies unless reason/provenance/performance budget are documented.

**Phase 4 — Interaction/offer polish.** Upgrade offer hierarchy/comparison, project modal/detail content, FAQ scanning, contact visual affordance; preserve source. Add verified `data-*` hooks only where existing tests need stable selectors, never weaken accessibility.

**Phase 5 — Three real-browser critique loops.** For each loop: baseline screenshot(s) → named issues with severity/root cause → bounded fix → before/after screenshots → tests. Address mobile 320 overflow, headline contrast, menu obstruction, layering, paper/dark transitions. Don't invent work to make the review count.

**Phase 6 — Verify, preview, conditional release.** Run and save actual test receipts, SEO/asset/form/infra gates, preview and exact-version release in `05`/`06`. Keep a clean code provenance story separate from owner's uncommitted historical deletions. If gate blocked, deliver tested branch/preview plus one precise blocker.

## Engineering design requirements

- Use controlled CSS variables/classes rather than scatter gradient literals. Typical design tokens in existing `@theme`/global CSS; avoid utility override cascades that cause unpredictable responsive states.
- Keep JS progressive enhancement. If no JS, hero content/links/navigation and FAQ remain accessible; case study static URLs work. If motion chunk fails, layout remains functional. Support `prefers-reduced-motion` and forced-colors.
- Maintain focus visibility, meaningful DOM headings, touch targets, heading order and form errors. Menu open state must sync with screen reader semantics and resize.
- Avoid hosting external production source assets from third-party screenshot or AI URLs; produce optimized local assets from approved originals.
- Build exact site files only; never paste an image of a website into the homepage to satisfy layout.
- Replace contradictory V1/old-V3 active instructions carefully: preserve root AGENTS hard restrictions, update routing to this new entrypoint only after mapping other references, and don't erase historical release receipts.
