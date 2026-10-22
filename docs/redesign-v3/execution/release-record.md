# V3 release record — in progress

Current status: implemented and locally verified; release gates still being completed. No V3 production promotion yet.

Fresh baseline: website `ismailstudio` version `559ca179-d268-4db7-a486-181df5238e66`, deployment `573f6883-09a9-4883-9a34-64be843350bb` at 100%; canonical runtime source `488a88c34a2a78d4ece64636dff14ac4d42e8395`. Baseline version details were reread successfully after refreshing the existing official CLI session.

Protected inventory: 9 Workers, 6 custom domains, 3 routes, 17 DNS records, 7 mail/CAA records, zero website bindings and zero build triggers. Baseline DNS fingerprint `d627da74614e8feeed07836cc16a35141025ada7a8002cb283ff2f693055153b`. Apex version `b1fb9bf9-8597-4210-b782-4a951bc1e820` remains separate and must not be deployed. Fresh baseline receipt: `../evidence/infrastructure-before.json`.

Local gates passed: handoff integrity and source boundaries, Astro check/build, 3 redirect tests, 36 Playwright tests, 11 viewport/landscape matrix, four dialog paths, no-JS/forced-colors/reduced motion, unchanged authentic project media. Dependency audit reports zero known production dependency vulnerabilities; this is not a complete security audit.

Pending: isolated Lighthouse comparison, final staged-file/public-asset review, runtime source commit, isolated immutable preview and hosted checks, sanctioned provider acceptance and independently supported current Zoho receipt, rollback dry-run and conditional promotion. Exact evidence and outcome will replace this provisional record.
