# Ismail Studio V2 — release record

Status: IMPLEMENTED; LOCAL QA VERIFIED ACROSS RECORDED RUNS. Production remains V1 at this checkpoint; preview and real delivery gates pending.

Observed base: `d9dc2b8fdea169742a1951c3690a055af9a02869`; feature branch `codex/ismailstudio-v2-creative-redesign`. Canonical target: https://www.ismailstudio.my/. Only the existing `ismailstudio` website Worker is eligible for publication. No DNS, mail, apex or unrelated Worker deployment is authorized by this release.

Current rollback: website version `4317599d-6080-4ac6-9237-3503bc0971e9`, deployment `224c085a-9853-40bd-9943-955c62ef8f7f`. Read of that exact version succeeded during this run and includes the previous static asset configuration and source header `74ddae2`. Apex remains `b1fb9bf9-8597-4210-b782-4a951bc1e820`, deployment `98aa3e69-71d6-4ffe-83f3-45385afd301d`. Three exact-host routes, six custom domains, nine Workers and 17 DNS records captured read-only; raw provider data remains in ignored `.local/v2/` and redacted fingerprints in evidence.

Release mechanism: pinned `cf` beta.19, existing `cloudflare.config.ts`, packaging with `--site-only --preview-only`. Upload a version without changing traffic; verify its version URL; promote that same version by creating a percentage deployment. This is the documented cf version/deployment path and avoids reapplying trigger settings. See https://developers.cloudflare.com/cf/projects/. Do not redeploy apex, run triggers deploy or change DNS.

Rollback, if needed: write `[{"version_id":"4317599d-6080-4ac6-9237-3503bc0971e9","percentage":100}]` to an ignored local JSON file, then run the authenticated existing cf command `workers deployments create --worker ismailstudio --strategy percentage --versions @<that-file>`. Inspect the dry-run first. Verify the canonical site returns the old source header and functional V1. No live rollback drill has been performed; no external state or enquiry storage is restored by a code rollback.

Pending: final test/visual/performance receipts, source commit, dry-run, version preview, independent V2 form provider acceptance and Zoho receipt, conditional production promotion and independent public verification. Historical V1 delivery cannot satisfy V2's gate.
