# Ismail Studio V2 design specification

Approved direction: cinematic immersion + bold contemporary + experimental digital. Reference package copied intact from `Ismail-Studio-V2-Final-Codex-Handoff/` to `docs/redesign-v2/`; actual hero reference is `assets/approved-mockups/frames/01-desktop-hero.png` (the START_HERE shorthand omits `frames/`). Both review boards inspected before implementation. Source base: `d9dc2b8fdea169742a1951c3690a055af9a02869`; advertised remote matched. User's uncommitted skill additions and lockfile preserved.

Publication adaptation: three Markdown hard-break trailing spaces in the copied START_HERE were normalized for the repository whitespace gate; only that reference file's SHA in its manifest was updated. Original supplied package remains untouched in its original folder. All approved image bytes and substantive instructions remain unchanged; integrity validator rerun.

## Invariants and deliberate translations

| Requirement | Implementation | Reference |
| --- | --- | --- |
| Dark cinematic first screen; oversized editorial proposition | Static H1, ink/grid stage, restrained orange/cool lighting | 01, 08 |
| Original studio-specific mechanism | Hand-authored inline SVG extruded IS portal; response to capable pointer, static on touch/reduced motion | glass sculpture is mood only |
| Work as centerpiece | Original captured assets; staggered unequal columns; four prominent Concept Project labels | 02, 03, 09 |
| Concise accessible case studies | Native modal plus permanent HTML study pages | 06, 10 |
| Transparent comparison | Full-width pricing rows; exact three prices/pages/revisions; no popularity claim | 04, 13 |
| Guided quote | Native provider POST enhanced with three steps; persistent values, validation, review | 07, 11, 12, 16 |
| Independent voice | First-person copy, no portrait/team/client claims | 05 |
| Ordinary useful FAQ | Six preserved source answers in native details | 14 |
| Mobile navigation | Disclosure with Escape/outside-click/anchor handling and no-JS visible links | 15 |

Geist Variable is retained: locally hosted, existing OFL license, heavy display/regular body. No new dependency or skill is installed. Colors: ink #080d12, surface #101c26, paper #f4f2ec, orange #ff5733, cool #c3cfff. Paper-section accent text is darker to preserve contrast. Display typography uses tight tracking and fully opaque first paint. Desktop header 94px, flexible content width capped at 1360px. Mobile uses 20px gutters and places glyph after value/CTAs. No scroll hijacking or autoplay ambient loop.

## Route and state contract

Homepage `/` retains `#top`, `#main`, `#work`, `#services`, `#process`, `#about`, `#contact`, `#privacy-note`. Four static `/work/{slug}/` routes provide no-JS, direct and shareable case studies, each with unique title/description/canonical. Homepage `?case={slug}` uses browser back/forward and native dialog inertness/focus. Case screenshots preserve their original aspect ratio and pixels.

Required captures: 1440×900 and 390×844 for all sections, study/menu/form states; 320/768/1024/1920 layout/axe; landscape/reflow/forced colors/reduced-motion/no-JS. Real provider delivery is distinct from isolated form outcome tests. Capture manifests record URL, current base SHA, dirty implementation state, browser version and time.

Motion principles: brief pointer-driven glyph translation; image scale on intentional hover; dialog/step state continuity with focus; process marker highlights at current scroll. Reduced motion removes transforms/transitions. Content never depends on an entrance observer.
