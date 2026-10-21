# Engineering QA and acceptance gates

Re-read actual `package.json` and scripts first. Repo snapshot defines `npm run check`, `npm run build`, `npm run test:redirect`, `npm test`, and `npm run verify` (the latter includes a V1 handoff validator that may require adaptation). Run clean `npm ci` only if lockfile and environment are sound; do not unexpectedly upgrade dependencies.

## Functional acceptance

- All links and anchors resolve; all four live concept URLs reachable or a transparently handled temporary outage; no misleading "View project" broken button.
- Four project dialogs: keyboard, focus, mobile scroll, Escape/close/back-forward/deep link, genuine project screenshot and `Concept Project` disclosure.
- One actual H1; SEO title, canonical https://www.ismailstudio.my/, robots/sitemap, OG image truthful, no dummy structured data or inflated review scores.
- Three tiers and precise limits, revision counts and exclusion language; correct prefill from each pricing CTA to step 2 and correct review.
- Three-step contact keeps all existing fields, lengths, options, honeypot/privacy, provider POST payload/response behavior, no-JS native fallback; handles rejected/timeout acceptance.
- No console/runtime errors, missing fonts/images, horizontal overflow, broken anchors, contrast and focus failures.
- No sensitive personal data or tokens committed or logged. Avoid random new dependencies if CSS/JS can do the job.

## Performance and accessibility evidence

- Run Playwright + axe where available; keyboard and reduced-motion manual/automated flows; test 320/390/768/1024/1440+.
- Capture Lighthouse mobile/desktop, report device/network/multiple runs and compare to observed V1. **Core Web Vitals targets:** LCP <=2.5s, INP <=200ms, CLS <=0.1 at field p75 if eligible. These are targets, **not previous measured V2 results**. Document if real-user metric unavailable; focus on lab regression and actual failure.
- A11y: no critical/serious known violations in sampled flows and no unresolved manual keyboard/function blockers; fix if found. WCAG 2.2 AA target, not unverified conformance certification.
- Motion: no scroll-jacking or inappropriate pinning; static content available with reduced motion/JS off. Image preload limited to critical visual assets.

## Why tests might need maintenance

Old V1 validation scripts may assert obsolete V1 headings/layout. Preserve the business/technical intent; update only assertions tied to superseded art direction. Do not delete test coverage merely to obtain green. Record before/after tests and rationales in implementation evidence.

## Mandatory fail behavior

Any reproducible critical form loss, broken route/redirect, corrupt project previews, fabricated facts, credentials exposure, unresolved accessibility blocker, uncontrolled production routing or inability to rollback **stops release**. Noncritical visual deviations are documented and prioritized; fix them autonomously before using deployment permission.
