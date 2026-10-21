# CRO strategy, lead qualification, forms and privacy

## Funnel / goal
Incoming: Google search, word-of-mouth, social, targeted referral/outreach. Job: explain service in 5 seconds, show relevant concept evidence, give pricing range, answer objections, enable qualified enquiry. **North star: successfully received, appropriately qualified enquiry**, not raw CTA click. Secondary: form starts, selected-package clicks, project visit events; track in aggregate with legitimate consent/notice where applicable.

## Primary CTA rules
Header + hero + all packages + final contact CTA lead to `#contact`. Price card buttons prefill the package selector (with no unintended network request). Keyboard and history behavior must work. No intrusive popups, manufactured scarcity, unsolicited notifications, or sticky UI obscuring content. Secondary links work as honest email fallback.

## Form fields and validation
Name (required, 2–80 chars), business name (optional, <=100), email (required), package (required options `Not sure yet`, Starter, Business, Premium), project description (required, 20–2000), timeline (optional list such as Flexible / Within 1–3 months / Exploring). Provider may impose constraints; reconcile transparently. Honeypot or provider spam control, abuse rate limiting if supported. Do not collect personal phone, physical address, secret data or payments.

## Managed form provider workflow
1. Research current reputable compatible providers and choose no-cost/low-cost plan with eligible account ownership and sufficient submissions, anti-spam, and email notifications to `contact@ismailstudio.my`. **Selection is not authorization to open paid account.** If no eligible approved provider credentials exist, prepare a functioning `mailto:` fallback and mark form activation **BLOCKED**, not falsely done.
2. Store public endpoint ID via appropriate environment config. Do not commit access tokens or private API keys. Protect against accidental test spam; clearly separate preview/testing from production.
3. Test validation on empty/malformed/oversized input, package prefill, async pending, success, network failure, provider error, double submit and screen-reader announcement. Mark success only after 2xx/actual provider acceptance; do not fake via timeouts.
4. Verify **actual delivery to Zoho** using permitted account access or direct authorized manual test. Form provider success is not proof email was received. Test auto acknowledgment only if supported/legitimate. Error: accessible retry plus mailto.
5. Clear concise privacy note identifying purpose, recipient, form processor (name after selection), necessary retention/disclosure and contact for privacy concerns. Do not claim security properties unverified. No sensitive PII in analytics, logs, URLs, screenshots or Git history.

## Privacy-conscious conversion tracking
Cloudflare Web Analytics can provide aggregate traffic metrics; may not give reliable custom per-event tracking. Implement conversion tracking only where provider or analytics service legitimately supports custom events with transparent privacy controls. Avoid third-party pixels/fingerprinting by default. Where tracking cannot be configured, report form submission count from provider dashboard (with permission), manual **qualified** count separately, and don't invent ratios. Design event model in docs: `quote_cta_click`, `form_start`, `form_submit_success`, `form_submit_error`, `mailto_click`, `project_open`; no content/email/phone in event payloads. If tracking not supported, remove event code rather than shipping broken hooks.

## Post-submit
Visitor sees clear confirmation; receives optional real acknowledgment if available. Owner receives legitimate notification, reviews company problem and scope, responds manually, sends quote after eligible contracting arrangements. No auto contract, deposit or CRM. Do not promise response time without capacity evidence.

## Conversion QA
Test hero copy comprehension with unfamiliar reader; links to contact; card choice kept; form completion time and field friction; user confidence and trust without fake signals; visual CTA contrast; enquiry emails end-to-end. A design is a *hypothesis*, not measured improvement; collect real opt-in feedback and traffic before A/B claims.
