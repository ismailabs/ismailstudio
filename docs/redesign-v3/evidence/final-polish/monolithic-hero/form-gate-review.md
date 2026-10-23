# Form delivery gate review after the approved hero replacement

Recorded: 2026-10-23T15:01:45.299Z. Narrow read-only interpretation audit. This agent made no remote calls, sent no form, accessed no account/mailbox, and changed no source/config/tests. This report is the only file written for this audit.

## Decision

The existing owner-confirmed preview delivery remains valid **as the real delivery evidence for the unchanged preview form integration** after a hero-only replacement. The mandatory one-send cap should remain intact. Do not send another preview message, remove/rename its private intent guard, or invent a new environment name to obtain another message.

This is a conditional equivalence path, not a claim that the replacement's final immutable version has itself sent an email. It is not a waiver of fresh source, CI, immutable-preview, hosted-form UI, security or production recipient gates. The final commit/version and its hosted checks are not yet established by this audit; root must close those checks below.

The reasoned reading is that delivery is already proven for this release's preview integration, while the new version still needs proof that its form integration is unchanged and works in its current page. No authority text explicitly requires a new real message for every artwork/version change. The source explicitly prohibits sending again merely to improve evidence. Treating every new immutable hostname as a fresh send allowance would bypass the phase-wide guard in the approved delivery harness.

## Exact authority

- `docs/ismailstudio-v3-final-polish/01_APPROVALS_AND_BOUNDARIES.md:19` requires tested provider acceptance and independent recipient evidence **when permitted**.
- Its line 25 says: “One or fewer authorized, distinctly marked synthetic form tests per preview/production environment; no repeat on uncertain delivery. Verify true inbox receipt separately”.
- `05_QA_ACCEPTANCE_MATRIX.md:56` says automated UI tests always stub Formspree, to inspect existing state and private intent receipts, and “do not send again merely to improve evidence.” It distinguishes provider acceptance from actual Zoho receipt and blocks if proper receipt is unavailable.
- `06_PROTECTED_RELEASE_RUNBOOK.md:26` requires the current live browser matrix, isolated form UI tests and “any sanctioned provider validation”. Line 35 again caps synthetic tests at one per environment. Line 47 requires actual provider-to-Zoho evidence under the permitted workflow.
- The runbook's exact-version/source/asset checks apply to the new version and remain required. They do not convert the one prior receipt into an actual send from the later version.
- Latest direct owner hero approval and renewed conditional publication authorization, as supplied by root for this audit, supersede the older local-only hero report's earlier action boundary. They do not amend the form-send cap or other release gates.

## Confirmed historical delivery

`docs/redesign-v3/evidence/final-polish/form-preview-acceptance.json` records:

- Marker: `ISM-FINAL-POLISH-PREVIEW-20261023105053`.
- Immutable origin: `https://b767642c-ismailstudio.mohamad-ismail-mohd-izwan.workers.dev`.
- Provider acceptance: HTTP 200, `ok:true`; browser success true at 2026-10-23T10:51:01.164Z.
- Independent receipt: owner explicitly confirmed the exact marker arrived in Zoho; confirmation recorded 2026-10-23T11:03:36Z. No agent mailbox access. Repeat submissions: zero.

The companion `version-preview.json` maps that origin to version `b767642c-53d1-473d-8d00-277aa7fe5318`, source `eef2185fb3590a60e9c267794609efe3b6a6001c`. This is the precise tested historical version/source. Retain those identities in the original receipt; do not relabel it with the new commit or version.

The private `.local/final-polish/form-preview-send-intent.json` matches the marker/origin and records send initiation before the live send. `scripts/final-polish-form-delivery.mjs` keys its guard by phase (`preview` or `production`), not by Worker version/hostname. It throws when the phase's intent file exists. At audit time, no `form-production-send-intent.json` exists in this final-polish phase.

## Current local equivalence evidence

Compared the supplied preview source `eef2185fb3590a60e9c267794609efe3b6a6001c` with current files at HEAD `3d02e9f7e0ff298c12e004a21a48241895998eef` plus the uncommitted hero-only edits. CRLF/LF differences were normalized only for source-byte comparison; compiled JS comparisons below use actual SHA-256 bytes.

| Source | Comparison | SHA-256 of LF source |
|---|---|---|
| `src/components/Contact.astro` | Equal | `c31b68e4d5db04e38b688ca53a00977c991b3d211912b1be88078282be1bc605` |
| `src/scripts/contact.ts` | Equal | `3ed4b24e55011ca74a33c086682fe95e4d9a54f0a319ec3fa47c943edfe291f9` |
| `src/lib/form-config.ts` | Equal | `3dc96be513953e116fc64d28da02da88c2889a0b6363d1c7b953d2a4d69a72f6` |
| `src/scripts/site.ts` | Equal | `f07bd448e39292f5863fbc9294dade04e0ba8a100caffec8af0c14fa1a125d2f` |
| `src/layouts/BaseLayout.astro` | Equal | `bdf75b55f63cae1b5f7811c126f0891db544112c015726655e36672d1ff26b11` |
| `src/pages/index.astro` | Equal | `6ae319a7edf0ca132597012f540bc8ae34d8dc29879c2a25460b03cab1288e3a` |
| `scripts/build-headers.mjs` | Equal | `302eb27bb378e69c272ade9eb5b10949223d5c7ebfaf18ed31e394aeae297fd6` |
| `cloudflare.config.ts` | Equal | `d6ba1945306399bcb8babdb5af3e1bc90a6fda1caec96267b554a66c46e1b4be` |
| `package.json` | Equal | `c1474fe0aec6a94b29ff0a23421bd3f01b24ecd28cf4049384777a7620f94bfb` |
| `package-lock.json` | Equal | `80defa5397a3ae925dcdff4a58b328293b524e40a6f42dbc093381d43d243bd6` |

All ten compared sources are unchanged. The full source diff outside release documentation is limited to the hero image source/exports/generator, Hero picture sizing, and two `.hero-scene img` styling changes. No contact/form selector, form presentation rule, provider URL, field contract, submit handler, CSP builder, dependency or Cloudflare configuration changed in the inspected diff.

Current built JavaScript compared to the actual prior immutable preview's `preview-integrity.json`:
- `_astro/mini.BUt3Uaz0.js`: `a30bb69c78e19426745c38c33856f5b97444187d84030281106a5e7dba7b703a`; same bytes as the prior immutable preview: **true**.
- `_astro/BaseLayout.astro_astro_type_script_index_0_lang.CDDUPsCy.js`: `b72e0915aa4391f411f34d7da4741785ec7fc9cb9df91b6474612922c63189ff`; same bytes as the prior immutable preview: **true**.

Current built form tag:
```html
<form id="quote-form" action="https://formspree.io/f/mljgyabo" method="post" enctype="multipart/form-data" data-endpoint="https://formspree.io/f/mljgyabo" aria-describedby="privacy-summary">
```

Field names remain `name`, `business`, `email`, `package`, `timeline`, `message`, `_gotcha`, `_subject`. These checks support current local equivalence; they do not establish final commit provenance, final hosted assets/DOM, new-origin provider acceptance, mailbox delivery from the later version, or current external provider-account settings.

## Concrete safe path for root

1. Preserve the confirmed acceptance receipt and phase intent guard, recording that the single preview send is consumed. Keep the receipt's old source/version mapping intact.
2. Commit the narrowly reviewed hero changes and get fresh CI. On the final source, recheck the same form/config/transport/layout/header/dependency sources against `eef2185...`; require equality. Review the complete diff to keep CSS/art changes hero-scoped. Verify build-time public form variables still produce the same active endpoint/method/enctype/fields.
3. Produce the commit-bound website-only package and a new unpromoted immutable preview. Verify final served HTML and assets against that exact package/SHA/version. Record final served script hashes and form DOM, not only source equality. Verify final CSP permits the unchanged provider and executes the same form code without console/CSP errors.
4. Run the required current hosted browser suite and form cases with every real Formspree request intercepted. Cover invalid/boundary input, three-step review/back, required fields, package prefilling, one intentional request/double-submit guard, mocked rejection/timeout/success, no-JS native field contract, focus/live errors and no misleading success. Capture contact states and record the final URL/SHA/version and that all form transport in these tests was isolated.
5. Confirm available owner/provider state gives no evidence of a changed endpoint, recipient, eligibility or origin policy. Source/JS equality alone is not proof of external provider settings or successful acceptance from the new immutable hostname. Retain that boundary candidly; do not assert a new live send or a fresh mailbox/account inspection. If actual provider/account/origin configuration has changed or an applicable restriction is unresolved, stop the affected release gate rather than reusing this equivalence conclusion.
6. In prepromotion evidence, distinguish two facts: **real preview provider-to-Zoho delivery verified on b767642c/eef2185**; **final hero version's unchanged form integration verified by source/served-byte equivalence and current isolated hosted UI tests**. With those checks and all remaining mandatory gates satisfied, a second preview email is not required or allowed merely to refresh the receipt.
7. Preserve the separate **production** gate. The one authorized canonical production synthetic test and independent exact-marker Zoho confirmation remain required for production closure under the existing workflow. No production-send proof is supplied by this review or by the preview receipt. Do not call release verification complete before that evidence exists. Keep the same no-repeat guard if production delivery is uncertain.

## Actual blocker conditions

The art change alone does not invalidate the confirmed receipt and is not an external blocker. The following would invalidate the conditional path: a changed/unproven form transport or public build configuration; changed or unresolved material provider/recipient/origin restrictions; final hosted script/DOM/CSP/source mismatch; failed isolated form tests; or inability to obtain the required production receipt under the one-send workflow. Root must record the specific failed gate if one occurs. No failed gate may be marked passed by citing this interpretation.

At this audit point the final new commit, immutable preview and hosted equivalence tests are still pending; therefore this report does **not** mark final-version release gates passed.
