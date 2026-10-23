# Final responsive-density audit

Snapshot: 2026-10-23 15:30:18 UTC. Base HEAD: `00696413f20940d73eafbfc308c7cf1044811fd0` plus current mobile image refinement. Read-only source/hash/receipt/screenshot review; no browser, test, account, form, source-edit or release action. This ignored report is the reviewer's only write.

**No material blocker found in the reviewed refinement.** No code change or additional cosmetic work recommended.

- Reviewed final `after/390-hero.png` and `after/430-hero.png`: the approved mountain composition, dark readable text area, headline, supporting copy, CTA placement, navigation and body transition remain intact. No new clipping, hard image boundary or loss of control readability identified.
- Diff from base confines implementation changes to the mobile picture srcset/dimensions, mobile decorative picture height/mask, regular mobile WebP and generator. The new high-density WebP is present at the exact srcset path. No copy/layout/navigation/animation/nonhero source change found.
- The bounded 75vw picture and 26.667% fade preserve the prior visible 20vw transition; the existing bottom alignment and 4:3 crop remain. Desktop media behavior/export is unchanged.
- Independently recomputed hashes match current provenance: source PNG `8096e7eb92492c8d630efda52bba969bf898db0dd91f84f342c9847d8810d886`; desktop WebP `cd0f99118556de7bdf19c3351ecfa2141d9ff38f31a97b885c821c25785dbcc7`; regular mobile `8ec34401a392f5038f8489242c1187ee4b69d07db0f83a77e53fcdc04bf1986e`; high-density mobile `f9872ee0144f413379a2a98c8c52e92e17d38553917ca6f03cbee1f2b1b37df5`.
- Current provenance records regular 768x576/q75 at 42,842 bytes, high-density 960x720/q80 at 73,404 bytes, unchanged desktop at 107,190 bytes. Both mobile variants derive from the same approved right-aligned crop using the existing pinned encoder; no new source artwork/dependency is introduced.
- Reviewed current comparison receipt: eight views preserve hero/header geometry, copy, navigation, gradient and nonhero DOM; completed captures retain no page errors and recorded mobile/desktop hero axe checks have zero violations. These receipts were inspected, not rerun. Controlled performance diagnostics remain root-owned evidence; this audit makes no new timing or field-performance claim.

Original source-CI, commit-bound package, immutable-preview and conditional production gates remain applicable to the final source. This finding is limited to the reviewed image refinement and is not a release-completion claim.
