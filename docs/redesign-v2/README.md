# Ismail Studio V2 — complete Codex Desktop handoff

**Approved creative direction and mockups, with autonomous implementation/release permission.** Read `START_HERE.md` before touching the repo.

## Quick start (Windows PowerShell)

Place this **entire folder** at `<your-local-repo>\docs\redesign-v2\`, preserving subfolders. Example when ZIP is in Downloads and the shell is in your project repository:

```powershell
$dest = Join-Path (Get-Location) 'docs\redesign-v2'
if (Test-Path $dest) { throw "Destination already exists: $dest. Inspect it; do not blindly overwrite." }
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Expand-Archive -LiteralPath "$HOME\Downloads\Ismail-Studio-V2-Final-Codex-Handoff.zip" -DestinationPath $dest
python "$dest\scripts\validate_package.py" --root "$dest"
```

**Do not run these exact commands unless the ZIP truly resides at the example path** and your working directory is the correct local repository. For an alternate extract location, adapt paths. These are illustrative setup steps; extraction does not edit the application or deploy.

Then open Codex Desktop in the repository and send this minimal task:

> Read `docs/redesign-v2/START_HERE.md` and execute the approved Ismail Studio V2 redesign autonomously, including visual/browser QA and the conditional production release. Preserve protected facts and infrastructure; do not stop at planning.

## Handoff contents

- `START_HERE.md`, `APPROVAL-AND-AUTHORITY.md` — execution authority, conflict precedence and work order.
- `docs/` — brand, visual specification, truthful content, interactions, case studies, contacts, responsive behavior, skill audit, engineering plan, visual QA, technical verification, release runbook, research, and asset provenance.
- `assets/approved-mockups/` — 17 reviewed PNGs + desktop/mobile overview JPGs; **primary visual targets**.
- `assets/approved-concepts/` — original 01/02/03 visual explorations; **secondary mood references**.
- `assets/project-preview-crops/` — preview crops from original user screenshots, **review-only**; production uses genuine source repo captures.
- `assets/directional-only/` — generated generic glass shape; **do not ship uncritically**.
- `prototype/` — non-production HTML exploration, contact never submits. Don't copy directly.
- `vendor/` — original owner-provided `ai-design-engineering` skill archive, for provenance/fallback; reuse installed and inspect before replacing.
- `templates/` — evidence records and issue log formats.
- `scripts/` — package validation and repository fact checks.
- `manifest.json` — file hashes and provenance.

## Checks performed when constructing this package

The package includes only the referenced design artifacts and documentation. Container-side packaging validation verifies required files, hashes, JSON schemas and lack of certain exposed-secret patterns. It does **not** verify that Codex has activated skills or that any V2 website passes Playwright, SEO, accessibility or Cloudflare tests.
