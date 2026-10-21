# Guided enquiry — keep real provider contract, progressively enhance

Current system uses a native `<form>` with provider endpoint obtained from `src/lib/form-config.ts` (do not paste the endpoint or any credentials in this package). Contact logic is in `src/scripts/contact.ts`; owner historical evidence said Formspree → Zoho delivery was verified on V1, but **V2 requires independent production re-test**.

## Keep all fields and validation meaning

| Stage | Field | Current constraints |
|---|---|---|
| 1 Identity | Name | required, length 2–80 |
| 1 Identity | Business name | optional, max 100 |
| 1 Identity | Email | required, real email, max 254 |
| 2 Needs | Package | existing `Not sure yet`, `Starter`, `Business`, `Premium`; default not sure yet |
| 2 Needs | Target timeline | optional; use **original repo option labels** `Select a timeline`, `Flexible`, `Within 1–3 months`, `Exploring` unless explicitly changed |
| 2 Needs | What does your business need? | required, 20–2,000 chars |
| 3 Review | All supplied values | editable via backwards navigation; real Submit action only after validation |

Keep hidden `_gotcha` honeypot, `_subject`, privacy text, label associations and provider response contract. **No phone, address, custom tracker, localStorage draft, marketing opt-in or extra required field.** If changing provider, mailbox or terms would be needed, stop and report as an out-of-scope dependency. Validate that managed provider is eligible for user's account; do not bypass third-party service age or business requirements.

## Progressive enhancement

- With JS available, show 3 accessible steps; step 1/2 validation required before advance; step 3 accessible summary with change/back controls, revalidate all prior to submission.
- On Back: preserve all values and error meaning. Focus heading/first invalid control appropriately; status updates announced via `role="status"`/`aria-live`.
- In no-JS mode: **all native input fields and a single native provider-submit button remain available**. HTML validations remain. If provider disabled, clear email fallback (not a fake submission success).
- Avoid duplicate submits. Pending state, abort timeout and retry; provider success must inspect actual accepted response. Do not reset unless accepted.
- Formspree API success is **acceptance**, not automatically proof of delivery into Zoho; verify both where safe test access exists, or mark delivery verification blocked.
- Keep `mailto:contact@ismailstudio.my` secondary.
- Privacy: disclose collected data's purpose and link to accurate real privacy/provider handling information; don't pretend a service is private/local when Formspree handles submissions.
- Preselect package only after deliberate click on a tier CTA; not automatically favoring the most expensive tier.

## QA stories

1. Complete enquiry with keyboard (each step; go back; edit package; submit). **Use a safe synthetic test payload only when testing is permitted**; avoid real-person data.
2. Invalid name/email/message; errors announced and focus placed; fixed without data loss.
3. Simulated offline/provider 4xx/5xx/timeout; no false success and no clearing form.
4. No-JS workflow still usable on desktop/mobile.
5. Reduced-motion: no unwanted sliding animation; spinner remains optional.
6. Privacy link, fallback email, screen reader labels, required indicators and success/failure notice work.
