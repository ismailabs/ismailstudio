# Skill orchestration: actual local inventory and decisions

User's `npx skills list` (local Windows machine) reported **21 project skills**. Older GitHub `main` snapshot contains 19, without `ai-design-engineering` and `wrangler`. The local installation is authoritative **only after Codex rechecks the current working copy**.

| Installed skill | Role | Operating instruction |
|---|---|---|
| `ai-design-engineering` | **Primary orchestrator** | Explicitly invoke and inspect `SKILL.md`; stages 0–5 already approved, execute build/verify/refine/release; don't re-run ideation |
| `frontend-design` | Primary aesthetics implementer | Use with mockup constraints, not as competing art director |
| `design-taste-frontend` | Scoped visual critic | Consult after real screenshot to identify deficits; never impose arbitrary aesthetic template |
| `ui-ux-pro-max` | Targeted UX patterns | Use for navigation/forms/QA only; avoid conflicting global palettes |
| `astro-best-practices` | Existing Astro architecture | Read for relevant implementation changes |
| `typescript-guidelines` | Type safety | Repair outdated missing `programming-guidelines` reference only if confirmed |
| `tailwind-design-system` | Token/components | Use if creating/refactoring Tailwind v4 design system |
| `copywriting` | Honest differentiated copy | Check source facts and no invented results |
| `accessibility` | Mandatory a11y | Keyboard, dialog, form, focus, reduced-motion |
| `playwright-cli` | Browser proof | Real screenshots, functional tests, viewport/state matrix |
| `web-quality-audit` | Final consolidated audit | SEO/security/a11y/perf issues; no duplicate blanket audit |
| `seo` | Canonical/schema/sitemap changes | Scoped routing and content validation |
| `performance` | Perf owner | Choose as primary for measured regressions and JS/image budget |
| `core-web-vitals` | Specific metric diagnostics | Only invoke for failing/inconsistent LCP/INP/CLS (avoid perf duplication) |
| `cf-cli` | **Existing deploy path** | Use project-pinned `cf` CLI and observe its actual command semantics |
| `wrangler` | Cloudflare CLI alternative reference | Installed locally; do **not** migrate existing working `cf` production workflow without explicit technical proof |
| `cloudflare` | Provider architecture | Reference only for changed Worker/static asset constraints |
| `best-practices` | Targeted security/browser compatibility | Optional under specific defects |
| `web-design-guidelines` | Generic visual guideline audit | Optional; overlaps a11y, visual QA; never run arbitrary fetched scripts |
| `customer-research` | Buyer assumptions | Optional; no invented interviews or statistics |
| `marketing-psychology` | Ethical pricing/CTAs | Optional; avoid fake urgency, scarcity, popularity or decoys |

### Decisions on installation/deletion

**No automatic mass deletion or installs.** Missing repo skill: compare against installed local user package `vendor/ai-design-engineering-skill.zip`; if installed version matches, reuse, not overwrite. If missing in repo but package is approved, install into `.agents/skills/ai-design-engineering/` after safety review, validate `SKILL.md` and ensure Codex discovers it. `wrangler` similarly optional reference, not proof a deploy migration is needed.

Delete only where concrete evidence establishes redundancy, broken scripts, conflicting entry points, or maintenance risk **and** the deletion is scoped, version-controlled and won't affect unrelated projects. Most likely candidates to review for deactivation/archival first: `web-design-guidelines` overlap, one of `performance`/`core-web-vitals`, and high-context catalogs `ui-ux-pro-max` / `design-taste-frontend`. The design failure came primarily from pre-locked V1 art direction, not simply 19 skills existing.

### Execution evidence

For each skill record `available`, `SKILL.md located`, `actually invoked/referenced`, `purpose`, `artifact/result`, `issues`, `decision`. Avoid declaring a skill used because it appears on disk. Do not execute unknown shell scripts, network installers or `curl | bash` without inspecting provenance and permissions.
