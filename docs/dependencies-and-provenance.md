# Dependencies and asset provenance

Inspected official npm metadata on 2026-10-21 before installation. Exact versions in package-lock.json; install used `npm install --ignore-scripts`. Initial `npm audit`: zero vulnerabilities. No unknown curl/pipe execution or new skill installation.

| Dependency | Need | Upstream | License |
|---|---|---|---|
| Astro 7.4.1 | Static semantic site | withastro/astro | MIT |
| @tailwindcss/vite + tailwindcss 4.3.3 | Official CSS/Vite tokens/utilities | tailwindlabs/tailwindcss | MIT |
| @fontsource-variable/geist 5.3.0 | Self-hosted Latin WOFF2 | fontsource/font-files | OFL-1.1 |
| @astrojs/check 0.9.11 | Astro diagnostics | withastro/astro | MIT |
| TypeScript 5.9.3 | Strict type checking | microsoft/TypeScript | Apache-2.0 |
| @playwright/test 1.64.1 | Browser QA / genuine project captures | microsoft/playwright | Apache-2.0 |
| @axe-core/playwright 4.14.0 | Automated WCAG checks | dequelabs/axe-core-npm | MPL-2.0 |
| sharp 0.35.5 | Resize real captures and original vector icons | lovell/sharp | Apache-2.0 |
| Lighthouse 13.5.0 | Repeatable mobile/desktop lab audits | GoogleChrome/lighthouse | Apache-2.0 |
| cf 1.0.0-beta.19 | Official Cloudflare CLI | cloudflare/cf | MIT OR Apache-2.0 |

cf beta.20's engine range excluded installed Node 24.19.0, so beta.19 (Node >=22) is pinned. Its build-output helpers are pre-stable and must remain pinned through lockfile; deployment packaging will be dry-run validated.

Original SVG artwork: supplied commissioned-for-handoff vector files under assets/. Public page uses hero, contact and mark variants. `prepare-brand.mjs` generates icons and an original factual OG cover. Original art is abstract decoration, never represented as client work. No third-party stock pictures or generated project previews used.

Portfolio previews: direct public browser captures of the four owner-provided concept domains. Capture URLs, timestamps, HTTP status and titles in docs/evidence/project-captures.json. All four are visibly labelled Concept Project.

Font license: docs/licenses/geist-OFL.txt. Only Latin normal variable font is requested; no Google Fonts CDN. Generic system fallback remains usable.
