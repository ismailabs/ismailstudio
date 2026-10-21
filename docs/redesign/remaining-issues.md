# Outstanding V2 issues

**No mandatory implementation or release blockers remain.** Owner separately confirmed both preview enquiry `ISM-PREVIEW-V2-20261021173515` and production enquiry `ISM-PRODUCTION-V2-20261021213408` arrived in Zoho. Both had Formspree 200 acceptance and UI success. Exact tested V2 version serves 100% of traffic. Canonical HTTP/assets/security/redirect checks passed 41/41. CI 39680006800 passed 31/31 fresh local and 31/31 production browser cases, zero skipped/unexpected/flaky; artifact digest verified. All 27 production captures and protected-infrastructure comparison passed. Final confirmation is recorded in form-production-v2.json and release-record.md; no resend or redeployment was needed.

Implementation, three visual cycles, facts/images, source push, 31-file preview, 37 preview HTTP/hash checks, **31 local + 31 preview CI cases**, typecheck/build/redirect checks and six final lab runs are complete. CI artifact digest verified. Known-good V1 version remains available for rollback.

Nonblocking limits: retained Windows memory-exhaustion timeouts superseded by clean independent CI; physical-device/AT listening, field p75/INP and Search Console/analytics not verified. Owner's original skills-lock.json and two local skill folders remain untouched outside implementation commits.
