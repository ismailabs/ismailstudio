# Search Console and enquiry operations

## Search Console after canonical deployment

1. Sign in to the intended Google account and add a Domain property for `ismailstudio.my` (or a URL-prefix property for `https://www.ismailstudio.my/` if domain verification is unavailable).
2. For a Domain property, Google supplies a unique TXT value. Add that **additional** record with authorized access; preserve every Zoho MX/SPF/DKIM/DMARC and other TXT record. Never guess a verification token or replace the zone.
3. Verify ownership in Search Console, submit `https://www.ismailstudio.my/sitemap.xml`, and inspect the canonical homepage. Request indexing once it is live, indexable and redirects are correct.
4. Monitor indexing/crawl errors, mobile experience, queries and relevant enquiry counts. Search engines determine indexing and ranking; neither a sitemap nor structured data guarantees them.

No Google property access or verification token has been supplied. These are setup instructions, not a claim that a property was verified or a sitemap submitted.

## Lead and privacy operations

- Review Formspree dashboard submissions and Zoho delivery for legitimate enquiries. Respond manually; no auto-contract, payment, CRM or outreach has been configured.
- Keep contact@ismailstudio.my as the professional reply route. Do not publish the personal WhatsApp number.
- Current public Formspree free allowance starts at 50 submissions/month ([official limits](https://help.formspree.io/articles/account-management/account-limits/), checked 2026-10-21). Verify the actual account's plan and usage in its dashboard before relying on a capacity. No paid subscription has been created by this implementation.
- Do not promise an automatic acknowledgment: none has been verified. Provider acceptance, a delivered notification and a qualified enquiry are separate observations.
- Enquiry correspondence is for responding/scoping and any agreed project records. Honour deletion/privacy requests subject to legitimate record needs; configure provider retention appropriately. Avoid sensitive details and never copy customer submission contents into Git or analytics.
- Event model for a future authorized analytics property: `quote_cta_click`, `form_start`, `form_submit_success`, `form_submit_error`, `mailto_click`, `project_open`. Payloads must contain no name/email/message/phone. No event code is shipped because no supporting property has been verified.
- Cloudflare Web Analytics is optional. No verified property/token is configured in source; its management read API returned 403. Production testing found host-level automatic injection blocked by CSP. The site's `public, no-transform` response header now prevents that injection, following [Cloudflare's documentation](https://developers.cloudflare.com/web-analytics/get-started/). No zone-wide analytics setting changed. Future analytics must use a verified property and intentional CSP/privacy/network checks.

## Browser and performance evidence limits

Automated axe and accessibility-tree/keyboard checks cover a useful subset of WCAG. They do not certify conformance or substitute for a real assistive-technology user. Physical iOS/Android devices, NVDA/VoiceOver listening, unfamiliar-human comprehension and real-user p75 Core Web Vitals require later evidence. Local Lighthouse/trace results are lab measurements only.
