# Independent bounded Monolithic Landscape audit

Snapshot: 2026-10-23 14:59:01 UTC. Baseline HEAD: `3d02e9f7e0ff298c12e004a21a48241895998eef`. Mode: read-only review of current source delta, existing receipts and local screenshots. No browser/test runs, source edits, installs, commits, pushes, deployments, form sends or account access. This ignored audit is the only file written by this reviewer.

## Disposition

**No material blocker found within the hero-only change.** The selected regression suite and the original conditional release gates still need their own completed evidence. This audit does not declare release readiness or authorize an external action.

## Source and scope

- Current diff changes only the two public hero WebPs, decorative picture's mobile dimensions, hero image horizontal focal position and mobile image mask, existing asset generator and README. The only new source asset is `src/assets/hero/monolithic-landscape.png`.
- `Hero.astro` keeps all markup outside its decorative picture unchanged: real H1, copy, CTA labels/links, eyebrow, footer and location remain intact. The picture retains empty alt, aria-hidden, eager loading, high fetch priority and the existing 600px source breakpoint.
- The CSS delta is image-only: `object-position:76% center` and the mobile mask. Layout, typography, gradient/entrance animations, navigation and all nonhero selectors are unchanged. Package/dependency files are unchanged.
- The separate `form-preview-acceptance.json` owner-confirmation edit predates this hero work and is authorized. The existing comparison receipt verifies that this work preserved its bytes; it is not an out-of-scope hero modification.
- `comparison.json` records eight identical before/after hero/heading/description/action/header geometries, text/header/nonhero DOM hashes and gradient state, plus unchanged original owner checkout and nothing staged. Reviewed `compare.py`: its assertions compare those actual completed receipt fields and strip only the picture and explicitly allowed image CSS differences.

## Asset identity and implementation

Independently recomputed current SHA-256 values; all match the generator/provenance receipt:

| File | SHA-256 | Size/dimensions from existing provenance |
|---|---|---|
| Source PNG | `8096e7eb92492c8d630efda52bba969bf898db0dd91f84f342c9847d8810d886` | 2,017,119 bytes; 1672x941 |
| Desktop WebP | `cd0f99118556de7bdf19c3351ecfa2141d9ff38f31a97b885c821c25785dbcc7` | 107,190 bytes; 1672x941 |
| Mobile WebP | `f9872ee0144f413379a2a98c8c52e92e17d38553917ca6f03cbee1f2b1b37df5` | 73,404 bytes; 960x720 |

Generator verifies the supplied source hash/dimensions, encodes the full desktop image and a right-aligned mobile crop using existing pinned Sharp/WebP, and enforces byte budgets before writes. It does not generate/retouch artwork or touch brand/project screenshot assets. The source PNG is outside public; only derived WebPs are the deployed image paths. No new dependency is introduced. Image sizes alone are not new field-performance evidence.

## Captured visual review

Viewed the supplied source; after captures at 320, 390, 667, 768, 1440 and 1920 widths; short-landscape open menu; and the previous 390 hero for comparison. Reviewed the complete eight-view before/after receipts and comparison.

- Desktop/wide: the mountain and sunset occupy the right, with readable existing headline/support copy and distinct CTAs on the dark left. Brand/navigation and light-body transition remain recognizable and unchanged in placement.
- Tablet: the right focal anchor keeps the mountain visible while the existing scrim preserves text readability. No overlapping control or newly clipped text identified.
- Mobile: the dark upper region preserves headline/copy/CTA contrast; the bottom-aligned mountain remains recognizable and the image mask avoids a hard rectangular image edge. The existing hero continues below short viewport captures; this matches the baseline geometry and is ordinary page continuation.
- Short landscape/menu: the screenshot remains a vertically scrollable single-column panel with reachable close control. Initial partial visibility of the last link is not new to this image change; existing keyboard/scroll assertions remain the acceptance authority.
- Existing after receipt records no page errors, one selected hero image per viewport, correct natural dimensions, empty decorative alt and high/eager priority. Recorded hero/header axe checks at 390 and 1440 show zero violations. These were inspected, not rerun by this reviewer.

## Evidence and closeout boundaries

- The selected 29-case regression result was still a checkpoint at assignment time. This audit neither reran it nor represents a partial/in-progress receipt as a passing full result.
- README, local report and provenance currently describe the earlier local-only checkpoint. The owner's later explicit reauthorization supersedes that checkpoint for the original scoped release mission; carry the current authorization/status into release documentation. This is a documentation-state observation, not a new hero defect or a reason to request authorization again.
- Old hero approval records are historical after the owner's latest artwork override. Fresh commit-bound package, source CI, immutable preview and conditional production evidence must identify this landscape source/exports rather than reuse the previous hero hashes as current.
- Original form, privacy, DNS/mail/apex/other Worker and rollback protections continue. No additional changes or speculative polish recommended.
