# Verified work portfolio and interactive concise case studies

## Hard rule

All four are **Concept Projects**, *not paid client work*. In V2, each must display an authentic screenshot rendered from the actual linked site. Review-only crop files were taken from user screenshots; production-grade assets in `public/assets/projects/` win. Do not retouch source UIs or generate fake project previews.

## Project briefs — cautious language

### KilatMoto

- URL: https://kilatmoto.ismailstudio.my/
- Category: Automotive service concept.
- Intended problem **for this concept**: how might an automotive service site communicate services, convey a focused identity, and make enquiries easy?
- Proposed design answer: service-centered content hierarchy, dramatic automotive imagery, obvious enquiry path.
- Demonstrated work: a responsive service-oriented concept site; verify exact components/capabilities from current demo/repo before declaring them.

### MakanSedap

- URL: https://makansedap.ismailstudio.my/
- Category: Restaurant concept.
- Intended problem: present menu information and personality in a way that helps fictional restaurant visitors explore offerings.
- Proposed design answer: food-led storytelling, menu discovery, coherent brand atmosphere, **fictional/demo booking interactions**.
- Demonstrated work: a responsive restaurant prototype. **Never imply working live reservations or real restaurant customers.**

### KopiKita

- URL: https://kopikita.ismailstudio.my/
- Category: Café concept.
- Intended problem: combine café atmosphere and menu discovery without burying useful information.
- Proposed design answer: strong coffee visuals, simple navigation/menu discovery, coherent responsive presentation.
- Demonstrated work: a café concept; no client or sales outcome implied.

### Malaysia — Between Places

- URL: https://malaysia.ismailstudio.my/
- Category: Creative web storytelling concept.
- Intended problem: communicate a journey/places through a more immersive front-end presentation.
- Proposed design answer: geography-influenced visual storytelling and interactive presentation, subject to current demo verification.
- Demonstrated work: an exploration, **not a commissioned tourism website**.

## Case-study content structure

- Top: project name, `CONCEPT PROJECT`, category and original preview.
- 1–2 concise sentences explaining hypothetical intent.
- 3 short sections: `The intended problem`, `The approach`, `What the concept demonstrates`; avoid fake client briefs/results.
- Action: `Explore live concept ↗` (external link, `rel="noopener noreferrer"` where new tab).
- Optional concise relevant technology/interaction note **only if verified from project repo/code**; don't infer tools from screenshot.
- Modal/drawer with close button, Escape, focus trap/restoration, background inertness, focus visible, usable mobile scrolling. Provide meaningful link/deep-link fallback.

## Production image protocol

Use `public/assets/projects` originals/optimized derivatives as authoritative. Collect source dimensions, capture timestamp, exact demo URL, cropping rule, responsive alt, file license/provenance and SHA into `docs/redesign/asset-evidence.json`. If demo changed from screenshot, record the difference rather than fabricate preservation. Don't lazy-load immediately needed work artwork when it is in initial viewport; size all assets to prevent CLS.
