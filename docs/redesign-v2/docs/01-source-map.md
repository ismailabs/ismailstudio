# Source of truth and status

**Evidence snapshot:** Github default branch `main`, commit `d9dc2b8fdea169742a1951c3690a055af9a02869` observed at prior handoff and reconfirmed by a GitHub read before visual review. This is a **historical baseline, not a guaranteed current HEAD**. Browser and provider behavior must be freshly verified by Codex.

## Source priority

1. Actual inspected current GitHub/local repo + active deployment configuration for technical realities and authenticated form routing.
2. Approved user decisions and actual business/source data below for business truth.
3. `assets/approved-mockups/*` for intended V2 layout/identity; `docs/03-visual-system.md` for measurable interpretation and behavior.
4. `assets/approved-concepts/*` for secondary mood only, not accurate business UI.
5. Historical V1 handoff/decisions only for facts and protections, **not its rejected aesthetic rules**.

## Verified repository files in `main` snapshot

- `AGENTS.md`: has stale instruction to complete V1 and auto deploy. It must be surgically amended; avoid deleting nonnegotiables.
- `START_HERE.md`, `docs/03-design-system.md`, `docs/design-decisions.md`: historical V1 visual direction, superseded.
- `src/pages/index.astro`, `src/components/{Header,Hero,Problem,Portfolio,Why,Packages,Process,About,FAQ,Contact,Footer}.astro`.
- `src/data/projects.ts`, `src/data/packages.ts`, `src/data/faq.ts` are authoritative baselines.
- `src/scripts/contact.ts`, `src/scripts/site.ts`, `src/lib/form-config.ts`: existing contact and minimal enhancements.
- `public/assets/projects/`: actual captured project screenshot derivatives. Preserve content and provenance.
- `package.json` and Node lockfile: Astro 7.4.1, Tailwind 4.3.3, TypeScript 5.9.3, Playwright, axe, Lighthouse, `cf` 1.0.0-beta.19 on snapshot. Node >=22.22.0.
- `docs/release-record.md`, `docs/performance-review.md`, `docs/visual-review.md`, `docs/implementation-progress.md`: historical outcomes not new V2 verification.
- Deploy script was `npm run deploy:worker` invoking `cf deploy --prebuilt --mode production` after project-specific packaging.

## Critical business facts (do not mutate without user change)

| Package | Public starting price | Pages | Revisions |
|---|---|---|---|
| Starter | From RM599 | 1 page | 1 round |
| Business | From RM1,299 | Up to 5 pages | 2 rounds |
| Premium | From RM2,999 | Up to 12 pages | 2 rounds |

Only frontend websites in standard packages. Mobile-responsive layouts, basic on-page SEO and clear contact actions were described in V1. Domain registration, ongoing maintenance, paid third-party services, backend systems, real booking systems, payment checkout and databases are not included unless separately and clearly agreed. No Google ranking guarantee.

## Official public URLs

- canonical https://www.ismailstudio.my/
- owner business contact `contact@ismailstudio.my`; protect private phone/contact data.
- KilatMoto https://kilatmoto.ismailstudio.my/
- MakanSedap https://makansedap.ismailstudio.my/
- KopiKita https://kopikita.ismailstudio.my/
- Malaysia — Between Places https://malaysia.ismailstudio.my/

## Boundaries of prior verification

2026-10-21 old release record claimed successful provider-to-inbox testing and mobile/desktop lab results. This is not a V2 test. User screenshots show desktop aesthetics but cannot verify real scroll motion, keyboard behavior or live mobile. Recheck facts/tests in runtime. Prior Cloudflare read-only audit identified Workers with assets, not Pages; independent `ismailstudio` website Worker and `ismailstudio-apex` redirect Worker. Do not modify or redeploy the apex redirect just because the main site is redesigned.
