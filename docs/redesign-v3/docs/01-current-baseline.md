# Live repository baseline — reverify before edits

| Source | Observed snapshot (2026-10-22) | What Codex must do |
|---|---|---|
| GitHub `main` | `65d2f51fec8d612882aea2617e6c54ec49d4c23b` — V2 closure docs | Check actual HEAD and local changes before branch creation |
| V2 runtime | `488a88c34a2a78d4ece64636dff14ac4d42e8395` from `docs/redesign/release-record.md` | Reverify active version/source against live Cloudflare and canonical |
| V2 website Worker version | `559ca179-d268-4db7-a486-181df5238e66` at recorded 100% | Verify current; do not reuse as automatic rollback target without checking |
| Stack | Astro 7.4.1, Tailwind 4.3.3, TypeScript 5.9.3, Playwright 1.64.1, cf 1.0.0-beta.19 | Read actual package/lock before adding `motion` |
| Repo paths | `src/pages/index.astro`, `src/components/{Header,Hero,Portfolio,Packages,Process,About,FAQ,Contact}.astro`, `src/data/{packages,projects,faq}.ts`, `src/scripts/{site,contact}.ts` | Reinspect current and update semantically, never restart from V1 templates |
| Cloudflare | Website `ismailstudio`; apex redirect separate; Zoho DNS, other Workers/subdomains protected | Capture pre/post inventories and compare raw records/scope with masking |
| Form | Formspree HTML POST with JS progressive enhancement; recipient is `contact@ismailstudio.my` | Test field names and response semantics from current actual code |

Historical verification exists in `docs/redesign/{release-record,completion-audit,test-report,skills-audit,visual-reviews}.md`. Treat it as V2 evidence only. GitHub SHA is an observation, not a requirement to reset/downgrade new commits. Re-run official package commands and real browser checks on V3.

Check git status before copying the handoff into a repository with unrelated local edits. Do not include this ZIP's oversized mockup PNGs in `public/` unless a particular optimized *licensed/approved artwork crop* is actually used. Keep docs internal and Cloudflare output allowlisted.
