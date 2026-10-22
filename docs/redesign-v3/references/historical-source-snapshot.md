# Evidence read 2026-10-22 — reference, not a live baseline after extraction

- GitHub public repo `ismailabs/ismailstudio` main SHA `65d2f51fec8d612882aea2617e6c54ec49d4c23b` (2026-10-21 21:50:42 UTC), V2 production-delivery documentation closure.
- Repo `AGENTS.md` says approved V2 visual authority under `docs/redesign-v2/`; V3 package must surgically supersede V2 visual constraints only.
- `package.json`: Astro 7.4.1, @tailwindcss/vite 4.3.3, TypeScript 5.9.3, Playwright 1.64.1, `cf` 1.0.0-beta.19; Motion is not installed in inspected manifest. `npm run verify` calls handoff validator + Astro check/build + redirect units + Playwright.
- `cloudflare.config.ts` has `ismailstudio` www Worker and separate `ismailstudio-apex` redirect Worker, two defined triggers only for apex, www route only for main; other bindings may exist outside file. Do not change routes or DNS.
- `docs/redesign/release-record.md` records V2 runtime SHA `488a88c34a2a78d4ece64636dff14ac4d42e8395`, main site version `559ca179-d268-4db7-a486-181df5238e66` (historical traffic 100%), deployed V2 release passed tests and owner-confirmed provider-to-Zoho delivery. Pre-V2 rollback version was `4317599d-6080-4ac6-9237-3503bc0971e9`. Actual current may differ by execution.
- `src/data/packages.ts` in main retains Starter RM599/1 page/1 round, Business RM1,299/up to 5/2, Premium RM2,999/up to 12/2. The V3 SEO changes are APPROVED PROPOSED SCOPE and require actual code/content updates while preserving the prices/page limits/revision allowances.
- `src/data/projects.ts` four truthful concept names/links; V2 screenshots original. Current `src/components/Hero.astro` uses `PROBLEMS. MEET SOLUTIONS.` and old [IS] glyph. New V3 approves different H1/logo.
- `src/components/Packages.astro` had more-or-less equivalent features across tiers; V3 must distinguish outcomes and one-time SEO based on approved requirements, not an invented feature-bloat package.

Repository and docs were read via connected GitHub and checked against supplied screenshot material. No downstream file edits or live production QA were performed while authoring this ZIP.
